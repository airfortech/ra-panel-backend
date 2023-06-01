import { UserRole } from "../types/UserRole";
import { Router } from "express";
import { auth } from "../utils/auth";
import { addKeyGiverDrop } from "../controllers/keyGiverDrops/addKeyGiverDrop";
import { deleteKeyGiverDrop } from "../controllers/keyGiverDrops/deleteKeyGiverDrop";
import { getKeyGiverDrops } from "../controllers/keyGiverDrops/getKeyGiverDrops";
import { updateKeyGiverDrop } from "../controllers/keyGiverDrops/updateKeyGiverDrop";
import { getEditableKeyGiverDrops } from "../controllers/keyGiverDrops/getEditableKeyGiverDrops";

export const keyGiverDropsRouter = Router();

keyGiverDropsRouter.get(
  "/",
  auth(
    UserRole.consigliore,
    UserRole.caporegime,
    UserRole.soldato,
    UserRole.mudlet
  ),
  getKeyGiverDrops
);
keyGiverDropsRouter.get(
  "/edit",
  auth(
    UserRole.consigliore,
    UserRole.caporegime,
    UserRole.soldato,
    UserRole.mudlet
  ),
  getEditableKeyGiverDrops
);
keyGiverDropsRouter.post(
  "/",
  auth(UserRole.consigliore, UserRole.caporegime, UserRole.soldato),
  addKeyGiverDrop
);
keyGiverDropsRouter.patch(
  "/:id",
  auth(UserRole.consigliore, UserRole.caporegime, UserRole.soldato),
  updateKeyGiverDrop
);
keyGiverDropsRouter.delete(
  "/:id",
  auth(UserRole.consigliore),
  deleteKeyGiverDrop
);
