import { writeFile } from "fs/promises";
import { IEnemySchema } from "../models/Enemy";

export const saveEnemiesToFile = async (
  enemies: IEnemySchema[]
): Promise<void> => {
  try {
    const enemiesNames = enemies
      .map(({ name }) => name)
      .sort()
      .join("\n");
    await writeFile("./data/enemies.txt", enemiesNames, "utf8");
  } catch (e) {
    throw e;
  }
};
