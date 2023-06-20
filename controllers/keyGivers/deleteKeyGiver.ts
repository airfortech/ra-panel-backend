import { messages, Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { Response } from "express";
import { KeyGiver } from "../../db/models/KeyGiver";
import { CustomError } from "../../utils/customError";
import { isIdValid } from "../../db/validators/universalValidators";

export const deleteKeyGiver = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    isIdValid(id, messages[req.lang].keyGivers.keyGiverNotExists, 404);
    const keyGiver = await KeyGiver.findOneAndUpdate(
      { _id: id, isActive: true },
      { isActive: false }
    );
    if (!keyGiver)
      throw new CustomError(
        messages[req.lang].keyGivers.keyGiverNotExists,
        404,
        Status.error
      );
    return res.status(200).json({
      status: Status.success,
      message: messages[req.lang].keyGivers.keyGiverDeleted(keyGiver.name),
    });
  } catch (e) {
    throw e;
  }
};
