import { messages, Status } from "../../types/responseMessages";
import { KeyGiver as IKeyGiver } from "../../types/KeyGiver";
import { Request, Response } from "express";
import { KeyGiver } from "../../db/models/KeyGiver";
import { CustomError } from "../../utils/customError";
import { getErrorsMessages } from "../../utils/getErrorsMessages";

export const addKeyGiver = async (req: Request, res: Response) => {
  try {
    const { name, respawnTime } = req.body as IKeyGiver;
    const keyGiver = await KeyGiver.findOne({ name, isActive: true });
    if (keyGiver)
      throw new CustomError(messages.keyGivers.nameExists, 400, Status.error);
    await new KeyGiver({ name, respawnTime }).save();
    return res.status(200).json({
      status: Status.success,
      message: messages.keyGivers.keyGiverAdded,
    });
  } catch (e) {
    if (e.errors)
      throw new CustomError(getErrorsMessages(e.errors)[0], 400, Status.error);
    throw e;
  }
};
