import { NotFoundError } from "~/errors/domain/NotFoundError";
import { AppointmentRepositoryStrategy } from "~/repositories/appointment/AppointmentRepositoryStrategy";

interface Params {
  id: number;
}

export class DeleteAppointmentController {
  constructor(private appointmentRepository: AppointmentRepositoryStrategy) {}

  async deleteAppointment({ id }: Params) {
    const appointment = await this.appointmentRepository.getById(id);

    if (!appointment) {
      throw new NotFoundError("Consulta não encontrada");
    }

    await this.appointmentRepository.delete(id);
  }
}
