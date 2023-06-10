import { Status } from "../../types/responseMessages";
import { Request, Response } from "express";
import { Settings } from "../../db/models/Settings";
import { SettingsResponse } from "../../types/Settings";

export const getSettings = async (req: Request, res: Response) => {
  try {
    let settings = await Settings.findOne({});
    if (!settings) settings = await Settings.create({});
    const { autoDeleteBackup, backupDays, backupKeepMonths } = settings;
    const settingsResponse: SettingsResponse = {
      autoDeleteBackup,
      backupDays,
      backupKeepMonths,
    };
    return res.status(200).json({
      status: Status.success,
      data: { settings: settingsResponse },
    });
  } catch (e) {
    throw e;
  }
};
