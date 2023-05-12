import { messages, Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { Response } from "express";
import { Enemy } from "../../db/models/Enemy";
import { enemyNameValidator } from "../../db/validators/enemyValidators";
import { CustomError } from "../../utils/customError";
import { EnemyRequest } from "../../types/Enemy";

export const updateEnemy = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    const data = req.body as EnemyRequest;
    if (!data.name) {
      const enemy = await Enemy.findOneAndUpdate(
        { _id, isActiveEnemy: true },
        data,
        {
          runValidators: true,
        }
      );
      const name = enemy?.name || "";
      return res.status(200).json({
        status: Status.success,
        message: messages[req.lang].enemies.enemyUpdated(name),
      });
    }
    const name = enemyNameValidator(data.name);
    const enemyRequestData = { ...data, name };

    // INFO: checking in mongoose if id is not equal to id and has provided name
    const duplicateNameEnemy = await Enemy.findOne({ _id: { $ne: _id }, name });
    if (duplicateNameEnemy)
      throw new CustomError(
        messages[req.lang].enemies.enemyExists(name),
        400,
        Status.error
      );

    // INFO: runValidators: true, throw errors from models validators. default it wont
    await Enemy.findOneAndUpdate(
      { _id, isActiveEnemy: true },
      enemyRequestData,
      {
        runValidators: true,
      }
    );
    console.log(_id, name);

    return res.status(200).json({
      status: Status.success,
      message: messages[req.lang].enemies.enemyUpdated(name),
    });
  } catch (e) {
    throw e;
  }
};
