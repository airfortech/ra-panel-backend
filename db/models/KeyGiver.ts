import { KeyGiver as IKeyGiver } from "../../types/KeyGiver";
import { messages } from "../../types/responseMessages";
import { Schema, model, Document } from "mongoose";
import { config } from "../../config/config";
import { Domain } from "../../types/Domain";

export interface IKeyGiverSchema extends Document, IKeyGiver {}

const keyGiverSchema = new Schema<IKeyGiver>({
  name: {
    type: String,
    unique: true,
    required: [true, messages[config.lang].keyGivers.nameIsRequired],
    maxLength: [30, messages[config.lang].keyGivers.nameTooLong],
  },
  short: {
    type: String,
    unique: true,
    required: [true, messages[config.lang].keyGivers.nameIsRequired],
    maxLength: [50, messages[config.lang].keyGivers.shortTooLong],
  },
  description: {
    type: String,
    maxLength: [4000, messages[config.lang].keyGivers.descriptionTooLong],
    default: "",
  },
  respawnTime: {
    type: Number,
    default: 0,
    integer: [true, messages[config.lang].keyGivers.respawnTimeNotANumber],
    min: [0, messages[config.lang].keyGivers.respawnTimeNotANumber],
    cast: messages[config.lang].keyGivers.respawnTimeNotANumber,
  },
  domain: {
    type: String,
    enum: {
      values: [...Object.values(Domain)],
      message: messages[config.lang].keyGivers.wrongDomain,
    },
    default: Domain.unknown,
  },
  playersToComplete: {
    type: Number,
    default: null,
    integer: [
      true,
      messages[config.lang].keyGivers.playersToCompleteNotInRange,
    ],
    min: [0, messages[config.lang].keyGivers.playersToCompleteNotInRange],
    max: [20, messages[config.lang].keyGivers.playersToCompleteNotInRange],
    cast: messages[config.lang].keyGivers.playersToCompleteNotInRange,
  },
  comment: {
    type: String,
    maxLength: [4000, messages[config.lang].keyGivers.commentTooLong],
    default: "",
  },
  locations: {
    type: [String],
    default: [],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export const KeyGiver = model<IKeyGiverSchema>("KeyGiver", keyGiverSchema);
