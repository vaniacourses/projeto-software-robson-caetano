import { PrismaClient, PrismaSingleton } from "~/config/database";
import { Product } from "@prisma/client";
import { ProductRepositoryStrategy } from "./ProductRepositoryStrategy";

export class DatabaseProductRepositoryStrategy implements ProductRepositoryStrategy {
  private db: PrismaClient;

  constructor() {
    this.db = PrismaSingleton.getInstance();
  }

  public async getById(id: number): Promise<Product | null> {
    return this.db.product.findUnique({ where: { id }, include: { storage: true, ProductDistribution: true } });
  }

  public async create(name: string): Promise<Product> {
    return this.db.product.create({ data: { name } });
  }

  public async list(): Promise<Product[]> {
    return this.db.product.findMany({ include: { storage: true, ProductDistribution: true } });
  }

  public async update(id: number, name: string): Promise<Product> {
    return this.db.product.update({ where: { id }, data: { name } });
  }

  public async delete(id: number): Promise<void> {
    await this.db.product.delete({ where: { id } });
  }
}
