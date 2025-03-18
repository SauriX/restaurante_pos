import { UserTypeForm,UserTypeList } from "../entities/UserType";

export interface IdUserTypeRepository{
    getAllUserType():Promise<UserTypeList[]>;
    getUserTypeById(id:number):Promise<UserTypeForm>;
    createUserType(userType:UserTypeForm):Promise<UserTypeList>;
    updateUserType(userType:UserTypeForm):Promise<UserTypeList>;
}