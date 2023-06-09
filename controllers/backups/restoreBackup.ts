import { Request, Response } from "express";

// find file on disk
// if not found info: "Backup not exists"
// if succes, info: "Backup fileName restored"

export const restoreBackup = async (req: Request, res: Response) => {
  try {
    console.log("restoreBackup");
  } catch (e) {
    throw e;
  }
};
