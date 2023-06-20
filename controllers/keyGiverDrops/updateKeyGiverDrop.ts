import { KeyGiverDropUpdateRequest } from "../../types/KeyGiverDrop";
import { messages, Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { Response } from "express";
import dayjs from "dayjs";
import { isIdValid } from "../../db/validators/universalValidators";
import { KeyGiver } from "../../db/models/KeyGiver";
import { KeyGiverDrop } from "../../db/models/KeyGiverDrop";
import { CustomError } from "../../utils/customError";
import { getErrorsMessages } from "../../utils/getErrorsMessages";
import { config } from "../../config/config";

export const updateKeyGiverDrop = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const {
      keyGiver: keyGiverId,
      drop,
      dropDate,
    } = req.body as KeyGiverDropUpdateRequest;
    isIdValid(id, messages[req.lang].keyGiverDrops.keyGiverDropNotExists, 404);
    if (keyGiverId)
      isIdValid(
        keyGiverId,
        messages[req.lang].keyGiverDrops.keyGiverNotExists,
        404
      );
    if (drop)
      isIdValid(drop, messages[req.lang].keyGiverDrops.keyNotExists, 400);
    if (
      dropDate &&
      dropDate < dayjs().subtract(config.keyGiverDrops.maxAddTime, "h").unix()
    )
      throw new CustomError(
        messages[req.lang].keyGiverDrops.dropTooOldToAdd(
          config.keyGiverDrops.maxAddTime
        ),
        400,
        Status.error
      );
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
    if (
      keyGiverDrop.createdAt <
      dayjs().subtract(config.keyGiverDrops.maxEditTime, "h").unix()
    )
      throw new CustomError(
        messages[req.lang].keyGiverDrops.dropTooOldToEdit(
          config.keyGiverDrops.maxEditTime
        ),
        400,
        Status.error
      );
    const keyGiver = await KeyGiver.findOne({
      _id: keyGiverId,
      isActive: true,
    });
    if (!keyGiver)
      throw new CustomError(
        messages[req.lang].keyGiverDrops.keyGiverNotExists,
        404,
        Status.error
      );
    const finalDropDate = !dropDate
      ? keyGiverDrop.dropDate
      : dropDate > dayjs().unix()
      ? dayjs().unix()
      : dropDate;
    const { respawnTime } = keyGiver;
    const nextRespawnDate =
      respawnTime === null
        ? null
        : dayjs.unix(finalDropDate).add(respawnTime, "h").unix();
    await KeyGiverDrop.findOneAndUpdate(
      { _id: id, isActive: true },
      {
        keyGiver: keyGiverId,
        drop: drop === undefined ? keyGiverDrop.drop : drop,
        dropDate: finalDropDate,
        nextRespawnDate,
      },
      { runValidators: true }
    );
    return res.status(200).json({
      status: Status.success,
      message: messages[req.lang].keyGiverDrops.keyGiverDropUpdated,
    });
  } catch (e) {
    if (e.errors)
      throw new CustomError(getErrorsMessages(e.errors)[0], 400, Status.error);
    throw e;
  }
};
