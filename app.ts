import express from "express";
import { join } from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ScheduledTask } from "node-cron";
import "express-async-errors";
import { enemiesRouter } from "./routes/enemies";
import { authRouter } from "./routes/auth";
import { usersRouter } from "./routes/users";
import { dataRouter } from "./routes/data";
import { keyGiversRouter } from "./routes/keyGivers";
import { keysRouter } from "./routes/keys";
import { handleError } from "./utils/customError";
import { connectToDB } from "./db/mongoose";
import { createShedule } from "./db/tools/backupDb/createShedule";
import { languageDetector } from "./utils/languageDetector";
import { privilegesRouter } from "./routes/privileges";
import { locationsRouter } from "./routes/locations";
import { keyGiverDropsRouter } from "./routes/keyGiverDrops";
import { config } from "./config/config";

export const shedules: {
  backupSchedule: ScheduledTask | null;
} = {
  backupSchedule: null,
};

(async () => {
  console.log(shedules.backupSchedule);
  await connectToDB();
  await createShedule([1, 10, 20, 30, 40, 50]);
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
app.use("/api/keygivers", keyGiversRouter);
app.use("/api/keygivers/drops", keyGiverDropsRouter);
app.use("/api/keys", keysRouter);
app.use("/api/privileges", privilegesRouter);
app.use("/api/users", usersRouter);

app.get("/*", function (req, res) {
  res.sendFile(join(__dirname, "./public", "index.html"));
});

app.use(handleError);

app.listen(config.app.port, () => {
  console.log(`Server is running on port: ${config.app.port}`);
});
