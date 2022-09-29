const { readFile, writeFile } = require("fs").promises;
const { join } = require("path");
const { v4 } = require("uuid");

class EnemiesController {
  async getEnemiesFile(req, res) {
    res.sendFile(join(__dirname, "../data/", "enemies.txt"));
  }

  async getEnemies(req, res) {
    try {
      const enemies = await readFile("./data/enemies.txt", "utf8");
      const jsEnemies =
        enemies.trim().length === 0
          ? []
          : enemies.split("\n").map(enemy => {
              const id = v4();
              return { id, name: enemy };
            });
      console.log(jsEnemies);
      return res.status(200).json({
        status: "success",
        data: jsEnemies,
      });
    } catch (e) {
      return res.status(400).send({
        status: "error",
        message: "Try again later.",
      });
    }
  }

  async saveEnemies(req, res) {
    try {
      const enemies = req.body.map(({ name }) => name).join("\n");
      console.log(enemies);
      await writeFile("./data/enemies.txt", enemies, "utf8");
      return res.status(200).json({
        status: "success",
        data: enemies,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).send({
        status: "error",
        message: "Try again later.",
      });
    }
  }
}

module.exports = new EnemiesController();
