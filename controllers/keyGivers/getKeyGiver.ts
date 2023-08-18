import { Request } from "../../types/Request";
import { Status, messages } from "../../types/responseMessages";
import { Response } from "express";
import { KeyGiver } from "../../db/models/KeyGiver";
import { Location } from "../../db/models/Location";
import { isIdValid } from "../../db/validators/universalValidators";
import { CustomError } from "../../utils/customError";
import { ShortLocationResponse } from "../../types/Location";
import { KeyGiverResponse } from "../../types/KeyGiver";

export const getKeyGiver = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    isIdValid(id, messages[req.lang].keyGivers.keyGiverNotExists, 404);
    const keyGiver = await KeyGiver.findOne({
      isActive: true,
      _id: id,
    });
    if (!keyGiver)
      throw new CustomError(
        messages[req.lang].keyGivers.keyGiverNotExists,
        404,
        Status.error
      );
    const keyGiverDetails = await keyGiver.populate<{
      locations: ShortLocationResponse[];
    }>("locations", "locationId name domain", Location, { isActive: true });
    const {
      name,
      short,
      description,
      respawnTime,
      domain,
      playersToComplete,
      comment,
      locations,
    } = keyGiverDetails;
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
    return res.status(200).json({
      status: Status.success,
      data: {
        keyGiver: data,
      },
    });
  } catch (e) {
    throw e;
  }
};
