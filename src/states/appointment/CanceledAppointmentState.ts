import { AppointmentStatus } from "@prisma/client";
import { AppointmentState } from "./AppointmentState";
import { UnprocessableEntityError } from "~/errors/domain/UnprocessableEntityError";

export class CanceledAppointmentState implements AppointmentState {
  getStatus(): AppointmentStatus {
    return AppointmentStatus.CANCELED;
  }

  transitionTo(_: AppointmentStatus): AppointmentState {
    throw new UnprocessableEntityError(
      "Não foi possível mudar o status do agendamento.",
    );
  }
}
