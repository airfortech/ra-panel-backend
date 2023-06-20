import { messages, Status } from "../../types/responseMessages";
import { KeyGiverUpdateRequest } from "../../types/KeyGiver";
import { Request } from "../../types/Request";
import { Response } from "express";
import { KeyGiver } from "../../db/models/KeyGiver";
import { CustomError } from "../../utils/customError";
import {
  areIdsValid,
  isIdValid,
} from "../../db/validators/universalValidators";

export const updateKeyGiver = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, short, locations, ...data } =
      req.body as KeyGiverUpdateRequest;
    isIdValid(id, messages[req.lang].keyGivers.keyGiverNotExists, 404);
    areIdsValid(
      locations,
      messages[req.lang].keyGivers.wrongLocationIdProvided,
      400
    );
    const keyGiver = await KeyGiver.findOne({
      _id: id,
      isActive: true,
    });
    if (!keyGiver)
      throw new CustomError(
        messages[req.lang].keyGivers.keyGiverNotExists,
        404,
        Status.error
      );
    await KeyGiver.findOneAndUpdate(
      { _id: id, isActive: true },
      {
        ...data,
        name: name.trim() === keyGiver.name ? undefined : name,
        short: short.trim() === keyGiver.short ? undefined : short,
        locations,
      },
      { runValidators: true }
    );
    return res.status(200).json({
      status: Status.success,
      message: messages[req.lang].keyGivers.keyGiverUpdated,
    });
  } catch (e) {
    throw e;
  }
};
