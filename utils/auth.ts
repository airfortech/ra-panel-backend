import { messages, Status } from "../types/responseMessages";
import { AuthRequest } from "../types/authRequest";
import { UserRole } from "../types/UserRole";
import { Response, NextFunction } from "express";
import { decodeToken } from "./decodeToken";
import { CustomError } from "./customError";

export const auth = (...allowedRoles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    if (!authorization)
      throw new CustomError(messages.auth.unauthorized, 401, Status.error);

    const token = req.headers.authorization.split("Bearer ")[1];

    const role = decodeToken(token);
    if (!allowedRoles.includes(role))
      throw new CustomError(messages.auth.unauthorized, 401, Status.error);

    req.role = role;
    next();
  };
};
