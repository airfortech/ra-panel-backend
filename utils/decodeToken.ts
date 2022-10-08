import { UserRole } from "../types/UserRole";
import { messages, Status } from "../types/responseMessages";
import { verify } from "jsonwebtoken";
import { CustomError } from "./customError";
import { config } from "../config/config";

interface TokenPayload {
  role: UserRole;
}

export const decodeToken = (token: string): UserRole => {
  try {
    const { role } = verify(token, config.secret.jwt) as TokenPayload;
    return role;
  } catch (e) {
    throw new CustomError(messages.auth.unauthorized, 401, Status.error);
  }
};
