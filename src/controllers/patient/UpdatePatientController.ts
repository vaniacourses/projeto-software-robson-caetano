import { NotFoundError } from "~/errors/domain/NotFoundError";
import { PatientRepositoryStrategy } from "~/repositories/patient/PatientRepositoryStrategy";

interface Params {
  id: number;
  name: string;
  email: string;
}

export class UpdatePatientController {
  constructor(private readonly patientRepository: PatientRepositoryStrategy) {}

  async updatePatient({ id, name, email }: Params) {
    let patient = await this.patientRepository.getById(id);

    if (!patient) {
      throw new NotFoundError("Paciente não encontrado");
    }

    patient = await this.patientRepository.update(id, { name, email });

    return patient;
  }
}
