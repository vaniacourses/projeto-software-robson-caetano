import { StorageRepositoryStrategy } from "~/repositories/storage/StorageRepositoryStrategy";


interface Params {
  productId: number,
  quantity: number;
}

export class AddProductToStorageController {
  constructor(private storageRepository: StorageRepositoryStrategy) { }

  async addProductToStorage({ productId, quantity }: Params) {
    const storage = await this.storageRepository.create(productId, quantity);

    return storage;
  }
}
