export class Category {
    constructor(public id: number = 0, public name: string="",public discunt:string="",public active:string="") {}
}

export class CategoryForm{
    constructor(
        public id:number= 0,
        public name:string="",
        public discunt:string="",
        public active:boolean=true
    ){}
}