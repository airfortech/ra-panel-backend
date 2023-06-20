import { Response } from "express";
import { Request } from "../../types/Request";
import { restoreBackupFromFile } from "../../db/tools/backupDb/restoreBackupFromFile";
import { getFilesList } from "../../db/tools/backupDb/getFilesList";
import { Status, messages } from "../../types/responseMessages";
import { CustomError } from "../../utils/customError";

export const restoreBackup = async (req: Request, res: Response) => {
  try {
    const fileName = req.params.fileName;
    const isBackupFileExists = (await getFilesList()).includes(fileName);
    if (!isBackupFileExists)
      throw new CustomError(
        messages[req.lang].backups.fileNotExists(fileName),
        404,
        Status.error
      );
    await restoreBackupFromFile(fileName);
    return res.status(200).json({
      status: Status.success,
      message: messages[req.lang].backups.backupRestored(fileName),
    });
  } catch (e) {
    throw e;
  }
};
