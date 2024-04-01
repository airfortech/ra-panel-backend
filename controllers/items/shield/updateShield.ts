import { ItemUpdateRequest } from "../../../types/Item";
import { ItemTypes } from "../../../types/ItemTypes";

export const updateShield = (data: ItemUpdateRequest, type: ItemTypes) => {
  return {
    ...data,
    type,
    weaponType: null as null,
    weaponHand: null as null,
    weaponSlashingDamage: null as null,
    weaponPiercingDamage: null as null,
    weaponBluntDamage: null as null,
    weaponEffectiveness: null as null,
    weaponBalance: null as null,
    isWeaponSilver: null as null,
    armorClass: null as null,
    armorHead: null as null,
    armorLeftArm: null as null,
    armorRightArm: null as null,
    armorChest: null as null,
    armorLegs: null as null,
    armorFoots: null as null,
    armorHands: null as null,
  };
};
