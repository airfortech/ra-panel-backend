import { messages, Status } from "../types/responseMessages";
import { KeyGiver as IKeyGiver } from "../types/KeyGiver";
import { Request, Response } from "express";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { KeyGiver } from "../db/models/KeyGiver";
import { CustomError } from "../utils/customError";
import { getErrorsMessages } from "../utils/getErrorsMessages";
import { nextRespawnDate } from "../utils/nextRespawnDate";
import { getLastRespawnDate } from "../utils/getLastRespawnDate";
import { isIdValid } from "../db/validators/universalValidators";

dayjs.extend(utc);

export const getKeyGivers = async (req: Request, res: Response) => {
  try {
    const keyGivers = await KeyGiver.find({ isActive: true });
    return res.status(200).json({
      status: Status.success,
      data: {
        keyGivers: keyGivers.map(({ id, name, respawnTime, respawns }) => {
          const lastRespawn: string = getLastRespawnDate(respawns);
          return {
            id,
            name,
            respawnTime,
            lastRespawn,
            nextRespawn: nextRespawnDate(lastRespawn, respawnTime),
          };
        }),
      },
    });
  } catch (e) {
    throw e;
  }
};

export const getKeyGiverDetails = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    isIdValid(id, messages.keyGivers.keyGiverNotExists, 404);

    const keyGiver = await KeyGiver.findById(id);
    if (!keyGiver)
      throw new CustomError(
        messages.keyGivers.keyGiverNotExists,
        404,
        Status.error
      );
    const { name, description, respawnTime } = keyGiver;
    const lastRespawn: string = getLastRespawnDate(keyGiver.respawns);
    return res.status(200).json({
      status: Status.success,
      data: {
        keyGiver: {
          id,
          name,
          description,
          respawnTime,
          lastRespawn,
          nextRespawn: nextRespawnDate(lastRespawn, respawnTime),
        },
      },
    });
  } catch (e) {
    throw e;
  }
};

export const addKeyGiver = async (req: Request, res: Response) => {
  try {
    const { name, respawnTime } = req.body as IKeyGiver;
    const keyGiver = await KeyGiver.findOne({ name, isActive: true });
    if (keyGiver)
      throw new CustomError(messages.keyGivers.nameExists, 400, Status.error);
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
    isIdValid(id, messages.keyGivers.keyGiverNotExists, 404);
    const keyGiver = await KeyGiver.findByIdAndUpdate(id, { isActive: false });
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

export const updateKeyGiver = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    isIdValid(id, messages.keyGivers.keyGiverNotExists, 404);
    const { name, description, respawnTime } = req.body as IKeyGiver;
    const keyGiverWithSameName = await KeyGiver.findOne({
      name,
      _id: { $ne: id },
      isActive: true,
    });
    if (keyGiverWithSameName)
      throw new CustomError(messages.keyGivers.nameExists, 400, Status.error);
    const keyGiver = await KeyGiver.findByIdAndUpdate(id, {
      name,
      description,
      respawnTime,
    });
    if (!keyGiver)
      throw new CustomError(
        messages.keyGivers.keyGiverNotExists,
        404,
        Status.error
      );
    return res.status(200).json({
      status: Status.success,
    });
  } catch (e) {
    throw e;
  }
};

export const addKeyGiverTimestamp = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    isIdValid(id, messages.keyGivers.keyGiverNotExists, 404);
    const { date, wasEmpty }: { date: string; wasEmpty: boolean } = req.body;

    const newDate = dayjs.utc(date);
    if (!newDate.isValid())
      throw new CustomError(messages.date.invalidDate, 400, Status.error);

    const keyGiver = await KeyGiver.findById(id);
    if (!keyGiver)
      throw new CustomError(
        messages.keyGivers.keyGiverNotExists,
        404,
        Status.error
      );

    const lastRespawn = keyGiver.respawns[keyGiver.respawns.length - 1];
    if (!lastRespawn)
      keyGiver.respawns.push({ date: newDate.format(), wasEmpty });
    else {
      const previousDate = dayjs.utc(lastRespawn.date);
      if (newDate.diff(previousDate) <= 0)
        throw new CustomError(messages.date.dateNotNever, 400, Status.error);
      keyGiver.respawns.push({ date: newDate.format(), wasEmpty });
    }

    await keyGiver.save();
    return res.status(200).json({
      status: Status.success,
    });
  } catch (e) {
    throw e;
  }
};
