<template>
    <div class="container-fluid">
        <CatalogLayout title="Tipos de usuario" icon="fa-solid fa-person" @add="adduserType"></CatalogLayout>
        <TableData :data="userTypeStore.UserTypes" :columns="table" :loading="loading"></TableData>

    </div>
</template>
<script lang="ts" setup>
import { UserTypeList } from '@/domain/entities/UserType';
import CatalogLayout from '@/presentation/components/Layout/CatalogLayout.vue';
import TableData from '@/presentation/components/TableData.vue';
import { UserTypeStore } from '@/presentation/stores/UserTypeStore';
import pages from '@/util/pageName';

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const loading = ref(false);
const table = {
    headers: [
        { key: 'idUserType', label: '#' },
        { key: 'nameUserType', label: 'Nombre' },

    ],
    actions: [
        {
            icon: ['fas', 'edit'],  // Solo ícono de Font Awesome
            method: (item: UserTypeList) => { editUser(item) },
            class: 'btn-primary'
        }
    ]
};


const userTypeStore = UserTypeStore();
onMounted(async () => {
    
    if (userTypeStore.UserTypes.length == 0) {
        loading.value = true;
        console.log(loading.value);
        await userTypeStore.getAllUserTypes();
        loading.value = false;
        console.log(loading.value);
    }

});
const adduserType = () => {
    router.push({ name: pages.userTypesAdd })
};


// Métodos para manejar acciones
const editUser = (row: UserTypeList) => {
    router.push({ name: pages.userTypesDetail, params: { id: row.idUserType } })
};

</script>
<style scoped></style>
