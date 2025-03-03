import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { User } from "@/domain/entities/User";

export class GetUsersUseCase {
    static execute(): { id: number; name: string; email: string; }[] | PromiseLike<{ id: number; name: string; email: string; }[]> {
        throw new Error("Method not implemented.");
    }
    constructor(private userRepository: IUserRepository) {}
    async execute(): Promise<User[]> {
    return await this.userRepository.getUsers();
    }
}
