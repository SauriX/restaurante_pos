import { UserTypeUseCases } from "@/application/use-cases/UserTypeUseCases";
import { UserTypeForm, UserTypeList } from "@/domain/entities/UserType";
import { UserTypeRepository } from "@/infraestructure/repositories/UserTypeRepository";
import { defineStore } from "pinia";
import { useAlertStore } from "./AlertStore";
import { errorhelper } from "@/util/helpers";
import messages from "@/util/messages";
const userTypeRepository = new UserTypeRepository();
const userTypeUseCases = new UserTypeUseCases(userTypeRepository);
export const UserTypeStore = defineStore("UserType", {
    state: () => ({
        UserTypes: [] as UserTypeList[],
        user: new UserTypeForm,
            error: false,
            alertStore: useAlertStore(),
    }),
    actions: {
    async getAllUserTypes() {
        try {
            this.UserTypes = await userTypeUseCases.getAllUserType();
            this.UserTypes = [...this.UserTypes];
            this.error = false;
        } catch (error) {
            const erros = errorhelper(error);
            erros.forEach((err) => {this.alertStore.triggerAlert(err.message,"danger",10000,"top-right");

            });
            this.error = true;
        }
    },

    async getUserTypeById(id: number) {
        try {
            this.error = false;
            this.user= await userTypeUseCases.getUserTypeById(id);
            
        } catch (error) {
            const erros = errorhelper(error);
            erros.forEach((err) => {this.alertStore.triggerAlert(err.message,"danger",10000,"top-right");

            });
            this.error = true;
        }
        
    },
    async addUserType(userType:UserTypeForm){
        try {
            const usertypeL = await userTypeUseCases.createUserType(userType);
            if(this.UserTypes.length>0){
                this.UserTypes.push(usertypeL); 
            }
            this.alertStore.triggerAlert(messages.created, "success", 10000,"top-right");
            this.error = false;
        } catch (error) {
            const erros = errorhelper(error);
            erros.forEach((err) => {this.alertStore.triggerAlert(err.message,"danger",10000,"top-right");

            });
            this.error = true;
        }
        
    },
    async updateUserType(userType: UserTypeForm) {
        try {
            const usertypeL = await userTypeUseCases.updateUserType(userType);
            if(this.UserTypes.length>0){
                this.UserTypes = this.UserTypes.map((type) =>
                    type.idUserType === userType.idUserType ? usertypeL : type
                );
            }
            this.alertStore.triggerAlert(messages.updated, "success", 10000,"top-right");
            this.error = false;
        } catch (error) {
            const erros = errorhelper(error);
            erros.forEach((err) => {this.alertStore.triggerAlert(err.message,"danger",10000,"top-right");

            });
            this.error = true;
        }
    },
},
});
