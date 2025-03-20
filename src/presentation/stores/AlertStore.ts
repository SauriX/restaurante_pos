import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", {
    state: () => ({
        
        message: "",
        variant: "" as "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark",
        dismissCountDown: 5000,
        countdown: 0,
        position: "top-center" as "top-left" | "top-center" | "top-right" | "middle-left" | "middle-center" | "middle-right" | "bottom-left" | "bottom-center" | "bottom-right",
        showTimmer:false
    }),
    actions: {
        triggerAlert(msg: string, variant: typeof this.variant = "warning" , duration:number,position: typeof this.position = "top-center",showTimmer = false) {
            this.message = msg;
            this.variant = variant;
            this.dismissCountDown = duration;
            this.position = position; // Cambiar la posición de la alerta
            this.showTimmer = showTimmer;
        }, 
    }
});
