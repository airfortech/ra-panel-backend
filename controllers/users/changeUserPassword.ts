import { ChangeUserPasswordRequest } from "../../types/User";
import { messages, Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { Response } from "express";
import { User } from "../../db/models/User";
import { CustomError } from "../../utils/customError";
import { getErrorsMessages } from "../../utils/getErrorsMessages";

export const changeUserPassword = async (req: Request, res: Response) => {
  try {
    const { role, password }: ChangeUserPasswordRequest = req.body;
    const user = await User.findOne({ role });
    if (!user)
      throw new CustomError(
        messages[req.lang].auth.wrongRole,
        404,
        Status.error
      );

    await user.changePassword(password);
    return res.status(200).json({
      status: Status.success,
      message: messages[req.lang].users.passwordChanged,
    });
  } catch (e) {
    if (e.errors)
      throw new CustomError(getErrorsMessages(e.errors)[0], 400, Status.error);
    throw e;
  }
};
