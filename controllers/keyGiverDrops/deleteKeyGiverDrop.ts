import { messages, Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { Response } from "express";
import dayjs from "dayjs";
import { CustomError } from "../../utils/customError";
import { isIdValid } from "../../db/validators/universalValidators";
import { KeyGiverDrop } from "../../db/models/KeyGiverDrop";
import { config } from "../../config/config";

export const deleteKeyGiverDrop = async (req: Request, res: Response) => {
  const maxEditTime = config.keyGiverDrops?.maxEditTime;
  try {
    const id = req.params.id;
    isIdValid(id, messages[req.lang].keyGiverDrops.keyGiverDropNotExists, 404);
    const keyGiverDrop = await KeyGiverDrop.findOne({
      _id: id,
      isActive: true,
    });
    if (!keyGiverDrop)
      throw new CustomError(
        messages[req.lang].keyGiverDrops.keyGiverDropNotExists,
        404,
        Status.error
      );
    if (keyGiverDrop.createdAt < dayjs().subtract(maxEditTime, "h").unix())
      throw new CustomError(
        messages[req.lang].keyGiverDrops.keyGiverDropTooOldToDelete,
        404,
        Status.error
      );
    keyGiverDrop.isActive = false;
    await keyGiverDrop.save();
    return res.status(200).json({
      status: Status.success,
      message: messages[req.lang].keyGiverDrops.keyGiverDropDeleted,
    });
  } catch (e) {
    throw e;
  }
};
