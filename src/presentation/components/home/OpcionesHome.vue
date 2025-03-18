<template>
    <div class="options">
        <div class="row">
            <div class="col-12 text-start mt-3 mb-3">
                <button class="btn ms-3" style="background-color: #007bffd9; border-color: #007bffd9; color: white;">Módulo de Mesas</button>
                <button class="btn ms-3" style="background-color: #28a745d9; border-color: #28a745d9; color: white;">Verificar Dotación</button>
                <button class="btn ms-3" style="background-color: #ff8c00d9; border-color: #ff8c00d9; color: white;">Mesas Abiertas</button>
                <button class="btn ms-3" style="background-color: #ffc107d9; border-color: #ffc107d9; color: white;">Mesas Por Cobrar</button>
                <button class="btn ms-3" style="background-color: #dc3545d9; border-color: #dc3545d9; color: white;">Corte de Caja</button>
                <button class="btn ms-3" style="background-color: #6c757dd9; border-color: #6c757dd9; color: white;">Abrir Caja</button>
            </div>
        </div>
    </div>
</template>



<script setup lang="ts">
import {  defineEmits } from 'vue';
const emit = defineEmits(["confirmar", "cancelar"]);


const clicktest = () => {
    alert("hola");
};


</script>

<style scoped>

.options {
    border: 1px solid #153E4B;
    border-radius: 10px;
    background-color: #153E4B;
    color: aliceblue !important;
}

.title3 {
    font-size: 20px;
}

.product-detail {
    border: 4px solid #0f2e38;
    box-shadow: 0 0 4px rgba(15, 46, 56, 0.5), 0 0 0 4px rgba(15, 46, 56, 0.2);
    padding-left: 0;
    display: flex;
    justify-content: space-between;
}

.product-list {
    height: 36vh;
    overflow-y: auto;
    border: 1px solid #153E4B;
    border-radius: 10px;
    padding: 10px;
}

.header-row {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
}

.custom-input,
.custom-select,
.dark-input {
    border: 2px solid #153E4B;
    border-radius: 12px;
    padding: 10px;
    font-size: 1.1rem;
    transition: all 0.3s ease-in-out;
    background-color: #1c2b36;
    color: white;
}

.custom-input:focus,
.custom-select:focus,
.dark-input:focus {
    border-color: #153E4B;
    box-shadow: 0 0 8px #153E4B;
    outline: none;
}

.input-group-text,
.dark-bg {
    background-color: #1c2b36;
    color: white;
    font-weight: bold;
    border: 2px solid #153E4B;
    border-radius: 12px 0 0 12px;
}

.fw-bold.text-success {
    font-size: 1.3rem;
}
</style>
