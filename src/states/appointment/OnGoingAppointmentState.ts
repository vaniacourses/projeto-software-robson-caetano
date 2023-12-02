import { AppointmentStatus } from "@prisma/client";
import { AppointmentState } from "./AppointmentState";
import { DoneAppointmentState } from "./DoneAppointmentState";
import { UnprocessableEntityError } from "~/errors/domain/UnprocessableEntityError";

export class OnGoingAppointmentState implements AppointmentState {
  getStatus(): AppointmentStatus {
    return AppointmentStatus.ON_GOING;
  }

  transitionTo(status: AppointmentStatus): AppointmentState {
    if (status === AppointmentStatus.DONE) {
      return new DoneAppointmentState();
    }

    throw new UnprocessableEntityError(
      "Não foi possível mudar o status do agendamento.",
    );
  }
}
