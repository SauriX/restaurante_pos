import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../presentation/views/HomeView.vue";
import LoginView from "@/presentation/views/LoginView.vue";
import TestView from "@/presentation/views/TestView.vue";

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
      show: true,
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
      show: true,
      name: "about",
      category: "Catalogos",
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
      show: true,
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
    path: "/Catalogos/UserTypes/detail/:id",
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
