export class CorrelativoModel {
    intIdCorrelativo_ID:number;
    strModule:string | null;
    strCorrel_Cod:string | null;
    strCompany_Cod:string;
    strCompany_Desc:string;
    strProccess_Name:string | null;
    strTransaction_Name:string | null;
    fltOrigenDocum_NO:number | null;    
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intIdCorrelativo_ID=-1;
        this.strModule='';
        this.strCorrel_Cod='';
        this.strCompany_Cod='';
        this.strCompany_Desc='';
        this.strProccess_Name='';
        this.strTransaction_Name='';
        this.fltOrigenDocum_NO=0;
        this.strCreation_User='';
        this.strModified_User='';
        this.dtmCreation_Date=new Date();
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}