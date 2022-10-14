import { messages, Status } from "../../types/responseMessages";
import { Request, Response } from "express";
import { KeyGiver } from "../../db/models/KeyGiver";
import { CustomError } from "../../utils/customError";
import { nextRespawnDate } from "../../utils/nextRespawnDate";
import { getLastRespawnDate } from "../../utils/getLastRespawnDate";
import { isIdValid } from "../../db/validators/universalValidators";

export const getKeyGiverDetails = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    isIdValid(id, messages.keyGivers.keyGiverNotExists, 404);

    const keyGiver = await KeyGiver.findById(id);
    if (!keyGiver)
      throw new CustomError(
        messages.keyGivers.keyGiverNotExists,
        404,
        Status.error
      );
    const { name, description, respawnTime } = keyGiver;
    const lastRespawn: string = getLastRespawnDate(keyGiver.respawns);
    return res.status(200).json({
      status: Status.success,
      data: {
        keyGiver: {
          id,
          name,
          description,
          respawnTime,
          lastRespawn,
          nextRespawn: nextRespawnDate(lastRespawn, respawnTime),
        },
      },
    });
  } catch (e) {
    throw e;
  }
};
