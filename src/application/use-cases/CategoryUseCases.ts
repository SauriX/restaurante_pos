import { Category } from "@/domain/entities/Category";
import { ICategoryRepository } from "@/domain/repositories/ICategoryRepository";

export class CategoryUseCases{
    //constructor que resive la inyeccion del repositorio
    constructor(private categoryRepository:ICategoryRepository){}
    
    async getCategories():Promise<Category[]>{
        return this.categoryRepository.getCategories();
    }
}