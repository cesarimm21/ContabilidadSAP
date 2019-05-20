import {HesDetalleModel} from "./hesDetalle";
export class HESModel {
    intIdHESH_ID:number;//
    strCompany_Cod:string;//
    strHES_NO:string;//
    intIdPOH_ID:number;//
    strPO_NO:string;
    intIdPOD_ID:number;
    strPO_Item_Desc:string;
    intIdCategLine_ID:number;
    strCategItem_Cod:string;
    strPO_Item_NO:string;//falta
    strHES_Status:string;//
    strDesc_Header:string;//
    intChange_Count:number;//
    strAuthsd_ByExt:string;//
    strAuthsd_BYInt:string;//
    dtmAuthsd_Date:Date;//
    dtmProcess_Date:Date;//
    dtmSince_Date:Date;//
    dtmUntil_Date:Date;//
    strCurrency:string;//
    fltTot_QTY:number;//
    fltTot_Value:number;//falta calculo
    fltTot_Peding_Value:number;//falta calculo
    strCreation_User:string;//
    dtmCreation_Date:Date;//
    strModified_User:string;//
    dtmModified_Date:Date;//
    chrStatus:string;//
    listaDetalle: any[]; 
    constructor(){
        this.intIdHESH_ID=-1;
        this.strCompany_Cod='';
        this.strHES_NO='';
        this.intIdPOH_ID=-1;
        this.strPO_NO='';
        this.intIdPOD_ID=-1;
        this.strPO_Item_Desc='';
        this.intIdCategLine_ID=-1;
        this.strCategItem_Cod='';
        this.strPO_Item_NO='';
        this.strHES_Status='';
        this.strDesc_Header='';
        this.intChange_Count=-1;
        this.strAuthsd_ByExt='';
        this.strAuthsd_BYInt='';
        this.dtmAuthsd_Date=new Date();
        this.dtmProcess_Date=new Date();
        this.dtmSince_Date=new Date();
        this.dtmUntil_Date=new Date();
        this.strCurrency='';
        this.fltTot_QTY=0;
        this.fltTot_Value=0;
        this.fltTot_Peding_Value=0;
        this.strCreation_User='';
        this.dtmCreation_Date=new Date();
        this.strModified_User='';
        this.dtmModified_Date=new Date();
        this.chrStatus='';
        this.listaDetalle=[];
    }
}    