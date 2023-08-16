import { KeyDropShortResponse } from "../../types/KeyGiverDrop";
import { ShortestKeyGiverResponse } from "../../types/KeyGiver";
import { Status, messages } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { Response } from "express";
import { Key } from "../../db/models/Key";
import { KeyGiverDrop } from "../../db/models/KeyGiverDrop";
import { KeyGiver } from "../../db/models/KeyGiver";
import { isIdValid } from "../../db/validators/universalValidators";
import { CustomError } from "../../utils/customError";

export const getKeyDrops = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    isIdValid(id, messages[req.lang].keys.keyNotExists, 404);
    const key = await Key.findOne({
      isActive: true,
      _id: id,
    });
    if (!key)
      throw new CustomError(
        messages[req.lang].keys.keyNotExists,
        404,
        Status.error
      );
    const keyGiverDrops = await KeyGiverDrop.find({
      isActive: true,
      drop: id,
    }).populate<{ keyGiver: ShortestKeyGiverResponse }>({
      path: "keyGiver",
      select: "name short domain",
      model: KeyGiver,
      match: { isActive: true },
    });
    return res.status(200).json({
      status: Status.success,
      data: {
        keyDrops: keyGiverDrops.map(
          ({ _id, keyGiver, dropDate, nextRespawnDate }) => {
            const { id: keyGiverId, name, short, domain } = keyGiver;
            const data: KeyDropShortResponse = {
              id: _id,
              dropDate,
              nextRespawnDate,
              keyGiver: {
                id: keyGiverId,
                name: keyGiver.name,
                short: keyGiver.short,
                domain: keyGiver.domain,
              },
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
