import { messages, Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import {
  ItemAddArmorRequest,
  ItemAddRequest,
  ItemAddShieldRequest,
  ItemAddWeaponRequest,
} from "../../types/Item";
import { ItemTypes } from "../../types/ItemTypes";
import { Response } from "express";
import { Item } from "../../db/models/Item";
import { addWeapon } from "./weapon/addWeapon";
import { addArmor } from "./armor/addArmor";
import { addOtherItem } from "./other/addOtherItem";
import { addShield } from "./shield/addShield";
import { CustomError } from "../../utils/customError";

export const addItem = async (req: Request, res: Response, type: ItemTypes) => {
  try {
    const data = req.body as
      | ItemAddRequest
      | ItemAddArmorRequest
      | ItemAddWeaponRequest
      | ItemAddShieldRequest;
    const short = data.short.trim().toLowerCase();
    const item = await Item.findOne({ short });
    if (item)
      throw new CustomError(
        messages[req.lang].items.itemShortExists(short),
        400,
        Status.error
      );
    const args =
      type === ItemTypes.weapon
        ? addWeapon(data as ItemAddWeaponRequest, type, short)
        : type === ItemTypes.armor
        ? addArmor(data as ItemAddWeaponRequest, type, short)
        : type === ItemTypes.shield
        ? addShield(data as ItemAddShieldRequest, type, short)
        : addOtherItem(data as ItemAddRequest, type, short);
    await new Item({ ...args }).save();
    return res.status(200).json({
      status: Status.success,
      message: messages[req.lang].items.itemAdded(short),
    });
  } catch (e) {
    throw e;
  }
};
