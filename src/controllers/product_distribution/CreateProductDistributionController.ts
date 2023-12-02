import { NotFoundError } from "~/errors/domain/NotFoundError";
import { UnprocessableEntityError } from "~/errors/domain/UnprocessableEntityError";
import { ProductRepositoryStrategy } from "~/repositories/product/ProductRepositoryStrategy";
import { ProductDistributionRepositoryStrategy } from "~/repositories/product_distribution/ProductDistributionRepositoryStrategy";
import { RoomRepositoryStrategy } from "~/repositories/room/RoomRepositoryStrategy";
import { StorageRepositoryStrategy } from "~/repositories/storage/StorageRepositoryStrategy";

interface Params {
  roomId: number;
  productId: number;
  quantity: number;
}

export class CreateProductDistributionController {
  constructor(
    private roomRepository: RoomRepositoryStrategy,
    private productRepository: ProductRepositoryStrategy,
    private storageRepository: StorageRepositoryStrategy,
    private productDistributionRepository: ProductDistributionRepositoryStrategy,
  ) {}

  async createProductDistribution({ roomId, productId, quantity }: Params) {
    // Verificar se a sala existe
    const room = await this.roomRepository.getById(roomId);
    if (!room) {
      throw new NotFoundError("Sala não encontrada");
    }

    // Verificar se o produto existe
    const product = await this.productRepository.getById(productId);
    if (!product) {
      throw new NotFoundError("Produto não encontrado");
    }

    // Verificar a quantidade disponível no armazenamento
    const storage = await this.storageRepository.getByProductId(productId);
    if (!storage || storage.quantity < quantity) {
      throw new UnprocessableEntityError(
        "não possui quantidade sufiente no estoque para realizar o cadastro",
      );
    }

    // Criar a distribuição do produto
    const productDistribution = await this.productDistributionRepository.create(
      roomId,
      productId,
      quantity,
    );

    if (storage.quantity === quantity) {
      // Quantidade do produto acabou no estoque
      await this.storageRepository.deleteByProductId(productId);
    } else {
      // Atualizar a quantidade no armazenamento
      await this.storageRepository.updateByProductId(
        productId,
        storage.quantity - quantity,
      );
    }

    return productDistribution;
  }
}

