import { PrismaClient, PrismaSingleton } from "~/config/database";
import { AppointmentRepositoryStrategy } from "./AppointmentRepositoryStrategy";
import { Appointment, AppointmentStatus } from "@prisma/client";

export class DatabaseAppointmentRepositoryStrategy
  implements AppointmentRepositoryStrategy {
  private db: PrismaClient;

  constructor() {
    this.db = PrismaSingleton.getInstance();
  }

  public async getById(id: number): Promise<Appointment | null> {
    return this.db.appointment.findUnique({
      where: { id },
      include: {
        doctor: true,
        patient: true,
        room: true
      },
    });
  }

  public async create({
    patientId,
    doctorId,
    roomId,
    status,
  }: Pick<
    Appointment,
    "doctorId" | "patientId" | "roomId" | "status"
  >): Promise<Appointment> {
    return this.db.appointment.create({
      data: { status, patientId, doctorId, roomId },
    });
  }

  public async list(): Promise<Appointment[]> {
    return this.db.appointment.findMany({
      include: {
        doctor: true,
        patient: true,
        room: true
      },
    });
  }

  public async update(
    id: number,
    status: AppointmentStatus,
  ): Promise<Appointment> {
    return this.db.appointment.update({ where: { id }, data: { status } });
  }

  public async delete(id: number): Promise<void> {
    await this.db.appointment.delete({ where: { id } });
  }
}
