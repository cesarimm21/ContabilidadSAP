export class ServicioPrestadoModel {
    intIdNDServ_ID:number;
    strNDServ_Cod:string;
    strNDServ_Desc:string;
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intIdNDServ_ID=-1;
        this.strNDServ_Cod='';
        this.strNDServ_Desc='';
        this.strCreation_User='';
        this.strModified_User='';
        this.dtmCreation_Date=new Date();
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}