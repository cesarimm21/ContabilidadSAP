export class PlanConLocalModel {
    intIdChartAcct_L_ID:number;
    strChartAcct_L_Cod: string;
    strChartAcct_L_Desc:string;   
    strCompany_Cod:string;
    strCompany_Desc:string; 
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intIdChartAcct_L_ID=-1;
        this.strChartAcct_L_Cod='';
        this.strChartAcct_L_Desc='';
        this.strCompany_Cod='';
        this.strCompany_Desc='';
        this.strCreation_User='';
        this.strModified_User='';
        this.dtmCreation_Date=new Date();
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}