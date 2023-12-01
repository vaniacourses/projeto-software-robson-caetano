import { Router } from "express";
import httpStatus from "http-status";

import { CreateSessionController } from "~/controllers/sessions/CreateSessionController";
import { DatabaseSessionRepositoryStrategy } from "~/repositories/session/DatabaseSessionRepositoryStrategy";
import { DatabaseUserRepositoryStrategy } from "~/repositories/user/DatabaseUserRepositoryStrategy";
import { BcryptHasherStrategy } from "~/services/password-hasher/BCryptPasswordHasherStrategy";
import { CryptoTokenGeneratorStrategy } from "~/services/token-generator/CryptoTokenGeneratorStrategy";

export const sessionRouter = Router();

sessionRouter.post("/", async (req, res) => {
  const controller = new CreateSessionController(
    new DatabaseUserRepositoryStrategy(),
    new DatabaseSessionRepositoryStrategy(),
    new BcryptHasherStrategy(),
    new CryptoTokenGeneratorStrategy(),
  );

  const session = await controller.createSession({
    email: req.body.email,
    password: req.body.password,
  });

  res.status(httpStatus.CREATED).json(session);
});
