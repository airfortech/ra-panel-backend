import { UserRole } from "./UserRole";
import { Request } from "express";

export interface AuthRequest extends Request {
  role: UserRole;
}
