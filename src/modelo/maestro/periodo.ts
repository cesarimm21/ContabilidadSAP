export class PeriodoModel {
    intIdPayRun_Period: number;
    strPeriod_NO:string;
    strPeriod:string;
    intMonth:number;
    intYear:number;
    strPeriod_Desc:string;
    dtmPeriod_Start:Date;
    dtmPeriod_End:Date;
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intIdPayRun_Period=-1;
        this.strPeriod_NO='';
        this.strPeriod='';
        this.strPeriod_Desc='';
        this.dtmPeriod_Start=new Date();
        this.dtmPeriod_End=new Date();
        this.strCreation_User='';
        this.dtmCreation_Date=new Date();
        this.strModified_User='';
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}
