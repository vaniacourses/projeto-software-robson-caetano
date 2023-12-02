import { Patient } from "@prisma/client";
import { Omit } from "@prisma/client/runtime/library";

export type PatientData = Pick<Patient, "name" | "cpf" | "email">;

export interface PatientRepositoryStrategy {
  getById(id: number): Promise<Patient | null>;

  getByCpf(cpf: string): Promise<Patient | null>;

  create(data: PatientData): Promise<Patient>;

  list(): Promise<Patient[]>;

  update(id: number, data: Omit<PatientData, "cpf">): Promise<Patient>;

  delete(id: number): Promise<void>;
}
