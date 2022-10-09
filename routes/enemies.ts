import { UserRole } from "../types/UserRole";
import { Router } from "express";
import {
  addEnemy,
  deleteEnemy,
  getEnemies,
} from "../controllers/enemiesController";
import { auth } from "../utils/auth";

export const enemiesRouter = Router();

enemiesRouter.get(
  "/",
  auth(UserRole.consigliore, UserRole.caporegime, UserRole.soldato),
  getEnemies
);
// enemiesRouter.post(
//   "/",
//   auth(UserRole.consigliore, UserRole.caporegime),
//   saveEnemies
// );
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
