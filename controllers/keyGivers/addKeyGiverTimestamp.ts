import { messages, Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { Response } from "express";
import dayjs from "dayjs";
import { KeyGiver } from "../../db/models/KeyGiver";
import { CustomError } from "../../utils/customError";
import { isIdValid } from "../../db/validators/universalValidators";

export const addKeyGiverTimestamp = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    isIdValid(id, messages[req.lang].keyGivers.keyGiverNotExists, 404);
    const { date, keyName }: { date: number; keyName: string } = req.body;

    const newDate = dayjs(date);
    if (!newDate.isValid())
      throw new CustomError(
        messages[req.lang].date.invalidDate,
        400,
        Status.error
      );

    const keyGiver = await KeyGiver.findById(id);
    if (!keyGiver)
      throw new CustomError(
        messages[req.lang].keyGivers.keyGiverNotExists,
        404,
        Status.error
      );

    const lastRespawn = keyGiver.respawns[keyGiver.respawns.length - 1];
    if (!lastRespawn)
      keyGiver.respawns.push({ date: newDate.valueOf(), keyName });
    else {
      const previousDate = dayjs(lastRespawn.date);
      if (newDate.diff(previousDate) <= 0)
        throw new CustomError(
          messages[req.lang].date.dateNotNever,
          400,
          Status.error
        );
      keyGiver.respawns.push({ date: newDate.valueOf(), keyName });
    }

    await keyGiver.save();
    return res.status(200).json({
      status: Status.success,
    });
  } catch (e) {
    throw e;
  }
};
