import { Storage } from "@prisma/client";

export interface StorageRepositoryStrategy {
  getByProductId(productId: number): Promise<Storage | null>;

  create(productId: number, quantity: number): Promise<Storage>;

  list(): Promise<Storage[]>;

  updateByProductId(productId: number, quantity: number): Promise<Storage>;

  deleteByProductId(productId: number): Promise<void>;
}
