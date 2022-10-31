import { messages, Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { Response } from "express";
import { Enemy } from "../../db/models/Enemy";
import { saveEnemiesToFile } from "../../db/tools/saveEnemiesToFile";
import { CustomError } from "../../utils/customError";

export const deleteEnemy = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const enemy = await Enemy.findByIdAndDelete(id);
    if (!enemy)
      throw new CustomError(
        messages[req.lang].enemies.enemyNotExists,
        404,
        Status.error
      );
    const enemies = await Enemy.find({});
    await saveEnemiesToFile(enemies);
    return res.status(200).json({
      status: Status.success,
      message: messages[req.lang].enemies.enemyDeleted(enemy.name),
    });
  } catch (e) {
    throw e;
  }
};
