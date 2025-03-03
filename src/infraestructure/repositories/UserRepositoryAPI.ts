import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { User } from '@/domain/entities/User';
import axios from 'axios';

export class UserRepositoryAPI implements IUserRepository {
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/users';

  async getUsers(): Promise<User[]> {
    const response = await axios.get(this.API_URL);
    return response.data.map((user: any) => new User(user.id, user.name, user.email));
  }

  async createUser(user: User): Promise<void> {
    await axios.post(this.API_URL, user);
  }
}
