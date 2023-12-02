import { NotFoundError } from "~/errors/domain/NotFoundError";
import { StorageRepositoryStrategy } from "~/repositories/storage/StorageRepositoryStrategy";

interface Params {
  productId: number,
  quantity: number;
}

export class UpdateProductQuantityOnStorageController {
  constructor(private readonly storageRepository: StorageRepositoryStrategy) { }

  async updateProductQuantityOnStorage({ productId, quantity }: Params) {
    let storage = await this.storageRepository.getByProductId(productId);

    if (!storage) {
      throw new NotFoundError("Produto não encontrado no estoque");
    }

    storage = await this.storageRepository.updateByProductId(productId, quantity);

    return storage;
  }
}
