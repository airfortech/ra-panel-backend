import { SettingsResponse } from "../../types/Settings";
import { Settings } from "../models/Settings";

export const getSettings = async (): Promise<SettingsResponse> => {
  try {
    const settings = await Settings.findOne({});
    return settings;
  } catch (e) {
    throw e;
  }
};
