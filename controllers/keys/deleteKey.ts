import { messages, Status } from "../../types/responseMessages";
import { Request, Response } from "express";
import { Key } from "../../db/models/Key";
import { CustomError } from "../../utils/customError";
import { isIdValid } from "../../db/validators/universalValidators";

export const deleteKey = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    isIdValid(id, messages.keys.keyNotExists, 404);
    const key = await Key.findByIdAndUpdate(id, { isActive: false });
    if (!key)
      throw new CustomError(messages.keys.keyNotExists, 404, Status.error);
    return res.status(200).json({
      status: Status.success,
      message: messages.keys.keyDeleted,
    });
  } catch (e) {
    throw e;
  }
};
