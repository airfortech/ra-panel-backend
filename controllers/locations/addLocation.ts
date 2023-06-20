import { LocationAddRequest } from "../../types/Location";
import { messages, Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { Response } from "express";
import { Location } from "../../db/models/Location";

export const addLocation = async (req: Request, res: Response) => {
  try {
    const data = req.body as LocationAddRequest;
    await new Location({ ...data }).save();
    return res.status(200).json({
      status: Status.success,
      message: messages[req.lang].location.locationAdded(data.locationId),
    });
  } catch (e) {
    throw e;
  }
};
