export class TipoTituloModel {
    intIdTitVal_ID:number;
    strTitVal_Cod:string;
    strTitVal_Desc:string;

    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;

    constructor(){
        this.intIdTitVal_ID=0;
        this.strTitVal_Cod='';
        this.strTitVal_Desc='' 
        this.strCreation_User='';
        this.dtmCreation_Date=new Date();
        this.strModified_User='';
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}