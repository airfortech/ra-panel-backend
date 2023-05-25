import { KeyResponse } from "../../types/Key";
import { Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { Response } from "express";
import { Key } from "../../db/models/Key";

export const getKeys = async (req: Request, res: Response) => {
  try {
    // TODO: add poppulate when Treasury is ready
    const keys = await Key.find({ isActive: true });
    return res.status(200).json({
      status: Status.success,
      data: {
        keys: keys.map(
          ({ id, name, treasury, domain, comment, description }) => {
            const data: KeyResponse = {
              id,
              name,
              treasury: treasury as unknown as string,
              domain,
              comment,
              description,
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
