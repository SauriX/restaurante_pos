import { CategoryUseCases } from "@/application/use-cases/CategoryUseCases";
import { Category, CategoryForm } from "@/domain/entities/Category";
import { CategoryRepository } from "@/infraestructure/repositories/CategoryRepository";
import { errorhelper } from "@/util/helpers";


import { defineStore } from "pinia";
import { useAlertStore } from "./AlertStore";
import messages from "@/util/messages";
const categoryRepository = new CategoryRepository();
const categoryUsecase = new CategoryUseCases(categoryRepository);

export const CategoryStore = defineStore("Categorias",{
    state:()=>({
        categories: [] as Category[],
        activeCategories:[] as Category[],
        category: new CategoryForm(),
        error:false,
        alertStore: useAlertStore(),
    }),
    actions:{
        async getCategories(){
            try {
                if(this.categories.length==0){
                    this.categories=await categoryUsecase.getCategories();
                }
                
                this.error = false;
            } catch (error) {
                const errors = errorhelper(error);
                errors.forEach(err=>{
                    this.alertStore.triggerAlert(err.message, "danger", 10000,"bottom-right");
                });
                this.error = true
            }
        },
        async getActiveCategories (){
            try {
                if(this.activeCategories.length==0){
                    this.activeCategories = await categoryUsecase.getActiveCategories();
                }
                this.error = false;
            } catch (error) {
                const errors = errorhelper(error);
                errors.forEach(err=>{
                    this.alertStore.triggerAlert(err.message, "danger", 10000,"bottom-right");
                });
                this.error = false;
            }
        },
        async getCategoryById(id:number){
            try {
                this.category = await categoryUsecase.getCategoryByID(id);
                this.error = false;
                
            } catch (error) {
                const errors = errorhelper(error);8
                errors.forEach(err=>{
                    this.alertStore.triggerAlert(err.message, "danger", 10000,"bottom-right");
                });
                this.error = false;
            }
        },
        async addCategory(category:CategoryForm){
            try {
                const catego= await categoryUsecase.addCategorie(category);
                
                if(this.activeCategories.length!=0){
                    this.activeCategories.push(catego);
                }
                if(this.categories.length!=0){
                    this.categories.push(catego);
                }
                this.error=false;
                this.alertStore.triggerAlert(messages.created, "success", 10000,"bottom-right");
            } catch (error) {
                const erros = errorhelper(error);
                erros.forEach(err=>{
                    this.alertStore.triggerAlert(err.message,"danger",10000,"bottom-right");
                });
            }
        },
        async updateCategory(category:CategoryForm){
            try {
                const catego = await categoryUsecase.updateCtegory(category);
                if(this.activeCategories.length!=0){
                    this.activeCategories= this.activeCategories.map(cat=>cat.id===catego.id?catego:cat);
                }
                if(this.categories.length!=0){
                    this.categories=this.activeCategories.map(cat=>cat.id===catego.id?catego:cat);
                }
                this.error=false;
                this.alertStore.triggerAlert(messages.updated, "success", 10000,"bottom-right");
            } catch (error) {
                const erros = errorhelper(error);
                erros.forEach(err=>{
                    this.alertStore.triggerAlert(err.message,"danger",10000,"bottom-right");
                });
            }
        }
    }
});