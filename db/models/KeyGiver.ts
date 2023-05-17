import { KeyGiver as IKeyGiver } from "../../types/KeyGiver";
import { messages } from "../../types/responseMessages";
import { Schema, model, Document } from "mongoose";
import { config } from "../../config/config";

export interface IKeyGiverSchema extends Document, IKeyGiver {
  comparePassword: (password: string) => Promise<boolean>;
  changePassword: (password: string) => Promise<void>;
}

const keyGiverSchema = new Schema<IKeyGiver>({
  name: {
    type: String,
    required: [true, messages[config.lang].keyGivers.nameIsRequired],
    maxLength: [80, messages[config.lang].keyGivers.nameTooLong],
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
  respawns: {
    type: [{ date: Number, keyName: String }],
    default: [],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export const KeyGiver = model<IKeyGiverSchema>("KeyGiver", keyGiverSchema);
