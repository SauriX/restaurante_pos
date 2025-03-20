import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../presentation/views/HomeView.vue";
import LoginView from "@/presentation/views/LoginView.vue";
import TestView from "@/presentation/views/TestView.vue";
import ConfigurationView from "@/presentation/views/ConfigurationView.vue";
import { UserStore } from "@/presentation/stores/UserStore";
import { useAlertStore } from "@/presentation/stores/AlertStore";
import UsersView from "@/presentation/views/Users/UsersView.vue";
import UsersDetailView from "@/presentation/views/Users/UsersDetailView.vue";
import DiscuntView from "@/presentation/views/Catalogos/Discunts/DiscuntView.vue";
import DiscuntDetail from "@/presentation/views/Catalogos/Discunts/DiscuntDetail.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      requiresAuth: false,
      show: false,
    },
  },
  {
    path: "/",
    name: "home",
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
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../presentation/views/AboutView.vue"
      ),
    meta: {
      requiresAuth: false,
      show: false,
      name: "about",
      category: "Catalogos",
      roles: ["2"],
    },
  },
  {
    path: "/Catalogos/UserTypes",
    name: "UserTypes",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../presentation/views/UserTypes/UserTypeView.vue"
      ),
    meta: {
      requiresAuth: false,
      show: false,
      name: "Tipos de usuario",
      category: "Catalogos",
    },
  },
  {
    path: "/Catalogos/UserTypes/nuevo",
    name: "UserTypesNew",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../presentation/views/UserTypes/UserTypeDetailView.vue"
      ),
    meta: {
      requiresAuth: false,
      show: false,
      name: "",
      category: "Catalogos",
    },
  },
  {
    path: "/Catalogos/UserTypes/:id",
    name: "UserTypesDetail",
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../presentation/views/UserTypes/UserTypeDetailView.vue"
      ),
    meta: {
      requiresAuth: false,
      show: false,
      name: "",
      category: "Catalogos",
    },
  },
  {
    path: "/Configuration",
    name: "Configuration",
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
    name: "Users",
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
    name: "UsersAdd",
    component:UsersDetailView,
    meta: {
      requiresAuth: false,
      show: false,
      name: "",
      category: "Configuracion",
    },
  },
  {
    path: "/Configuracion/Usuarios/:id",
    name: "UsersUpdate",
    props:true,
    component: UsersDetailView,
    meta: {
      requiresAuth: false,
      show: false,
      name: "",
      category: "Configuracion",
    },
    
  },
  {
    path: "/Configuracion/Descuentos",
    name: "Discunts",
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
    name: "DiscuntsAdd",
    props:false,
    component: DiscuntDetail,
    meta: {
      requiresAuth: false,
      show: false,
      name: "",
      category: "Configuracion",
    },
    
  },
  {
    path: "/Configuracion/Descuentos/:id",
    name: "DiscuntsUpdate",
    props:true,
    component: DiscuntDetail,
    meta: {
      requiresAuth: false,
      show: false,
      name: "",
      category: "Configuracion",
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
