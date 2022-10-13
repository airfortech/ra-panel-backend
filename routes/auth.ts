import { Router } from "express";
import { login } from "../controllers/auth/login";
import { logout } from "../controllers/auth/logout";

export const authRouter = Router();

authRouter.post("/login", login);
authRouter.get("/logout", logout);
