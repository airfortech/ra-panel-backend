import { messages, Status } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { Response } from "express";
import { User } from "../../db/models/User";
import { CustomError } from "../../utils/customError";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    if (!users || users.length === 0)
      throw new CustomError(
        messages[req.lang].users.noRolesInDb,
        404,
        Status.error
      );

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
