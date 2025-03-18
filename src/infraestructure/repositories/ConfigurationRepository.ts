import { Configuration } from "@/domain/entities/Configuration";
import { IConfigurationRepository } from "@/domain/repositories/IConfigurationRepository";
import requests from "../agents/agent";

export class ConfigurationRepository implements IConfigurationRepository{

    getConfiguration(id: number): Promise<Configuration> {
        return requests.get(`api/Configurations/${id}`);
    }
    UpdateConfiguration(configuration: Configuration): Promise<Configuration> {
        return requests.put("api/Configurations",configuration);
    }
    
}