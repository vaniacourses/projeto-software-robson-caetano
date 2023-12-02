import { StorageRepositoryStrategy } from "~/repositories/storage/StorageRepositoryStrategy";


export class ListProductsOnStorageController {
  constructor(private readonly storageRepository: StorageRepositoryStrategy) { }

  async listProductsOnStorage() {
    const storage = await this.storageRepository.list();

    return storage;
  }
}
