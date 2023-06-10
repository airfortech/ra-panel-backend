import { BackupResponse } from "../../../types/Backup";

const { readdir } = require("fs").promises;

export const getFilesList = async (): Promise<BackupResponse> =>
  await readdir("./backups");
