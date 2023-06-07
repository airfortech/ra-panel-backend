import { LocationUpdateRequest } from "../../types/Location";
import { messages, Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { Response } from "express";
import { Location } from "../../db/models/Location";
import { CustomError } from "../../utils/customError";

export const updateLocation = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    const data = req.body as LocationUpdateRequest;
    const location = await Location.findOneAndUpdate(
      { _id, isActive: true },
      data,
      {
        runValidators: true,
      }
    );
    if (!location)
      throw new CustomError(
        messages[req.lang].location.locationNotExists,
        404,
        Status.error
      );
    return res.status(200).json({
      status: Status.success,
      message: messages[req.lang].location.locationUpdated(location.locationId),
    });
  } catch (e) {
    throw e;
  }
};
