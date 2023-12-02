import { PatientRepositoryStrategy } from "~/repositories/patient/PatientRepositoryStrategy";

export class ListPatientsController {
  constructor(private readonly patientRepository: PatientRepositoryStrategy) {}

  async listPatients() {
    const patients = await this.patientRepository.list();

    return patients;
  }
}
