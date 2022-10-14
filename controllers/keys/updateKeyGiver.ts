import { messages, Status } from "../../types/responseMessages";
import { KeyGiver as IKeyGiver } from "../../types/KeyGiver";
import { Request, Response } from "express";
import { KeyGiver } from "../../db/models/KeyGiver";
import { CustomError } from "../../utils/customError";
import { isIdValid } from "../../db/validators/universalValidators";

export const updateKeyGiver = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    isIdValid(id, messages.keyGivers.keyGiverNotExists, 404);
    const { name, description, respawnTime } = req.body as IKeyGiver;
    const keyGiverWithSameName = await KeyGiver.findOne({
      name,
      _id: { $ne: id },
      isActive: true,
    });
    if (keyGiverWithSameName)
      throw new CustomError(messages.keyGivers.nameExists, 400, Status.error);
    const keyGiver = await KeyGiver.findByIdAndUpdate(id, {
      name,
      description,
      respawnTime,
    });
    if (!keyGiver)
      throw new CustomError(
        messages.keyGivers.keyGiverNotExists,
        404,
        Status.error
      );
    return res.status(200).json({
      status: Status.success,
    });
  } catch (e) {
    throw e;
  }
};
