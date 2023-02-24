import { Key as IKey } from "../../types/Key";
import { messages } from "../../types/responseMessages";
import { Schema, model, Document } from "mongoose";
import { domainValidate } from "../validators/keyValidators";
import { config } from "../../config/config";

export interface IKeySchema extends Document, IKey {}

const keySchema = new Schema<IKey>({
  name: {
    type: String,
    maxLength: [80, messages[config.lang].keys.nameTooLong],
    required: [true, messages[config.lang].keys.nameIsRequired],
  },
  treasuryName: {
    type: String,
    maxLength: [80, messages[config.lang].keys.treasuryNameTooLong],
    default: "",
  },
  domain: { type: String, default: null },
  foundTimestamps: {
    type: [{ date: String, npcName: String }],
    default: [],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

keySchema.pre("save", function (this: IKeySchema, next) {
  this.domain = domainValidate(this.domain);
  return next();
});

export const Key = model<IKeySchema>("Key", keySchema);
