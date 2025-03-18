export class Configuration {
  constructor(
    public id:number = 0,
    public establecimientoNombre:string= "",
    public representante:string = "",
    public rfc: string="",
    public telefono: string="",
    public celular: string = "",
    public enviarSMS: boolean = false,
    public direccion: string = "",
    public bkpAlias: string="",
    public autoBackup: boolean = false,
    public cobroDirecto: boolean = false,
    public impresoraUnica: boolean = false,
    public impresoraDomicilio: string="",
    public impresoraCuentas: string="",
    public impresoraCobros: string="",
    public impresoraCortes: string="",
    public alertaCorte: string="",
    public emailNotificacion: string="",
  ) {}
}
