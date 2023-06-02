import { KeyGiverDrop as IKeyGiverDrop } from "../../types/KeyGiverDrop";
import { messages } from "../../types/responseMessages";
import mongoose, { Schema, model, Document, Types } from "mongoose";
import dayjs from "dayjs";
import { config } from "../../config/config";

export interface IKeyGiverDropSchema extends Document, IKeyGiverDrop {}

const keyGiverDropSchema = new Schema<IKeyGiverDrop>({
  keyGiver: {
    type: Schema.Types.ObjectId,
    ref: "KeyGiver",
    required: [
      true,
      messages[config.lang].keyGiverDrops.keyGiverDropIsRequired,
    ],
    validate: {
      validator: async (value: Types.ObjectId) => {
        const existingKeyGivers = await mongoose
          .model("KeyGiver")
          .countDocuments({
            _id: { $in: value },
          });

        return existingKeyGivers > 0;
      },
      message: messages[config.lang].keyGiverDrops.keyGiverNotExists,
    },
  },
  drop: {
    // TODO: add validation for existing Key id
    type: Schema.Types.ObjectId,
    ref: "Key",
    default: null,
    validate: {
      validator: async (value: Types.ObjectId) => {
        if (value === null) return true;
        const existingKeys = await mongoose.model("Key").countDocuments({
          _id: { $in: value },
        });

        return existingKeys > 0;
      },
      message: messages[config.lang].keyGiverDrops.keyNotExists,
    },
  },
  dropDate: {
    type: Number,
    default: dayjs().unix(),
  },
  nextRespawnDate: {
    type: Number,
    default: null,
  },
  createdAt: {
    type: Number,
    default: dayjs().unix(),
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export const KeyGiverDrop = model<IKeyGiverDropSchema>(
  "KeyGiverDrop",
  keyGiverDropSchema
);
