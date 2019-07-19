export class CategoriaCuentaModel {
    intIdAcctCateg_ID:number;
    strAcctCateg_Cod: string;
    strAcctCateg_Desc:string;    
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intIdAcctCateg_ID=-1;
        this.strAcctCateg_Cod='';
        this.strAcctCateg_Desc='';
        this.strCreation_User='';
        this.strModified_User='';
        this.dtmCreation_Date=new Date();
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}