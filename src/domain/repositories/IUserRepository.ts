import { User, UserForm, UserInfo, UserLogin } from "../entities/User";

export interface IUserRepository {
    getUsers(): Promise<User[]>;
    getUserByid(id:number):Promise<UserForm>;
    createUser(user: UserForm): Promise<User>;
    updateUser(user: UserForm):Promise<User>
    login(user:UserLogin):Promise<string>;
    getUserInfo():Promise<UserInfo>
}
