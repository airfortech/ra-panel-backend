import { messages, Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { Response } from "express";
import { Location } from "../../db/models/Location";
import { CustomError } from "../../utils/customError";

export const deleteLocation = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const location = await Location.findById(id);

    if (!location)
      throw new CustomError(
        messages[req.lang].location.locationNotExists,
        404,
        Status.error
      );
    location.isActive = false;
    await location.save();
    return res.status(200).json({
      status: Status.success,
      message: messages[req.lang].location.locationDeleted(location.locationId),
    });
  } catch (e) {
    throw e;
  }
};
