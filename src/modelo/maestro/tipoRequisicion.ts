export class TipoRequisicionModel {
    intIdTypeReq_ID:number;
    strTypeReq_Cod:string;
    strTipReq_Desc:string;    
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;

    strCompany_Cod:string;
    strCompany_Desc:string;

    constructor(){
        this.intIdTypeReq_ID=-1;
        this.strTypeReq_Cod="";
        this.strTipReq_Desc="";
        this.strCreation_User="";
        this.strModified_User="";
        this.dtmModified_Date=new Date();
        this.dtmCreation_Date=new Date();
        this.chrStatus="";
    }
}