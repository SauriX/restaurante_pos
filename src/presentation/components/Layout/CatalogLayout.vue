<template>
    <div class="container-fluid mt-4">
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <h2 class="d-flex align-items-center">
                    <font-awesome-icon :icon="icon" /> &nbsp; {{ title }}
                </h2>
                <span class="text-muted">Lista de {{ title }}</span>
            </div>
            <div>
                <button type="button" class="btn btn-success me-2" @click="addItem">
                    <font-awesome-icon :icon="'fa-solid fa-plus'" /> Añadir
                </button>
            </div>
        </div>

        <!-- Sección del título con línea personalizada -->
        <div class="mt-3 text-start position-relative">
            <div class="fw-bold text-success pb-2">
                <span ref="titleElement">{{ title }}</span>
            </div>
            <div class="custom-hr" :style="{ '--title-width': titleWidth + 'px' }"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, defineProps,defineEmits } from "vue";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    }
});

const titleWidth = ref(0);

// Obtiene el ancho del título al renderizar
const titleElement = ref<HTMLElement | null>(null);
const emit = defineEmits(["add"]);

onMounted(() => {
    nextTick(() => {
        if (titleElement.value) {
            titleWidth.value = titleElement.value.offsetWidth + 6; // Captura el ancho del texto
        }
    });
});

const addItem = ()=>{
    emit('add');
}
</script>

<style scoped>
/* Línea base gris */
.custom-hr {
    height: 1px;
    width: 100%;
    /* Ocupar todo el ancho */
    background-color: #ccc;
    /* Línea gris */
    position: relative;
    margin-top: -5px;
}

/* Parte verde del hr */
.custom-hr::before {
    content: "";
    height: 1px;
    width: var(--title-width);
    /* Ancho dinámico */
    background-color: #28a745;
    /* Verde */
    position: absolute;
    top: 0;
    left: 0;
}
</style>
