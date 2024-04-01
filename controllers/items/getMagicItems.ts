import { Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { ItemShortResponse } from "../../types/Item";
import { Response } from "express";
import { Item } from "../../db/models/Item";

export const getMagicItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.find({
      isMagic: true,
    });
    return res.status(200).json({
      status: Status.success,
      data: {
        items: items
          .map(({ id, name, short }) => {
            const data: ItemShortResponse = {
              id,
              name,
              short,
            };
            return data;
          })
          .sort((a, b) => a.short.localeCompare(b.short)),
      },
    });
  } catch (e) {
    throw e;
  }
};
