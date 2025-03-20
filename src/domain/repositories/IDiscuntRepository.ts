import { Discunt, DiscuntForm } from "../entities/Discunts";

export  interface IDiscuntRepository {
    getAllDiscunts():Promise<Discunt[]>,
    getDiscuntsById(id:number):Promise<DiscuntForm>,
    addDiscunt(discunt:DiscuntForm):Promise<Discunt>,
    updateDiscunt(discunt:DiscuntForm):Promise<Discunt>,

}