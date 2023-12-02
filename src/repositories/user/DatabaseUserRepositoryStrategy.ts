import { PrismaClient, PrismaSingleton } from "~/config/database";
import { UserRepositoryStrategy } from "./UserRepositoryStrategy";
import { User } from "@prisma/client";

export class DatabaseUserRepositoryStrategy implements UserRepositoryStrategy {
  private db: PrismaClient;

  constructor() {
    this.db = PrismaSingleton.getInstance();
  }

  public async getById(id: number): Promise<User | null> {
    return this.db.user.findUnique({ where: { id }, include: { ProductDistribution: true } });
  }

  public async getByEmail(email: string): Promise<User | null> {
    return this.db.user.findUnique({ where: { email }, include: { ProductDistribution: true } });
  }

  public async create({
    name,
    email,
    passwordHash,
    role,
  }: Pick<User, "name" | "email" | "passwordHash" | "role">): Promise<User> {
    return this.db.user.create({ data: { name, email, passwordHash, role } });
  }

  public async list(): Promise<User[]> {
    return this.db.user.findMany({ include: { ProductDistribution: true } });
  }

  public async update(id: number, name: string, email: string): Promise<User> {
    return this.db.user.update({ where: { id }, data: { name, email } });
  }

  public async delete(id: number): Promise<void> {
    await this.db.user.delete({ where: { id } });
  }
}
