import { AppointmentRepositoryStrategy } from "~/repositories/appointment/AppointmentRepositoryStrategy";

export class ListAppointmentsController {
  constructor(
    private readonly appointmentRepository: AppointmentRepositoryStrategy,
  ) {}

  async listAppointments() {
    const appointments = await this.appointmentRepository.list();

    return appointments;
  }
}
