<template>
    <div class="container order">
        <div class="row">
            <div class="col-12 header text-center">
                <h2 class="mt-2">Pedido</h2>
            </div>
            <div class="col-12 text-start mt-3">
                <h3 class="title3">Detalle del pedido</h3>
            </div>
            <div class="col-12 text-start mt-2">
                <div class="product-list">
                    <div v-for="(producto, index) in productos" :key="index" class="product-container">
                        <!-- Producto principal -->
                        <div class="row product-detail me-2 mt-1">
                            <div class="col-4">{{ producto.nombre }}</div>
                            <div class="col-2 text-end">{{ producto.cantidad }}</div>
                            <div class="col-2 text-end">${{ producto.precio }}</div>
                            <div class="col-2 text-end">${{ (producto.precio * producto.cantidad).toFixed(2) }}</div>
                            <div class="col-1 text-center">
                                <font-awesome-icon :icon="['fas', 'fa-comment-alt']" />
                            </div>
                            <div class="col-1 text-center">
                                <font-awesome-icon :icon="['far', 'circle-xmark']" @click="eliminarProducto(index)" />
                            </div>
                        </div>

                        <!-- Extras o modificaciones con sangría -->
                        <div v-if="producto.extras.length" class="extras-container">
                            <div v-for="(extra, i) in producto.extras" :key="i" class="row extra-detail">
                                <div class="col-4 ps-4">{{ extra.nombre }}</div>
                                <div class="col-2 text-center">-</div>
                                <div class="col-2 text-center">${{ extra.precio }}</div>
                                <div class="col-2 text-center">${{ extra.precio }}</div>
                                <div class="col-2 text-center">
                                    <font-awesome-icon :icon="['far', 'circle-xmark']" @click="eliminarExtra(index, i)" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Subtotal -->
            <div class="col-12 text-end mt-3 mb-1">
                <h4 class="fw-bold">Subtotal: ${{ calcularSubtotal().toFixed(2) }}</h4>
            </div>

            <div class="col-12 text-start mt-3">
                <label class="form-label fw-bold">Tipo de Pedido:</label>
                <select class="form-select dark-input" v-model="tipoPedido">
                    <option value="domicilio">Domicilio</option>
                    <option value="mesa">Mesa</option>
                </select>
            </div>

            <div class="col-12 text-center mt-3 mb-3">
                <button class="btn btn-confirmar ms-2">Confirmar Pedido</button>
                <button class="btn btn-cancelar ms-2">Cancelar Pedido</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tipoPedido = ref('domicilio');

const productos = ref([
    {
        nombre: "Pizza Mediana",
        cantidad: 1,
        precio: 14.95,
        extras: [
            { nombre: "Extra Queso", precio: 2.00 },
            { nombre: "Sin Cebolla", precio: 0.00 }
        ]
    },
    {
        nombre: "Hamburguesa Clásica",
        cantidad: 1,
        precio: 9.50,
        extras: [{ nombre: "Doble Carne", precio: 3.00 }]
    }
]);

const calcularSubtotal = () => {
    return productos.value.reduce((total, producto) => {
        let extrasTotal = producto.extras.reduce((sum, extra) => sum + extra.precio, 0);
        return total + (producto.precio * producto.cantidad) + extrasTotal;
    }, 0);
};

const eliminarProducto = (index: number) => {
    productos.value.splice(index, 1);
};

const eliminarExtra = (productoIndex: number, extraIndex: number) => {
    productos.value[productoIndex].extras.splice(extraIndex, 1);
};
</script>

<style scoped>
.btn-confirmar {
    background-color: #007bffb3;
    border-color: #007bffb3;
    color: white;
}

.btn-cancelar {
    background-color: #dc3545b3;
    border-color: #dc3545b3;
    color: white;
}

.order {
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

/* Contenedor de extras/modificaciones con sangría */
.extras-container {
    margin-left: 15px;
    border-left: 3px solid #0f2e38;
    padding-left: 10px;
}

.extra-detail {
    font-size: 0.9rem;
    color: #a8c4cc;
}

.product-list {
    height: 43vh;
    overflow-y: auto;
    border: 1px solid #153E4B;
    border-radius: 10px;
    padding: 10px;
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
</style>
