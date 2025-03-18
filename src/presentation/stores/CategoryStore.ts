import { CategoryUseCases } from "@/application/use-cases/CategoryUseCases";
import { Category } from "@/domain/entities/Category";
import { CategoryesLocalRepository } from "@/infraestructure/repositories/CategoryesLocalRepository";
import { defineStore } from "pinia";
const categoryRepository = new CategoryesLocalRepository();
const categoryUsecase = new CategoryUseCases(categoryRepository);

export const CategoryStore = defineStore("Categorias",{
    state:()=>({
        categories: [] as Category[]
    }),
    actions:{
        async getCategories(){
            this.categories = await categoryUsecase.getCategories();
        }
    }
});