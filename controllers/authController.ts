import { messages, Status } from "../types/responseMessages";
import { User as IUser } from "../types/User";
import { Request, Response } from "express";
import { User } from "../db/models/User";
import { createToken } from "../utils/createToken";
import { CustomError } from "../utils/customError";
import { decodeToken } from "../utils/decodeToken";

export const login = async (req: Request, res: Response) => {
  try {
    const { role, password } = req.body as IUser;
    const user = await User.findOne({ role });
    if (!user)
      throw new CustomError(messages.auth.wrongRole, 401, Status.error);
    if (!(await user.comparePassword(password)))
      throw new CustomError(messages.auth.wrongPassword, 401, Status.error);
    const token = createToken(role, "1d");
    return res
      .header("Authorization", "Bearer " + token)
      .status(200)
      .json({
        status: Status.success,
        data: { token },
      });
  } catch (e) {
    throw e;
  }
};

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
