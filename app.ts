import express from "express";
import { join } from "path";
import cors from "cors";

const app = express();

const port = 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
    // origin: "https://ra.trycodeit.com",
  })
);
app.use(express.json());

app.use("/api", require("./routes/enemies"));
app.use("/", require("./routes/enemies"));

app.get("/*", function (req, res) {
  res.sendFile(join(__dirname, "./public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
