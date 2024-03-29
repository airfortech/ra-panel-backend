import { ItemUpdateRequest } from "../../../types/Item";
import { ItemTypes } from "../../../types/ItemTypes";

export const updateArmor = (data: ItemUpdateRequest, type: ItemTypes) => {
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
    shieldParry: null as null,
  };
};
