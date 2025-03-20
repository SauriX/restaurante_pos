<template>
  <div :class="['alert-container', alertStore.position]">
    <BAlert v-model="alertStore.dismissCountDown" dismissible :variant="alertStore.variant" fade :class="alertStore.position"
      @close-countdown="alertStore.countdown = $event">
      <p>{{ alertStore.message }}</p>
      <BProgress :variant="alertStore.variant" :max="alertStore.dismissCountDown" :value="alertStore.countdown" v-if="alertStore.showTimmer" height="4px" />
    </BAlert>
  </div>
</template>

<script setup lang="ts">
import { useAlertStore } from "@/presentation/stores/AlertStore";
import { BAlert, BProgress } from 'bootstrap-vue-next'
const alertStore = useAlertStore();



</script>
<style scoped>
.alert-container {
  position: fixed;
  z-index: 1050;
  /* Asegura que se muestre por encima de otros elementos */
  width: 80%;
  max-width: 500px;
  /* Sombra para resaltar */
}

.alert-container.top-left {
  top: 20px;
  left: 20px;
}

.alert-container.top-center {
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.alert-container.top-right {
  top: 20px;
  right: 20px;
}

.alert-container.middle-left {
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
}

.alert-container.middle-center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.alert-container.middle-right {
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

.alert-container.bottom-left {
  bottom: 20px;
  left: 20px;
}

.alert-container.bottom-center {
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.alert-container.bottom-right {
  bottom: 20px;
  right: 20px;
}

.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
