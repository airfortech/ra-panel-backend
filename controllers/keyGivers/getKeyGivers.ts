import { Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { Response } from "express";
import { KeyGiver } from "../../db/models/KeyGiver";
import { KeyGiverResponse } from "../../types/KeyGiver";

export const getKeyGivers = async (req: Request, res: Response) => {
  try {
    const keyGivers = await KeyGiver.find({ isActive: true });
    return res.status(200).json({
      status: Status.success,
      data: {
        keyGivers: keyGivers.map(
          ({
            id,
            name,
            short,
            description,
            respawnTime,
            domain,
            playersToComplete,
            comment,
            locations,
          }) => {
            const data: KeyGiverResponse = {
              id,
              name,
              short,
              description,
              respawnTime,
              domain,
              playersToComplete,
              comment,
              locations,
            };
            return data;
          }
        ),
      },
    });
  } catch (e) {
    throw e;
  }
};
