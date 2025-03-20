<template>
    <section class="vh-100" style="background-color: #508bfc;">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card shadow" style="border-radius: 1rem;">
                        <div class="card-body p-5 text-center">
                            <h3 class="mb-5">Login</h3>
                            
                            <div class="form-floating mb-4">
                                <input type="email" id="typeEmailX-2" class="form-control" placeholder="Usuario" v-model="user.userNickName"  required>
                                <label for="typeEmailX-2">Usuario</label>
                            </div>
                            
                            <div class="form-floating mb-4">
                                <input type="password" id="typePasswordX-2" class="form-control" placeholder="Password" v-model="user.password" required>
                                <label for="typePasswordX-2">Contraseña</label>
                            </div>
                            
                            <div class="form-check d-flex justify-content-start mb-4">
                                
                            </div>
                            
                            <button class="btn btn-primary btn-lg w-100" type="submit" @click="Login">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script lang="ts" setup>
import { UserLogin } from '@/domain/entities/User';
import { UserStore } from '../stores/UserStore';
import { useRouter } from 'vue-router';

let user = new UserLogin();
const userStore = UserStore();
const router = useRouter();
const Login = async () =>{
    await userStore.Login(user);
    router.push("/");
}
</script>