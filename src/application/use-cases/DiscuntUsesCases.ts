import { Discunt, DiscuntForm } from "@/domain/entities/Discunts";
import { IDiscuntRepository } from "@/domain/repositories/IDiscuntRepository";

export class DiscuntUseCases {
    constructor(private discuntRepository:IDiscuntRepository){}
    async getAllDiscunts():Promise<Discunt[]>{
        return await this.discuntRepository.getAllDiscunts();
    }
    async getDiscuntById(id:number):Promise<DiscuntForm>{
        return await this.discuntRepository.getDiscuntsById(id);
    }
    async addDiscunt(discunt:DiscuntForm):Promise<Discunt>{
        return await this.discuntRepository.addDiscunt(discunt);
    }
    async updateDiscunt(discunt:DiscuntForm):Promise<Discunt>{
        return await this.discuntRepository.updateDiscunt(discunt);
    }
}