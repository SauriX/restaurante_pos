<template>
  <div class="container-fluid text-center ">
    <div class="row align-items-start">
      <div class="col-2">
        <CategoriesHome :categories="categoryStore.activeCategories" @category="setCategory"></CategoriesHome>
      </div>
      <div class="col-6">
        <ProductosHome :products="productsStore.products" :categoryId="categoryId"></ProductosHome>
        
      </div>
      <div class="col-4">
        <OrderHome></OrderHome>
      </div>
    </div>
    <div class="col-12 mt-2">
        <OpcionesHome></OpcionesHome>
      </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import CategoriesHome from "../components/home/CategoriesHome.vue";
import OrderHome from "../components/home/OrderHome.vue";
import ProductosHome from "../components/home/ProductosHome.vue";
import OpcionesHome from "../components/home/OpcionesHome.vue";
import { CategoryStore } from "../stores/CategoryStore";
import { ProductStore } from "../stores/ProductStore";
const categoryStore = CategoryStore();
const productsStore = ProductStore();
const categoryId = ref(1);


onMounted(async ()=>{
  await categoryStore.getActiveCategories();
  await productsStore.getProducts();
  



});
const setCategory = (category:number)=>{
  console.log(category);
  categoryId.value = category;
}

</script>
