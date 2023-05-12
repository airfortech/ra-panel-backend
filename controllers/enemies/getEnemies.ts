import { Status } from "../../types/responseMessages";
import { Request, Response } from "express";
import { Enemy } from "../../db/models/Enemy";
import { EnemyResponse } from "../../types/Enemy";

export const getEnemies = async (req: Request, res: Response) => {
  try {
    const enemies = await Enemy.find({});
    return res.status(200).json({
      status: Status.success,
      data: {
        enemies: enemies.map(
          ({
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
