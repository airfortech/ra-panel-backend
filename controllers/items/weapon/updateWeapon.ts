import { ItemUpdateRequest } from "../../../types/Item";
import { ItemTypes } from "../../../types/ItemTypes";

export const updateWeapon = (data: ItemUpdateRequest, type: ItemTypes) => {
  return {
    ...data,
    type,
    armorClass: null as null,
    armorHead: null as null,
    armorLeftArm: null as null,
    armorRightArm: null as null,
    armorChest: null as null,
    armorLegs: null as null,
    armorFoots: null as null,
    armorHands: null as null,
    armorPiercingRes: null as null,
    armorSlashingRes: null as null,
    armorBluntRes: null as null,
    shieldParry: null as null,
  };
};
