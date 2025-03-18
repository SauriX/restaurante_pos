export class Product {
  constructor(
    public id: number = 0,
    public category: number = 0,
    public name: string = "",
    public img: string = "",
    public price: number = 0.0,
    public color: string = "",
    public extras:Extra[]=[]
  ) {}
}

export class Extra {
    constructor(public nombre:string="",public precio:number=0.0){}
}