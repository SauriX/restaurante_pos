<template>
    <div class="conatiner-fuiid">
        <CatalogLayout title="Categorias" icon="fa-solid fa-tag" @add="add"></CatalogLayout>
        <TableData :data="categoryStore.categories" :columns="table" :loading="loading"></TableData>
    </div>
</template>
<script lang="ts" setup>
import { Category } from '@/domain/entities/Category';
import CatalogLayout from '@/presentation/components/Layout/CatalogLayout.vue';
import TableData from '@/presentation/components/TableData.vue';
import { CategoryStore } from '@/presentation/stores/CategoryStore';

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const loading = ref(false);
const categoryStore = CategoryStore();
const router = useRouter();
const table = {
    headers: [
        { key: 'id', label: '#' },
        { key: 'name', label: 'Nombre' },
       /*  { key: 'discunt', label: 'Descuento' }, */
        { key: 'active', label: 'Estatus' },

    ],
    actions: [
        {
            icon: ['fas', 'edit'],  // Solo ícono de Font Awesome
            method: (item: Category) => { update(item); },
            class: 'btn-primary'
        }
    ]
}


onMounted(async () => {
    loading.value = true;
    await categoryStore.getCategories();
    loading.value = false;
});

const add = () =>{
    router.push({name:"CategoriesAdd"});
}

const update = (item: Category)=>{
    router.push({name:"CategoriesUpdate",params:{id:item.id}});
}
</script>
<style scoped></style>