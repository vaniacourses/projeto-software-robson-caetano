import { Router } from "express";
import { CreateUserController } from "~/controllers/CreateUserController";
import { ListUsersController } from "~/controllers/ListUsersController";
import { UpdateUserController } from "~/controllers/UpdateUserController";

export const userRouter = Router();

userRouter.get("/", (req, res) => {
  new ListUsersController().listUsers(req, res);
});

userRouter.post("/", (req, res) => {
  new CreateUserController().createUser(req, res);
});

userRouter.put("/:id", (req, res) => {
  new UpdateUserController().createUser(req, res);
});
