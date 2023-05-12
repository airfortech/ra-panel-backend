import { Status } from "../../types/responseMessages";
import { Request, Response } from "express";
import { Enemy } from "../../db/models/Enemy";
import { EnemyResponse } from "../../types/Enemy";

export const getEnemies = async (req: Request, res: Response) => {
  try {
    const enemies = await Enemy.find({ isActiveEnemy: true });
    return res.status(200).json({
      status: Status.success,
      data: {
        enemies: enemies.map(
          ({
            id,
            name,
            short,
            race,
            profession,
            guild,
            level,
            weapon,
            comment,
          }) => {
            return {
              id,
              name,
              short,
              race,
              profession,
              guild,
              level,
              weapon,
              comment,
            } as EnemyResponse;
          }
        ),
      },
    });
  } catch (e) {
    throw e;
  }
};
