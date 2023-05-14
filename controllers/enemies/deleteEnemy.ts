import { messages, Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import dayjs from "dayjs";
import { Response } from "express";
import { Enemy } from "../../db/models/Enemy";
import { CustomError } from "../../utils/customError";

export const deleteEnemy = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    // INFO: if id is not valid (string of 12 bytes or a string of 24 hex characters or an integer) it throw error and next command are not executed
    const enemy = await Enemy.findById(id);

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
