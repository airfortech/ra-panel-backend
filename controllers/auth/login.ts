import { messages, Status } from "../../types/responseMessages";
import { User as IUser } from "../../types/User";
import { Request } from "../../types/Request";
import { Response } from "express";
import { User } from "../../db/models/User";
import { createToken } from "../../utils/createToken";
import { CustomError } from "../../utils/customError";

export const login = async (req: Request, res: Response) => {
  try {
    const { role, password } = req.body as IUser;

    const user = await User.findOne({ role });
    if (!user)
      throw new CustomError(
        messages[req.lang].auth.wrongRole,
        401,
        Status.error
      );
    if (!(await user.comparePassword(password))) {
      throw new CustomError(
        messages[req.lang].auth.wrongPassword,
        401,
        Status.error
      );
    }
    const token = createToken(role, "1d");
    res
      .cookie("auth_token", token, {
        secure: true,
        maxAge: 1000 * 60 * 60 * 4,
      })
      .status(200)
      .json({
        status: Status.success,
        data: { token },
      });
  } catch (e) {
    throw e;
  }
};
