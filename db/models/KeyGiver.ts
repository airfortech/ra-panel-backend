import { KeyGiver as IKeyGiver } from "../../types/KeyGiver";
import { messages, Status } from "../../types/responseMessages";
import { Schema, model, Document } from "mongoose";

export interface IKeyGiverSchema extends Document, IKeyGiver {
  comparePassword: (password: string) => Promise<boolean>;
  changePassword: (password: string) => Promise<void>;
}

const keyGiverSchema = new Schema<IKeyGiver>({
  name: {
    type: String,
    required: [true, messages.keyGivers.nameIsRequired],
    maxlength: [80, messages.keyGivers.nameTooLong],
  },
  description: {
    type: String,
    maxlength: [4000, messages.keyGivers.descriptionTooLong],
    default: "",
  },
  respawnTime: {
    type: Number,
    default: 0,
    integer: [true, messages.keyGivers.respawnTimeNotANumber],
    min: [0, messages.keyGivers.respawnTimeNotANumber],
    cast: messages.keyGivers.respawnTimeNotANumber,
  },
  respawns: {
    type: [{ date: String, wasEmpty: Boolean }],
    default: [],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export const KeyGiver = model<IKeyGiverSchema>("KeyGiver", keyGiverSchema);
