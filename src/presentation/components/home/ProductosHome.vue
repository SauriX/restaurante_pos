<template>
    <div class="container products">
        <div class="row align-items-start ">
            <div class="col-12 header">
                <h2 class="mt-2">Productos</h2>
            </div>
            <div class="col-12 mt-1">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Producto"
                        aria-label="Producto" aria-describedby="button-addon2">
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2">Buscar <font-awesome-icon
                            :icon="['fas', 'magnifying-glass']" :spin="false" /></button>
                </div>
            </div>
            <div class="row col-12 DivWithScroll">
                <div class="col-3 mt-2" v-for="product in productList" :key="product.id" >
                <div class="image-container">
                    <BImg thumbnail v-if="!isNullOrEmpty(product.img)"  :src="product.img" alt="Image 1" />
                    <BImg v-bind="propsTr"  :blank-color="product.color" />
                    <div class="image-overlay"></div>
                    <div class="image-text">
                        {{ product.name }}
                        <br>
                        {{ product.price.toPrecision(4) }}
                    </div>
                </div>
            </div>
            </div>

            <div class="col-12 mt-2">

            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import { Product } from "@/domain/entities/Products";
import { isNullOrEmpty } from "@/util/helpers";
import { BImg } from "bootstrap-vue-next";
import { computed, defineProps, PropType } from "vue";
const propsTr = {
  blank: true,
  width: 75,
  height: 75,
  class: 'm1',
}
const props=defineProps(
    {
        products: {
            type: Array as PropType<Product[]>,
            required: true,
        },
        categoryId:{
            type:Number,
            required:true,
        }
    }
);

const productList = computed(()=>props.products.filter(x=> x.category == props.categoryId));
</script>
<style scoped>

.products {
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

.image-container {
    position: relative;
    display: inline-block;
    position: relative;
    width: 100%; /* Se ajusta al contenedor */
    max-width: 200px; /* Controla el tamaño máximo */
    height: 125px; /* Hace la imagen más rectangular */
    overflow: hidden; /* Recorta si es necesario */
}
.image-container img {
    width: 100%; /* Asegura que ocupe todo el ancho */
    height: 100%; /* Ajusta la altura */
    object-fit: cover; /* Evita distorsiones y recorta si es necesario */
    border-radius: 8px; /* Bordes redondeados opcionales */
}
.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4); /* Oscurecimiento ligero en toda la imagen */
    border-radius: 8px; /* Bordes redondeados opcionales */
}

.image-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* Centra completamente */
    color: white;
    font-weight: bold;
    font-size: 14px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    text-align: center; /* Asegura que el texto esté centrado */
    white-space: nowrap; /* Evita que el texto se divida en varias líneas */
}
</style>