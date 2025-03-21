<!-- eslint-disable vue/valid-template-root -->
<template>
    <div class="container-fluid">
        <CatalogLayout title="Usuarios" icon="fa-solid fa-users" @add="addUser"></CatalogLayout>
        <TableData :data="userStore.Users" :columns="table" :loading="loading"></TableData>
    </div>
</template>
<script lang="ts" setup>
import CatalogLayout from '@/presentation/components/Layout/CatalogLayout.vue';
import TableData from '@/presentation/components/TableData.vue';
import { User } from '@/domain/entities/User';
import { UserStore } from '@/presentation/stores/UserStore';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import pages from '@/util/pageName';

const router = useRouter();
const userStore = UserStore();
const loading = ref(false);
const table = {
    headers: [
        { key: 'userId', label: '#' },
        { key: 'userName', label: 'Nombre' },
        { key: 'userNickName', label: 'Usuario' },
        { key: 'userType', label: 'Rol' },

    ],
    actions: [
        {
            icon: ['fas', 'edit'],  // Solo ícono de Font Awesome
            method: (item: User) => { editUser(item) },
            class: 'btn-primary'
        }
    ]
}
onMounted(async ()=>{
    loading.value = true;
    await userStore.getAllUsers();
    loading.value = false;
});
const addUser=()=>{
    router.push({name:pages.usersAdd});
}

const editUser = (user:User)=>{
    router.push({name:pages.userUpdate,params:{id:user.userId}});
}
</script>
<style scoped></style>