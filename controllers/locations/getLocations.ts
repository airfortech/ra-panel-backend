import { LocationResponse } from "../../types/Location";
import { Status } from "../../types/responseMessages";
import { Request, Response } from "express";
import { Location } from "../../db/models/Location";

export const getLocations = async (req: Request, res: Response) => {
  try {
    const locations = await Location.find({ isActive: true });
    return res.status(200).json({
      status: Status.success,
      data: {
        locations: locations.map(
          ({ id, locationId, name, domain, description, comment, binds }) => {
            const data: LocationResponse = {
              id,
              locationId,
              name,
              domain,
              description,
              comment,
              binds,
            };
            return data;
          }
        ),
      },
    });
  } catch (e) {
    throw e;
  }
};
