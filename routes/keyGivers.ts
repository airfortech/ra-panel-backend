import { UserRole } from "../types/UserRole";
import { Router } from "express";
import { auth } from "../utils/auth";
import { getKeyGivers } from "../controllers/keyGivers/getKeyGivers";
import { addKeyGiver } from "../controllers/keyGivers/addKeyGiver";
import { deleteKeyGiver } from "../controllers/keyGivers/deleteKeyGiver";
import { updateKeyGiver } from "../controllers/keyGivers/updateKeyGiver";
import { getKeyGiverDrops } from "../controllers/keyGivers/getKeyGiverDrops";
import { getKeyGiver } from "../controllers/keyGivers/getKeyGiver";

export const keyGiversRouter = Router();

keyGiversRouter.get(
  "/",
  auth(
    UserRole.consigliore,
    UserRole.caporegime,
    UserRole.soldato,
    UserRole.mudlet
  ),
  getKeyGivers
);
keyGiversRouter.get(
  "/:id",
  auth(
    UserRole.consigliore,
    UserRole.caporegime,
    UserRole.soldato,
    UserRole.mudlet
  ),
  getKeyGiver
);
keyGiversRouter.get(
  "/:id/drops",
  auth(
    UserRole.consigliore,
    UserRole.caporegime,
    UserRole.soldato,
    UserRole.mudlet
  ),
  getKeyGiverDrops
);
keyGiversRouter.post(
  "/",
  auth(UserRole.consigliore, UserRole.caporegime),
  addKeyGiver
);
keyGiversRouter.patch(
  "/:id",
  auth(UserRole.consigliore, UserRole.caporegime),
  updateKeyGiver
);
keyGiversRouter.delete("/:id", auth(UserRole.consigliore), deleteKeyGiver);
