import { messages, Status } from "../types/responseMessages";
import { Request, Response } from "express";
import { User } from "../db/models/User";
import { CustomError } from "../utils/customError";
import { getErrorsMessages } from "../utils/getErrorsMessages";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    if (!users || users.length === 0)
      throw new CustomError(messages.users.noRolesInDb, 404, Status.error);

    return res.status(200).json({
      status: Status.success,
      data: {
        users: users.map(({ id, role }) => {
          return { id, role };
        }),
      },
    });
  } catch (e) {
    throw e;
  }
};

export const changeUserPassword = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const password: string = req.body.password;
    const user = await User.findOne({ id });
    if (!user)
      throw new CustomError(messages.auth.wrongRole, 404, Status.error);

    await user.changePassword(password);
    return res.status(200).json({
      status: Status.success,
      message: messages.users.passwordChanged,
    });
  } catch (e) {
    if (e.errors)
      throw new CustomError(getErrorsMessages(e.errors)[0], 400, Status.error);
    throw e;
  }
};
