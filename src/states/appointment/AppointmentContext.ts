import { AppointmentStatus } from "@prisma/client";
import { AppointmentState } from "./AppointmentState";
import { AppointmentStateFactory } from "./AppointmentStateFactory";

export class AppointmentContext {
  private state: AppointmentState;

  constructor(currentStatus: AppointmentStatus) {
    this.state = AppointmentStateFactory.create(currentStatus);
  }

  transitionTo(status: AppointmentStatus): AppointmentState {
    this.state = this.state.transitionTo(status);

    return this.state;
  }
}
