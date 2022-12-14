import express from "express";
import { join } from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import "express-async-errors";
import { enemiesRouter } from "./routes/enemies";
import { authRouter } from "./routes/auth";
import { usersRouter } from "./routes/users";
import { dataRouter } from "./routes/data";
import { keyGiversRouter } from "./routes/keyGivers";
import { keysRouter } from "./routes/keys";
import { handleError } from "./utils/customError";
import { connectToDB } from "./db/mongoose";
import { languageDetector } from "./utils/languageDetector";
import { config } from "./config/config";

connectToDB();

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
app.use("/api/users", usersRouter);
app.use("/api/enemies", enemiesRouter);
app.use("/api/keygivers", keyGiversRouter);
app.use("/api/keys", keysRouter);

app.get("/*", function (req, res) {
  res.sendFile(join(__dirname, "./public", "index.html"));
});

app.use(handleError);

app.listen(config.app.port, () => {
  console.log(`Server is running on port: ${config.app.port}`);
});
