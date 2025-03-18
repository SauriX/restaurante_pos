import { ProductsUseCases } from "@/application/use-cases/ProductsUseCases";
import { Product } from "@/domain/entities/Products";
import { ProductsLocalRepository } from "@/infraestructure/repositories/ProductsLocalRepository";
import { defineStore } from "pinia";
const productsRepository = new ProductsLocalRepository();
const productsUseCases = new ProductsUseCases(productsRepository);
export const ProductStore = defineStore('Productos',{
    state:()=>({
        products:[] as Product[],
    }),
    actions:{
        async getProducts (){
            this.products = await productsUseCases.getProducts();
            
        }
    }
});