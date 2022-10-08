import { UserRole } from "../types/UserRole";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";

export const createToken = (role: UserRole, time: string | number): string => {
  return sign({ role }, config.secret.jwt, { expiresIn: time });
};
