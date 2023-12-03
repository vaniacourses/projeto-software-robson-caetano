import { AppointmentStatus, Role } from "@prisma/client";
import { UnprocessableEntityError } from "~/errors/domain/UnprocessableEntityError";
import { AppointmentRepositoryStrategy } from "~/repositories/appointment/AppointmentRepositoryStrategy";
import { PatientRepositoryStrategy } from "~/repositories/patient/PatientRepositoryStrategy";
import { RoomRepositoryStrategy } from "~/repositories/room/RoomRepositoryStrategy";
import { UserRepositoryStrategy } from "~/repositories/user/UserRepositoryStrategy";

interface Params {
  doctorId: number;
  patientId: number;
  roomId: number;
}

export class CreateAppointmentController {
  constructor(
    private usersRepository: UserRepositoryStrategy,
    private patientsRepository: PatientRepositoryStrategy,
    private appointmentRepository: AppointmentRepositoryStrategy,
    private roomRepository: RoomRepositoryStrategy
  ) { }

  async createAppointment({ doctorId, patientId, roomId }: Params) {
    const doctor = await this.usersRepository.getById(doctorId);

    if (!doctor || doctor.role !== Role.DOCTOR) {
      throw new UnprocessableEntityError("Médico não encontrado");
    }

    const room = await this.roomRepository.getById(roomId);

    if (!room) {
      throw new UnprocessableEntityError("Sala não encontrada");
    }

    const patient = await this.patientsRepository.getById(patientId);

    if (!patient) {
      throw new UnprocessableEntityError("Paciente não encontrado");
    }

    const appointment = await this.appointmentRepository.create({
      doctorId: doctor.id,
      patientId: patient.id,
      roomId: room.id,
      status: AppointmentStatus.SCHEDULED,
    });

    return appointment;
  }
}
