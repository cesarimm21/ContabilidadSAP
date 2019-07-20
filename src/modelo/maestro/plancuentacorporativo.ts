export class PlanCuentaCorporativoModel {
    intIdChartAcct_C_ID:number;
    strChartAcct_C_Cod: string;
    strChartAcct_C_Desc:string;
    strCompany_Cod:string;
    strCompany_Desc:string; 
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intIdChartAcct_C_ID=-1;
        this.strChartAcct_C_Cod="";
        this.strChartAcct_C_Desc="";
        this.strCompany_Cod='';
        this.strCompany_Desc='';
        this.strCreation_User="";
        this.strModified_User="";
        this.dtmCreation_Date=new Date();
        this.dtmModified_Date=new Date();
        this.chrStatus="";
    }
}