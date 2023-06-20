import { Status } from "../../types/responseMessages";
import { Request, Response } from "express";
import { getFilesList } from "../../db/tools/backupDb/getFilesList";

export const getBackups = async (req: Request, res: Response) => {
  try {
    const backups = await getFilesList();
    return res.status(200).json({
      status: Status.success,
      data: { backups },
    });
  } catch (e) {
    throw e;
  }
};
