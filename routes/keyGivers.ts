import { UserRole } from "../types/UserRole";
import { Router } from "express";
import {
  addKeyGiver,
  addKeyGiverTimestamp,
  deleteKeyGiver,
  getKeyGivers,
} from "../controllers/keyGiversController";
import { auth } from "../utils/auth";

export const keyGiversRouter = Router();

keyGiversRouter.get(
  "/",
  auth(UserRole.consigliore, UserRole.caporegime, UserRole.soldato),
  getKeyGivers
);
keyGiversRouter.post(
  "/",
  auth(UserRole.consigliore, UserRole.caporegime),
  addKeyGiver
);
keyGiversRouter.delete(
  "/:id",
  auth(UserRole.consigliore, UserRole.caporegime),
  deleteKeyGiver
);
keyGiversRouter.patch(
  "/:id",
  auth(UserRole.consigliore, UserRole.caporegime),
  addKeyGiverTimestamp
);
