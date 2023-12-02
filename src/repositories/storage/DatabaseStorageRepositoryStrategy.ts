import { PrismaClient, PrismaSingleton } from "~/config/database";
import { StorageRepositoryStrategy } from "./StorageRepositoryStrategy";
import { Storage } from "@prisma/client";

export class DatabaseStorageRepositoryStrategy implements StorageRepositoryStrategy {
  private db: PrismaClient;

  constructor() {
    this.db = PrismaSingleton.getInstance();
  }

  public async getByProductId(productId: number): Promise<Storage | null> {
    return this.db.storage.findUnique({ where: { productId } });
  }

  public async create(productId: number, quantity: number): Promise<Storage> {
    return this.db.storage.create({ data: { productId, quantity } });
  }

  public async list(): Promise<Storage[]> {
    return this.db.storage.findMany();
  }

  public async updateByProductId(productId: number, quantity: number): Promise<Storage> {
    return this.db.storage.update({ where: { productId }, data: { quantity } });
  }

  public async deleteByProductId(productId: number): Promise<void> {
    await this.db.storage.delete({ where: { productId } });
  }
}
