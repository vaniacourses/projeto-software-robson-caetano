import { UnprocessableEntityError } from "~/errors/domain/UnprocessableEntityError";
import { ProductDistributionRepositoryStrategy } from "~/repositories/product_distribution/ProductDistributionRepositoryStrategy";

interface Params {
  roomId: number;
  productId: number;
  quantity: number;
}

export class ConsumeProductsOfRoomController {
  constructor(
    private readonly productDistributionRepository: ProductDistributionRepositoryStrategy,
  ) {}

  async consumeProductsOfRoom({ roomId, productId, quantity }: Params) {
    const productDistribution =
      await this.productDistributionRepository.findByRoomAndProduct({
        roomId,
        productId,
      });

    if (!productDistribution) {
      throw new UnprocessableEntityError(
        "Esta sala não possui este produto no armazenamento.",
      );
    }

    if (productDistribution.quantity < quantity) {
      throw new UnprocessableEntityError(
        "A quantidade informada é maior que a quantidade disponível no armazenamento da sala.",
      );
    }

    if (productDistribution.quantity === quantity) {
      await this.productDistributionRepository.delete(productDistribution.id);
    } else {
      await this.productDistributionRepository.update(
        productDistribution.id,
        productDistribution.quantity - quantity,
      );
    }
  }
}
