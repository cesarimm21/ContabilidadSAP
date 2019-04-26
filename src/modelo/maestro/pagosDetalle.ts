export class PagosDetelleModel {
    intIdPayRunD_ID:number;
    intIdPayRunH_ID:number;
    intIdPayWay_ID:number;
    strPayWay_Cod:string;
    strVendor_NO:string;
    strType_Doc:string;
    strSerie_Doc:string;
    strDocument_NO:string;
    dtmDoc_Date:Date;
    fltValue_Doc:number;
    fltValue_WH_Detrac:number;
    fltValue_WH_Retention:number;
    strBank_Cod:string;
    strBankAcct_Local:string;
    strFore_Swift_Cod:string;
    strFore_Bank_Cod:string;
    strFore_AccBank_NO:string;
    fltPaid_Vendor:number;
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intIdPayRunD_ID=-1;
        this.intIdPayRunH_ID=-1;
        this.intIdPayWay_ID=-1;
        this.strPayWay_Cod='';
        this.strVendor_NO='';
        this.strType_Doc='';
        this.strSerie_Doc='';
        this.strDocument_NO='';
        this.dtmDoc_Date=new Date();
        this.fltValue_Doc=0;
        this.fltValue_WH_Detrac=0;
        this.fltValue_WH_Retention=0;
        this.strBank_Cod='';
        this.strBankAcct_Local='';
        this.strFore_Swift_Cod='';
        this.strFore_Bank_Cod='';
        this.strFore_AccBank_NO='';
        this.fltPaid_Vendor=0;
        this.strCreation_User='';
        this.dtmCreation_Date=new Date();
        this.strModified_User='';
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}