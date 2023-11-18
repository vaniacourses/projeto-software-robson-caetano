import { Router } from "express";
import { UserControllerCreate as CreateUserController } from "~/controllers/CreateUserController";

export const userRouter = Router();

userRouter.post("/", (req, res) => {
  console.log("router");
  new CreateUserController().createUser(req, res);
});
