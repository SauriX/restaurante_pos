import { Configuration } from "../entities/Configuration";

export interface IConfigurationRepository {
    getConfiguration(id:number):Promise<Configuration>,
    UpdateConfiguration(configuration:Configuration):Promise<Configuration>
}