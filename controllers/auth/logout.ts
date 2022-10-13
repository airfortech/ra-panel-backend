import { messages, Status } from "../../types/responseMessages";
import { Request, Response } from "express";

export const logout = async (req: Request, res: Response) => {
  try {
    res.removeHeader("Authorization");
    return res.status(200).json({
      status: Status.success,
      message: messages.auth.logout,
    });
  } catch (e) {
    throw e;
  }
};
