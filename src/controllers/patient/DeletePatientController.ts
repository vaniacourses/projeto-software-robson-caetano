import { NotFoundError } from "~/errors/domain/NotFoundError";
import { PatientRepositoryStrategy } from "~/repositories/patient/PatientRepositoryStrategy";

interface Params {
  id: number;
}

export class DeletePatientController {
  constructor(private patientRepository: PatientRepositoryStrategy) {}

  async deletePatient({ id }: Params) {
    const patient = await this.patientRepository.getById(id);

    if (!patient) {
      throw new NotFoundError("Paciente não encontrado");
    }

    await this.patientRepository.delete(id);
  }
}
