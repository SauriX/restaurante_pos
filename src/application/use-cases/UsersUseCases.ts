
import {  UserForm, UserInfo, UserLogin } from "@/domain/entities/User";

import { IUserRepository } from "@/domain/repositories/IUserRepository";

export class UsersUseCases {
    constructor(private userRepository: IUserRepository) {}
    async getAll(){
        return await this.userRepository.getUsers();
    }
    async getById(id:number){
        return await this.userRepository.getUserByid(id);
    }
    async addUser(user:UserForm){
        return await this.userRepository.createUser(user);
    }
    async updateUser(user:UserForm){
        return await this.userRepository.updateUser(user)
    }
    async Login(user:UserLogin): Promise<string> {
    return await this.userRepository.login(user);
    }
    async getUserInfo():Promise<UserInfo>{
        return await this.userRepository.getUserInfo();
    }
}
