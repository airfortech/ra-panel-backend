import { messages, Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { Response } from "express";
import { Enemy } from "../../db/models/Enemy";
import { enemyNameValidator } from "../../db/validators/enemyValidators";
import { saveEnemiesToFile } from "../../db/tools/saveEnemiesToFile";
import { CustomError } from "../../utils/customError";

export const addEnemy = async (req: Request, res: Response) => {
  try {
    const name = enemyNameValidator(req.body.name);
    const enemy = await Enemy.findOne({ name });
    if (enemy)
      throw new CustomError(
        messages[req.lang].enemies.enemyExists(name) as string,
        400,
        Status.error
      );
    await new Enemy({ name }).save();
    const enemies = await Enemy.find({});
    await saveEnemiesToFile(enemies);
    return res.status(200).json({
      status: Status.success,
      message: messages[req.lang].enemies.enemyAdded(name),
    });
  } catch (e) {
    throw e;
  }
};
