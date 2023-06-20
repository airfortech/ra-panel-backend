import { Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import {
  UserPrivilegesResponse,
  userPrivileges,
} from "../../types/UserPrivileges";
import { Response } from "express";
import { config } from "../../config/config";

export const getPrivileges = async (req: Request, res: Response) => {
  try {
    const privileges = userPrivileges(req.lang, req.role);
    const data: UserPrivilegesResponse = {
      privileges,
      config: {
        keyGiverDrops: {
          maxAddTime: config.keyGiverDrops.maxAddTime,
        },
      },
    };
    return res.status(200).json({
      status: Status.success,
      data,
    });
  } catch (e) {
    throw e;
  }
};
