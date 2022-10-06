import { Router } from "express";
import { EnemiesController } from "../controllers/EnemiesController";

export const dataRouter = Router();

dataRouter.get("/enemies.txt", EnemiesController.getEnemiesFile);
