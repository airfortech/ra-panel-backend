import { messages, Status } from "../../types/responseMessages";
import { Key as IKey } from "../../types/Key";
import { Request, Response } from "express";
import { Key } from "../../db/models/Key";
import { CustomError } from "../../utils/customError";
import { getErrorsMessages } from "../../utils/getErrorsMessages";

export const addKey = async (req: Request, res: Response) => {
  try {
    const { name, treasuryName, domain } = req.body as IKey;
    const key = await Key.findOne({ name, isActive: true });
    if (key) throw new CustomError(messages.keys.nameExists, 400, Status.error);
    await new Key({ name, treasuryName, domain }).save();
    return res.status(200).json({
      status: Status.success,
      message: messages.keys.keyAdded,
    });
  } catch (e) {
    if (e.errors)
      throw new CustomError(getErrorsMessages(e.errors)[0], 400, Status.error);
    throw e;
  }
};
