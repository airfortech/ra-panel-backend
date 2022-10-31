import { messages, Status } from "../../types/responseMessages";
import { Response } from "express";
import { decodeToken } from "../../utils/decodeToken";
import { Request } from "../../types/Request";

export const getMe = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.auth_token;
    const role = decodeToken(token);

    return res.status(200).json({
      status: Status.success,
      message: messages[req.lang].auth.login,
      data: { auth: { role, token } },
    });
  } catch (e) {
    throw e;
  }
};
