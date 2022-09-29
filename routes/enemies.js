const express = require("express");
const router = new express.Router();
const EnemiesController = require("../controllers/EnemiesControlles");

router.get("/data/enemies.txt", EnemiesController.getEnemiesFile);
router.get("/enemies/", EnemiesController.getEnemies);
router.post("/enemies/", EnemiesController.saveEnemies);

module.exports = router;
