import { Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { Response } from "express";
import { KeyGiver } from "../../db/models/KeyGiver";
import { nextRespawnDate } from "../../utils/nextRespawnDate";
import { lastRespawnDate } from "../../utils/lastRespawnDate";

export const getKeyGivers = async (req: Request, res: Response) => {
  try {
    const keyGivers = await KeyGiver.find({ isActive: true });
    return res.status(200).json({
      status: Status.success,
      data: {
        keyGivers: keyGivers.map(({ id, name, respawnTime, respawns }) => {
          const lastRespawn: string = lastRespawnDate(respawns);
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
