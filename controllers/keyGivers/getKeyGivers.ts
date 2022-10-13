import { Status } from "../../types/responseMessages";
import { Request, Response } from "express";
import { KeyGiver } from "../../db/models/KeyGiver";
import { nextRespawnDate } from "../../utils/nextRespawnDate";
import { getLastRespawnDate } from "../../utils/getLastRespawnDate";

export const getKeyGivers = async (req: Request, res: Response) => {
  try {
    const keyGivers = await KeyGiver.find({ isActive: true });
    return res.status(200).json({
      status: Status.success,
      data: {
        keyGivers: keyGivers.map(({ id, name, respawnTime, respawns }) => {
          const lastRespawn: string = getLastRespawnDate(respawns);
          return {
            id,
            name,
            respawnTime,
            lastRespawn,
            nextRespawn: nextRespawnDate(lastRespawn, respawnTime),
          };
        }),
      },
    });
  } catch (e) {
    throw e;
  }
};
