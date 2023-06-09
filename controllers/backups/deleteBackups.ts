import { Request, Response } from "express";

// delete backups odler than x months
// back info: "backups deleted"

export const deleteBackups = async (req: Request, res: Response) => {
  try {
    console.log("deleteBackups");
  } catch (e) {
    throw e;
  }
};
