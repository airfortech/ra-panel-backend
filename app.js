const express = require("express");
const { join } = require("path");
const app = express();
const cors = require("cors");

const port = 3001;

app.use(
  cors({
    origin: "https://ra.trycodeit.com",
  })
);
app.use(express.json());

app.use("/api", require("./routes/enemies"));
app.use("/", require("./routes/enemies"));

app.get("/*", function (req, res) {
  res.sendFile(join(__dirname, "../public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
