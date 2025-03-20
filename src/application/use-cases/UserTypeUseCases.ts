import { UserTypeForm, UserTypeList } from "@/domain/entities/UserType";
import { IdUserTypeRepository } from "@/domain/repositories/IUserTypeRepository";

export class UserTypeUseCases {
    constructor(private UserTypeRepository: IdUserTypeRepository) {}
    async getAllUserType(): Promise<UserTypeList[]> {
        return await this.UserTypeRepository.getAllUserType();
    }
    async getUserTypeById(id: number): Promise<UserTypeForm> {
        return await this.UserTypeRepository.getUserTypeById(id);
    }
    async createUserType(userType: UserTypeForm): Promise<UserTypeList> {
        return await this.UserTypeRepository.createUserType(userType);
    }
    async updateUserType(userType: UserTypeForm): Promise<UserTypeList> {
        return await this.UserTypeRepository.updateUserType(userType);
    }
}
