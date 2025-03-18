<template>
     <div>
          <BNavbar v-b-color-mode="'dark'" toggleable="lg" class="bg-layout" sticky="top">
               <BNavbarBrand href="#">NavBar</BNavbarBrand>
               <BNavbarToggle target="nav-collapse" />
               <BCollapse id="nav-collapse" is-nav>
                    <BNavbarNav>
                         <!-- Enlaces sin categoría -->
                         <BNavItem v-for="route in uncategorizedRoutes" :key="route.name" :href="route.path"
                              :class="router.currentRoute.value.path == route.path ? 'active' : ''">
                              {{ route.meta!.name }}
                         </BNavItem>

                         <!-- Dropdowns por categoría -->
                         <BNavItemDropdown v-for="(routes, category) in categorizedRoutes" :key="category"
                              :text="category">
                              <BDropdownItem v-for="route in routes" :key="route.name" :href="route.path">
                                   {{ route.meta!.name }}
                              </BDropdownItem>
                         </BNavItemDropdown>
                    </BNavbarNav>

                    <!-- Right aligned nav items -->
                    <BNavbarNav class="ms-auto mb-2 mb-lg-0">
                         <BNavItem href="#" disabled>Sucursal</BNavItem>
                         <BNavItemDropdown right>
                              <template #button-content>
                                   <em>User</em>
                              </template>
                              <BDropdownItem href="#">Profile</BDropdownItem>
                              <BDropdownItem href="#">Sign Out</BDropdownItem>
                         </BNavItemDropdown>
                    </BNavbarNav>
               </BCollapse>
          </BNavbar>

          <div class="mt-3">
               <slot></slot>
          </div>
     </div>
</template>

<script lang="ts" setup>
import { RouteRecordRaw, useRouter } from 'vue-router';
import { computed } from 'vue';
import {
     BNavbar,
     BCollapse,
     BNavbarNav,
     BNavItemDropdown,
     BDropdownItem,
     BNavItem,
     BNavbarToggle,
     BNavbarBrand
} from 'bootstrap-vue-next';

const router = useRouter();

// Obtener las rutas visibles
const routes = computed(() => {
     return router.options.routes.filter(route => route.meta && route.meta.show);
});

// Agrupar rutas por categoría
const categorizedRoutes = computed(() => {
     // Creamos un objeto vacío para guardar las categorías
     return routes.value.reduce((acc: Record<string, RouteRecordRaw[]>, route) => {
          
          // Obtenemos la categoría de la ruta
          const category = route.meta?.category as string | undefined;
          
          // Si la ruta tiene categoría...
          if (category) {
               
               // Si el cajón no existe, lo creamos
               if (!acc[category]) {
                    acc[category] = [];
               }

               // Metemos la ruta en su categoría
               acc[category].push(route);
          }

          // Devolvemos el objeto con las rutas organizadas
          return acc;
     }, {} as Record<string, RouteRecordRaw[]>);
});


// Obtener rutas sin categoría
const uncategorizedRoutes = computed(() => {
     return routes.value.filter(route => !route.meta?.category);
});
</script>

<style scoped>
.bg-layout {
     background-color: #153E4B;
     color: white !important;
}

.navbar-nav {
     --bs-nav-link-color: white;
     --bs-nav-link-hover-color: #e1e6e2;
     --bs-nav-link-disabled-color: #c5c9c6;
}

.navbar-brand {
     color: white;
}

.navbar-brand:hover,
.navbar-brand:focus {
     color: white;
}

.active {
     color: white !important;
     text-decoration: underline !important;
     text-decoration-thickness: 2px !important;
     text-underline-offset: 5px !important;
}
</style>