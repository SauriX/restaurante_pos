<template>
    <div class="container py-4">
        <!-- Encabezado -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="mb-0">Nuevo Tipo de Usuario</h2>
            <button @click="back" class="btn btn-outline-secondary">
                <font-awesome-icon icon="fa-solid fa-circle-left" /> Regresar
            </button>
        </div>

        <!-- Formulario -->
        <div class="card shadow-sm p-4 text-start">
            <div class="row">
                <div class="col-4">
                    <div class="mb-3">
                        <label for="nameUserType" class="form-label fw-bold">Descripcion</label>
                        <input type="text" id="nameUserType" class="form-control" v-model="discunt.discuntName"
                            placeholder="descripcion del descuento">
                    </div>
                </div>
                <div class="col-4">
                    <div class="mb-3">
                        <label for="nameUserType" class="form-label fw-bold">Porciento</label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" v-model="discunt.porcent"
                                aria-label="descuento en %">
                                <span class="input-group-text">%</span>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="mb-3 d-flex justify-content-start mt-4">
                        <label for="nameUserType" class="form-label fw-bold"></label>
                        <BFormCheckbox class="" reverse switch size="lg" v-model="discunt.active"> Activo </BFormCheckbox>

                    </div>
                </div>
            </div>

            <div class="text-end">
                <button class="btn btn-primary" @click="save">
                    <font-awesome-icon icon="fa-solid fa-save" :beat-fade="loading" /> Guardar
                </button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { DiscuntForm } from '@/domain/entities/Discunts';
import { ref,defineProps, onMounted } from 'vue';
import { BFormCheckbox } from 'bootstrap-vue-next'
import { useRouter } from 'vue-router';
import { DiscuntStore } from '@/presentation/stores/DiscuntsStore';
const props = defineProps(
    {
        id: {
            type: Number,
            required: true,
        }
    }
);
const loading = ref(false);
const discunt = ref(new DiscuntForm());
const router = useRouter();
const discuntStore = DiscuntStore();
onMounted(async()=>{
    loading.value= true;
    if(props.id){
        await discuntStore.getDiscuntByID(props.id);
        discunt.value = discuntStore.discunt;
    }
    loading.value=false;
});
const back = () => {
    router.push({name:"Discunts"});
}
const save = async  () => {
    loading.value = true;
    if(props.id){
        await  discuntStore.updateDiscunt(discunt.value);
    }else{
        await discuntStore.addDiscunt(discunt.value);
    }
    loading.value = false
    if(!discuntStore.error){
        back();
    }
    
}
</script>
<style scoped></style>