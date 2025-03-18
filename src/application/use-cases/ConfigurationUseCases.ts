import { Configuration } from "@/domain/entities/Configuration";
import { IConfigurationRepository } from "@/domain/repositories/IConfigurationRepository";

export class ConfigurationUseCases {
    constructor(private configurationRepository:IConfigurationRepository){}
        async getUserTypeById(id: number): Promise<Configuration> {
            return this.configurationRepository.getConfiguration(id);
        }
        async updateUserType(confi: Configuration): Promise<Configuration> {
            return this.configurationRepository.UpdateConfiguration(confi);
        }
}