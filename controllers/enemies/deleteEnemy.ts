import { messages, Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import dayjs from "dayjs";
import { Response } from "express";
import { Enemy } from "../../db/models/Enemy";
import { CustomError } from "../../utils/customError";

export const deleteEnemy = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const enemy = await Enemy.findById(id);
    console.log(enemy);
    if (!enemy)
      throw new CustomError(
        messages[req.lang].enemies.enemyNotExists,
        404,
        Status.error
      );
    if (enemy.isActiveEnemy) {
      enemy.removeDates.push(dayjs().unix());
      enemy.isActiveEnemy = false;
      await enemy.save();
    }
    // await saveEnemiesToFile(enemies);
    return res.status(200).json({
      status: Status.success,
      message: messages[req.lang].enemies.enemyDeleted(enemy.name),
    });
  } catch (e) {
    throw e;
  }
};
