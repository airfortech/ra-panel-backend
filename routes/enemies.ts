import { Router } from "express";
import { getEnemies, saveEnemies } from "../controllers/EnemiesController";

export const enemiesRouter = Router();

enemiesRouter.get("/enemies/", getEnemies);
enemiesRouter.post("/enemies/", saveEnemies);
