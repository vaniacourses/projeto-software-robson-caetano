import { User } from "@prisma/client";

export interface UserRepositoryStrategy {
  getById(id: number): Promise<User | null>;

  getByEmail(email: string): Promise<User | null>;

  create(data: Pick<User, "name" | "email" | "passwordHash">): Promise<User>;

  list(): Promise<User[]>;

  update(id: number, name: string, email: string): Promise<User>;

  delete(id: number): Promise<void>;
}
