import {HesDetalleModel} from "./hesDetalle";
export class HESModel {
    intIdHESH_ID:number;//
    strCompany_Cod:string;//
    strHES_NO:string;//
    intIdPOH_ID:number;//
    strPO_NO:string;
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
}    