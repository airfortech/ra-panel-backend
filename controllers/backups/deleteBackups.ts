import { Request } from "../../types/Request";
import { Status, messages } from "../../types/responseMessages";
import { Response } from "express";
import { deleteBackups as deleteBackupsFiles } from "../../db/tools/backupDb/deleteBackups";
import { getFilesList } from "../../db/tools/backupDb/getFilesList";
import { getSettings } from "../../db/tools/getSettings";
import { CustomError } from "../../utils/customError";

export const deleteBackups = async (req: Request, res: Response) => {
  try {
    const settings = await getSettings();
    if (!settings)
      throw new CustomError(
        messages[req.lang].settings.settingsNotExists,
        404,
        Status.error
      );
    const backupFilesList = await getFilesList();
    if (!backupFilesList || backupFilesList.length === 0)
      throw new CustomError(
        messages[req.lang].backups.noBackupsToDelete,
        404,
        Status.error
      );
    const deletedBackups = await deleteBackupsFiles(
      backupFilesList,
      settings.backupKeepMonths
    );
    return res.status(200).json({
      status: Status.success,
      message: messages[req.lang].backups.backupsDeleted(deletedBackups.length),
    });
  } catch (e) {
    throw e;
  }
};
