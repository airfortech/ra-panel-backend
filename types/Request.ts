import { Language } from "./Language";
import { UserRole } from "./UserRole";
import { Request as Req } from "express";

export interface Request extends Req {
  lang: Language;
  role: UserRole;
}
