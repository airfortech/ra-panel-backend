import { Response } from "express";
import { Request } from "../../types/Request";
import { backupToFile } from "../../db/tools/backupDb/backupToFile";
import { Status, messages } from "../../types/responseMessages";

export const createBackup = async (req: Request, res: Response) => {
  try {
    const fileName = await backupToFile();
    return res.status(200).json({
      status: Status.success,
      message: messages[req.lang].backups.saved(fileName),
    });
  } catch (e) {
    throw e;
  }
};
