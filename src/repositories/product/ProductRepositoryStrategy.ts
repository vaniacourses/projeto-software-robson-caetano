import { Product } from "@prisma/client";

export interface ProductRepositoryStrategy {
  getById(id: number): Promise<Product | null>;

  create(name: string): Promise<Product>;

  list(): Promise<Product[]>;

  update(id: number, name: string): Promise<Product>;

  delete(id: number): Promise<void>;
}
