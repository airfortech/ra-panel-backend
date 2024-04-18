import { Item } from "../../db/models/Item";
import { ItemShortResponse } from "../../types/Item";
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

export const getKeyGiverDrops = async (
  req: Request,
  res: Response,
  days: number
) => {
  try {
    const keyGiverDrops = await KeyGiverDrop.find({
      isActive: true,
      dropDate: {
        $gt: dayjs().subtract(days, "d").unix(),
      },
    })
      .populate<{
        keyGiver: ShortKeyGiverResponse;
      }>({
        path: "keyGiver",
        select: "name short domain respawnTime locations",
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
      })
      .populate<{ magicDrops: ItemShortResponse[] }>({
        path: "magicDrops",
        select: "name short",
        model: Item,
      });
    return res.status(200).json({
      status: Status.success,
      data: {
        keyGiverDrops: keyGiverDrops.map(
          ({
            id,
            keyGiver,
            drop,
            magicDrops,
            dropDate,
            nextRespawnDate,
            createdAt,
          }) => {
            const {
              id: keyGiverId,
              name,
              short,
              domain,
              respawnTime,
              locations,
            } = keyGiver;
            const data: KeyGiverDropResponse = {
              id,
              keyGiver: {
                id: keyGiverId,
                name,
                short,
                domain,
                respawnTime,
                locations: locations.map(
                  ({ id, locationId, internalId, name, domain }) => {
                    return {
                      id,
                      locationId,
                      internalId,
                      name,
                      domain,
                    };
                  }
                ),
              },
              drop: drop ? { id: drop.id, name: drop.name } : null,
              magicDrops: magicDrops.map(({ id, name, short }) => {
                return {
                  id,
                  name,
                  short,
                };
              }),
              dropDate,
              nextRespawnDate,
              createdAt,
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
