import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { reactive } from "vue";

export class FetchRepository implements IUserRepository {

  private readonly API_URL = 'https://localhost:44388/api/Mi/Users';

  async getUsers(): Promise<User[]> {
    const response = await fetch(this.API_URL);
    const data: User[] = await response.json();
      return data;
  }

  async createUser(user: User): Promise<void> {
    const response = await fetch('https://api.example.com/users', { // ⬅ URL del backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  
    if (!response.ok) {
      throw new Error('Error al agregar el usuario');
    }
  }


}
/*  */
