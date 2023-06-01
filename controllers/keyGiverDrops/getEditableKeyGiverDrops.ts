import { KeyGiverDropResponse } from "../../types/KeyGiverDrop";
import { ShortKeyGiverResponse } from "../../types/KeyGiver";
import { Request } from "../../types/Request";
import { ShortKeyResponse } from "../../types/Key";
import { Status } from "../../types/responseMessages";
import { Response } from "express";
import dayjs from "dayjs";
import { Key } from "../../db/models/Key";
import { KeyGiver } from "../../db/models/KeyGiver";
import { KeyGiverDrop } from "../../db/models/KeyGiverDrop";
import { Location } from "../../db/models/Location";
import { config } from "../../config/config";

export const getEditableKeyGiverDrops = async (req: Request, res: Response) => {
  const maxEditTime = config.keyGiverDrops?.maxEditTime;
  try {
    const keyGiverDrops = await KeyGiverDrop.find({
      isActive: true,
      createdAt:
        maxEditTime === undefined
          ? {
              $lt: dayjs().unix(),
            }
          : {
              $gt: dayjs().subtract(maxEditTime, "hours").unix(),
            },
    })
      .populate<{
        keyGiver: ShortKeyGiverResponse;
      }>({
        path: "keyGiver",
        select: "name short domain locations",
        model: KeyGiver,
        match: { isActive: true },
        populate: {
          path: "locations",
          select: "locationId name domain",
          model: Location,
          match: { isActive: true },
        },
      })
      .populate<{ drop: ShortKeyResponse }>({
        path: "drop",
        select: "name",
        model: Key,
        match: { isActive: true },
      });
    console.log(keyGiverDrops.length);
    return res.status(200).json({
      status: Status.success,
      data: {
        keyGiverDrops: keyGiverDrops.map(
          ({ id, keyGiver, drop, dropDate, nextRespawnDate }) => {
            const { id: keyGiverId, name, short, domain, locations } = keyGiver;
            const data: KeyGiverDropResponse = {
              id,
              keyGiver: {
                id: keyGiverId,
                name,
                short,
                domain,
                locations: locations.map(({ id, locationId, name, domain }) => {
                  return {
                    id,
                    locationId,
                    name,
                    domain,
                  };
                }),
              },
              drop: drop ? { id: drop.id, name: drop.name } : null,
              dropDate,
              nextRespawnDate,
            };
            return data;
          }
        ),
      },
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};
