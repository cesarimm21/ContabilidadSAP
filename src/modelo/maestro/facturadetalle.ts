export class FacturaDetalleModel{
    intAPDocD_ID:number;//
    intAPDocH_ID:number;//
    intIdPOD_ID:number;
    strCompany_Cod:string;//
    strVoucher_NO:string;//
    strPO_NO:string;//
    intPO_Item_NO:number;//falta
    strUM:string;//
    intQuantity:number;//
    fltRec_QYT:number;//
    fltRec_Pend_QTY:number;//
    fltPay_Factura:number;
    fltFacture_Net_PR_I:number;
    intUnit_Price:number;//
    strDesc_Item:string;//
    strStock_Cod:string;
    strAccount_Cod:string;//falta
    strCostCenter_NO:string;//falta
    strCostCenter_Desc:string;//
    strAcctCateg_Cod:string;//
    fltValue_Doc:number;//falta
    fltValue_Local:number;
    fltValue_Corp:number;
    strTax_Cod:string;//*
    fltValue_Tax:number;//* TOTAL DEL IVG
    blnCheck:boolean;
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intAPDocD_ID=-1;
        this.intAPDocH_ID=-1;
        this.intIdPOD_ID=0;
        this.strCompany_Cod='';
        this.strVoucher_NO='';
        this.strPO_NO='';
        this.intPO_Item_NO=0;
        this.strUM='';
        this.intQuantity=0;
        this.fltRec_QYT=0;
        this.fltRec_Pend_QTY=0;
        this.fltPay_Factura=0 ;//
        this.fltFacture_Net_PR_I=0 ;//
        this.intUnit_Price=0;
        this.strDesc_Item='';
        this.strStock_Cod='';
        this.strAccount_Cod='';
        this.strCostCenter_NO='';
        this.strCostCenter_Desc='';
        this.strAcctCateg_Cod='';
        this.fltValue_Doc=0;
        this.fltValue_Local=0;
        this.fltValue_Corp=0;
        this.strTax_Cod='';
        this.blnCheck=true;
        this.strCreation_User='';
        this.dtmCreation_Date=new Date();
        this.strModified_User='';
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}