import { messages, Status } from "../../types/responseMessages";
import { Request, Response } from "express";
import { KeyGiver } from "../../db/models/KeyGiver";
import { CustomError } from "../../utils/customError";
import { isIdValid } from "../../db/validators/universalValidators";

export const deleteKeyGiver = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    isIdValid(id, messages.keyGivers.keyGiverNotExists, 404);
    const keyGiver = await KeyGiver.findByIdAndUpdate(id, { isActive: false });
    if (!keyGiver)
      throw new CustomError(
        messages.keyGivers.keyGiverNotExists,
        404,
        Status.error
      );
    return res.status(200).json({
      status: Status.success,
      message: messages.keyGivers.keyGiverDeleted,
    });
  } catch (e) {
    throw e;
  }
};
