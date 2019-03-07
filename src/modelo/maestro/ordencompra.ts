import {OrdenCompraDetalleModel} from "./ordencompradetalle";
export class OrdenCompraModel {       
    intIdPOH_ID:number;
    intIdCompany_ID:number;//si
    intIdPurReqH_ID:number ;//si
    intIdTypeReq_ID:number ;//si
    intIdVendor_ID:number;//si
    strCompany_Cod:string ;//si
    strCompany_Desc:string;//si new
    strCurrency_Cod:string;//si new
    strCurrency_Desc:string;//si new
    strVendor_Desc:string;//si new
    strWH_Cod:string;//si new 
    strWH_Desc:string;    //si new
    strPO_NO:string ;//si
    chrPO_Status:string ;//si
    strPO_Desc:string;//si
    strPO_Curr:string;//si
    dtmProcess_Date:Date ;//si
    strRequis_NO:string ;//si
    strRequis_Item_NO:string;//vacio
    strPO_Item_Type:string;//SI
    strVendor_NO:string;//si
    intChange_Count:number;//si
    strAuthsd_Status:string;//VACIO
    strAuthsd_By:string;//si
    dtmAuthsd_Date:Date; //
    intIdWHS_ID:number;  //ssssi
    fltCURR_QTY_I:number ;//si
    fltTotal_Val:number ;//si
    dtmLast_Appr_Date:Date;//vacio
    strUser_ID:string;//no va
    strCreation_User:string ;//si
    dtmCreation_Date:Date ;//si
    strModified_User:string ;   //si     
    dtmModified_Date:Date ;  //si
    chrStatus:string ;//si
    listaDetalle:any[]; 
    fltTot_Rec_QYT:number;
    fltTot_Rec_Pend_QTY:number;
    fltTot_Rec_Value:number;
    Tot_Inv_QTY:number;
    fltTot_Inv_Value:number;
}
