import { promisify } from "util";
import { exec as execCallback } from "child_process";
import { config } from "../../../config/config";

const exec = promisify(execCallback);

export const restoreBackupFromFile = async (file: string) => {
  const uri = config.db.url;
  const backupCommand = `mongorestore --uri="${uri}" --archive="./backups/${file}" --drop`;
  await exec(backupCommand);
};
