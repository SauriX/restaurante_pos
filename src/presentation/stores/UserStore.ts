import { defineStore } from "pinia";

import { User, UserForm, UserInfo, UserLogin } from "@/domain/entities/User";
import { UserRepository } from "@/infraestructure/repositories/UserRepository";
import { UsersUseCases } from "@/application/use-cases/UsersUseCases";
import { useAlertStore } from "./AlertStore";
import { errorhelper } from "@/util/helpers";
import messages from "@/util/messages";

// Crear instancias de los casos de uso con el repositorio
const userRepository = new UserRepository(); // Crear una instancia de la clase
const usersUseCases = new UsersUseCases(userRepository);

export const UserStore = defineStore("Usuarios", {
  // const
  state: () => ({
    Users: [] as User[],
    Logged: true,
    User: new UserForm(),
    UserInfo: new UserInfo(),
    error: false,
    alertStore: useAlertStore(),
  }),
  actions: {
    async getAllUsers() {
      try {
        if (this.Users.length == 0) {
          this.Users = await usersUseCases.getAll();
        }

        this.Users = [...this.Users]; // 💡 Solución: forzar la reactividad
        this.error = false;
      } catch (error) {
        const erros = errorhelper(error);
        erros.forEach((err) => {
          this.alertStore.triggerAlert(err.message,"danger",10000,"top-right");
        });
        this.error = true;
      }
    },
    async getById(id: number) {
      try {
        this.User = await usersUseCases.getById(id);
        this.error = false;
      } catch (error) {
        const erros = errorhelper(error);
        erros.forEach((err) => {
          this.alertStore.triggerAlert(err.message,"danger",10000,"top-right");
        });
        this.error = true;
      }
    },
    async addUser(user: UserForm) {
      try {
        const UserList = await usersUseCases.addUser(user);
        if (this.Users.length > 0) {
          this.Users.push(UserList);
        }
        this.error = false;
        this.alertStore.triggerAlert(messages.created, "success", 10000,"top-right");
        return UserList;
      } catch (error) {
        const erros = errorhelper(error);
        erros.forEach((err) => {
          this.alertStore.triggerAlert(err.message,"danger",10000,"top-right");
        });
        this.error = true;
      }

    },
    async updateUser(user: UserForm) {
      try {
        const userList = await usersUseCases.updateUser(user);
        if (this.Users.length > 0) {
          this.Users = this.Users.map((type) =>
            type.userId === user.userId ? userList : type
          );
        }
        this.error = false;
        this.alertStore.triggerAlert(messages.updated, "success", 10000,"top-right");
        return userList;
      } catch (error) {
        const erros = errorhelper(error);
        erros.forEach((err) => {
          this.alertStore.triggerAlert(err.message,"danger",10000,"top-right");
        });
        this.error = true;
      }
    },
    async Login(user: UserLogin) {
      try {
        await usersUseCases.Login(user);
      } catch (error) {
        const erros = errorhelper(error);
        erros.forEach((err) => {
          this.alertStore.triggerAlert(err.message,"danger",10000,"top-right");
        });
        this.error = true;
      }
    },
    async getUserInfo() {
      try {
        const userInfos = await usersUseCases.getUserInfo();
        this.UserInfo = userInfos;
        if (userInfos) {
          this.Logged = true;
        } else {
          this.Logged = false;
        }
        return userInfos;
      } catch (error) {
        const erros = errorhelper(error);
        erros.forEach((err) => {
          this.alertStore.triggerAlert(err.message,"danger",10000,"top-right");
        });
        this.error = true;
      }
    },
  },
});
