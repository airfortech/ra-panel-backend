import { schedule } from "node-cron";
import { backupToFile } from "./backupToFile";
import { deleteBackups } from "./deleteBackups";
import { getFilesList } from "./getFilesList";
import { shedules } from "../../../app";

export const createShedule = async (
  days: number[],
  autoDeleteBackup: boolean,
  backupKeepMonths: number
) => {
  if (days.length === 0) return;
  const sheduledDays = days.join(",");
  // TODO: change it to days of week
  if (shedules.backupSchedule) shedules.backupSchedule.stop();
  shedules.backupSchedule = schedule(`${sheduledDays} * * * *`, async () => {
    if (autoDeleteBackup) {
      const list = await getFilesList();
      await deleteBackups(list, backupKeepMonths);
    }
    await backupToFile();
  });
};
