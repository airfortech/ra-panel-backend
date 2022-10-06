import { Router } from "express";
import { getEnemiesFile } from "../controllers/enemiesController";

export const dataRouter = Router();

dataRouter.get("/enemies.txt", getEnemiesFile);
