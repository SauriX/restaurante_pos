import { UserTypeForm, UserTypeList } from "@/domain/entities/UserType";
import { IdUserTypeRepository } from "@/domain/repositories/IUserTypeRepository";

export class UserTypeUseCases {
    constructor(private UserTypeRepository: IdUserTypeRepository) {}
    async getAllUserType(): Promise<UserTypeList[]> {
        return this.UserTypeRepository.getAllUserType();
    }
    async getUserTypeById(id: number): Promise<UserTypeForm> {
        return this.UserTypeRepository.getUserTypeById(id);
    }
    async createUserType(userType: UserTypeForm): Promise<UserTypeList> {
        return this.UserTypeRepository.createUserType(userType);
    }
    async updateUserType(userType: UserTypeForm): Promise<UserTypeList> {
        return this.UserTypeRepository.updateUserType(userType);
    }
}
