import { messages, Status } from "../../types/responseMessages";
import { KeyUpdateRequest } from "../../types/Key";
import { Request } from "../../types/Request";
import { Response } from "express";
import { Key } from "../../db/models/Key";
import { isIdValid } from "../../db/validators/universalValidators";
import { CustomError } from "../../utils/customError";

export const updateKey = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    isIdValid(_id, messages[req.lang].keys.keyNotExists, 404);
    const data = req.body as KeyUpdateRequest;
    if (data.treasury)
      isIdValid(
        data.treasury,
        messages[req.lang].keys.wrongTreasuryIdProvided,
        400
      );
    const key = await Key.findOneAndUpdate({ _id, isActive: true }, data, {
      runValidators: true,
    });
    if (!key)
      throw new CustomError(
        messages[req.lang].keys.keyNotExists,
        404,
        Status.error
      );
    return res.status(200).json({
      status: Status.success,
      message: messages[req.lang].keys.keyUpdated(key.name),
    });
  } catch (e) {
    throw e;
  }
};
