<template>
    <div class="container text-center nav-category">
        <div class="row align-items-start ">
            <div class=" col-12 header">
                <h2 class="mt-2">Categorias</h2>
            </div>

            <div class=" col-12 mt-1">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Categoria"
                        aria-label="Categoria" aria-describedby="button-addon2">
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2">Buscar <font-awesome-icon
                            :icon="['fas', 'magnifying-glass']" :spin="false" /></button>
                </div>
            </div>

            <div style="color: aliceblue !important;" class=" col-12 DivWithScroll">

                <ul class="nav flex-column ">
                    <li class="nav-item item-nav" v-for=" category in categories" :key="category.id">
                        <a class="nav-link " :class=" category.id == activecategory? 'active':''" aria-current="page" href="#" @click="selectcategory(category.id)">{{ category.name }}</a>
                    </li>

                </ul>
            </div>
            <br>
            <div class="mt-2"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted,defineProps,ref,defineEmits } from 'vue';
import { UserStore } from '@/presentation/stores/UserStore';
import { Category } from '@/domain/entities/Category';

defineProps<{categories:Category[]}>();
const userStore = UserStore();
const activecategory = ref(0);
const emit = defineEmits(["category"]);

const selectcategory = (id:number)=>{
    activecategory.value = id;
    emit('category',id)
}



onMounted(() => {
    userStore.fetchUsers();
});
</script>

<style scoped>
.nav-category {
    border: 1px;
    border-style: solid;
    border-radius: 10px;
    background-color: #153E4B;
    color: aliceblue !important;

}

.btn-outline-secondary {
    color: aliceblue !important;
    border-color: aliceblue !important;
}

.item-nav {
    border: 1px solid #133844;
    /* Se corrigió el borde */
    background-color: #2A505B;
    color: white !important;
    opacity: 1 !important;
}
.nav-link:hover, .nav-link:focus {
   

    color: white !important;
    opacity: 1 !important;
}

.nav-link {
    color: white;
}

.item-nav :active {
    color: white !important;
    opacity: 1 !important;
}

.active {
    position: relative;
    /* Necesario para posicionar el pseudo-elemento */
}

.active::after { /* Cambia ::before por ::after */
  content: "";
  position: absolute;
  top: 0;
  right: 0; /* Cambia left por right */
  width: 5px;
  height: 100%;
  background-color: #0F2E38;
}
</style>