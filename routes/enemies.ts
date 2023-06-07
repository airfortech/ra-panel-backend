import { UserRole } from "../types/UserRole";
import { Router } from "express";
import { auth } from "../utils/auth";
import { getEnemies } from "../controllers/enemies/getEnemies";
import { addEnemy } from "../controllers/enemies/addEnemy";
import { deleteEnemy } from "../controllers/enemies/deleteEnemy";
import { updateEnemy } from "../controllers/enemies/updateEnemy";

export const enemiesRouter = Router();

enemiesRouter.get(
  "/",
  auth(
    UserRole.consigliore,
    UserRole.caporegime,
    UserRole.soldato,
    UserRole.mudlet
  ),
  getEnemies
);
enemiesRouter.post(
  "/",
  auth(UserRole.consigliore, UserRole.caporegime),
  addEnemy
);
enemiesRouter.patch(
  "/:id",
  auth(UserRole.soldato, UserRole.consigliore, UserRole.caporegime),
  updateEnemy
);
enemiesRouter.delete(
  "/:id",
  auth(UserRole.consigliore, UserRole.caporegime),
  deleteEnemy
);
