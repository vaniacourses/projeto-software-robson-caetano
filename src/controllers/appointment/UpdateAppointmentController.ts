import { AppointmentStatus } from "@prisma/client";
import { NotFoundError } from "~/errors/domain/NotFoundError";
import { UnprocessableEntityError } from "~/errors/domain/UnprocessableEntityError";
import { AppointmentRepositoryStrategy } from "~/repositories/appointment/AppointmentRepositoryStrategy";

interface Params {
  id: number;
  status: AppointmentStatus;
}

export class UpdateAppointmentController {
  constructor(
    private readonly appointmentRepository: AppointmentRepositoryStrategy,
  ) {}

  async updateAppointment({ id, status }: Params) {
    const appointment = await this.appointmentRepository.getById(id);

    if (!appointment) {
      throw new NotFoundError("Consulta não encontrado");
    }

    const transition = allowedTransitions.find(
      (transition) =>
        transition.from === appointment.status && transition.to === status,
    );

    if (!transition) {
      throw new UnprocessableEntityError(
        "Não é possível alterar o status da consulta",
      );
    }

    const updatedAppointment = await this.appointmentRepository.update(
      id,
      status,
    );

    return updatedAppointment;
  }
}

// TODO: Kayalla - use state pattern here
const allowedTransitions = [
  {
    from: AppointmentStatus.SCHEDULED,
    to: AppointmentStatus.ON_GOING,
  },
  {
    from: AppointmentStatus.SCHEDULED,
    to: AppointmentStatus.CANCELED,
  },
  {
    from: AppointmentStatus.ON_GOING,
    to: AppointmentStatus.DONE,
  },
];
