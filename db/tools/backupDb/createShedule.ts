import { schedule } from "node-cron";
import { backupToFile } from "./backupToFile";
import { deleteBackups } from "./deleteBackups";
import { getFilesList } from "./getFilesList";
import { shedules } from "../../../app";

export const createShedule = async (days: number[]) => {
  if (days.length === 0) return;
  const sheduledDays = days.join(",");
  // TODO: change it to days of week
  if (shedules.backupSchedule) shedules.backupSchedule.stop();
  shedules.backupSchedule = schedule(`${sheduledDays} * * * *`, async () => {
    const list = await getFilesList();
    await deleteBackups(list, 30);
    await backupToFile();
  });
};
