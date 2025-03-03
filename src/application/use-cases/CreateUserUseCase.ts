import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { User } from '@/domain/entities/User';

export class CreateUserUseCase {
    static execute(user: User) {
        throw new Error("Method not implemented."+user.name);
    }
    constructor(private userRepository: IUserRepository) {}

    async execute(user: User): Promise<void> {
        return await this.userRepository.createUser(user);
    }
}
