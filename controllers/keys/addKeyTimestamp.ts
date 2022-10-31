import { messages, Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { Response } from "express";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Key } from "../../db/models/Key";
import { CustomError } from "../../utils/customError";
import { isIdValid } from "../../db/validators/universalValidators";

dayjs.extend(utc);

export const addKeyTimestamp = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    isIdValid(id, messages[req.lang].keys.keyNotExists, 404);
    const { date, npcName }: { date: string; npcName: string } = req.body;

    const newDate = dayjs.utc(date);
    if (!newDate.isValid())
      throw new CustomError(
        messages[req.lang].date.invalidDate,
        400,
        Status.error
      );

    const key = await Key.findById(id);
    if (!key)
      throw new CustomError(
        messages[req.lang].keys.keyNotExists,
        404,
        Status.error
      );

    const lastFoundTimestamps =
      key.foundTimestamps[key.foundTimestamps.length - 1];
    if (key.foundTimestamps.length < 1)
      key.foundTimestamps.push({ date: newDate.format(), npcName });
    else {
      const previousDate = dayjs.utc(lastFoundTimestamps.date);
      if (newDate.diff(previousDate) <= 0)
        throw new CustomError(
          messages[req.lang].date.dateNotNever,
          400,
          Status.error
        );
      key.foundTimestamps.push({ date: newDate.format(), npcName });
    }

    await key.save();
    return res.status(200).json({
      status: Status.success,
    });
  } catch (e) {
    throw e;
  }
};
