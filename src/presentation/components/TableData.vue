<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-3">
                <!-- Selector de elementos por página -->
                <div class="mt-3 d-flex justify-content-start align-items-center">
                    <label for="itemsPerPage" class="form-label ms-2">Items por página:</label>
                    <select id="itemsPerPage" v-model="itemsPerPage" class="form-select ms-2">
                        <option v-for="option in pageOptions" :key="option" :value="option">
                            {{ option }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="col-3 offset-6">

                <div class="input-group mt-3">

                    <input type="text" v-model="searchText" placeholder="Buscar..." class="form-control" />
                    <button class="btn btn-outline-secondary" type="button" id="button-addon1"
                        disabled><font-awesome-icon :icon="['fas', 'magnifying-glass']" :beat-fade="loading"/></button>
                </div>

            </div>
            <div class="col-12 mt-4">


                <!-- Tabla -->
                <table class="table table-hover table-bordered">
                    <thead>
                        <tr class="table-dark">
                            <th v-for="(header, index) in columns.headers" :key="index" scope="col">
                                {{ header.label }}
                            </th>
                            <th v-if="columns.actions!.length" scope="col">Acciones</th>
                        </tr>
                    </thead>
                    
                    
                    <tbody class="table-group-divider" v-if="!loading">
                        <tr v-for="(item, rowIndex) in paginatedData" :key="rowIndex">
                            <td v-for="(header, colIndex) in columns.headers" :key="colIndex">
                                {{ item[header.key] }}
                            </td>
                            <td v-if="columns.actions!.length">
                                <template v-for="(action, actionIndex) in columns.actions" :key="actionIndex">
                                    <!-- Si tiene ícono y no tiene texto, mostramos solo el ícono -->
                                    <button v-if="action.icon && !action.label" @click="action.method(item)"
                                        class="btn btn-sm" :class="action.class">
                                        <font-awesome-icon :icon="action.icon" />
                                    </button>
                                    <!-- Si tiene texto, mostramos el botón con texto -->
                                    <button v-else @click="action.method(item)" class="btn btn-sm"
                                        :class="action.class">
                                        <font-awesome-icon v-if="action.icon" :icon="action.icon" />
                                        {{ action.label }}
                                    </button>
                                </template>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-12 d-flex justify-content-center">
                <BSpinner v-if="loading"/>
            </div>
            <div class="col-3"></div>
            <div class="col-3 offset-6">
                <!-- Paginador -->
                <div class="pagination-container d-flex align-content-end">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <!-- Botón para ir a la primera página -->
                            <li class="page-item" @click="goToPage(1)" :class="{ disabled: currentPage <= 1 }">
                                <a class="page-link" href="#" aria-label="First">
                                    <span aria-hidden="true">««</span>
                                </a>
                            </li>

                            <!-- Botón de "Previous" -->
                            <li class="page-item" @click="previousPage" :class="{ disabled: currentPage <= 1 }">
                                <a class="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>

                            <!-- Páginas alrededor de la página actual -->
                            <li v-for="page in pagesToShow" :key="page" class="page-item"
                                :class="currentPage === page ? 'active' : ''">
                                <a class="page-link" href="#" @click="goToPage(page)">{{ page }}</a>
                            </li>

                            <!-- Botón de "Next" -->
                            <li class="page-item" @click="nextPage" :class="{ disabled: currentPage >= totalPages }">
                                <a class="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>

                            <!-- Botón para ir a la última página -->
                            <li class="page-item" @click="goToPage(totalPages)"
                                :class="{ disabled: currentPage >= totalPages }">
                                <a class="page-link" href="#" aria-label="Last">
                                    <span aria-hidden="true">»»</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {BSpinner} from 'bootstrap-vue-next'
interface TableHeader {
    key: string;
    label: string;
}

interface TableAction {
    label?: string;
    class?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    method: (row: any) => void;
}

interface TableColumn {
    headers: TableHeader[];
    actions?: TableAction[];
}

const props = defineProps<{
    columns: TableColumn;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[];
    loading:boolean;
}>();

// Estado del filtro y la paginación
const searchText = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10); // Valor inicial de elementos por página
const pageOptions = ref([10, 20, 25, 30]); // Opciones para el selector de "Items por página"
const pageRange = 5;
// Filtrar los datos por el texto ingresado
const filteredData = computed(() => {
    return props.data.filter((item) => {
        return Object.values(item).some(value =>
            String(value).toLowerCase().includes(searchText.value.toLowerCase())
        );
    });
});

// Calcular los datos paginados
const paginatedData = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value;
    return filteredData.value.slice(startIndex, startIndex + itemsPerPage.value);
});

// Total de páginas
 const totalPages = computed(() => {
    return Math.ceil(filteredData.value.length / itemsPerPage.value);
});


// Navegar a la página anterior
const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

// Navegar a la página siguiente
const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};
// Función para ir a una página específica
function goToPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
}
const pagesToShow = computed(() => {
    let start = currentPage.value - Math.floor(pageRange / 2);
    let end = currentPage.value + Math.floor(pageRange / 2);

    // Ajustar los valores de inicio y fin si están fuera del rango permitido
    if (start < 1) {
        start = 1;
        end = Math.min(pageRange, totalPages.value);
    }
    if (end > totalPages.value) {
        end = totalPages.value;
        start = Math.max(totalPages.value - pageRange + 1, 1);
    }

    // Crear un array con las páginas a mostrar
    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
});
</script>

<style scoped>
.btn {
    margin-right: 5px;
}

.pagination-container {
    margin-top: 10px;
    display: flex;
    justify-content: end;
    align-items: center;
}

.pagination-container button {
    margin: 0 5px;
}

.form-select {
    max-width: 25%;
}
</style>
