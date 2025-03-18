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
                        <label for="nameUserType" class="form-label fw-bold">Nombre</label>
                        <input type="text" id="nameUserType" class="form-control" v-model="userType.userTypeName"
                            placeholder="Ingrese el nombre del tipo de usuario">
                    </div>
                </div>
            </div>

            <div class="text-end">
                <button class="btn btn-primary" @click="save">
                    <font-awesome-icon icon="fa-solid fa-save" v-if="!loading"/> <BSpinner v-if="loading"/> Guardar
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { UserTypeForm } from '@/domain/entities/UserType';
import { UserTypeStore } from '@/presentation/stores/UserTypeStore';
import { defineProps, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import {BSpinner} from 'bootstrap-vue-next';
const router = useRouter();
const userTypeStore = UserTypeStore();
const loading = ref(false);
let userType = ref(new UserTypeForm());

const props = defineProps(
    {
        id: {
            type: Number,
            required: true,
        }
    }
);

onMounted(async () => {
    if (!props.id) {
        return;
    }
    userType.value = await userTypeStore.getUserTypeById(props.id);
    console.log("editar");
});
//funcion para regresar
const back = () => {
    router.push({ name: 'UserTypes' })
};

//funcion para guardar
const save = async ()=>{
    loading.value = true;
    if(props.id){
        await userTypeStore.updateUserType(userType.value);
        console.log("guardar");
        back();
        loading.value= false;
        return;
    }
    await userTypeStore.addUserType(userType.value);
    console.log("guardar nuevo");
    loading.value= false;
    back();
}

</script>
<style scoped></style>