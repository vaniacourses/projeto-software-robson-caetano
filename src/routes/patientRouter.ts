import { Role } from "@prisma/client";
import { Router } from "express";
import httpStatus from "http-status";
import { CreatePatientController } from "~/controllers/patient/CreatePatientController";
import { UpdatePatientController } from "~/controllers/patient/UpdatePatientController";

import { authorizationMiddleware } from "~/middlewares/authorizationMiddleware";
import { DatabasePatientRepositoryStrategy } from "~/repositories/patient/DatabasePatientRepositoryStrategy";

export const patientRouter = Router();

const databasePatientRepositoryStrategy =
  new DatabasePatientRepositoryStrategy();

patientRouter.use(authorizationMiddleware([Role.SECRETARY]));

patientRouter.get("/", async (_, res) => {
  const patients = await databasePatientRepositoryStrategy.list();

  res.status(httpStatus.OK).json(patients);
});

patientRouter.post("/", async (req, res) => {
  const patient = await new CreatePatientController(
    databasePatientRepositoryStrategy,
  ).createPatient({
    name: req.body.name,
    email: req.body.email,
    cpf: req.body.cpf,
  });

  res.status(httpStatus.CREATED).json(patient);
});

patientRouter.put("/:id", async (req, res) => {
  const patient = await new UpdatePatientController(
    databasePatientRepositoryStrategy,
  ).updatePatient({
    id: Number(req.params.id),
    name: req.body.name,
    email: req.body.email,
  });

  res.status(httpStatus.OK).json(patient);
});

patientRouter.delete("/:id", async (req, res) => {
  await databasePatientRepositoryStrategy.delete(Number(req.params.id));

  res.status(httpStatus.NO_CONTENT).send();
});
