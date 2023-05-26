import { Domain } from "../../types/Domain";
import { Key as IKey } from "../../types/Key";
import { messages } from "../../types/responseMessages";
import { Schema, model, Document } from "mongoose";
import { config } from "../../config/config";

export interface IKeySchema extends Document, IKey {}

const keySchema = new Schema<IKey>({
  name: {
    type: String,
    trim: true,
    maxLength: [50, messages[config.lang].keys.nameTooLong],
    required: [true, messages[config.lang].keys.nameIsRequired],
  },
  treasury: {
    // TODO: add validation for existing Treasury id when Treasury is ready
    type: Schema.Types.ObjectId,
    ref: "Treasury",
    default: null,
  },
  description: {
    type: String,
    trim: true,
    maxLength: [4000, messages[config.lang].keys.descriptionTooLong],
    default: "",
  },
  domain: {
    type: String,
    enum: {
      values: [...Object.values(Domain)],
      message: messages[config.lang].keys.wrongDomain,
    },
    default: Domain.unknown,
  },
  comment: {
    type: String,
    trim: true,
    maxLength: [4000, messages[config.lang].keys.commentTooLong],
    default: "",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export const Key = model<IKeySchema>("Key", keySchema);
