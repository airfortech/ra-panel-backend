import { messages, Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { ItemAddWeaponRequest } from "../../types/Item";
import { ItemTypes } from "../../types/ItemTypes";
import { Response } from "express";
import { Item } from "../../db/models/Item";
import { CustomError } from "../../utils/customError";
import { getErrorsMessages } from "../../utils/getErrorsMessages";

export const addWeapon = async (req: Request, res: Response) => {
  try {
    const data = req.body as ItemAddWeaponRequest;
    const short = data.short.trim().toLowerCase();
    const item = await Item.findOne({ short });
    if (item)
      throw new CustomError(
        messages[req.lang].items.itemShortExists(short),
        400,
        Status.error
      );
    await new Item({
      ...data,
      short,
      type: ItemTypes.weapon,
      armorClass: null,
      armorHead: null,
      armorLeftArm: null,
      armorRightArm: null,
      armorChest: null,
      armorLegs: null,
      armorFoots: null,
      armorHands: null,
      armorPiercingRes: null,
      armorSlashingRes: null,
      armorBluntRes: null,
      shieldParry: null,
    }).save();
    return res.status(200).json({
      status: Status.success,
      message: messages[req.lang].items.itemAdded(short),
    });
  } catch (e) {
    if (e.errors)
      throw new CustomError(getErrorsMessages(e.errors)[0], 400, Status.error);
    throw e;
  }
};
