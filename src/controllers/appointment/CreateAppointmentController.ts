import { AppointmentStatus, Role } from "@prisma/client";
import { UnprocessableEntityError } from "~/errors/domain/UnprocessableEntityError";
import { AppointmentRepositoryStrategy } from "~/repositories/appointment/AppointmentRepositoryStrategy";
import { PatientRepositoryStrategy } from "~/repositories/patient/PatientRepositoryStrategy";
import { UserRepositoryStrategy } from "~/repositories/user/UserRepositoryStrategy";

interface Params {
  doctorId: number;
  patientId: number;
}

export class CreateAppointmentController {
  constructor(
    private usersRepository: UserRepositoryStrategy,
    private patientsRepository: PatientRepositoryStrategy,
    private appointmentRepository: AppointmentRepositoryStrategy,
  ) {}

  async createAppointment({ doctorId, patientId }: Params) {
    const doctor = await this.usersRepository.getById(doctorId);

    if (!doctor || doctor.role !== Role.DOCTOR) {
      throw new UnprocessableEntityError("Médico não encontrado");
    }

    const patient = await this.patientsRepository.getById(patientId);

    if (!patient) {
      throw new UnprocessableEntityError("Paciente não encontrado");
    }

    const appointment = await this.appointmentRepository.create({
      doctorId: doctor.id,
      patientId: patient.id,
      status: AppointmentStatus.SCHEDULED,
    });

    return appointment;
  }
}
