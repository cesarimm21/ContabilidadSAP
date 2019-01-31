import {OrdenCompraDetalleModel} from "./ordencompradetalle";
export class OrdenCompraModel {   
    
    intIdOrdenCompra:number;
    intIdCompania:number ;
    intIdRequisicion:number ;
    intIdTipoRequisicion:number ;
    intIdProveedor:number;  
    strPO_NO:string ;
    dtmProcess_Date:Date ;
    chrPO_Status:string ;
    strPO_Desc:string ;
    intChange_Count:number ;
    strAuthsd_Status:string ;
    strAuthsd_By:string ;
    dtmAuthsd_Date:string ;  
    intIdAlmacen:number ;
    fltCURR_QTY_I:number ;
    fltTotal_Val:number ;
    Val_Tot_PO_Item:number ;
    strCreation_User:string ;
    dtmCreation_Date:Date ;
    strModified_User:string ;        
    dtmModified_Date:Date ;  
    chrStatus:string ;
    listaDetalle: Array<OrdenCompraDetalleModel> = new Array();    
    strPO_Number:string ;
    
}
