<template>
  <main-layout v-if="userStore.Logged">
    <router-view />
  </main-layout>

  <router-view v-if="!userStore.Logged" />
</template>
<script setup lang="ts">
import MainLayout from '@/presentation/components/Layout/MainLayout.vue'
import { UserStore } from '@/presentation/stores/UserStore';
const userStore = UserStore();


</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


</style>
