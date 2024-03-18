import { UserRole } from "../types/UserRole";
import { Router } from "express";
import { auth } from "../utils/auth";
import { getItems } from "../controllers/items/getItems";

export const itemsRouter = Router();

itemsRouter.get(
  "/",
  auth(
    UserRole.consigliore,
    UserRole.caporegime,
    UserRole.soldato,
    UserRole.mudlet
  ),
  getItems
);
