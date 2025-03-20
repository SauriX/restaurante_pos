import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { User, UserForm, UserInfo, UserLogin } from "@/domain/entities/User";
import requests from "../agents/agent";

export class UserRepository implements IUserRepository {

    async getUsers(): Promise<User[]> {
        return  await requests.get("/api/User/all");
    }
    async getUserByid(id:number): Promise<UserForm> {
        return await requests.get(`api/User/${id}`);
    }
    async createUser(user: UserForm): Promise<User> {
        return await requests.post(`api/User`, user);
    }
    async updateUser(user: UserForm): Promise<User> {
        return await requests.put("api/User",user);
    }
    async login(user: UserLogin): Promise<string> {
        return await requests.post("api/User/login", user);
    }
    async getUserInfo():Promise<UserInfo> {
        return await requests.get("/api/User/info");
    }
}
