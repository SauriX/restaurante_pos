import { UserTypeList, UserTypeForm } from "@/domain/entities/UserType";
import { IdUserTypeRepository } from "@/domain/repositories/IUserTypeRepository";
import requests from "../agents/agent";

export class UserTypeRepository implements IdUserTypeRepository{
    getAllUserType(): Promise<UserTypeList[]> {
        return requests.get("api/UserType/all");
    }
    getUserTypeById(id: number): Promise<UserTypeForm> {
        return requests.get(`api/UserType/${id}`);
    }
    createUserType(userType: UserTypeForm): Promise<UserTypeList> {
        return requests.post("api/UserType",userType)
    }
    updateUserType(userType: UserTypeForm): Promise<UserTypeList> {
        return requests.put("api/UserType",userType);
    }
    
}