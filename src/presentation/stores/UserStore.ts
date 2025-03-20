import { defineStore } from "pinia";

import { User, UserForm, UserInfo, UserLogin } from '@/domain/entities/User';
import { UserRepository } from "@/infraestructure/repositories/UserRepository";
import { UsersUseCases } from "@/application/use-cases/UsersUseCases";


// Crear instancias de los casos de uso con el repositorio
const userRepository = new UserRepository ();// Crear una instancia de la clase
const usersUseCases = new UsersUseCases(userRepository);

export const UserStore = defineStore('Usuarios',{
   // const 
    state: () => ({
        Users: [] as User[],    
        Logged:true,
        User:new UserForm(),
        UserInfo:new UserInfo()
      }),
      actions: {
        async getAllUsers() {
          if(this.Users.length==0){
            this.Users = await usersUseCases.getAll();
          }
          
          this.Users = [...this.Users]; // 💡 Solución: forzar la reactividad

        },
        async getById(id:number){
          this.User=await usersUseCases.getById(id);
        },
        async addUser(user:UserForm) {
          const UserList = await usersUseCases.addUser(user);
          if(this.Users.length>0){
            this.Users.push(UserList); 
          }
          return UserList;
        },
        async updateUser(user:UserForm){
          const userList = await usersUseCases.updateUser(user);
          if(this.Users.length>0){
              this.Users = this.Users.map((type) =>
                  type.userId === user.userId ? userList : type
              );
          }
          return userList;
        },
        async Login(user:UserLogin){
          await usersUseCases.Login(user);
          

        },
        async getUserInfo(){
          const userInfos = await usersUseCases.getUserInfo();
          this.UserInfo = userInfos;
          if(userInfos){
            this.Logged = true;
          }else{
            this.Logged = false;
          }
          return(userInfos);
        }
      }

})