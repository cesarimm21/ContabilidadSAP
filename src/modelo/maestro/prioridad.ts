export class PrioridadModel {
    intIdPriority_ID: number;
    strPriority_Cod: string;
    strPriority_Name:string;
    strPriority_Desc:string;
    intPriority_Days:number;   
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intIdPriority_ID=-1;
        this.strPriority_Cod='';
        this.strPriority_Desc='';
        this.strPriority_Name='';
        this.strCreation_User='';
        this.intPriority_Days=0;
        this.strModified_User='';
        this.dtmCreation_Date=new Date();
        this.dtmModified_Date=new Date();
    }
}