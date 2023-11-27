import { Router } from "express";
import httpStatus from "http-status";
import { CreateUserController } from "~/controllers/CreateUserController";
import { DeleteUserController } from "~/controllers/DeleteUserController";
import { ListUsersController } from "~/controllers/ListUsersController";
import { UpdateUserController } from "~/controllers/UpdateUserController";
import { DatabaseUserRepository } from "~/repositories/user/DatabaseUserRepository";
import { UserRepository } from "~/repositories/user/UserRepository";

export const userRouter = Router();

// TODO: algumas pendencias pra implementar e refatorar nesse controller
// - adicionar middleware de validação
// - extrair a criação do repository para uma função factory
// - extrair a criação do controller para uma função factory
// - extrair cada handler (rota) pra um arquivo handler separado: precisamos pensar em uma forma de manter type safety aqui usando o middleware de validação com zod

function makeUserRepository(): UserRepository {
  return new DatabaseUserRepository();
}

userRouter.get("/", async (_, res) => {
  const users = await new ListUsersController(makeUserRepository()).listUsers();

  res.json(users);
});

userRouter.post("/", async (req, res) => {
  const user = await new CreateUserController(makeUserRepository()).createUser({
    name: req.body.name,
    email: req.body.email,
  });

  res.status(httpStatus.CREATED).json(user);
});

userRouter.put("/:id", async (req, res) => {
  const user = await new UpdateUserController(makeUserRepository()).updateUser({
    id: Number(req.params.id),
    name: req.body.name,
    email: req.body.email,
  });

  res.json(user);
});

userRouter.delete("/:id", async (req, res) => {
  await new DeleteUserController(makeUserRepository()).deleteUser({
    id: Number(req.params.id),
  });

  res.sendStatus(httpStatus.NO_CONTENT);
});
