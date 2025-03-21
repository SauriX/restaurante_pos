<template>
    <div class="container py-4">
        <!-- Encabezado -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="mb-0"><font-awesome-icon icon="fa-solid fa-gear" /> Configuracion general</h2>
            <button @click="back" class="btn btn-outline-secondary">
                <font-awesome-icon icon="fa-solid fa-circle-left" /> Regresar
            </button>
        </div>

        <!-- Formulario -->
        <div class="card shadow-sm p-4 text-start">
            <div class="row">
                <div class="col-4">
                    <div class="mb-3">
                        <label for="nameUserType" class="form-label fw-bold">Nombre del establecimiento</label>
                        <input type="text" id="nameUserType" class="form-control" v-model="configurationForm.establecimientoNombre"
                            placeholder="Ingrese el nombre del establecimiento">
                    </div>
                </div>
                <div class="col-4">
                    <div class="mb-3">
                        <label for="nameUserType" class="form-label fw-bold">Representante</label>
                        <input type="text" id="nameUserType" class="form-control" v-model="configurationForm.representante"
                            placeholder="Ingrese el nombre del rerpesentante">
                    </div>
                </div>
                <div class="col-4">
                    <div class="mb-3">
                        <label for="nameUserType" class="form-label fw-bold">Rfc</label>
                        <input type="text" id="nameUserType" class="form-control" v-model="configurationForm.rfc"
                            placeholder="Ingrese su rfc">
                    </div>
                </div>
                <div class="col-4">
                    <div class="mb-3">
                        <label for="nameUserType" class="form-label fw-bold">Telefono</label>
                        <input type="text" id="nameUserType" class="form-control" v-model="configurationForm.telefono"
                            placeholder="Ingrese su numero de telefono">
                    </div>
                </div>
                <div class="col-4">
                    <div class="mb-3">
                        <label for="nameUserType" class="form-label fw-bold">Celular</label>
                        <input type="text" id="nameUserType" class="form-control" v-model="configurationForm.celular"
                            placeholder="Ingrese su numero de celular">
                    </div>
                </div>
                <div class="col-4">
                    <div class="mb-3 d-flex justify-content-start mt-4">
                        <label for="nameUserType" class="form-label fw-bold"></label>
                        <BFormCheckbox class="" reverse switch size="lg" v-model="configurationForm.enviarSMS"> Notificación SMS </BFormCheckbox>

                    </div>
                </div>
                <div class="col-4">
                    <div class="mb-3">
                        <label for="nameUserType" class="form-label fw-bold">Direccion</label>
                        <input type="text" id="nameUserType" class="form-control" v-model="configurationForm.direccion"
                            placeholder="Ingrese La direccion del establecimieton">
                    </div>
                </div>
                <div class="col-4">
                    <div class="mb-3">
                        <label for="nameUserType" class="form-label fw-bold">Alias del respaldo </label>
                        <input type="text" id="nameUserType" class="form-control" v-model="configurationForm.bkpAlias"
                            placeholder="Ingrese un alias para su respaldo">
                    </div>
                </div>

                <div class="col-4">
                    <div class="mb-3 d-flex justify-content-start mt-4">
                        <label for="nameUserType" class="form-label fw-bold"></label>
                        <BFormCheckbox class="" reverse switch size="lg" v-model="configurationForm.bkpAlias"> Respaldo </BFormCheckbox>

                    </div>
                </div>
                <div class="col-4">
                    <div class="mb-3">
                        <label for="nameUserType" class="form-label fw-bold">Impresora domicilio</label>
                        <select class="form-select" aria-label="Default select example" v-model="configurationForm.impresoraDomicilio">
                            <option value="" selected>Selecciona Impresora</option>
                            <option v-for="printeritem in printerList" :key="printeritem" :value="printeritem" >{{ printeritem }}</option>
                        </select>
                    </div>
                </div>

                <div class="col-4">
                    <div class="mb-3">
                        <label for="nameUserType" class="form-label fw-bold">Impresora cuentas</label>
                        <select class="form-select" aria-label="Default select example" v-model="configurationForm.impresoraCuentas">
                            <option value="" selected>Selecciona Impresora</option>
                            <option v-for="printeritem in printerList" :key="printeritem" :value="printeritem" >{{ printeritem }}</option>
                        </select>
                    </div>
                </div>

                <div class="col-4">
                    <div class="mb-3">
                        <label for="nameUserType" class="form-label fw-bold" >Impresora cobros</label>
                        <select class="form-select" aria-label="Default select example" v-model="configurationForm.impresoraCobros">
                            <option value="" selected>Selecciona Impresora</option>
                            <option v-for="printeritem in printerList" :key="printeritem" :value="printeritem" >{{ printeritem }}</option>
                        </select>
                    </div>
                </div>

                <div class="col-4">
                    <div class="mb-3">
                        <label for="nameUserType" class="form-label fw-bold">Impresora cortes</label>
                        <select class="form-select" aria-label="Default select example" v-model="configurationForm.impresoraCortes">
                            <option value="" selected>Selecciona Impresora</option>
                            <option v-for="printeritem in printerList" :key="printeritem" :value="printeritem" >{{ printeritem }}</option>
                        </select>

                    </div>
                </div>
                <div class="col-4">
                    <div class="mb-3">
                        <label for="nameUserType" class="form-label fw-bold">Email para notificasiones</label>
                        <input type="text" id="nameUserType" class="form-control" v-model="configurationForm.emailNotificacion"
                            placeholder="Ingrese su email">
                    </div>
                </div>
                <div class="col-3">
                    <div class="mb-3 d-flex justify-content-start mt-4">
                        <label for="nameUserType" class="form-label fw-bold"></label>
                        <BFormCheckbox class="" reverse switch size="lg" v-model="configurationForm.cobroDirecto"> Cobro directo </BFormCheckbox>

                    </div>
                </div>
                <div class="col-3">
                    <div class="mb-3 d-flex justify-content-start mt-4">
                        <label for="nameUserType" class="form-label fw-bold"></label>
                        <BFormCheckbox class="" reverse switch size="lg" v-model="configurationForm.impresoraUnica"> Impresora Unica </BFormCheckbox>

                    </div>
                </div>
            </div>

            <div class="text-end">
                <button class="btn btn-primary" @click="save">
                    <font-awesome-icon icon="fa-solid fa-save" v-if="!loading" />
                    <BSpinner v-if="loading" /> Guardar
                </button>
            </div>


        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { BFormCheckbox } from 'bootstrap-vue-next'
import Printer from '@/libraries/printer.js'
import { Configuration } from '@/domain/entities/Configuration';
import { useRouter } from 'vue-router';
import { ConfigurationStore } from '../stores/ConfigurationStore';

const router = useRouter();
const printer = new Printer();
const configuratioStore = ConfigurationStore();
let printerList = ref([] as string []);
let configurationForm = ref(new Configuration());

const loading = ref(false);
onMounted(async () => { 
    
    printerList.value = await printer.getPrinters(); 
    await configuratioStore.getConfiguration();
    configurationForm.value = configuratioStore.configuration;
});
const back = () => {
    router.push("/");
}

const save = async () => {
    await configuratioStore.updateConfiguration(configurationForm.value);
    if(!configuratioStore.error){
        back();
    }
}
</script>
<style scoped></style>