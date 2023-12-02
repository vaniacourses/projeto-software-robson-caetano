import { ProductDistribution } from "@prisma/client";

export interface ProductDistributionRepositoryStrategy {
    create(roomId: number, productId: number, quantity: number, distributedByUserId: number): Promise<ProductDistribution>;

    update(id: number, quantity: number): Promise<ProductDistribution>;

    delete(id: number): Promise<void>;
}