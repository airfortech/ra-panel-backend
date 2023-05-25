import { Domain } from "../../types/Domain";
import { KeyGiver as IKeyGiver } from "../../types/KeyGiver";
import { messages } from "../../types/responseMessages";
import mongoose, { Schema, model, Document, Types } from "mongoose";
import { config } from "../../config/config";

export interface IKeyGiverSchema extends Document, IKeyGiver {}

const keyGiverSchema = new Schema<IKeyGiver>({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: [true, messages[config.lang].keyGivers.nameIsRequired],
    maxLength: [30, messages[config.lang].keyGivers.nameTooLong],
    // INFO: validating for duplicate value, when try findOneAndUpdate() you have to pass undefined value for each validating key if is say as found one
    validate: {
      validator: async (name: string) => {
        const existingKeyGiver = await mongoose
          .model("KeyGiver")
          .findOne({ name });
        return !existingKeyGiver;
      },
      message: ({ value }) =>
        messages[config.lang].keyGivers.keyGiverExists(value),
    },
  },
  short: {
    type: String,
    unique: true,
    trim: true,
    required: [true, messages[config.lang].keyGivers.nameIsRequired],
    maxLength: [50, messages[config.lang].keyGivers.shortTooLong],
    validate: {
      validator: async (short: string) => {
        const existingKeyGiver = await mongoose
          .model("KeyGiver")
          .findOne({ short });
        return !existingKeyGiver;
      },
      message: ({ value }) =>
        messages[config.lang].keyGivers.keyGiverExists(value),
    },
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
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Location",
      },
    ],
    validate: {
      // INFO: validate if ids exists in db
      validator: async (value: Types.ObjectId[]) => {
        if (value.length === 0) return true;
        const existingLocations = await mongoose
          .model("Location")
          .countDocuments({
            _id: { $in: value },
          });

        return existingLocations === value.length;
      },
      message: messages[config.lang].keyGivers.locationNotExist,
    },
    default: [],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export const KeyGiver = model<IKeyGiverSchema>("KeyGiver", keyGiverSchema);
