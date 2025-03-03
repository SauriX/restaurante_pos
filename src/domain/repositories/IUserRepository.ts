import { User } from "../entities/User";

export interface IUserRepository {
    getUsers(): Promise<User[]>;
    createUser(user: User): Promise<void>;
}
