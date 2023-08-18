import { KeyResponse } from "../../types/Key";
import { Status, messages } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { Response } from "express";
import { Key } from "../../db/models/Key";
import { isIdValid } from "../../db/validators/universalValidators";
import { CustomError } from "../../utils/customError";

export const getKey = async (req: Request, res: Response) => {
  try {
    // TODO: add populate when Treasury is ready
    const id = req.params.id;
    isIdValid(id, messages[req.lang].keys.keyNotExists, 404);
    const key = await Key.findOne({ isActive: true, _id: id });
    if (!key)
      throw new CustomError(
        messages[req.lang].keys.keyNotExists,
        404,
        Status.error
      );
    const { name, treasury, domain, comment, description } = key;
    const data: KeyResponse = {
      id,
      name,
      treasury: treasury as unknown as string,
      domain,
      comment,
      description,
    };
    return res.status(200).json({
      status: Status.success,
      data: {
        keys: data,
      },
    });
  } catch (e) {
    throw e;
  }
};
