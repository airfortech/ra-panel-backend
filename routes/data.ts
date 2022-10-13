import { Router } from "express";
import { getEnemiesFile } from "../controllers/enemies/getEnemiesFile";

export const dataRouter = Router();

dataRouter.get("/enemies.txt", getEnemiesFile);
