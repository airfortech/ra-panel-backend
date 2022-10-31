import { Router } from "express";
import { getMe } from "../controllers/auth/getMe";
import { login } from "../controllers/auth/login";
import { logout } from "../controllers/auth/logout";

export const authRouter = Router();

authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.get("/getme", getMe);
