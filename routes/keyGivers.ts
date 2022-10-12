import { UserRole } from "../types/UserRole";
import { Router } from "express";
import {
  addKeyGiver,
  addKeyGiverTimestamp,
  deleteKeyGiver,
  getKeyGiverDetails,
  getKeyGivers,
  updateKeyGiver,
} from "../controllers/keyGiversController";
import { auth } from "../utils/auth";

export const keyGiversRouter = Router();

keyGiversRouter.get(
  "/",
  auth(UserRole.consigliore, UserRole.caporegime, UserRole.soldato),
  getKeyGivers
);
keyGiversRouter.get(
  "/:id",
  auth(UserRole.consigliore, UserRole.caporegime, UserRole.soldato),
  getKeyGiverDetails
);
keyGiversRouter.post(
  "/",
  auth(UserRole.consigliore, UserRole.caporegime),
  addKeyGiver
);
keyGiversRouter.delete("/:id", auth(UserRole.consigliore), deleteKeyGiver);
keyGiversRouter.patch(
  "/:id",
  auth(UserRole.consigliore, UserRole.caporegime),
  updateKeyGiver
);
keyGiversRouter.patch(
  "/addtimestamp/:id",
  auth(UserRole.consigliore, UserRole.caporegime),
  addKeyGiverTimestamp
);
