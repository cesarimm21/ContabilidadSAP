import {RequisicionDetalleModel} from "./requisiciondetalle";
export class RequisicionModel {
    
    intIdPurReqH_ID:number;
    intIdCompany_ID:number ;
    strRequis_NO:string ;
    intIdAlmacen:number ;
    intIdTypeReq_ID:number ;
    strRequested_By:string ;
    dtmRequested_Date:Date ;
    strReq_By_Pos:string ;
    strAuthsd_By:string ;
    strDesc_Header:string ;
    dtmAuthsd_Date:Date ;
    chrAuthsd_Status:string ;
    listaDetalle: Array<RequisicionDetalleModel> = new Array();  
    strCompany_Cod:string;
    strCompany_Desc:string;
    strWHS_Cod:string;
    strWHS_Desc:string;

    strCreation_User:string ;
    dtmCreation_Date:Date ;
    strModified_User:string ;
    dtmModified_Date:Date ;
    chrStatus:string ;
}
