export class Discunt {
    constructor(
        public discuntId: number =0,
        public discuntName: string="",
        public porcent: string="",
        public active: string=""
    ){}
}

export class DiscuntForm {
    constructor(
        public discuntId: number =0,
        public discuntName: string="",
        public porcent: number=0,
        public active: boolean=true
    ){}
}