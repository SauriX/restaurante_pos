import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../presentation/views/HomeView.vue";
import LoginView from "@/presentation/views/LoginView.vue";
import TestView from "@/presentation/views/TestView.vue";
import ConfigurationView from "@/presentation/views/ConfigurationView.vue";
import { UserStore } from "@/presentation/stores/UserStore";
import { useAlertStore } from "@/presentation/stores/AlertStore";
import UsersView from "@/presentation/views/Users/UsersView.vue";
import UsersDetailView from "@/presentation/views/Users/UsersDetailView.vue";
import DiscuntView from "@/presentation/views/Configuration/Discunts/DiscuntView.vue";
import DiscuntDetail from "@/presentation/views/Configuration/Discunts/DiscuntDetail.vue";
import CategorieView from "@/presentation/views/Catalogos/Categories/CategorieView.vue";
import CategoriesDetails from "@/presentation/views/Catalogos/Categories/CategoriesDetails.vue";
import pages from "@/util/pageName";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: pages.login,
    component: LoginView,
    meta: {
      requiresAuth: false,
      show: false,
    },
  },
  {
    path: "/",
    name: pages.home,
    component: HomeView,
    meta: {
      requiresAuth: false,
      show: true,
      name: "Inicio",
    },
  },
  {
    path: "/test",
    name: "test",
    component: TestView,
    meta: {
      requiresAuth: false,
      show: false,
      name: "test",
      category: "Catalogos",
    },
  },
  {
    path: "/Catalogos/UserTypes",
    name: pages.userTypes,
    component: UsersView,
    meta: {
      requiresAuth: false,
      show: false,
      name: "Tipos de usuario",
      category: "Catalogos",
      roles: ["2"],
    },
  },
  {
    path: "/Catalogos/UserTypes/nuevo",
    name: pages.userTypesAdd,
    component:UsersDetailView,
    meta: {
      requiresAuth: false,
      show: false,
      name: "",
      category: "",
    },
  },
  {
    path: "/Catalogos/UserTypes/:id",
    name: pages.userTypesDetail,
    props: true,
    component: UsersDetailView,
    meta: {
      requiresAuth: false,
      show: false,
      name: "",
      category: "",
    },
  },
  {
    path: "/Configuration",
    name: pages.configuration,
    component: ConfigurationView,
    meta: {
      requiresAuth: false,
      show: true,
      name: "Configuracion general",
      category: "Configuracion",
    },
  },
  {
    path: "/Configuracion/Usuarios",
    name: pages.users,
    component: UsersView,
    meta: {
      requiresAuth: false,
      show: true,
      name: "Usuarios",
      category: "Configuracion",
    },
  },
  {
    path: "/Configuracion/Usuarios/Nuevo",
    name: pages.usersAdd,
    component:UsersDetailView,
    meta: {
      requiresAuth: false,
      show: false,
      name: "",
      category: "",
    },
  },
  {
    path: "/Configuracion/Usuarios/:id",
    name: pages.userUpdate,
    props:true,
    component: UsersDetailView,
    meta: {
      requiresAuth: false,
      show: false,
      name: "",
      category: "",
    },
    
  },
  {
    path: "/Configuracion/Descuentos",
    name: pages.discunts,
    props:false,
    component: DiscuntView,
    meta: {
      requiresAuth: false,
      show: true,
      name: "Descuentos",
      category: "Configuracion",
    },
    
  },
  {
    path: "/Configuracion/Descuentos/Nuevo",
    name: pages.usersAdd,
    props:false,
    component: DiscuntDetail,
    meta: {
      requiresAuth: false,
      show: false,
      name: "",
      category: "",
    },
    
  },
  {
    path: "/Configuracion/Descuentos/:id",
    name: pages.userUpdate,
    props:true,
    component: DiscuntDetail,
    meta: {
      requiresAuth: false,
      show: false,
      name: "",
      category: "",
    },
    
  },
  {
    path: "/Catalogos/Categorias",
    name: pages.categories,
    props:false,
    component: CategorieView,
    meta: {
      requiresAuth: false,
      show: true,
      name: "Categorias",
      category: "Catalogos",
    },
    
  },
  {
    path: "/Catalogos/Categorias/Nuevo",
    name: pages.categoriesAdd,
    props:false,
    component: CategoriesDetails,
    meta: {
      requiresAuth: false,
      show: false,
      name: "",
      category: "",
    },
    
  },
  {
    path: "/Catalogos/Categorias/:id",
    name: pages.categoriesUpdate,
    props:true,
    component: CategoriesDetails,
    meta: {
      requiresAuth: false,
      show: false,
      name: "",
      category: "",
    },
    
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      const userStore = UserStore();
      const alertStore = useAlertStore();
      const userinfo = await userStore.getUserInfo();
      if (userinfo) {
        if(to.meta.roles && Array.isArray(to.meta.roles)){
          if(to.meta.roles.some(x => x === userinfo.role)){
            next();
          }else{
            alertStore.triggerAlert("No tienes permisos para acceder a esta página.", "danger", 3000,"middle-center");
            next(from.fullPath); // Esto previene la redirección y mantiene al usuario en la misma página
          }
        }
        next(); // ✅ El usuario está autenticad0
      }
    } catch {
      next("/login"); // 🔴 No autenticado, redirigir a login
    }
  } else {
    next();
  }
});
export default router;
