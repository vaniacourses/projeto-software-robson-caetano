import { ConflictError } from "~/errors/domain/ConflictError";
import { PatientRepositoryStrategy } from "~/repositories/patient/PatientRepositoryStrategy";

interface Params {
  name: string;
  email: string;
  cpf: string;
}

export class CreatePatientController {
  constructor(private patientRepository: PatientRepositoryStrategy) {}

  async createPatient({ name, email, cpf }: Params) {
    const existingPatient = await this.patientRepository.getByCpf(cpf);

    if (existingPatient) {
      throw new ConflictError("CPF já cadastrado");
    }

    const patient = await this.patientRepository.create({ name, email, cpf });

    return patient;
  }
}
