import { AuthRequest } from "../types/authRequest";
import { messages, Status } from "../types/responseMessages";
import { Request, Response } from "express";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { v4 } from "uuid";
import { Enemy } from "../db/models/Enemy";
import { CustomError } from "../utils/customError";
import { enemyNameValidator } from "../db/validators/enemyValidators";
import { saveEnemiesToFile } from "../db/tools/saveEnemiesToFile";

export const getEnemiesFile = async (req: Request, res: Response) => {
  try {
    res.sendFile(join(__dirname, "../data/", "enemies.txt"));
  } catch (e) {
    throw new Error();
  }
};

export const getEnemies = async (req: Request, res: Response) => {
  try {
    const enemies = await Enemy.find({});
    return res.status(200).json({
      status: Status.success,
      data: {
        enemies: enemies.map(({ _id: id, name }) => {
          return { id, name };
        }),
      },
    });
  } catch (e) {
    throw e;
  }
};

export const addEnemy = async (req: Request, res: Response) => {
  try {
    const name = enemyNameValidator(req.body.name);
    const enemy = await Enemy.findOne({ name });
    if (enemy)
      throw new CustomError(messages.enemies.enemyExists, 400, Status.error);
    await new Enemy({ name }).save();
    const enemies = await Enemy.find({});
    await saveEnemiesToFile(enemies);
    return res.status(200).json({
      status: "success",
      message: messages.enemies.enemyAdded,
    });
  } catch (e) {
    throw e;
  }
};

export const deleteEnemy = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const enemy = await Enemy.findByIdAndDelete(id);
    if (!enemy)
      throw new CustomError(messages.enemies.enemyNotExists, 404, Status.error);
    const enemies = await Enemy.find({});
    await saveEnemiesToFile(enemies);
    return res.status(200).json({
      status: "success",
      message: messages.enemies.enemyDeleted,
    });
  } catch (e) {
    throw e;
  }
};
