import { ProductRepositoryStrategy } from "~/repositories/product/ProductRepositoryStrategy";

export class ListProductsController {
  constructor(private readonly productRepository: ProductRepositoryStrategy) { }

  async listProducts() {
    const products = await this.productRepository.list();

    return products;
  }
}
