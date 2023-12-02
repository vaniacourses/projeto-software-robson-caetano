import { AppointmentStatus } from "@prisma/client";
import { AppointmentState } from "./AppointmentState";
import { UnprocessableEntityError } from "~/errors/domain/UnprocessableEntityError";

export class DoneAppointmentState implements AppointmentState {
  getStatus(): AppointmentStatus {
    return AppointmentStatus.DONE;
  }

  transitionTo(_: AppointmentStatus): AppointmentState {
    throw new UnprocessableEntityError(
      "Não foi possível mudar o status do agendamento.",
    );
  }
}
