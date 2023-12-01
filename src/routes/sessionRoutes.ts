import { Router } from "express";
import httpStatus from "http-status";

import { CreateSessionController } from "~/controllers/sessions/CreateSessionController";
import { DatabaseSessionRepositoryStrategy } from "~/repositories/session/DatabaseSessionRepositoryStrategy";
import { DatabaseUserRepositoryStrategy } from "~/repositories/user/DatabaseUserRepositoryStrategy";
import { CryptoTokenGeneratorStrategy } from "~/services/token-generator/CryptoTokenGeneratorStrategy";

export const sessionRouter = Router();

sessionRouter.post("/", async (req, res) => {
  const session = await new CreateSessionController(
    new DatabaseUserRepositoryStrategy(),
    new DatabaseSessionRepositoryStrategy(),
    new CryptoTokenGeneratorStrategy(),
  ).createSession({
    userId: Number(req.body.userId),
  });

  res.status(httpStatus.CREATED).json(session);
});
