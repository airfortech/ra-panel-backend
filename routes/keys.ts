import { UserRole } from "../types/UserRole";
import { Router } from "express";
import { auth } from "../utils/auth";
import { addKey } from "../controllers/keys/addKey";
import { getKeys } from "../controllers/keys/getKeys";
import { deleteKey } from "../controllers/keys/deleteKey";
import { updateKey } from "../controllers/keys/updateKey";
import { addKeyTimestamp } from "../controllers/keys/addKeyTimestamp";
import { getKeyDetails } from "../controllers/keys/getKeyDetails";

export const keysRouter = Router();

keysRouter.get(
  "/",
  auth(UserRole.consigliore, UserRole.caporegime, UserRole.soldato),
  getKeys
);
keysRouter.get(
  "/:id",
  auth(UserRole.consigliore, UserRole.caporegime, UserRole.soldato),
  getKeyDetails
);
keysRouter.post("/", auth(UserRole.consigliore, UserRole.caporegime), addKey);
keysRouter.delete("/:id", auth(UserRole.consigliore), deleteKey);
keysRouter.patch(
  "/:id",
  auth(UserRole.consigliore, UserRole.caporegime),
  updateKey
);
keysRouter.patch(
  "/addtimestamp/:id",
  auth(UserRole.consigliore, UserRole.caporegime),
  addKeyTimestamp
);
