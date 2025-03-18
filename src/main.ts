import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { createBootstrap } from "bootstrap-vue-next";

import { createPinia } from "pinia";
import "@/assets/styles/scss/custom.scss"; // Importa los estilos personalizados
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "bootstrap/dist/css/bootstrap.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons"; // Importar todos los íconos sólidos

import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import '@/assets/styles/global.css';
library.add(fas, fab, far); // Agregar todos los íconos de estas categorías

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(createBootstrap());
app.use(router);

// Registrar el componente globalmente
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
