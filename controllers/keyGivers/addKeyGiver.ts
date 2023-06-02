import { messages, Status } from "../../types/responseMessages";
import { KeyGiverAddRequest } from "../../types/KeyGiver";
import { Request } from "../../types/Request";
import { Response } from "express";
import { KeyGiver } from "../../db/models/KeyGiver";
import { CustomError } from "../../utils/customError";
import { getErrorsMessages } from "../../utils/getErrorsMessages";
import { areIdsValid } from "../../db/validators/universalValidators";

export const addKeyGiver = async (req: Request, res: Response) => {
  try {
    const { name, short, locations, ...data } = req.body as KeyGiverAddRequest;
    areIdsValid(
      locations,
      messages[req.lang].keyGivers.wrongLocationIdProvided,
      400
    );
    const keyGiver = await KeyGiver.findOne({
      $or: [{ name }, { short }],
      isActive: false,
    });
    if (keyGiver) {
      await KeyGiver.findOneAndUpdate(
        { _id: keyGiver.id },
        {
          ...data,
          isActive: true,
          name: name.trim() === keyGiver.name ? undefined : name,
          short: short.trim() === keyGiver.short ? undefined : short,
          locations,
        },
        { runValidators: true }
      );
    } else await new KeyGiver({ name, short, locations, ...data }).save();
    return res.status(200).json({
      status: Status.success,
      message: messages[req.lang].keyGivers.keyGiverAdded,
    });
  } catch (e) {
    if (e.errors)
      throw new CustomError(getErrorsMessages(e.errors)[0], 400, Status.error);
    throw e;
  }
};
