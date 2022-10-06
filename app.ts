import express from "express";
import { join } from "path";
import cors from "cors";
import "express-async-errors";
import { dataRouter } from "./routes/data";
import { enemiesRouter } from "./routes/enemies";
import { handleError } from "./utils/customError";
import { config } from "./config/config";
import { connectToDB } from "./db/mongoose";

connectToDB();

const app = express();

app.use(
  cors({
    origin: config.frontend.host,
  })
);
app.use(express.json());

app.use("/api", enemiesRouter);
app.use("/data", dataRouter);

app.get("/*", function (req, res) {
  res.sendFile(join(__dirname, "./public", "index.html"));
});

app.use(handleError);

app.listen(config.app.port, () => {
  console.log(`Server is running on port: ${config.app.port}`);
});
