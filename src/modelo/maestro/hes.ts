import {HesDetalleModel} from "./hesDetalle";
export class HESModel {
    intIdHESH_ID:number;
    strCompany_Cod:string;
    strHES_NO:string;
    intIdPOH_ID:number;
    strPO_Item_NO:string;
    strHES_Status:string;
    strDesc_Header:string;
    intChange_Count:number;
    strAuthsd_Status:string;
    strAuthsd_BY:string;
    dtmAuthsd_Date:Date;
    dtmProcess_Date:Date;
    strCurrency:string;
    fltTot_QTY:number;
    fltTot_Value:number;

    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    listaDetalle: Array<HesDetalleModel> = new Array(); 
}    