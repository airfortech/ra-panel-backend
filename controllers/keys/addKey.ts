import { messages, Status } from "../../types/responseMessages";
import { KeyAddRequest } from "../../types/Key";
import { Request } from "../../types/Request";
import { Response } from "express";
import { Key } from "../../db/models/Key";
import { isIdValid } from "../../db/validators/universalValidators";
import { CustomError } from "../../utils/customError";
import { getErrorsMessages } from "../../utils/getErrorsMessages";

export const addKey = async (req: Request, res: Response) => {
  try {
    const data = req.body as KeyAddRequest;
    if (data.treasury)
      isIdValid(
        data.treasury,
        messages[req.lang].keys.wrongTreasuryIdProvided,
        400
      );
    const name = data.name.trim();
    const key = await Key.findOne({ name });
    if (key && key.isActive === false)
      await Key.findByIdAndUpdate(
        key.id,
        { ...data, name, isActive: true },
        { runValidators: true }
      );
    else if (key && key.isActive === true)
      throw new CustomError(
        messages[req.lang].keys.keyExists(name),
        400,
        Status.error
      );
    else await new Key({ ...data, name }).save();
    return res.status(200).json({
      status: Status.success,
      message: messages[req.lang].keys.keyAdded(name),
    });
  } catch (e) {
    if (e.errors)
      throw new CustomError(getErrorsMessages(e.errors)[0], 400, Status.error);
    throw e;
  }
};
