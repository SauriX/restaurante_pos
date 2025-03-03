<script setup lang="ts">
import { onMounted } from 'vue';
import { UserStore } from '@/presentation/stores/UserStore';
import UserDetail from './UserDetail.vue';

const userStore = UserStore();

onMounted(() => {
  userStore.fetchUsers();
});
</script>

<template>
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        <li v-for="user in userStore.users" :key="user.id">
          {{ user.name }} - {{ user.email }}
          <UserDetail :user="user" />
        </li>
      </ul>
    </div>
  </template>