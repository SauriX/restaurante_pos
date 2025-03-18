import { UserTypeUseCases } from "@/application/use-cases/UserTypeUseCases";
import { UserTypeForm, UserTypeList } from "@/domain/entities/UserType";
import { UserTypeRepository } from "@/infraestructure/repositories/UserTypeRepository";
import { defineStore } from "pinia";
const userTypeRepository = new UserTypeRepository();
const userTypeUseCases = new UserTypeUseCases(userTypeRepository);
export const UserTypeStore = defineStore("UserType", {
    state: () => ({
        UserTypes: [] as UserTypeList[],
    }),
    actions: {
    async getAllUserTypes() {
        this.UserTypes = await userTypeUseCases.getAllUserType();
        this.UserTypes = [...this.UserTypes];
    },

    async getUserTypeById(id: number) {
        return await userTypeUseCases.getUserTypeById(id);
    },
    async addUserType(userType:UserTypeForm){
        const usertypeL = await userTypeUseCases.createUserType(userType);
        if(this.UserTypes.length>0){
            this.UserTypes.push(usertypeL); 
        }
        
    },
    async updateUserType(userType: UserTypeForm) {
        const usertypeL = await userTypeUseCases.updateUserType(userType);
        if(this.UserTypes.length>0){
            this.UserTypes = this.UserTypes.map((type) =>
                type.idUserType === userType.idUserType ? usertypeL : type
            );
        }
    },
},
});
