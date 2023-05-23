import { Domain } from "../../types/Domain";
import { messages } from "../../types/responseMessages";
import { Location as ILocation } from "../../types/Location";
import { Schema, model, Document } from "mongoose";
import { config } from "../../config/config";

export interface ILocationSchema extends Document, ILocation {}

const locationSchema = new Schema<ILocation>({
  locationId: {
    type: Number,
    required: [true, messages[config.lang].location.locationIdIsRequired],
    integer: [true, messages[config.lang].location.locationNotANumber],
    min: [0, messages[config.lang].location.locationNumberNotInRange],
    max: [99999, messages[config.lang].location.locationNumberNotInRange],
    cast: messages[config.lang].location.locationNotANumber,
  },
  name: {
    type: String,
    maxLength: [30, messages[config.lang].location.nameTooLong],
  },
  domain: {
    type: String,
    enum: {
      values: [...Object.values(Domain)],
      message: messages[config.lang].location.wrongDomain,
    },
    default: Domain.unknown,
  },
  description: {
    type: String,
    maxLength: [4000, messages[config.lang].location.descriptionTooLong],
    default: "",
  },
  comment: {
    type: String,
    maxLength: [4000, messages[config.lang].location.commentTooLong],
    default: "",
  },
  binds: {
    type: [String],
    validate: {
      validator: (binds: string[]) => {
        for (const bind of binds) {
          if (bind.length > 100) {
            return false;
          }
        }
        return true;
      },
      message: messages[config.lang].location.bindsTooLong,
    },
    default: [],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export const Location = model<ILocationSchema>("Location", locationSchema);
