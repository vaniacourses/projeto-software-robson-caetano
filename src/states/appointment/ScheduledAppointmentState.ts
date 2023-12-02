import { AppointmentStatus } from "@prisma/client";
import { AppointmentState } from "./AppointmentState";
import { OnGoingAppointmentState } from "./OnGoingAppointmentState";
import { CanceledAppointmentState } from "./CanceledAppointmentState";
import { UnprocessableEntityError } from "~/errors/domain/UnprocessableEntityError";

export class ScheduledAppointmentState implements AppointmentState {
  getStatus(): AppointmentStatus {
    return AppointmentStatus.SCHEDULED;
  }

  transitionTo(status: AppointmentStatus): AppointmentState {
    if (status === AppointmentStatus.ON_GOING) {
      return new OnGoingAppointmentState();
    }

    if (status === AppointmentStatus.CANCELED) {
      return new CanceledAppointmentState();
    }

    throw new UnprocessableEntityError(
      "Não foi possível mudar o status do agendamento.",
    );
  }
}
