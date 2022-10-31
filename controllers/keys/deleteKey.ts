import { messages, Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { Response } from "express";
import { Key } from "../../db/models/Key";
import { CustomError } from "../../utils/customError";
import { isIdValid } from "../../db/validators/universalValidators";

export const deleteKey = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    isIdValid(id, messages[req.lang].keys.keyNotExists, 404);
    const key = await Key.findByIdAndUpdate(id, { isActive: false });
    if (!key)
      throw new CustomError(
        messages[req.lang].keys.keyNotExists,
        404,
        Status.error
      );
    return res.status(200).json({
      status: Status.success,
      message: messages[req.lang].keys.keyDeleted,
    });
  } catch (e) {
    throw e;
  }
};
