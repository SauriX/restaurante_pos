import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../presentation/views/HomeView.vue'
import LoginView from '@/presentation/views/LoginView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta:{
      requiresAuth:false,
      show:false,
    }
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      requiresAuth:false,
      show:true,
      name:'Inicio'
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../presentation/views/AboutView.vue'),
    meta:{
      requiresAuth:false,
      show:true,
      name:'about'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
