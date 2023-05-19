import { UserRole } from "../types/UserRole";
import { Router } from "express";
import { auth } from "../utils/auth";
import { getPrivileges } from "../controllers/privileges/getPrivileges";

export const privilegesRouter = Router();

privilegesRouter.get(
  "/",
  auth(
    UserRole.consigliore,
    UserRole.caporegime,
    UserRole.soldato,
    UserRole.mudlet
  ),
  getPrivileges
);
