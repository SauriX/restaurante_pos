<template>
  <div class="container text-center">
    <div class="row align-items-start">
      <div class="col-3">
        <BNav vertical class="w-25">
          <BNavItem active>Active</BNavItem>
          <BNavItem>Link</BNavItem>
          <BNavItem>Another Link</BNavItem>
          <BNavItem disabled>Disabled</BNavItem>
        </BNav>
      </div>
      <div class="col-5">
        <div>
          <h1>Clean Architecture en Vue 3 + TS</h1>
          <UserForm />
          <UserList />
        </div>
      </div>
      <div class="col-4">
        One of three columns
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BNav, BNavItem } from "bootstrap-vue-next"
import UserList from '@/presentation/components/UserList.vue';
import UserForm from '@/presentation/components/UserForm.vue';
</script>
