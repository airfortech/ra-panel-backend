import { UserRole } from "../types/UserRole";
import { Router } from "express";
import { auth } from "../utils/auth";
import { changeUserPassword, getUsers } from "../controllers/usersController";

export const usersRouter = Router();

usersRouter.get("/", auth(UserRole.consigliore), getUsers);
usersRouter.patch("/:id", auth(UserRole.consigliore), changeUserPassword);
