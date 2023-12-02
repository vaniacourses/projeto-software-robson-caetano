import { AppointmentStatus } from "@prisma/client";

export interface AppointmentState {
  transitionTo(status: AppointmentStatus): AppointmentState;

  getStatus(): AppointmentStatus;
}
