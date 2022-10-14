import { Status } from "../../types/responseMessages";
import { Request, Response } from "express";
import { Key } from "../../db/models/Key";

export const getKeys = async (req: Request, res: Response) => {
  try {
    const keys = await Key.find({ isActive: true });
    return res.status(200).json({
      status: Status.success,
      data: {
        keys: keys.map(
          ({ id, name, treasuryName, domain, foundTimestamps }) => {
            // const lastRespawn: string = getLastRespawnDate(respawns);
            return {
              id,
              name,
              treasuryName,
              domain,
            };
          }
        ),
      },
    });
  } catch (e) {
    throw e;
  }
};
