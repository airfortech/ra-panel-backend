import { Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { ItemResponse } from "../../types/Item";
import { ItemTypes } from "../../types/ItemTypes";
import { ItemWeapon } from "../../types/ItemWeapon";
import { ItemArmorClass } from "../../types/ItemArmorClass";
import { Response } from "express";
import { Item } from "../../db/models/Item";

export const getItems = async (req: Request, res: Response) => {
  try {
    const isMagic =
      typeof req.query.isMagic === "string"
        ? JSON.parse(req.query.isMagic)
        : undefined;
    const isWeaponSilver =
      typeof req.query.isWeaponSilver === "string"
        ? JSON.parse(req.query.isWeaponSilver)
        : undefined;
    const type = ItemTypes[req.query.type as keyof typeof ItemTypes];
    const weaponType =
      ItemWeapon[req.query.weaponType as keyof typeof ItemWeapon];
    const armorClass =
      ItemArmorClass[req.query.armorClass as keyof typeof ItemArmorClass];

    const items = await Item.find({
      ...(isMagic !== undefined && { isMagic }),
      ...(isWeaponSilver !== undefined && { isWeaponSilver }),
      type,
      ...(weaponType !== undefined && { weaponType }),
      ...(armorClass !== undefined && { armorClass }),
    });
    return res.status(200).json({
      status: Status.success,
      data: {
        items: items
          .map(
            ({
              id,
              name,
              short,
              isMagic,
              type,
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
            }) => {
              const data: ItemResponse = {
                id,
                name,
                short,
                isMagic,
                type,
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
              return data;
            }
          )
          .sort((a, b) => a.short.localeCompare(b.short)),
      },
    });
  } catch (e) {
    throw e;
  }
};
