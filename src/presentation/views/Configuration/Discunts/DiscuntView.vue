<template>
    <div class="conatiner-fuiid">
        <CatalogLayout title="Descuentos" icon="fa-solid fa-percent" @add="add"></CatalogLayout>
        <TableData :data="discuntStore.discunts" :columns="table" :loading="loading"></TableData>
    </div>
</template>
<script lang="ts" setup>
import { Discunt } from '@/domain/entities/Discunts';
import CatalogLayout from '@/presentation/components/Layout/CatalogLayout.vue';
import TableData from '@/presentation/components/TableData.vue';
import { DiscuntStore } from '@/presentation/stores/DiscuntsStore';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const loading = ref(false);
const discuntStore = DiscuntStore();
const router = useRouter();
const table = {
    headers: [
        { key: 'discuntId', label: '#' },
        { key: 'discuntName', label: 'Nombre' },
        { key: 'porcent', label: 'Porcentaje' },
        { key: 'active', label: 'Estatus' },

    ],
    actions: [
        {
            icon: ['fas', 'edit'],  // Solo ícono de Font Awesome
            method: (item: Discunt) => { update(item); },
            class: 'btn-primary'
        }
    ]
}


onMounted(async () => {
    loading.value = true;
    await discuntStore.getAllDicunts();
    loading.value = false;
});

const add = () =>{
    router.push({name:"DiscuntsAdd"});
}

const update = (item: Discunt)=>{
    router.push({name:"DiscuntsUpdate",params:{id:item.discuntId}});
}
</script>
<style scoped></style>