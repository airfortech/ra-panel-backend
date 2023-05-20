import { messages, Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { Response } from "express";
import { Key } from "../../db/models/Key";
import { CustomError } from "../../utils/customError";
import { isIdValid } from "../../db/validators/universalValidators";
import { averageKeyCaptureTime } from "../../utils/averageKeyCaptureTIme";

export const getKeyDetails = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    isIdValid(id, messages[req.lang].keys.keyNotExists, 404);

    const key = await Key.findById(id);
    if (!key)
      throw new CustomError(
        messages[req.lang].keys.keyNotExists,
        404,
        Status.error
      );
    const { name, treasuryName, domain, foundTimestamps } = key;
    const averageCaptureTime = averageKeyCaptureTime(foundTimestamps);
    return res.status(200).json({
      status: Status.success,
      data: {
        key: {
          id,
          name,
          treasuryName,
          domain,
          averageCaptureTime,
          foundTimestamps,
        },
      },
    });
  } catch (e) {
    throw e;
  }
};
