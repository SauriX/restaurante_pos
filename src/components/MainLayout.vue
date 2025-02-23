<template>
     <div>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
               <div class="container-fluid">
                    <a class="navbar-brand" href="#"></a>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                         <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                              <li class="nav-item" v-for="route in routes" :key="route.name">
                                   <router-link :to="route.path" class="d-flex align-items-center nav-link"
                                        :class="{ active: $route.name === route.name }">

                                        <span>&nbsp;{{ route.meta!.name }}</span>
                                   </router-link>
                              </li>
                         </ul>
                    </div>
               </div>
          </nav>
          <slot></slot>
     </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue';
const router = useRouter();
const routes = computed(() => {
     return router.options.routes.filter(route => route.meta && route.meta.show);
});
</script>