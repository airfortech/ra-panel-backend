import { Request, Response } from "express";

// find entity
// if not found create one"
// if fount paste only backup settings and update
// restart schedule
// back info, settings changed

export const changeBackupSettings = async (req: Request, res: Response) => {
  try {
    console.log("changeBackupSettings");
  } catch (e) {
    throw e;
  }
};
