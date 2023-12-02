import { Role } from "@prisma/client";
import { Router } from "express";
import httpStatus from "http-status";
import { CreateUserController } from "~/controllers/user/CreateUserController";
import { DeleteUserController } from "~/controllers/user/DeleteUserController";
import { ListUsersController } from "~/controllers/user/ListUsersController";
import { UpdateUserController } from "~/controllers/user/UpdateUserController";
import { authorizationMiddleware } from "~/middlewares/authorizationMiddleware";
import { DatabaseUserRepositoryStrategy } from "~/repositories/user/DatabaseUserRepositoryStrategy";
import { BcryptHasherStrategy } from "~/services/password-hasher/BCryptPasswordHasherStrategy";

export const userRouter = Router();

// userRouter.use(authorizationMiddleware([Role.ADMIN]));

userRouter.get("/", async (_, res) => {
  const users = await new ListUsersController(
    new DatabaseUserRepositoryStrategy(),
  ).listUsers();

  res.json(users);
});

userRouter.post("/", async (req, res) => {
  const controller = new CreateUserController(
    new DatabaseUserRepositoryStrategy(),
    new BcryptHasherStrategy(),
  );

  const user = await controller.createUser({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  res.status(httpStatus.CREATED).json(user);
});

userRouter.put("/:id", async (req, res) => {
  const user = await new UpdateUserController(
    new DatabaseUserRepositoryStrategy(),
  ).updateUser({
    id: Number(req.params.id),
    name: req.body.name,
    email: req.body.email,
  });

  res.json(user);
});

userRouter.delete("/:id", async (req, res) => {
  await new DeleteUserController(
    new DatabaseUserRepositoryStrategy(),
  ).deleteUser({
    id: Number(req.params.id),
  });

  res.sendStatus(httpStatus.NO_CONTENT);
});
