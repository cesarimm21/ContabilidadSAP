export class CategoriaCentroCostoModel {
    intCCCategory_ID:number;
    strCCCategory_Cod: string;
    strCCCategory_Desc:string;
    strCompany_Cod:string;
    strCompany_Desc:string;    
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intCCCategory_ID=-1;
        this.strCCCategory_Cod='';
        this.strCCCategory_Desc='';
        this.strCompany_Cod='';
        this.strCompany_Desc='';
        this.strCreation_User='';
        this.strModified_User='';
        this.dtmCreation_Date=new Date();
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}