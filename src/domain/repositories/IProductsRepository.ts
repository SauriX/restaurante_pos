import { Product } from "../entities/Products";

export interface IProductsRepository{
    getProducts():Promise<Product[]>
}