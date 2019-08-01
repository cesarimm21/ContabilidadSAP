export class TipoOperacionModel {
    intIdTypeOper_ID:Number;
    strTypeOper_Cod:string;
    strTypeOper_Desc:string;    
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intIdTypeOper_ID=-1;
        this.strTypeOper_Cod='';
        this.strTypeOper_Desc='';
        this.strCreation_User='';
        this.strModified_User='';
        this.dtmCreation_Date=new Date();
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}