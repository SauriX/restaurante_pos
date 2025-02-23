import { defineStore } from "pinia";
import { ref } from "vue";

export const UserStore = defineStore('Usuarios',()=>{
    const Logged = ref(false);
    
    return {Logged}
})