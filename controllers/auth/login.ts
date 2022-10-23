import { messages, Status } from "../../types/responseMessages";
import { User as IUser } from "../../types/User";
import { Request, Response } from "express";
import { User } from "../../db/models/User";
import { createToken } from "../../utils/createToken";
import { CustomError } from "../../utils/customError";

export const login = async (req: Request, res: Response) => {
  try {
    const { role, password } = req.body as IUser;
    const user = await User.findOne({ role });
    if (!user)
      throw new CustomError(messages.auth.wrongRole, 401, Status.error);
    if (!(await user.comparePassword(password)))
      throw new CustomError(messages.auth.wrongPassword, 401, Status.error);
    const token = createToken(role, "1d");
    return res.status(200).json({
      status: Status.success,
      message: "Logged in",
      data: { role, token },
    });
  } catch (e) {
    throw e;
  }
};
