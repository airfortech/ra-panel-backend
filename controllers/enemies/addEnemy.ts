import { EnemyRequest } from "../../types/Enemy";
import { messages, Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import dayjs from "dayjs";
import { Response } from "express";
import { Enemy } from "../../db/models/Enemy";
import { enemyNameValidator } from "../../db/validators/enemyValidators";
import { CustomError } from "../../utils/customError";

export const addEnemy = async (req: Request, res: Response) => {
  try {
    const data = req.body as EnemyRequest;
    if (!data.name)
      throw new CustomError(
        messages[req.lang].enemies.nameIsRequired,
        400,
        Status.error
      );
    const name = enemyNameValidator(data.name);
    const enemy = await Enemy.findOne({ name });
    if (!enemy) await new Enemy({ ...data, name }).save();
    else if (enemy && enemy.isActiveEnemy === true)
      throw new CustomError(
        messages[req.lang].enemies.enemyExists(name),
        400,
        Status.error
      );
    else if (enemy && enemy.isActiveEnemy === false) {
      const enemyRequestData = {
        ...data,
        name,
        isActiveEnemy: true,
        addDates: [...enemy.addDates, dayjs().unix()],
      };
      await Enemy.findOneAndUpdate({ _id: enemy.id }, enemyRequestData, {
        runValidators: true,
      });
    }
    return res.status(200).json({
      status: Status.success,
      message: messages[req.lang].enemies.enemyAdded(name),
    });
  } catch (e) {
    throw e;
  }
};
