import { NotFoundError } from "~/errors/domain/NotFoundError";
import { StorageRepositoryStrategy } from "~/repositories/storage/StorageRepositoryStrategy";

interface Params {
  productId: number;
}

export class DeleteProductFromStorageController {
  constructor(private storageRepository: StorageRepositoryStrategy) { }

  async deleteProductFromStorage({ productId }: Params) {
    const storage = await this.storageRepository.getByProductId(productId);

    if (!storage) {
      throw new NotFoundError("Produto não encontrado no estoque");
    }

    await this.storageRepository.deleteByProductId(productId);
  }
}
