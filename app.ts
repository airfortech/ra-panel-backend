import express from "express";
import { join } from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ScheduledTask } from "node-cron";
import "express-async-errors";
import dayjs from "dayjs";
import { enemiesRouter } from "./routes/enemies";
import { authRouter } from "./routes/auth";
import { backupsRouter } from "./routes/backups";
import { dataRouter } from "./routes/data";
import { keyGiverDropsRouter } from "./routes/keyGiverDrops";
import { keyGiversRouter } from "./routes/keyGivers";
import { keysRouter } from "./routes/keys";
import { locationsRouter } from "./routes/locations";
import { privilegesRouter } from "./routes/privileges";
import { usersRouter } from "./routes/users";
import { handleError } from "./utils/customError";
import { connectToDB } from "./db/mongoose";
import { createInitialSettings } from "./db/tools/createInitialSettings";
import { languageDetector } from "./utils/languageDetector";
import { config } from "./config/config";
import { settingsRouter } from "./routes/settings";
import { itemsRouter } from "./routes/items";

export const shedules: {
  backupSchedule: ScheduledTask | null;
} = {
  backupSchedule: null,
};

(async () => {
  console.log("-------------------------------");
  console.log(dayjs().format("YYYY-MM-DD HH:mm:ss"));
  await connectToDB();
  await createInitialSettings();
})();

const app = express();

app.use(
  cors({
    origin: config.frontend.host,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(languageDetector());

app.use("/data", dataRouter);
app.use("/api/auth", authRouter);
app.use("/api/enemies", enemiesRouter);
app.use("/api/locations", locationsRouter);
app.use("/api/keygivers/drops", keyGiverDropsRouter);
app.use("/api/keygivers", keyGiversRouter);
app.use("/api/keys", keysRouter);
app.use("/api/items", itemsRouter);
app.use("/api/privileges", privilegesRouter);
app.use("/api/backups", backupsRouter);
app.use("/api/users", usersRouter);
app.use("/api/settings", settingsRouter);

app.get("/*", function (req, res) {
  res.sendFile(join(__dirname, "./public", "index.html"));
});

app.use(handleError);

app.listen(config.app.port, () => {
  console.log(`Server is running on port: ${config.app.port}`);
});
