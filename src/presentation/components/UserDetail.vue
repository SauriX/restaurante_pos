<script setup lang="ts">
import { defineProps } from 'vue';
import { User } from '@/domain/entities/User';

defineProps<{ user: User }>();
</script>

<template>
  <div>
    <h3>Detalles de Usuario</h3>
    <p><strong>ID:</strong> {{ user.id }}</p>
    <p><strong>Nombre:</strong> {{ user.name }}</p>
    <p><strong>Email:</strong> {{ user.email }}</p>
  </div>
</template>
