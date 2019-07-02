export class HesDetalleModel {
    intIdHESD_ID:number;
    intIdHESH_ID:number;
    strHES_NO:string;
    intHES_Item_NO:number;
    strService_NO:string;
    strDesc_Detail:string;
    strHES_Status:string;
    intQuantity:number;
    intIdPOD_ID:number;
    strUM:string;
    strCurrency:string;
    intIdCostCenter_ID:number;
    strCostCenter_NO:string;
    fltGross_Price:number;
    fltNet_Value:number;
    fltRec_Value:number;
    fltRecTemp_Value:number;
    fltFacture_Net_PR_I:number;
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intIdHESD_ID=-1;
        this.intIdHESH_ID=-1;
        this.intIdPOD_ID=-1;
        this.strHES_NO='';
        this.intHES_Item_NO=0;
        this.strService_NO='';
        this.strDesc_Detail='';
        this.strHES_Status='';
        this.intQuantity=0;
        this.strUM='';
        this.strCurrency='';
        this.intIdCostCenter_ID=-1;
        this.strCostCenter_NO='';
        this.fltGross_Price=0;
        this.fltNet_Value=0;
        this.fltRec_Value=0;
        this.fltRecTemp_Value=0;
        this.fltFacture_Net_PR_I=0;
        this.strCreation_User='';
        this.dtmCreation_Date=new Date;
        this.strModified_User='';
        this.dtmModified_Date=new Date;
        this.chrStatus='A';
    }
}    