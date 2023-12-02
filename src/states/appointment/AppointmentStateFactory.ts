import { AppointmentStatus } from "@prisma/client";
import { DoneAppointmentState } from "./DoneAppointmentState";
import { CanceledAppointmentState } from "./CanceledAppointmentState";
import { ScheduledAppointmentState } from "./ScheduledAppointmentState";
import { OnGoingAppointmentState } from "./OnGoingAppointmentState";
import { UnprocessableEntityError } from "~/errors/domain/UnprocessableEntityError";

export class AppointmentStateFactory {
  public static create(status: AppointmentStatus) {
    switch (status) {
      case AppointmentStatus.DONE:
        return new DoneAppointmentState();

      case AppointmentStatus.CANCELED:
        return new CanceledAppointmentState();

      case AppointmentStatus.SCHEDULED:
        return new ScheduledAppointmentState();

      case AppointmentStatus.ON_GOING:
        return new OnGoingAppointmentState();

      default:
        throw new UnprocessableEntityError(
          "Estado inconsistente. Por favor contate um administrador do sistema.",
        );
    }
  }
}
