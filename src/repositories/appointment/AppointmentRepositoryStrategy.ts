import { Appointment, AppointmentStatus } from "@prisma/client";

export interface AppointmentRepositoryStrategy {
  getById(id: number): Promise<Appointment | null>;

  create(
    data: Pick<Appointment, "doctorId" | "patientId" | "status">,
  ): Promise<Appointment>;

  list(): Promise<Appointment[]>;

  update(id: number, status: AppointmentStatus): Promise<Appointment>;

  delete(id: number): Promise<void>;
}
