import { defineStore } from "pinia";
//import { ref } from "vue";
import { User } from '@/domain/entities/User';
import { GetUsersUseCase } from '@/application/use-cases/GetUsersUseCase';
import { CreateUserUseCase } from '@/application/use-cases/CreateUserUseCase';
import { LocalRepository } from '@/infraestructure/repositories/LocalRepository';
//import { UserRepositoryAPI } from "@/infraestructure/repositories/UserRepositoryAPI";
//import { FetchRepository } from "@/infraestructure/repositories/FetchRepository"
// Crear instancias de los casos de uso con el repositorio
const userRepository = new LocalRepository(); // Crear una instancia de la clase
const getUsersUseCase = new GetUsersUseCase(userRepository);
const createUserUseCase = new CreateUserUseCase(userRepository);

export const UserStore = defineStore('Usuarios',{
   // const 
    state: () => ({
        users: [] as User[],    
        Logged:true,
        user:new User()
      }),
      actions: {
        async fetchUsers() {
          this.users = await getUsersUseCase.execute();
          this.users = [...this.users]; // 💡 Solución: forzar la reactividad
        },
        async addUser(user: User) {
          await createUserUseCase.execute(user);
          this.fetchUsers(); // Refrescar lista
        },
      }
    //return {Logged}
})