import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { reactive } from 'vue';

export  class LocalRepository implements IUserRepository{
  private data: User[];
  
  constructor() {
    // JSON local dentro del código
    this.data = reactive([  // ⬅ Hacer el array reactivo
      { id: 1, name: "Item 1", email: "email1@email.com" },
      { id: 2, name: "Item 2", email: "email2@email.com" },
      { id: 3, name: "Item 3", email: "email3@email.com" },
      { id: 3, name: "Item 3", email: "email3@email.com" },
      { id: 3, name: "Item 3", email: "email3@email.com" },
      { id: 3, name: "Item 3", email: "email3@email.com" },
      { id: 3, name: "Item 3", email: "email3@email.com" },
      { id: 3, name: "Item 3", email: "email3@email.com" },
      { id: 3, name: "Item 3", email: "email3@email.com" },
      { id: 3, name: "Item 3", email: "email3@email.com" },
      { id: 3, name: "Item 3", email: "email3@email.com" },
      { id: 3, name: "Item 3", email: "email3@email.com" },
      { id: 3, name: "Item 3", email: "email3@email.com" },
    ]);
  }
    getUsers(): Promise<User[]> {
        return Promise.resolve(this.data); // Devolver una promesa que resuelve los datos
    }
    createUser(user: User): Promise<void> {
        this.data.push(user);
  return Promise.resolve(); // Retorna una promesa que se resuelve sin valor
    }





  // Método para modificar un ítem por su ID
  updateItem(id: number, updatedItem: User): boolean {
    const index = this.data.findIndex(item => item.id === id);
    if (index !== -1) {
      this.data[index] = updatedItem;
      return true;
    }
    return false;
  }

  // Método para eliminar un ítem por su ID
  deleteItem(id: number): boolean {
    const index = this.data.findIndex(item => item.id === id);
    if (index !== -1) {
      this.data.splice(index, 1);
      return true;
    }
    return false;
  }
}
/*  */