import { Product } from "@/domain/entities/Products";
import { IProductsRepository } from "@/domain/repositories/IProductsRepository";

export class ProductsUseCases {
    constructor(private ProductsRepository: IProductsRepository) {}
    async getProducts(): Promise<Product[]> {
        return this.ProductsRepository.getProducts();
    }
}
