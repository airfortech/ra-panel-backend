import { UserRole } from "../types/UserRole";
import { Router } from "express";
import { auth } from "../utils/auth";
import { getItems } from "../controllers/items/getItems";
import { getItem } from "../controllers/items/getItem";
import { addWeapon } from "../controllers/items/addWeapon";

export const itemsRouter = Router();

itemsRouter
  .get(
    "/",
    auth(
      UserRole.consigliore,
      UserRole.caporegime,
      UserRole.soldato,
      UserRole.mudlet
    ),
    getItems
  )
  .get(
    "/:id",
    auth(
      UserRole.consigliore,
      UserRole.caporegime,
      UserRole.soldato,
      UserRole.mudlet
    ),
    getItem
  )
  .post("/weapon", auth(UserRole.consigliore, UserRole.caporegime), addWeapon);
