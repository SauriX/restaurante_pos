import { DiscuntUseCases } from "@/application/use-cases/DiscuntUsesCases";
import { Discunt, DiscuntForm } from "@/domain/entities/Discunts";
import { DiscuntRepository } from "@/infraestructure/repositories/DiscuntRepository";
import { errorhelper } from "@/util/helpers";
import { defineStore } from "pinia";
import { useAlertStore } from "./AlertStore";
import messages from "@/util/messages";
const discuntRepository = new DiscuntRepository();
const discuntUseCases = new DiscuntUseCases(discuntRepository);

export const DiscuntStore = defineStore("discunt",{
    state:()=>({
        discunts:[] as Discunt[],
        discunt:new DiscuntForm(),
        alertStore: useAlertStore(),
        error:false,
    }),
    actions:{
        async getAllDicunts (){
            try {
                if(this.discunts.length==0){
                    this.discunts = await discuntUseCases.getAllDiscunts();
                }
                this.error=false;
            } catch (error) {
                
                const  erros = errorhelper(error);
                erros.forEach(err=>{
                    this.alertStore.triggerAlert(err.message, "danger", 10000,"top-right");
                })
                this.error=true;
            }

        },
        async getDiscuntByID(id:number){
            try {
                    this.discunt = await discuntUseCases.getDiscuntById(id);
                    this.error=false;
            } catch (error) {
                
                const  erros = errorhelper(error);
                erros.forEach(err=>{
                    this.alertStore.triggerAlert(err.message, "danger", 10000,"top-right");
                })
                this.error=true;
            }
        },
        async addDiscunt (discunt:DiscuntForm){
            try {
                
                    const discunts = await discuntUseCases.addDiscunt(discunt);
                    if(this.discunts.length !=0){
                        this.discunts.push(discunts);
                    }
                    this.alertStore.triggerAlert(messages.created, "success", 10000,"top-right");
                    this.error=false;
            } catch (error) {
                const  erros = errorhelper(error);
                erros.forEach(err=>{
                    this.alertStore.triggerAlert(err.message, "danger", 10000,"top-right");
                })
                this.error=true;
            }
            

        },
        async updateDiscunt (discunt:DiscuntForm){
            try {
                const discunts = await discuntUseCases.updateDiscunt(discunt);
                if(this.discunts.length>0){
                    this.discunts = this.discunts.map((type) =>
                        type.discuntId === discunts.discuntId ? discunts : type
                    );
                }
                this.alertStore.triggerAlert(messages.updated, "success", 10000,"top-right");
                this.error=false;
            } catch (error) {
                const  erros = errorhelper(error);
                erros.forEach(err=>{
                    this.alertStore.triggerAlert(err.message, "danger", 10000,"top-right");
                })
                this.error=true;
            }
        }
    }
});