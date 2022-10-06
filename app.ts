import express from "express";
import { join } from "path";
import cors from "cors";
import { dataRouter } from "./routes/data";
import { enemiesRouter } from "./routes/enemies";
import { config } from "./config/config";

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

app.listen(config.app.port, () => {
  console.log(`Server is running on port: ${config.app.port}`);
});
