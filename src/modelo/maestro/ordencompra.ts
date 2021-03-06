import {OrdenCompraDetalleModel} from "./ordencompradetalle";
export class OrdenCompraModel {       
    intIdPOH_ID:number;
    intIdCompany_ID:number;
    intIdPurReqH_ID:number ;
    intIdTypeReq_ID:number ;
    intIdVendor_ID:number;    
    strTypeMov_Cod:string;
    strTypeMov_Desc:string;
    strTypeReq_Cod:string;
    strTipReq_Desc:string;
    strCompany_Cod:string ;
    strCompany_Desc:string;
    strCurrency_Cod:string;
    strCurrency_Desc:string;
    intIdAcctCont_ID:number;
    strAcc_Local_NO:string;
    strAcc_Corp_NO:string;
    strVendor_Desc:string;
    strWH_Cod:string;
    strWH_Desc:string;
    fltPorcent: number;
    strPO_NO:string ;
    chrPO_Status:string ;
    strPO_Desc:string;
    strPO_Curr:string;
    dtmProcess_Date:Date ;
    strRequis_NO:string ;
    strRequis_Item_NO:string;
    strWHS_Cod:string;
    strWHS_Desc:string;
    strPO_Item_Type:string;
    strVendor_NO:string;
    intChange_Count:number;
    strAuthsd_By:string;
    dtmAuthsd_Date:Date; 
    intIdWHS_ID:number;  
    fltCURR_QTY_I:number ;
    fltTotal_Val:number ;
    dtmLast_Appr_Date:Date;
    strUser_ID:string;
    strCreation_User:string ;
    dtmCreation_Date:Date ;
    strModified_User:string ;      
    dtmModified_Date:Date ;  
    chrStatus:string ;
    listaDetalle:any[]; 
    fltTot_Rec_QYT:number;
    fltTot_Rec_Pend_QTY:number;
    fltTot_Rec_Value:number;
    fltTot_Inv_QTY:number;
    fltTot_Inv_Value:number;
    strReceipt_Status:string;
    dtmReceipt_Date:Date;
    constructor(){
        this.fltPorcent=0;
    }
}
