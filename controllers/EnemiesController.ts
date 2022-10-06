import { Request, Response } from "express";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { v4 } from "uuid";

export const getEnemiesFile = async (req: Request, res: Response) => {
  res.sendFile(join(__dirname, "../data/", "enemies.txt"));
};

export const getEnemies = async (req: Request, res: Response) => {
  try {
    const enemies = await readFile("./data/enemies.txt", "utf8");
    const jsEnemies =
      enemies.trim().length === 0
        ? []
        : enemies.split("\n").map(enemy => {
            const id = v4();
            return { id, name: enemy };
          });
    return res.status(200).json({
      status: "success",
      data: jsEnemies,
    });
  } catch (e) {
    throw new Error();
  }
};

export const saveEnemies = async (req: Request, res: Response) => {
  try {
    const enemies = req.body.map(({ name }: any) => name).join("\n");
    await writeFile("./data/enemies.txt", enemies, "utf8");
    return res.status(200).json({
      status: "success",
      data: enemies,
    });
  } catch (e) {
    throw new Error();
  }
};
