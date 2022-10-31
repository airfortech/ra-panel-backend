import { messages, Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { Response } from "express";

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("auth_token");
    return res.status(200).json({
      status: Status.success,
      message: messages[req.lang].auth.logout,
    });
  } catch (e) {
    throw e;
  }
};
