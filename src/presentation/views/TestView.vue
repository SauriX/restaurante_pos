<template>
  <div>
    <h1>Comanda de Impresión</h1>
    <button @click="imprimirComanda">Imprimir</button>

    <div>
      <h1>Optener impresoras</h1>
      <button @click="impresoras">ver</button>
      <div v-for="printer in printers" :key="printer">
        {{ printer }}
      </div>
    </div>


    <div>
    <!-- Botón para abrir el modal -->
    <BButton @click="show">Show Modal</BButton>

    <!-- Modal con ID -->
    <BModal id="my-modal" v-model="modalVisible">
      <template #modal-header>
        <h5 class="modal-title">Contenido del Modal</h5>
      </template>
      <template #modal-body>
        <p>Este es el contenido del modal con ID.</p>
      </template>
      <template #modal-footer>
        <BButton variant="secondary" @click="modalVisible = false">Cerrar</BButton>
      </template>
    </BModal>
  </div>
  </div>
</template>

<script lang="ts" setup>
// Importa tu librería aquí
import Printer from '@/libraries/printer.js'; // O el path de tu librería
import { onMounted, ref } from 'vue';
const printers = ref<string[]>([]);


import { useModal,BButton,BModal } from 'bootstrap-vue-next'
// Ref para controlar la visibilidad del modal
const modalVisible = ref(false);

// Función para abrir el modal por ID usando useModal
const { show, hide } = useModal('my-modal');

// Función para mostrar el modal
const showModal = () => {
  show();
};

// Mostrar el modal programáticamente en el montaje
onMounted(() => {
  // Por ejemplo, mostrar el modal al cargar el componente
  showModal();
});


// Aquí puedes crear la instancia y usarla
const imprimirComanda = () => {
  const printer = new Printer("XP-58");
  // Imprime los detalles como en el ejemplo
  printer.initializePrint();
  printer.alignCenter();
  printer.fontA('COMANDA #183270');
  printer.newLine();
  printer.fontA('MESA: 12');
  printer.newLine();
  printer.alignLeft();
  printer.fontB('2 Hamburguesas');
  printer.newLine();
  printer.fontB('1 Pizza Margherita');
  printer.newLine();
  printer.alignCenter();
  printer.fontB('TOTAL: $200.00');
  printer.newLine();
  printer.separator('_');
  printer.newLine();
  printer.fontD('Fecha: 2025-02-18 15:30');
  printer.newLine();
  printer.fontD('Aux: Juan Pérez');
  printer.newLine();
  printer.separator('_');
  printer.newLine();
  printer.cutFull();
  printer.printDocument();
};

const impresoras = async () => {
  const printer = new Printer();

  var optainedPrinters = await printer.getPrinters();
  console.log(optainedPrinters);
  printers.value = optainedPrinters;
  console.log(printers.value);
};

</script>

<style scoped>
/* Estilos de tu componente */

h1 {
  color: #4CAF50;
}
</style>