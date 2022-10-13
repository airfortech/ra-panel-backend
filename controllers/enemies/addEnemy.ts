import { messages, Status } from "../../types/responseMessages";
import { Request, Response } from "express";
import { Enemy } from "../../db/models/Enemy";
import { enemyNameValidator } from "../../db/validators/enemyValidators";
import { saveEnemiesToFile } from "../../db/tools/saveEnemiesToFile";
import { CustomError } from "../../utils/customError";

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
      status: Status.success,
      message: messages.enemies.enemyAdded,
    });
  } catch (e) {
    throw e;
  }
};
