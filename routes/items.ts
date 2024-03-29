import { UserRole } from "../types/UserRole";
import { Request } from "../types/Request";
import { ItemTypes } from "../types/ItemTypes";
import { Router } from "express";
import { auth } from "../utils/auth";
import { getItems } from "../controllers/items/getItems";
import { getItem } from "../controllers/items/getItem";
import { addItem } from "../controllers/items/addItem";
import { deleteItem } from "../controllers/items/deleteItem";
import { updateItem } from "../controllers/items/updateItem";

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
  .post(
    "/weapon",
    auth(
      UserRole.consigliore,
      UserRole.caporegime,
      UserRole.soldato,
      UserRole.mudlet
    ),
    (req: Request, res) => addItem(req, res, ItemTypes.weapon)
  )
  .post(
    "/armor",
    auth(
      UserRole.consigliore,
      UserRole.caporegime,
      UserRole.soldato,
      UserRole.mudlet
    ),
    (req: Request, res) => addItem(req, res, ItemTypes.armor)
  )
  .post(
    "/shield",
    auth(
      UserRole.consigliore,
      UserRole.caporegime,
      UserRole.soldato,
      UserRole.mudlet
    ),
    (req: Request, res) => addItem(req, res, ItemTypes.shield)
  )
  .post(
    "/cloth",
    auth(
      UserRole.consigliore,
      UserRole.caporegime,
      UserRole.soldato,
      UserRole.mudlet
    ),
    (req: Request, res) => addItem(req, res, ItemTypes.cloth)
  )
  .post(
    "/jewellery",
    auth(
      UserRole.consigliore,
      UserRole.caporegime,
      UserRole.soldato,
      UserRole.mudlet
    ),
    (req: Request, res) => addItem(req, res, ItemTypes.jewellery)
  )
  .post(
    "/stone",
    auth(
      UserRole.consigliore,
      UserRole.caporegime,
      UserRole.soldato,
      UserRole.mudlet
    ),
    (req: Request, res) => addItem(req, res, ItemTypes.stone)
  )
  .post(
    "/potion",
    auth(
      UserRole.consigliore,
      UserRole.caporegime,
      UserRole.soldato,
      UserRole.mudlet
    ),
    (req: Request, res) => addItem(req, res, ItemTypes.potion)
  )
  .post(
    "/other",
    auth(
      UserRole.consigliore,
      UserRole.caporegime,
      UserRole.soldato,
      UserRole.mudlet
    ),
    (req: Request, res) => addItem(req, res, ItemTypes.other)
  )
  .patch(
    "/:id",
    auth(
      UserRole.consigliore,
      UserRole.caporegime,
      UserRole.soldato,
      UserRole.mudlet
    ),
    updateItem
  )
  .delete(
    "/:id",
    auth(
      UserRole.consigliore,
      UserRole.caporegime,
      UserRole.soldato,
      UserRole.mudlet
    ),
    deleteItem
  );
