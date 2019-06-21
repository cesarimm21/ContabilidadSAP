export class SucursalModel {
    intIdSubsidiary_ID:number;
    intIdCompany_ID: number;
    strCompany_Cod:string;
    strCompany_Desc:string;
    strSubsidiary_Cod:string;
    strSubsidiary_Desc:string;
    strSubsidiary_Address:string;    
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intIdSubsidiary_ID=-1;
        this.intIdCompany_ID=-1;
        this.strCompany_Cod='';
        this.strCompany_Desc='';
        this.strSubsidiary_Cod='';
        this.strSubsidiary_Desc='';
        this.strSubsidiary_Address='';
        this.strCreation_User='';
        this.dtmCreation_Date=new Date();
        this.strModified_User='';
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}