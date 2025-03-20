import { reactive } from "vue";
import { Category } from "@/domain/entities/Category";
import { ICategoryRepository } from "@/domain/repositories/ICategoryRepository";

export class CategoryesLocalRepository implements ICategoryRepository {

    private categories: Category[];
    constructor() {
    // JSON local dentro del código


    this.categories = reactive([
        { id: 1, name: "ENTRADAS",discunt :"" },
        { id: 2, name: "BEBIDAS",discunt :"" },
        { id: 3, name: "BURGERS",discunt :"" },
        { id: 4, name: "BONELESS",discunt :"" },
        { id: 5, name: "BOTANAS" ,discunt :""},
        { id: 6, name: "CUBETAZOS",discunt :"" },
        { id: 7, name: "TEKILAS",discunt :"" },
        { id: 8, name: "ALITAS" ,discunt :""},
        
    ]);
}

getCategories(): Promise<Category[]> {
    return Promise.resolve(this.categories);
}
}
