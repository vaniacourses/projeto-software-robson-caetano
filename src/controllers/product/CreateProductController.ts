import { ProductRepositoryStrategy } from "~/repositories/product/ProductRepositoryStrategy";

interface Params {
  name: string;
}

export class CreateProductController {
  constructor(private productRepository: ProductRepositoryStrategy) { }

  async createProduct({ name }: Params) {
    const product = await this.productRepository.create(name);

    return product;
  }
}
