import { UserRole } from "../types/UserRole";
import { Router } from "express";
import { changeBackupSettings } from "../controllers/settings/changeBackupSettings";
import { getSettings } from "../controllers/settings/getSettings";
import { auth } from "../utils/auth";

export const settingsRouter = Router();

settingsRouter.get("/", auth(UserRole.consigliore), getSettings);
settingsRouter.patch(
  "/backup",
  auth(UserRole.consigliore),
  changeBackupSettings
);
