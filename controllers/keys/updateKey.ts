import { messages, Status } from "../../types/responseMessages";
import { Key as IKey } from "../../types/Key";
import { Request } from "../../types/Request";
import { Response } from "express";
import { Key } from "../../db/models/Key";
import { CustomError } from "../../utils/customError";
import { isIdValid } from "../../db/validators/universalValidators";

export const updateKey = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    isIdValid(id, messages[req.lang].keyGivers.keyGiverNotExists, 404);
    const { name, treasuryName, domain } = req.body as IKey;
    const keyWithSameName = await Key.findOne({
      name,
      _id: { $ne: id },
      isActive: true,
    });
    if (keyWithSameName)
      throw new CustomError(
        messages[req.lang].keys.nameExists,
        400,
        Status.error
      );
    const key = await Key.findByIdAndUpdate(id, {
      name,
      treasuryName,
      domain,
    });
    if (!key)
      throw new CustomError(
        messages[req.lang].keys.keyNotExists,
        404,
        Status.error
      );
    return res.status(200).json({
      status: Status.success,
    });
  } catch (e) {
    throw e;
  }
};
