import { Settings as ISettings } from "../../types/Settings";
import { messages } from "../../types/responseMessages";
import { Schema, model, Document } from "mongoose";
import { config } from "../../config/config";

export interface ISettingsSchema extends Document, ISettings {}

const settingsSchema = new Schema<ISettings>({
  autoDeleteBackup: {
    type: Boolean,
    default: true,
  },
  backupKeepMonths: {
    type: Number,
    min: [2, messages[config.lang].settings.backupKeepMonthsTooLowNumber],
    integer: [true, messages[config.lang].settings.backupKeepMonthsNotANumber],
    cast: messages[config.lang].settings.backupKeepMonthsNotANumber,
    default: 35,
  },
  backupDays: {
    type: [Number],
    default: [0, 10, 20, 30, 40, 50],
  },
});

export const Settings = model<ISettingsSchema>("Settings", settingsSchema);
