import { ConfigurationUseCases } from "@/application/use-cases/ConfigurationUseCases";
import { Configuration } from "@/domain/entities/Configuration";
import { ConfigurationRepository } from "@/infraestructure/repositories/ConfigurationRepository";
import { defineStore } from "pinia";
import { useAlertStore } from "./AlertStore";
import { errorhelper } from "@/util/helpers";
import messages from "@/util/messages";
const configurationRepository = new ConfigurationRepository();
const configurationUsecase = new ConfigurationUseCases(configurationRepository);
export const ConfigurationStore = defineStore("",{
    state:()=>({
    configuration: new Configuration(),
    error:false,
    alerStore:useAlertStore(),
}),
actions:{
    async getConfiguration() {
        try {
            this.configuration = await configurationUsecase.getUserTypeById(1);
            
            this.error=false;
        } catch (error) {
            const erros = errorhelper(error);
            erros.forEach(err=>{
                this.alerStore.triggerAlert(err.message,"danger",10000,"top-right");
            });
            this.error=true;
        }
        
    },
    async updateConfiguration (configuration:Configuration){
        try {
            this.configuration = await configurationUsecase.updateUserType(configuration);
            this.error=false;
            this.alerStore.triggerAlert(messages.updated,"success",10000,"top-right");
        } catch (error) {
            const erros = errorhelper(error);
            erros.forEach(err=>{
                this.alerStore.triggerAlert(err.message,"danger",10000,"top-right");
            });
            this.error=true;
        }
        
    },
}
});