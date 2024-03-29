import { messages, Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { Item } from "../../db/models/Item";
import { Response } from "express";
import { CustomError } from "../../utils/customError";
import { isIdValid } from "../../db/validators/universalValidators";

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    isIdValid(id, messages[req.lang].items.itemNotExists, 404);
    const item = await Item.findOneAndRemove({ _id: id });
    if (!item)
      throw new CustomError(
        messages[req.lang].items.itemNotExists,
        404,
        Status.error
      );
    return res.status(200).json({
      status: Status.success,
      message: messages[req.lang].items.itemDeleted(item.short),
    });
  } catch (e) {
    throw e;
  }
};
