import {OrdenCompraDetalleModel} from "./ordencompradetalle";
export class OrdenCompraModel {       
    intIdPOH_ID:number;
    intIdCompany_ID:number;
    intIdPurReqH_ID:number ;
    intIdTypeReq_ID:number ;
    intIdVendor_ID:number;  
    strCompany_Cod:string ;
    strPO_NO:string ;
    chrPO_Status:string ;
    strPO_Desc:string;
    strPO_Curr:string;
    dtmProcess_Date:Date ;
    strRequis_NO:string ;
    strRequis_Item_NO:string;
    strPO_Item_Type:string;
    strVendor_Cod:string;
    intChange_Count:number;
    strAuthsd_Status:string;
    strAuthsd_By:string;
    dtmAuthsd_Date:string;  
    intIdWHS_ID:number;  
    intIdAlmacen:number ;
    fltCURR_QTY_I:number ;
    fltTotal_Val:number ;
    Val_Tot_PO_Item:number ;
    strCreation_User:string ;
    dtmCreation_Date:Date ;
    strModified_User:string ;        
    dtmModified_Date:Date ;  
    chrStatus:string ;
    
}
