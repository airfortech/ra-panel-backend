import { UserRole } from "../types/UserRole";
import { Router } from "express";
import { getEnemies, saveEnemies } from "../controllers/enemiesController";
import { auth } from "../utils/auth";

export const enemiesRouter = Router();

enemiesRouter.get(
  "/enemies/",
  auth(UserRole.consigliore, UserRole.caporegime, UserRole.soldato),
  getEnemies
);
enemiesRouter.post(
  "/enemies/",
  auth(UserRole.consigliore, UserRole.caporegime),
  saveEnemies
);
