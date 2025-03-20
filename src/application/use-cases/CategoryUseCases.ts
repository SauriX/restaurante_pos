import { Category, CategoryForm } from "@/domain/entities/Category";
import { ICategoryRepository } from "@/domain/repositories/ICategoryRepository";

export class CategoryUseCases{
    //constructor que resive la inyeccion del repositorio
    constructor(private categoryRepository:ICategoryRepository){}
    
    async getCategories():Promise<Category[]>{
        return  await this.categoryRepository.getCategories();
    }
    async getActiveCategories():Promise<Category[]>{
        return await this.categoryRepository.getActiveCategories();
    }
    async getCategoryByID(id:number):Promise<CategoryForm>{
        return await this.categoryRepository.getCategoryByID(id);
    }
    async addCategorie(category:CategoryForm):Promise<Category>{
        return await this.categoryRepository.addCategorie(category);
    }
    async updateCtegory(category:CategoryForm):Promise<Category>{
        return await this.categoryRepository.updateCtegory(category);
    }
}