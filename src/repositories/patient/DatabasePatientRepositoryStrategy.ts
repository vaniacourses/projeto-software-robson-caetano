import { PrismaClient, PrismaSingleton } from "~/config/database";
import { Patient } from "@prisma/client";
import {
  PatientData,
  PatientRepositoryStrategy,
} from "./PatientRepositoryStrategy";

export class DatabasePatientRepositoryStrategy
  implements PatientRepositoryStrategy
{
  private db: PrismaClient;

  constructor() {
    this.db = PrismaSingleton.getInstance();
  }

  getById(id: number): Promise<Patient | null> {
    return this.db.patient.findUnique({
      where: {
        id,
      },
    });
  }

  getByCpf(cpf: string): Promise<Patient | null> {
    return this.db.patient.findUnique({
      where: {
        cpf,
      },
    });
  }

  create(data: PatientData): Promise<Patient> {
    return this.db.patient.create({
      data,
    });
  }

  list(): Promise<Patient[]> {
    return this.db.patient.findMany();
  }

  update(id: number, data: Omit<PatientData, "cpf">): Promise<Patient> {
    return this.db.patient.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.db.patient.delete({
      where: {
        id,
      },
    });
  }
}
