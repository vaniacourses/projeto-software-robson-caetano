import { AppointmentStatus } from "@prisma/client";
import { NotFoundError } from "~/errors/domain/NotFoundError";
import { AppointmentRepositoryStrategy } from "~/repositories/appointment/AppointmentRepositoryStrategy";
import { AppointmentContext as AppointmentStateContext } from "~/states/appointment/AppointmentContext";

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
      throw new NotFoundError("Consulta não encontrada");
    }

    const appointmentStateContext = new AppointmentStateContext(
      appointment.status,
    );
    const newState = appointmentStateContext.transitionTo(status);

    const updatedAppointment = await this.appointmentRepository.update(
      id,
      newState.getStatus(),
    );

    return updatedAppointment;
  }
}
