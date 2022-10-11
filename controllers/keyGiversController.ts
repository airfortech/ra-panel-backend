import { messages, Status } from "../types/responseMessages";
import { KeyGiver as IKeyGiver } from "../types/KeyGiver";
import { Request, Response } from "express";
import { KeyGiver } from "../db/models/KeyGiver";
import { CustomError } from "../utils/customError";
import { getErrorsMessages } from "../utils/getErrorsMessages";

export const getKeyGivers = async (req: Request, res: Response) => {
  try {
    const keyGivers = await KeyGiver.find({});
    return res.status(200).json({
      status: Status.success,
      data: {
        keyGivers: keyGivers
          .map(({ id, name, respawns }) => {
            return {
              id,
              name,
              lastRespawn: respawns[respawns.length - 1]?.date,
            };
          })
          .sort((a, b) =>
            a.name.toLowerCase() < b.name.toLowerCase()
              ? -1
              : a.name.toLowerCase() > b.name.toLowerCase()
              ? 1
              : 0
          ),
      },
    });
  } catch (e) {
    throw e;
  }
};

export const addKeyGiver = async (req: Request, res: Response) => {
  try {
    const { name, respawnTime } = req.body as IKeyGiver;
    const keyGiver = await KeyGiver.findOne({ name });
    if (keyGiver)
      throw new CustomError(
        messages.keyGivers.keyGiverExists,
        400,
        Status.error
      );
    await new KeyGiver({ name, respawnTime }).save();
    return res.status(200).json({
      status: Status.success,
      message: messages.keyGivers.keyGiverAdded,
    });
  } catch (e) {
    if (e.errors)
      throw new CustomError(getErrorsMessages(e.errors)[0], 400, Status.error);
    throw e;
  }
};

export const deleteKeyGiver = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const keyGiver = await KeyGiver.findByIdAndDelete(id);
    if (!keyGiver)
      throw new CustomError(
        messages.keyGivers.keyGiverNotExists,
        404,
        Status.error
      );
    return res.status(200).json({
      status: Status.success,
      message: messages.keyGivers.keyGiverDeleted,
    });
  } catch (e) {
    throw e;
  }
};

export const addKeyGiverTimestamp = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      status: Status.success,
    });
  } catch (e) {
    throw e;
  }
};
