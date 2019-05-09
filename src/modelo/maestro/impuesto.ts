export class ImpuestoModel {
    intIdWH_ID:number;
    strWH_Cod: string;
    blnWH_Grp: boolean;//falta
    strWH_Name: string;//falta
    strWH_Desc:string;
    fltPorcent: number;
    strCalc_Bas1: string;
    strAcct_Debit: string;
    strAcct_Credit:string;
    strCalc_Bas2:string;
    strWH_Cod2:string;
    strCalc_Bas3:string;    
    strWH_Cod3:string;  
    strCta_Country:string;  
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intIdWH_ID=-1;
        this.strWH_Cod='';
        this.blnWH_Grp=false;
        this.strWH_Name='';
        this.strWH_Desc='';
        this.fltPorcent=0;
        this.strCalc_Bas1='';
        this.strAcct_Debit='';
        this.strAcct_Credit='';
        this.strCalc_Bas2='';
        this.strWH_Cod2='';
        this.strCalc_Bas3='';
        this.strWH_Cod3='';
        this.strCta_Country='';
        this.strCreation_User='';
        this.dtmCreation_Date=new Date();
        this.strModified_User='';
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}