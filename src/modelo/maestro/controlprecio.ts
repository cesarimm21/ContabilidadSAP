export class ControlPrecioModel {
    intIdCtlPrec_ID:number;
    strCtlPrec_Cod:string;
    strCtlPrec_Desc:string;
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intIdCtlPrec_ID=-1;
        this.strCtlPrec_Cod='';
        this.strCtlPrec_Desc='';
        this.strCreation_User='';
        this.strModified_User='';
        this.dtmCreation_Date=new Date();
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}