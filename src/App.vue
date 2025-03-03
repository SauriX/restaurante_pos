<template>
  <main-layout v-if="Logged">
    <router-view />
  </main-layout>

    <router-view v-if="!Logged"/>
</template>
<script setup lang="ts">
  import MainLayout from '@/presentation/components/Layout/MainLayout.vue'
  import { storeToRefs } from 'pinia';
  import { UserStore } from './presentation/stores/UserStore';
  
 // const { Logged } = storeToRefs(UserStore());
var Logged = true;
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
