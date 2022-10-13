import { Status } from "../../types/responseMessages";
import { Request, Response } from "express";
import { Enemy } from "../../db/models/Enemy";

export const getEnemies = async (req: Request, res: Response) => {
  try {
    const enemies = await Enemy.find({});
    return res.status(200).json({
      status: Status.success,
      data: {
        enemies: enemies.map(({ id, name }) => {
          return { id, name };
        }),
      },
    });
  } catch (e) {
    throw e;
  }
};
