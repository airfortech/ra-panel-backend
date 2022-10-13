import { UserRole } from "../types/UserRole";
import { Router } from "express";
import { auth } from "../utils/auth";
import { getEnemies } from "../controllers/enemies/getEnemies";
import { addEnemy } from "../controllers/enemies/addEnemy";
import { deleteEnemy } from "../controllers/enemies/deleteEnemy";

export const enemiesRouter = Router();

enemiesRouter.get(
  "/",
  auth(UserRole.consigliore, UserRole.caporegime, UserRole.soldato),
  getEnemies
);
enemiesRouter.post(
  "/",
  auth(UserRole.consigliore, UserRole.caporegime),
  addEnemy
);
enemiesRouter.delete(
  "/:id",
  auth(UserRole.consigliore, UserRole.caporegime),
  deleteEnemy
);
