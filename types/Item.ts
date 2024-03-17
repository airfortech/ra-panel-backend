import { ItemArmorClass } from "./ItemArmorClass";
import { ItemDurability } from "./ItemDurability";
import { ItemTypes } from "./ItemTypes";
import { ItemWeapon } from "./ItemWeapon";
import { ItemWeaponHand } from "./ItemWeaponHand";

export interface Item {
  name: string;
  short: string;
  isMagic: boolean;
  type: ItemTypes;
  weaponType: ItemWeapon;
  weaponHand: ItemWeaponHand;
  weaponSlashingDamage: boolean;
  weaponPiercingDamage: boolean;
  weaponBluntDamage: boolean;
  weaponEffectiveness: number;
  weaponBalance: number;
  isWeaponSilver: boolean;
  armorClass: ItemArmorClass;
  armorHead: boolean;
  armorLeftArm: boolean;
  armorRightArm: boolean;
  armorChest: boolean;
  armorLegs: boolean;
  armorPiercingRes: number;
  armorSlashingRes: number;
  armorBluntRes: number;
  shieldParry: number;
  weight: number;
  volume: number;
  durability: ItemDurability;
  specialBonus: string;
  occurrence: string;
  cost: number;
  vendorCost: number;
  description: string;
  comment: string;
}

export interface ItemResponse extends Omit<Item, "isActive"> {
  id: string;
}

export interface ShortItemResponse
  extends Omit<
    ItemResponse,
    "description" | "treasury" | "domain" | "comment"
  > {}

export interface ItemAddRequest
  extends Omit<Item, "isActive" | "treasury" | "description" | "comment"> {
  treasury: string | null;
  description?: string;
  comment?: string;
}

export interface ItemUpdateRequest
  extends Omit<ItemAddRequest, "name" | "domain" | "treasury"> {
  name?: string;
  treasury?: string | null;
}
