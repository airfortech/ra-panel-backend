import { UserRole } from "../types/UserRole";
import { Router } from "express";
import { auth } from "../utils/auth";
import { getBackups } from "../controllers/backups/getBackups";
import { createBackup } from "../controllers/backups/createBackup";
import { restoreBackup } from "../controllers/backups/restoreBackup";
import { deleteBackups } from "../controllers/backups/deleteBackups";
import { changeBackupSettings } from "../controllers/backups/changeBackupSettings";

export const backupsRouter = Router();

// get backups list
backupsRouter.get("/", auth(UserRole.consigliore), getBackups);
// create backup
backupsRouter.post("/", auth(UserRole.consigliore), createBackup);
// restore backup
backupsRouter.post("/:fileName", auth(UserRole.consigliore), restoreBackup);
//  delete backups
backupsRouter.delete("/", auth(UserRole.consigliore), deleteBackups);
// change settings
backupsRouter.patch("/", auth(UserRole.consigliore), changeBackupSettings);
