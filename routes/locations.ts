import { UserRole } from "../types/UserRole";
import { Router } from "express";
import { auth } from "../utils/auth";
import { getLocations } from "../controllers/locations/getLocations";
import { addLocation } from "../controllers/locations/addLocation";
import { deleteLocation } from "../controllers/locations/deleteLocation";
import { updateLocation } from "../controllers/locations/updateLocation";

export const locationsRouter = Router();

locationsRouter.get(
  "/",
  auth(
    UserRole.consigliore,
    UserRole.caporegime,
    UserRole.soldato,
    UserRole.mudlet
  ),
  getLocations
);
locationsRouter.post(
  "/",
  auth(UserRole.consigliore, UserRole.caporegime),
  addLocation
);
locationsRouter.delete("/:id", auth(UserRole.consigliore), deleteLocation);
locationsRouter.patch(
  "/:id",
  auth(UserRole.consigliore, UserRole.caporegime),
  updateLocation
);
