import { Role, User } from "@prisma/client";

export interface UserRepositoryStrategy {
  getById(id: number): Promise<User | null>;

  getByEmail(email: string): Promise<User | null>;

  create(
    data: Pick<User, "name" | "email" | "passwordHash" | "role">,
  ): Promise<User>;

  list(): Promise<User[]>;

  update(id: number, name: string, email: string): Promise<User>;

  delete(id: number): Promise<void>;

  listByRole(role: Role): Promise<User[]>;
}
