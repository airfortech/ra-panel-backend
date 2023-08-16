import { UserRole } from "../types/UserRole";
import { Router } from "express";
import { auth } from "../utils/auth";
import { addKey } from "../controllers/keys/addKey";
import { getKeys } from "../controllers/keys/getKeys";
import { deleteKey } from "../controllers/keys/deleteKey";
import { updateKey } from "../controllers/keys/updateKey";
import { getKey } from "../controllers/keys/getKey";
import { getKeyDrops } from "../controllers/keys/getKeyDrops";

export const keysRouter = Router();

keysRouter.get(
  "/",
  auth(
    UserRole.consigliore,
    UserRole.caporegime,
    UserRole.soldato,
    UserRole.mudlet
  ),
  getKeys
);
keysRouter.get(
  "/:id",
  auth(
    UserRole.consigliore,
    UserRole.caporegime,
    UserRole.soldato,
    UserRole.mudlet
  ),
  getKey
);
keysRouter.get(
  "/:id/drops",
  auth(
    UserRole.consigliore,
    UserRole.caporegime,
    UserRole.soldato,
    UserRole.mudlet
  ),
  getKeyDrops
);
keysRouter.post("/", auth(UserRole.consigliore, UserRole.caporegime), addKey);
keysRouter.patch(
  "/:id",
  auth(UserRole.consigliore, UserRole.caporegime),
  updateKey
);
keysRouter.delete("/:id", auth(UserRole.consigliore), deleteKey);
