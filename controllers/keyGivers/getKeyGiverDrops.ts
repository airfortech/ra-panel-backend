import { KeyGiverDropShortResponse } from "../../types/KeyGiverDrop";
import { Request } from "../../types/Request";
import { ShortKeyResponse } from "../../types/Key";
import { Status, messages } from "../../types/responseMessages";
import { Response } from "express";
import { Key } from "../../db/models/Key";
import { KeyGiver } from "../../db/models/KeyGiver";
import { KeyGiverDrop } from "../../db/models/KeyGiverDrop";
import { isIdValid } from "../../db/validators/universalValidators";
import { CustomError } from "../../utils/customError";

export const getKeyGiverDrops = async (req: Request, res: Response) => {
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
    const keyGiverDrops = await KeyGiverDrop.find({
      isActive: true,
      keyGiver: id,
    }).populate<{ drop: ShortKeyResponse }>({
      path: "drop",
      select: "name",
      model: Key,
      match: { isActive: true },
    });
    return res.status(200).json({
      status: Status.success,
      data: {
        keyGiverDrops: keyGiverDrops.map(
          ({ id, drop, dropDate, nextRespawnDate }) => {
            const data: KeyGiverDropShortResponse = {
              id,
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
    throw e;
  }
};
