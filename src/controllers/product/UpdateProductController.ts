import { NotFoundError } from "~/errors/domain/NotFoundError";
import { ProductRepositoryStrategy } from "~/repositories/product/ProductRepositoryStrategy";

interface Params {
  id: number;
  name: string;
}

export class UpdateProductController {
  constructor(private readonly productRepository: ProductRepositoryStrategy) { }

  async updateProduct({ id, name }: Params) {
    let product = await this.productRepository.getById(id);

    if (!product) {
      throw new NotFoundError("Produto não encontrado");
    }

    product = await this.productRepository.update(id, name);

    return product;
  }
}
