export class MedioPagoModel {
    intIdPayWay_ID:number;
    strPayWay_Cod:string;
    strPayWay_Name:string;
    strPayWay_Desc:string;

    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intIdPayWay_ID=-1;
        this.strPayWay_Cod='';
        this.strPayWay_Name='';
        this.strPayWay_Desc='';
        this.strCreation_User='';
        this.dtmCreation_Date=new Date();
        this.dtmModified_Date=new Date();
        this.strModified_User='';
        this.chrStatus='';
    }
}    