import { promisify } from "util";
import { exec as execCallback } from "child_process";
const { mkdir } = require("fs").promises;
import dayjs from "dayjs";
import { config } from "../../../config/config";

const exec = promisify(execCallback);

export const backupToFile = async () => {
  const uri = config.db.url;
  const time = dayjs().format("YYYY-MM-DD HH:mm:ss");
  await mkdir("./backups", { recursive: true });
  const fileName = time + ".db";
  const backupCommand = `mongodump --uri=${uri} --archive="./backups/${fileName}"`;
  await exec(backupCommand);
  return fileName;
};
