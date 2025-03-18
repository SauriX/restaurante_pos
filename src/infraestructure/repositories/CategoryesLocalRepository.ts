import { reactive } from "vue";
import { Category } from "@/domain/entities/Category";
import { ICategoryRepository } from "@/domain/repositories/ICategoryRepository";

export class CategoryesLocalRepository implements ICategoryRepository {

    private categories: Category[];
    constructor() {
    // JSON local dentro del código


    this.categories = reactive([
        { id: 1, name: "ENTRADAS" },
        { id: 2, name: "BEBIDAS" },
        { id: 3, name: "BURGERS" },
        { id: 4, name: "BONELESS" },
        { id: 5, name: "BOTANAS" },
        { id: 6, name: "CUBETAZOS" },
        { id: 7, name: "TEKILAS" },
        { id: 8, name: "ALITAS" },
        
    ]);
}

getCategories(): Promise<Category[]> {
    return Promise.resolve(this.categories);
}
}
