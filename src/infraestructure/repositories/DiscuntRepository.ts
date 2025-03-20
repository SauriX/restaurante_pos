import { Discunt, DiscuntForm } from "@/domain/entities/Discunts";
import { IDiscuntRepository } from "@/domain/repositories/IDiscuntRepository";
import requests from "../agents/agent";

export class DiscuntRepository implements IDiscuntRepository {
    async getAllDiscunts(): Promise<Discunt[]> {
        return await requests.get("api/Discunt/all");
    }
    async getDiscuntsById(id: number): Promise<DiscuntForm> {
        return await requests.get(`api/Discunt/${id}`);
    }
    async addDiscunt(discunt: DiscuntForm): Promise<Discunt> {
        return await requests.post("api/Discunt",discunt);
    }
    async updateDiscunt(discunt: DiscuntForm): Promise<Discunt> {
        return await requests.put("api/Discunt",discunt);
    }

}