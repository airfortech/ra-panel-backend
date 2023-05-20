import { UserRole } from "./UserRole";

export interface User {
  role: UserRole;
  password: string;
  jwt?: string;
  token?: string;
}

export interface ChangeUserPasswordRequest
  extends Omit<User, "jwt" | "token"> {}
