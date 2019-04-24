export class PagosModel {
    intIdPayRun_ID:number;
    intIdPayWay_ID:number;
    intIdPayRun_Period:number;
    strPeriod_NO:string;
    dtmPeriod:Date;
    strPayWay_Cod:string;
    strPayRun_NO:string;
    strPayRun_Curr:string;
    strPayRun_Status:string;
    strPayRun_Desc:string;
    dtmPayRun_Date:Date;
    fltAmount_Total:number;
    strRef_Payment:string;    
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intIdPayRun_ID=-1;
        this.intIdPayWay_ID=-1;
        this.intIdPayRun_Period=-1;
        this.strPeriod_NO='';
        this.strPayWay_Cod='';
        this.strPayRun_NO='';
        this.strPayRun_Curr='';
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

    }
}    