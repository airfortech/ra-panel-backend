import { UserRole } from "../types/UserRole";
import { Router } from "express";
import { auth } from "../utils/auth";
import { getUsers } from "../controllers/users/usersController";
import { changeUserPassword } from "../controllers/users/changeUserPassword";

export const usersRouter = Router();

usersRouter.get("/", auth(UserRole.consigliore), getUsers);
usersRouter.patch("/:id", auth(UserRole.consigliore), changeUserPassword);
