import { Router } from "express";
import { CreateUserController } from "~/controllers/CreateUserController";
import { ListUsersController } from "~/controllers/ListUsersController";

export const userRouter = Router();

userRouter.get("/", (req, res) => {
  new ListUsersController().listUsers(req, res);
});

userRouter.post("/", (req, res) => {
  new CreateUserController().createUser(req, res);
});
