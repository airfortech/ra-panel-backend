import { messages, Status } from "../../types/responseMessages";
import { Request, Response } from "express";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { KeyGiver } from "../../db/models/KeyGiver";
import { CustomError } from "../../utils/customError";
import { isIdValid } from "../../db/validators/universalValidators";

dayjs.extend(utc);

export const addKeyGiverTimestamp = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    isIdValid(id, messages.keyGivers.keyGiverNotExists, 404);
    const { date, wasEmpty }: { date: string; wasEmpty: boolean } = req.body;

    const newDate = dayjs.utc(date);
    if (!newDate.isValid())
      throw new CustomError(messages.date.invalidDate, 400, Status.error);

    const keyGiver = await KeyGiver.findById(id);
    if (!keyGiver)
      throw new CustomError(
        messages.keyGivers.keyGiverNotExists,
        404,
        Status.error
      );

    const lastRespawn = keyGiver.respawns[keyGiver.respawns.length - 1];
    if (!lastRespawn)
      keyGiver.respawns.push({ date: newDate.format(), wasEmpty });
    else {
      const previousDate = dayjs.utc(lastRespawn.date);
      if (newDate.diff(previousDate) <= 0)
        throw new CustomError(messages.date.dateNotNever, 400, Status.error);
      keyGiver.respawns.push({ date: newDate.format(), wasEmpty });
    }

    await keyGiver.save();
    return res.status(200).json({
      status: Status.success,
    });
  } catch (e) {
    throw e;
  }
};
