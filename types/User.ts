import { UserRole } from "./UserRole";

export interface User {
  role: UserRole;
  password: string;
  jwt?: string;
}
