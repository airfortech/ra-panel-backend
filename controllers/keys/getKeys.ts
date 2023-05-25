import { Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { Response } from "express";
import { Key } from "../../db/models/Key";
import { averageKeyCaptureTime } from "../../utils/averageKeyCaptureTIme";

export const getKeys = async (req: Request, res: Response) => {
  try {
    const keys = await Key.find({ isActive: true });
  } catch (e) {
    throw e;
  }
};
