import { Enemy } from "../../models/Enemy";
import { enemies } from "./data/enemies";

export const createEnemies = async () => {
  try {
    console.log("Creating enemies...");
    await Enemy.deleteMany({});
    const newEnemies = enemies.map(name => {
      return { name };
    });
    await Enemy.insertMany(newEnemies);
    console.log("Enemies created. ✔");
  } catch (e) {
    throw e;
  }
};
