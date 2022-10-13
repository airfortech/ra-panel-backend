import { UserRole } from "../types/UserRole";
import { Router } from "express";
import { auth } from "../utils/auth";
import { getKeyGivers } from "../controllers/keyGivers/getKeyGivers";
import { getKeyGiverDetails } from "../controllers/keyGivers/getKeyGiverDetails";
import { addKeyGiver } from "../controllers/keyGivers/addKeyGiver";
import { deleteKeyGiver } from "../controllers/keyGivers/deleteKeyGiver";
import { updateKeyGiver } from "../controllers/keyGivers/updateKeyGiver";
import { addKeyGiverTimestamp } from "../controllers/keyGivers/addKeyGiverTimestamp";

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
