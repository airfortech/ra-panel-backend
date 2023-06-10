import { Response } from "express";
import { Request } from "../../types/Request";
import { Settings } from "../../db/models/Settings";
import { SettingsRequest } from "../../types/Settings";
import { Status, messages } from "../../types/responseMessages";
import { createShedule } from "../../db/tools/backupDb/createShedule";
import { daysOfWeekValidator } from "../../db/validators/daysOfWeekValidator";

export const changeBackupSettings = async (req: Request, res: Response) => {
  try {
    const data = req.body as SettingsRequest;
    const daysOfWeek = data.backupDays
      ? daysOfWeekValidator(data.backupDays)
      : undefined;
    const settings = await Settings.findOne({});
    if (!settings) await Settings.create({ ...data, backupDays: daysOfWeek });
    else
      await Settings.findOneAndUpdate(
        {},
        { ...data, backupDays: daysOfWeek || data.backupDays },
        { runValidators: true }
      );
    const newSettings = await Settings.findOne({});
    const { autoDeleteBackup, backupDays, backupKeepMonths } = newSettings;
    await createShedule(backupDays, autoDeleteBackup, backupKeepMonths);
    return res.status(200).json({
      status: Status.success,
      message: messages[req.lang].settings.settingsChanged,
    });
  } catch (e) {
    throw e;
  }
};
