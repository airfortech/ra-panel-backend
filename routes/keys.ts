import { UserRole } from "../types/UserRole";
import { Router } from "express";
import { auth } from "../utils/auth";
import { addKey } from "../controllers/keys/addKey";
import { getKeys } from "../controllers/keys/getKeys";
import { deleteKey } from "../controllers/keys/deleteKey";

export const keysRouter = Router();

keysRouter.get(
  "/",
  auth(UserRole.consigliore, UserRole.caporegime, UserRole.soldato),
  getKeys
);
// keysRouter.get(
//   "/:id",
//   auth(UserRole.consigliore, UserRole.caporegime, UserRole.soldato),
//   getKeyGiverDetails
// );
keysRouter.post("/", auth(UserRole.consigliore, UserRole.caporegime), addKey);
keysRouter.delete("/:id", auth(UserRole.consigliore), deleteKey);
// keysRouter.patch(
//   "/:id",
//   auth(UserRole.consigliore, UserRole.caporegime),
//   updateKeyGiver
// );
// keysRouter.patch(
//   "/addtimestamp/:id",
//   auth(UserRole.consigliore, UserRole.caporegime),
//   addKeyGiverTimestamp
// );
