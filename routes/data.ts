import { Router } from "express";
import { getEnemiesFile } from "../controllers/EnemiesController";

export const dataRouter = Router();

dataRouter.get("/enemies.txt", getEnemiesFile);
