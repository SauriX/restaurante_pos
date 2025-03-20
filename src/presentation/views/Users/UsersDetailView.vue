<template>
    <div class="container py-4">
        <!-- Encabezado -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="mb-0">Nuevo Usuario</h2>
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
                        <input type="text" id="nameUserType" class="form-control" v-model="user.userName"
                            placeholder="Ingrese el nombre del  usuario">
                    </div>
                </div>
                <div class="col-4">
                    <div class="mb-3">
                        <label for="nameUserType" class="form-label fw-bold">Usuario</label>
                        <input type="text" id="nameUserType" class="form-control" v-model="user.userNickName"
                            placeholder="Ingrese el  usuario">
                    </div>
                </div>
                <div class="col-4">
                    <div class="mb-3">
                        <label for="nameUserType" class="form-label fw-bold">Contraseña</label>
                        <div class="input-group">
                            <input :type="inputType" id="nameUserType" class="form-control" v-model="user.password"
                                placeholder="Ingrese la contraseña">
                            <button type="button" class="btn btn-light" @click="togglePassword">
                                <font-awesome-icon :icon="passicon" />
                            </button>
                        </div>

                    </div>
                </div>

                <div class="col-4">
                    <div class="mb-3">
                        <label for="nameUserType" class="form-label fw-bold">Rol</label>
                        <select class="form-select" aria-label="Default select example" v-model="user.id_UserType">
                            <option value="0" selected>Selecciona el rol</option>
                            <option v-for="rol in userTypeStore.UserTypes" :value="rol.idUserType" :key="rol.idUserType"
                                selected>{{ rol.nameUserType }}</option>

                        </select>

                    </div>
                </div>
                <div class="col-3">
                    <div class="mb-3 d-flex justify-content-start mt-4">
                        <label for="nameUserType" class="form-label fw-bold"></label>
                        <BFormCheckbox class="" reverse switch size="lg" v-model="user.active"> Activo </BFormCheckbox>

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
import { UserForm } from '@/domain/entities/User';
import { useAlertStore } from '@/presentation/stores/AlertStore';
import { UserStore } from '@/presentation/stores/UserStore';
import { UserTypeStore } from '@/presentation/stores/UserTypeStore';
import router from '@/router';
import { errorhelper } from '@/util/helpers';
import { BFormCheckbox } from 'bootstrap-vue-next'
import { onMounted, ref, defineProps } from 'vue';
const userTypeStore = UserTypeStore();
const userStore = UserStore();
const alertStore = useAlertStore();
const passicon = ref("fa-solid fa-eye");
const inputType = ref<'password' | 'text'>('password');
const user = ref(new UserForm());
const loading = ref(false);
const props = defineProps(
    {
        id: {
            type: Number,
            required: true,
        }
    }
);

onMounted(async () => {
    loading.value = true;
    await userTypeStore.getAllUserTypes();
    if (!props.id) {
        loading.value = false;
        return;
    }
    await userStore.getById(props.id);
    user.value = userStore.User;
    loading.value = false;

});

const togglePassword = () => {

    if (inputType.value === 'password') {
        inputType.value = 'text';
        passicon.value = 'fas fa-eye-slash';
    } else {
        inputType.value = 'password';
        passicon.value = 'fas fa-eye';
    }
}

const back = () => {
    router.push({ name: "Users" });
}

const save = async () => {
    loading.value = true;
    try {
        if (props.id) {
            await userStore.updateUser(user.value);
        } else {
            await userStore.addUser(user.value);
        }
        back();
        loading.value = false;
    } catch (error) {
        var erros = errorhelper(error);
        if(props.id){
            await userStore.getById(props.id);
            user.value = userStore.User;
        }

        erros.forEach(err=>{
            alertStore.triggerAlert(err.message, "danger", 10000,"bottom-right");
        })
        
        loading.value = false;
    }
}
</script>
<style scoped></style>