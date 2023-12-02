import { NotFoundError } from "~/errors/domain/NotFoundError";
import { ProductRepositoryStrategy } from "~/repositories/product/ProductRepositoryStrategy";

interface Params {
  id: number;
}

export class DeleteProductController {
  constructor(private productRepository: ProductRepositoryStrategy) { }

  async deleteProduct({ id }: Params) {
    const product = await this.productRepository.getById(id);

    if (!product) {
      throw new NotFoundError("Produto não encontrado");
    }

    await this.productRepository.delete(id);
  }
}
