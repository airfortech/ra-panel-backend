import { messages, Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { ItemTypes } from "../../types/ItemTypes";
import { Item } from "../../db/models/Item";
import { Response } from "express";
import { isIdValid } from "../../db/validators/universalValidators";
import { ItemUpdateRequest } from "../../types/Item";
import { updateArmor } from "./armor/updateArmor";
import { updateOtherItem } from "./other/updateOtherItem";
import { updateShield } from "./shield/updateShield";
import { updateWeapon } from "./weapon/updateWeapon";
import { CustomError } from "../../utils/customError";

export const updateItem = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    isIdValid(_id, messages[req.lang].items.itemNotExists, 404);
    const data = req.body as ItemUpdateRequest;
    const type = req.body.type as ItemTypes;
    if (!type)
      throw new CustomError(messages[req.lang].items.noTypeProvided, 400);
    const args =
      type === ItemTypes.weapon
        ? updateWeapon(data as ItemUpdateRequest, type)
        : type === ItemTypes.armor
        ? updateArmor(data as ItemUpdateRequest, type)
        : type === ItemTypes.shield
        ? updateShield(data as ItemUpdateRequest, type)
        : updateOtherItem(data as ItemUpdateRequest, type);
    const item = await Item.findOne({
      _id,
    });
    if (!item)
      throw new CustomError(
        messages[req.lang].items.itemNotExists,
        404,
        Status.error
      );
    const short = req.body.short?.trim().toLowerCase() || item.short;
    await Item.findOneAndUpdate(
      { _id },
      { ...args, short: short === item.short ? undefined : short },
      { runValidators: true }
    );
    return res.status(200).json({
      status: Status.success,
      message: messages[req.lang].items.itemUpdated(short),
    });
  } catch (e) {
    throw e;
  }
};
