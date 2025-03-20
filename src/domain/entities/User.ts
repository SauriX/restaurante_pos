
export class User {
    constructor(
        public userId:number = 0,
        public userName: string ="",
        public userNickName: string="",
        public active:boolean= true,
        public id_UserType:number= 0,
        public userType: string="",
    ) {}
}
export class UserForm {
    constructor(
        public userId:number = 0,
        public userName: string = "",
        public userNickName: string = "",
        public password: string = "",
        public active:boolean = true,
        public id_UserType:number = 0
) {}
}
export class UserLogin { 
    constructor(public userNickName: string = "", public password: string = "") {}
}

export class UserInfo {
    constructor(
        public userId: string = "",
        public username: string = "",
        public role: string = ""
    ) {}
}
