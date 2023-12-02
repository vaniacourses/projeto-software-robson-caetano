import { Role } from "@prisma/client";
import { Router } from "express";
import httpStatus from "http-status";

import { CreateAppointmentController } from "~/controllers/appointment/CreateAppointmentController";
import { DeleteAppointmentController } from "~/controllers/appointment/DeleteAppointmentController";
import { ListAppointmentsController } from "~/controllers/appointment/ListAppointmentController";
import { UpdateAppointmentController } from "~/controllers/appointment/UpdateAppointmentController";
import { authorizationMiddleware } from "~/middlewares/authorizationMiddleware";
import { DatabaseAppointmentRepositoryStrategy } from "~/repositories/appointment/DatabaseAppointmentRepositoryStrategy";
import { DatabasePatientRepositoryStrategy } from "~/repositories/patient/DatabasePatientRepositoryStrategy";
import { DatabaseUserRepositoryStrategy } from "~/repositories/user/DatabaseUserRepositoryStrategy";

export const appointmentRouter = Router();

const dbUserRepository = new DatabaseUserRepositoryStrategy();
const dbPatientsRepository = new DatabasePatientRepositoryStrategy();
const dbAppointmentRepository = new DatabaseAppointmentRepositoryStrategy();

appointmentRouter.use(authorizationMiddleware([Role.SECRETARY, Role.DOCTOR]));

appointmentRouter.get("/", async (_, res) => {
  const appointments = await new ListAppointmentsController(
    dbAppointmentRepository,
  ).listAppointments();

  res.json(appointments);
});

appointmentRouter.post("/", async (req, res) => {
  const appointment = await new CreateAppointmentController(
    dbUserRepository,
    dbPatientsRepository,
    dbAppointmentRepository,
  ).createAppointment({
    doctorId: req.body.doctorId,
    patientId: req.body.patientId,
  });

  res.status(httpStatus.CREATED).json(appointment);
});

appointmentRouter.put("/:id", async (req, res) => {
  const appointment = await new UpdateAppointmentController(
    new DatabaseAppointmentRepositoryStrategy(),
  ).updateAppointment({
    id: Number(req.params.id),
    status: req.body.status,
  });

  res.json(appointment);
});

appointmentRouter.delete("/:id", async (req, res) => {
  await new DeleteAppointmentController(
    new DatabaseAppointmentRepositoryStrategy(),
  ).deleteAppointment({
    id: Number(req.params.id),
  });

  res.sendStatus(httpStatus.NO_CONTENT);
});
