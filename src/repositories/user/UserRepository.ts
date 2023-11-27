import { User } from "~/models/user";

export interface UserRepository {
  getById(id: number): Promise<User | null>;

  getByEmail(email: string): Promise<User | null>;

  create(name: string, email: string): Promise<User>;

  list(): Promise<User[]>;

  update(id: number, name: string, email: string): Promise<User>;

  delete(id: number): Promise<void>;
}
