import { KeyGiverDropResponse } from "../../types/KeyGiverDrop";
import { ShortKeyGiverResponse } from "../../types/KeyGiver";
import { Request } from "../../types/Request";
import { ShortKeyResponse } from "../../types/Key";
import { Status } from "../../types/responseMessages";
import { Response } from "express";
import { Key } from "../../db/models/Key";
import { KeyGiver } from "../../db/models/KeyGiver";
import { KeyGiverDrop } from "../../db/models/KeyGiverDrop";
import { Location } from "../../db/models/Location";

export const getKeyGiverDrops = async (req: Request, res: Response) => {
  try {
    const keyGiverDrops2 = await KeyGiverDrop.aggregate([
      {
        $match: {
          isActive: true,
        },
      },
      {
        $group: {
          _id: "$keyGiver",
          newestRespawnDate: { $max: "$nextRespawnDate" },
        },
      },
      {
        $lookup: {
          from: KeyGiverDrop.collection.name,
          let: { keyGiverId: "$_id", newestRespawnDate: "$newestRespawnDate" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    // INFO: double $$ is reference to variable defined in let
                    { $eq: ["$keyGiver", "$$keyGiverId"] },
                    { $eq: ["$nextRespawnDate", "$$newestRespawnDate"] },
                  ],
                },
              },
            },
          ],
          // INFO: it returns array of newestKeyGivers
          as: "newestKeyGivers",
        },
      },
      {
        $replaceRoot: {
          // INFO: replaces element with newestKeyGivers[0], including removing _id
          newRoot: { $arrayElemAt: ["$newestKeyGivers", 0] },
        },
      },
      {
        $sort: {
          nextRespawnDate: -1,
        },
      },
    ]);
    // INFO: populate(key where is ref, list of keys from ref model or "" for all, model, match?), if id in ref items not found, it doesnt populate, no throwing error
    const keyGiverDrops = await KeyGiverDrop.populate<{
      keyGiver: ShortKeyGiverResponse;
      drop: ShortKeyResponse;
      // INFO: populate options can be array of objects or object
    }>(keyGiverDrops2, [
      {
        path: "keyGiver",
        select: "name short domain respawnTime locations",
        model: KeyGiver,
        match: { isActive: true },
        // INFO: nesting populate
        populate: {
          path: "locations",
          select: "locationId name domain",
          model: Location,
          match: { isActive: true },
        },
      },
      {
        path: "drop",
        select: "name",
        model: Key,
        match: { isActive: true },
      },
    ]);
    return res.status(200).json({
      status: Status.success,
      data: {
        keyGiverDrops: keyGiverDrops.map(
          ({ _id, keyGiver, drop, dropDate, nextRespawnDate, createdAt }) => {
            const {
              id: keyGiverId,
              name,
              short,
              domain,
              respawnTime,
              locations,
            } = keyGiver;
            const data: KeyGiverDropResponse = {
              id: _id,
              keyGiver: {
                id: keyGiverId,
                name,
                short,
                domain,
                respawnTime,
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
