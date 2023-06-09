import { Request, Response } from "express";

// create backup
// back info: "backup created"

export const createBackup = async (req: Request, res: Response) => {
  try {
    console.log("createBackup");
  } catch (e) {
    throw e;
  }
};
