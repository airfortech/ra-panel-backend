import { UserRole } from "../types/UserRole";
import { Router } from "express";
import { auth } from "../utils/auth";
import { getBackups } from "../controllers/backups/getBackups";
import { createBackup } from "../controllers/backups/createBackup";
import { restoreBackup } from "../controllers/backups/restoreBackup";
import { deleteBackups } from "../controllers/backups/deleteBackups";

export const backupsRouter = Router();

backupsRouter.get("/", auth(UserRole.consigliore), getBackups);
backupsRouter.post("/", auth(UserRole.consigliore), createBackup);
backupsRouter.post("/:fileName", auth(UserRole.consigliore), restoreBackup);
backupsRouter.delete("/", auth(UserRole.consigliore), deleteBackups);
