import { messages, Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { Response } from "express";
import { KeyGiver } from "../../db/models/KeyGiver";
import { CustomError } from "../../utils/customError";
import { nextRespawnDate } from "../../utils/nextRespawnDate";
import { lastRespawnDate } from "../../utils/lastRespawnDate";
import { isIdValid } from "../../db/validators/universalValidators";

export const getKeyGiverDetails = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    isIdValid(id, messages[req.lang].keyGivers.keyGiverNotExists, 404);

    const keyGiver = await KeyGiver.findById(id);
    if (!keyGiver)
      throw new CustomError(
        messages[req.lang].keyGivers.keyGiverNotExists,
        404,
        Status.error
      );
    const { name, description, respawnTime, respawns } = keyGiver;
    const lastRespawn = lastRespawnDate(respawns);
    return res.status(200).json({
      status: Status.success,
      data: {
        keyGiver: {
          id,
          name,
          description,
          respawnTime,
          respawns,
          lastRespawn,
          nextRespawn: nextRespawnDate(lastRespawn, respawnTime),
        },
      },
    });
  } catch (e) {
    throw e;
  }
};
