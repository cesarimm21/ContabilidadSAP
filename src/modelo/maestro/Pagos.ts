export class PagosModel {
    intIdPayRun_ID:number;
    strCompany_Cod:string ;
    strCompany_Desc:string;
    intIdPayWay_ID:number;
    intIdPayRun_Period:number;
    strPeriod_NO:string;
    dtmPeriod:Date;
    strBank_Cod:string;
    strBank_Name:string;
    strPayWay_Cod:string;//falta
    strPayRun_NO:string;//*
    strPayRun_Curr:string;//*
    strPayRun_Curr_Desc:string;//*
    strPayRun_Status:string;//*
    strPayRun_Desc:string;//falta
    dtmPayRun_Date:Date;//*
    fltAmount_Total:number;//*
    strRef_Payment:string;//falta
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    listaDetalle:any[]; 
    constructor(){
        this.intIdPayRun_ID=-1;
        this.strCompany_Cod='';
        this.strCompany_Desc='';
        this.intIdPayWay_ID=-1;
        this.intIdPayRun_Period=-1;
        this.strPeriod_NO='';
        this.strBank_Cod='';
        this.strBank_Name='';
        this.strPayWay_Cod='';
        this.strPayRun_NO='';
        this.strPayRun_Curr='';
        this.strPayRun_Curr_Desc='';
        this.strPayRun_Status='';
        this.strPayRun_Desc='';
        this.dtmPayRun_Date=new Date();
        this.fltAmount_Total=0;
        this.strRef_Payment='';
        this.strCreation_User='';
        this.dtmCreation_Date=new Date();
        this.strModified_User='';
        this.dtmModified_Date=new Date();
        this.chrStatus='A';
        this.listaDetalle=[];
    }
}    