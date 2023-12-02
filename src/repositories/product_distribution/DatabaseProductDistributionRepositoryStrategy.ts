import { ProductDistribution } from "@prisma/client";
import { PrismaClient, PrismaSingleton } from "~/config/database";
import { ProductDistributionRepositoryStrategy } from "./ProductDistributionRepositoryStrategy";

export class DatabaseProductDistributionRepositoryStrategy
  implements ProductDistributionRepositoryStrategy
{
  private db: PrismaClient;

  constructor() {
    this.db = PrismaSingleton.getInstance();
  }

  public async create(
    roomId: number,
    productId: number,
    quantity: number,
  ): Promise<ProductDistribution> {
    return this.db.productDistribution.create({
      data: { roomId, productId, quantity },
    });
  }

  public async update(
    id: number,
    quantity: number,
  ): Promise<ProductDistribution> {
    return this.db.productDistribution.update({
      where: { id },
      data: { quantity },
    });
  }

  public async delete(id: number): Promise<void> {
    await this.db.productDistribution.delete({ where: { id } });
  }

  public async findByRoomAndProduct({
    productId,
    roomId,
  }: Pick<
    ProductDistribution,
    "roomId" | "productId"
  >): Promise<ProductDistribution | null> {
    return this.db.productDistribution.findFirst({
      where: { productId, roomId },
    });
  }
}
