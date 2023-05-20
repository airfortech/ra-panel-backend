import { Enemy } from "../../models/Enemy";
import { enemies } from "./data/enemies";

export const createEnemies = async () => {
  try {
    console.log("Creating enemies...");
    await Enemy.deleteMany({});
    await Enemy.insertMany(enemies);
    console.log("Enemies created. ✔");
  } catch (e) {
    throw e;
  }
};
