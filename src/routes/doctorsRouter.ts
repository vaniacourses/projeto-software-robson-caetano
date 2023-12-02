import { Role } from "@prisma/client";
import { Router } from "express";
import httpStatus from "http-status";
import { ListDoctorsController } from "~/controllers/doctor/ListDoctorsController";

import { authorizationMiddleware } from "~/middlewares/authorizationMiddleware";
import { DatabaseUserRepositoryStrategy } from "~/repositories/user/DatabaseUserRepositoryStrategy";

export const doctorRouter = Router();

const databaseUserRepositoryStrategy = new DatabaseUserRepositoryStrategy();

doctorRouter.use(authorizationMiddleware([Role.SECRETARY, Role.DOCTOR]));

doctorRouter.get("/", async (_, res) => {
  const doctors = await new ListDoctorsController(
    databaseUserRepositoryStrategy,
  ).listDoctors();

  res.status(httpStatus.OK).json(doctors);
});
