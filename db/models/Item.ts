import { Item as IItem } from "../../types/Item";
import { ItemTypes } from "../../types/ItemTypes";
import { ItemWeaponHand } from "../../types/ItemWeaponHand";
import { ItemWeapon } from "../../types/ItemWeapon";
import { ItemArmorClass } from "../../types/ItemArmorClass";
import { ItemDurability } from "../../types/ItemDurability";
import { messages } from "../../types/responseMessages";
import mongoose, { Schema, model, Document } from "mongoose";
import { config } from "../../config/config";

export interface IItemSchema extends Document, IItem {}

const itemSchema = new Schema<IItem>(
  {
    name: {
      type: String,
      trim: true,
      maxLength: [50, messages[config.lang].items.nameTooLong],
      default: "",
    },
    short: {
      type: String,
      trim: true,
      lowercase: true,
      maxLength: [50, messages[config.lang].items.shortTooLong],
      required: [true, messages[config.lang].items.shortIsRequired],
      unique: true,
      validate: {
        validator: async (short: string) => {
          const existingKeyGiver = await mongoose
            .model("Item")
            .findOne({ short });
          return !existingKeyGiver;
        },
        message: ({ value }) =>
          messages[config.lang].items.itemShortExists(value),
      },
    },
    isMagic: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: {
        values: [...Object.values(ItemTypes)],
        message: messages[config.lang].items.invalidType,
      },
      required: [true, messages[config.lang].items.typeIsRequired],
    },
    weaponType: {
      type: String,
      enum: {
        values: [...Object.values(ItemWeapon), null],
        message: messages[config.lang].items.invalidWeaponType,
      },
      default: null,
    },
    weaponHand: {
      type: String,
      enum: {
        values: [...Object.values(ItemWeaponHand), null],
        message: messages[config.lang].items.invalidWeaponHand,
      },
      default: null,
    },
    weaponSlashingDamage: {
      type: Boolean,
      default: null,
    },
    weaponPiercingDamage: {
      type: Boolean,
      default: null,
    },
    weaponBluntDamage: {
      type: Boolean,
      default: null,
    },
    weaponEffectiveness: {
      type: Number,
      min: [1, messages[config.lang].items.weaponEffectivenessTooLow],
      max: [14, messages[config.lang].items.weaponEffectivenessTooHigh],
      default: null,
    },
    weaponBalance: {
      type: Number,
      min: [1, messages[config.lang].items.weaponBalanceTooLow],
      max: [14, messages[config.lang].items.weaponBalanceTooHigh],
      default: null,
    },
    isWeaponSilver: {
      type: Boolean,
      default: null,
    },
    armorClass: {
      type: String,
      enum: {
        values: [...Object.values(ItemArmorClass), null],
        message: messages[config.lang].items.invalidArmorClass,
      },
      default: null,
    },
    armorHead: {
      type: Boolean,
      default: null,
    },
    armorLeftArm: {
      type: Boolean,
      default: null,
    },
    armorRightArm: {
      type: Boolean,
      default: null,
    },
    armorChest: {
      type: Boolean,
      default: null,
    },
    armorLegs: {
      type: Boolean,
      default: null,
    },
    armorFoots: {
      type: Boolean,
      default: null,
    },
    armorHands: {
      type: Boolean,
      default: null,
    },
    armorPiercingRes: {
      type: Number,
      min: [1, messages[config.lang].items.armorResTooLow],
      max: [12, messages[config.lang].items.armorResTooHigh],
      default: null,
    },
    armorSlashingRes: {
      type: Number,
      min: [1, messages[config.lang].items.armorResTooLow],
      max: [12, messages[config.lang].items.armorResTooHigh],
      default: null,
    },
    armorBluntRes: {
      type: Number,
      min: [1, messages[config.lang].items.armorResTooLow],
      max: [12, messages[config.lang].items.armorResTooHigh],
      default: null,
    },
    shieldParry: {
      type: Number,
      min: [1, messages[config.lang].items.shieldParryTooLow],
      max: [14, messages[config.lang].items.shieldParryTooHigh],
      default: null,
    },
    weight: {
      type: Number,
      default: null,
    },
    volume: {
      type: Number,
      default: null,
    },
    durability: {
      type: String,
      enum: {
        values: [...Object.values(ItemDurability), null],
        message: messages[config.lang].items.invalidDurability,
      },
      default: null,
    },
    specialBonus: {
      type: String,
      trim: true,
      maxLength: [400, messages[config.lang].items.specialBonusTooLong],
      default: null,
    },
    occurrence: {
      type: String,
      trim: true,
      maxLength: [200, messages[config.lang].items.occurrenceTooLong],
      default: null,
    },
    cost: {
      type: Number,
      default: null,
    },
    vendorCost: {
      type: Number,
      default: null,
    },
    description: {
      type: String,
      trim: true,
      maxLength: [4000, messages[config.lang].items.descriptionTooLong],
      default: "",
    },
    comment: {
      type: String,
      trim: true,
      maxLength: [4000, messages[config.lang].items.descriptionTooLong],
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const Item = model<IItemSchema>("Item", itemSchema);
