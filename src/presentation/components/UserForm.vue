<script setup lang="ts">
import { ref } from 'vue';
import { UserStore } from '@/presentation/stores/UserStore';
import { User } from '@/domain/entities/User';

const userStore = UserStore();
const name = ref('');
const email = ref('');

const addUser = async () => {
  const newUser = new User(Date.now(), name.value, email.value);
  await userStore.addUser(newUser);
  name.value = '';
  email.value = '';
};
</script>

<template>
  <div>
    <h2>Agregar Usuario</h2>
    <input v-model="name" placeholder="Nombre" />
    <input v-model="email" placeholder="Email" />
    <button @click="addUser">Agregar</button>
  </div>
</template>
