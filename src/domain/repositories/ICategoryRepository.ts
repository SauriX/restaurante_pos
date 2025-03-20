import { Category, CategoryForm } from "../entities/Category";

export interface ICategoryRepository {
    getCategories():Promise<Category[]>,
    getActiveCategories():Promise<Category[]>,
    getCategoryByID(id:number):Promise<CategoryForm>,
    addCategorie(category:CategoryForm):Promise<Category>,
    updateCtegory(category:CategoryForm):Promise<Category>
}