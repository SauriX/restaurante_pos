import { Category, CategoryForm } from "@/domain/entities/Category";
import { ICategoryRepository } from "@/domain/repositories/ICategoryRepository";
import requests from "../agents/agent";

export class CategoryRepository implements ICategoryRepository {
    async getCategories(): Promise<Category[]> {
        return await requests.get("api/Category/all");
    }
    async getActiveCategories(): Promise<Category[]> {
        return await requests.get("api/Category/actives");
    }
    async getCategoryByID(id: number): Promise<CategoryForm> {
        return await requests.get(`api/Category/${id}`);
    }
    async addCategorie(category: CategoryForm): Promise<Category> {
        return await requests.post("api/Category",category);
    }
    async updateCtegory(category: CategoryForm): Promise<Category> {
        return await requests.put("api/Category",category);
    }
}