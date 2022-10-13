import { Request, Response } from "express";
import { join } from "path";

export const getEnemiesFile = async (req: Request, res: Response) => {
  try {
    res.sendFile(join(__dirname, "../../data", "enemies.txt"));
  } catch (e) {
    throw e;
  }
};
