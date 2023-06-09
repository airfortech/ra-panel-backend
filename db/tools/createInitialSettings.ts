import { mkdir } from "fs/promises";
import { createShedule } from "./backupDb/createShedule";
import { getSettings } from "./getSettings";

export const createInitialSettings = async (): Promise<void> => {
  try {
    await mkdir("./backups", { recursive: true });
    const settings = await getSettings();
    if (!settings) return;
    const { autoDeleteBackup, backupDays, backupKeepMonths } = settings;
    await createShedule(backupDays, autoDeleteBackup, backupKeepMonths);
  } catch (e) {
    throw e;
  }
};
