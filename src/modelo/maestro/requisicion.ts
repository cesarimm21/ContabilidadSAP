import {ReqDetalleModel} from "./reqdetalle";
export class RequisicionModel {
    
    intIdRequisicion:number;
    listaDetalle: Array<ReqDetalleModel> = new Array();
    intIdCompania:any ;
    strRequis_NO:string ;
    intIdAlmacen:any ;
    intIdTipoRequisicion:any ;
    dtmRequested_Date:Date ;
    strAuthsd_By:string ;
    strDesc_Header:string ;
    dtmAuthsd_Date:Date ;
    chrAuthsd_Status:string ;
    strUser_ID:string ;
    dtmCreation_Date:Date ;
    strModify_User:string ;
    dmModified_Date:Date ;
    chrStatus:string ;
    intTipo:number ;
   
}
