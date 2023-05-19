import { Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { userPrivileges } from "../../types/UserPrivileges";
import { Response } from "express";

export const getPrivileges = async (req: Request, res: Response) => {
  try {
    const privileges = userPrivileges(req.lang, req.role);
    return res.status(200).json({
      status: Status.success,
      data: {
        privileges,
      },
    });
  } catch (e) {
    throw e;
  }
};
