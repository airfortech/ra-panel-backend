import { KeyGiverResponse } from "../../types/KeyGiver";
import { Request } from "../../types/Request";
import { ShortLocationResponse } from "../../types/Location";
import { Status } from "../../types/responseMessages";
import { Response } from "express";
import { KeyGiver } from "../../db/models/KeyGiver";
// import { Location } from "../../db/models/Location";
import { Location } from "../../db/models/Location";

export const getKeyGivers = async (req: Request, res: Response) => {
  try {
    const keyGivers = await KeyGiver.find({
      isActive: true,
    })
      // INFO: populate(key where is ref, list of keys from ref model or "" for all, model), if id in ref items not found, it doesnt populate, no throwing error
      .populate<{ locations: ShortLocationResponse[] }>(
        "locations",
        "locationId name domain",
        Location
      );
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
              locations: locations.map(({ id, locationId, name, domain }) => {
                return {
                  id,
                  locationId,
                  name,
                  domain,
                };
              }),
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
