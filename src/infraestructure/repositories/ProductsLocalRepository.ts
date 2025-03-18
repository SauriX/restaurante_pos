import { Product } from "@/domain/entities/Products";
import { IProductsRepository } from "@/domain/repositories/IProductsRepository";
import { reactive } from "vue";

export class ProductsLocalRepository implements IProductsRepository {
  private Products: Product[];
  constructor() {
    this.Products = reactive([
      {
        id: 1,
        category: 2,
        name: "PITAYA",
        img: "https://picsum.photos/250/250/?image=54",
        price: 35.0,
        color: "#777",
        extras: [
          { nombre: "Extra Queso", precio: 2.0 },
          { nombre: "Sin Cebolla", precio: 0.0 },
        ],
      },
      {
        id: 2,
        category: 3,
        name: "MOZZARELA",
        img: "https://picsum.photos/250/250/?image=54",
        price: 85.0,
        color: "#777",
        extras: [
          { nombre: "Extra Queso", precio: 2.0 },
          { nombre: "Sin Cebolla", precio: 0.0 },
        ],
      },
      {
        id: 3,
        category: 3,
        name: "SUPREMA",
        img: "https://picsum.photos/250/250/?image=54",
        price: 100.0,
        color: "#777",
        extras: [
          { nombre: "Extra Queso", precio: 2.0 },
          { nombre: "Sin Cebolla", precio: 0.0 },
        ],
      },
      {
        id: 4,
        category: 3,
        name: "KGB",
        img: "",
        price: 150.0,
        color: "red",
        extras: [
          { nombre: "Extra Queso", precio: 2.0 },
          { nombre: "Sin Cebolla", precio: 0.0 },
        ],
      },
      {
        id: 5,
        category: 8,
        name: "ALITAS 1/2",
        img: "https://picsum.photos/250/250/?image=54",
        price: 350.0,
        color: "#777",
        extras: [
          { nombre: "Extra Queso", precio: 2.0 },
          { nombre: "Sin Cebolla", precio: 0.0 },
        ],
      },
      {
        id: 6,
        category: 8,
        name: "ALITAS 25PZ",
        img: "https://picsum.photos/250/250/?image=54",
        price: 385.0,
        color: "#777",
        extras: [
          { nombre: "Extra Queso", precio: 2.0 },
          { nombre: "Sin Cebolla", precio: 0.0 },
        ],
      },
    ]);
  }
  getProducts(): Promise<Product[]> {
    return Promise.resolve(this.Products);
  }
}
