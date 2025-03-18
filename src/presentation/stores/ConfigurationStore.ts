import { ConfigurationUseCases } from "@/application/use-cases/ConfigurationUseCases";
import { Configuration } from "@/domain/entities/Configuration";
import { ConfigurationRepository } from "@/infraestructure/repositories/ConfigurationRepository";
import { defineStore } from "pinia";
const configurationRepository = new ConfigurationRepository();
const configurationUsecase = new ConfigurationUseCases(configurationRepository);
export const ConfigurationStore = defineStore("",{
    state:()=>({
    configuration: new Configuration()
}),
actions:{
    async getConfiguration() {
        this.configuration = await configurationUsecase.getUserTypeById(1);
    },
    async updateConfiguration (configuration:Configuration){
        this.configuration = await configurationUsecase.updateUserType(configuration);
    },
}
});