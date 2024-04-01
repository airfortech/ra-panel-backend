import { Status, messages } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { ItemResponse } from "../../types/Item";
import { Response } from "express";
import { Item } from "../../db/models/Item";
import { isIdValid } from "../../db/validators/universalValidators";
import { CustomError } from "../../utils/customError";

export const getItem = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    isIdValid(id, messages[req.lang].items.itemNotExists, 404);
    const item = await Item.findOne({ _id: id });
    if (!item)
      throw new CustomError(
        messages[req.lang].items.itemNotExists,
        404,
        Status.error
      );
    const {
      name,
      short,
      isMagic,
      type,
      slot,
      weaponType,
      weaponHand,
      weaponSlashingDamage,
      weaponPiercingDamage,
      weaponBluntDamage,
      weaponEffectiveness,
      weaponBalance,
      isWeaponSilver,
      armorClass,
      armorHead,
      armorLeftArm,
      armorRightArm,
      armorChest,
      armorLegs,
      armorFoots,
      armorHands,
      armorPiercingRes,
      armorSlashingRes,
      armorBluntRes,
      shieldParry,
      weight,
      volume,
      durability,
      specialBonus,
      occurrence,
      cost,
      vendorCost,
      description,
      comment,
    } = item;
    const data: ItemResponse = {
      id,
      name,
      short,
      isMagic,
      type,
      slot,
      weaponType,
      weaponHand,
      weaponSlashingDamage,
      weaponPiercingDamage,
      weaponBluntDamage,
      weaponEffectiveness,
      weaponBalance,
      isWeaponSilver,
      armorClass,
      armorHead,
      armorLeftArm,
      armorRightArm,
      armorChest,
      armorLegs,
      armorFoots,
      armorHands,
      armorPiercingRes,
      armorSlashingRes,
      armorBluntRes,
      shieldParry,
      weight,
      volume,
      durability,
      specialBonus,
      occurrence,
      cost,
      vendorCost,
      description,
      comment,
    };
    return res.status(200).json({
      status: Status.success,
      data: {
        item: data,
      },
    });
  } catch (e) {
    throw e;
  }
};
