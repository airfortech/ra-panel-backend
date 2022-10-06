import { Router } from "express";
import { EnemiesController } from "../controllers/EnemiesController";

export const enemiesRouter = Router();

enemiesRouter.get("/enemies/", EnemiesController.getEnemies);
enemiesRouter.post("/enemies/", EnemiesController.saveEnemies);
