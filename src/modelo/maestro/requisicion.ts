import {RequisicionDetalleModel} from "./requisiciondetalle";
export class RequisicionModel {    
    intIdPurReqH_ID:number;
    intIdCompany_ID:number ;
    strRequis_NO:string;
    intIdWHS_ID:number ;
    intIdTypeReq_ID:number ;
    strRequested_By:string ;
    dtmRequested_Date:Date ;
    strReq_By_Pos:string ;
    strAuthsd_By:string ;
    strDesc_Header:string ;
    dtmAuthsd_Date:Date ;
    chrAuthsd_Status:string ;
    // listaDetalle: Array<RequisicionDetalleModel> = new Array();  
    strCompany_Cod:string;
    strCompany_Desc:string;
    strWHS_Cod:string;
    strWHS_Desc:string;
    strTipReq_Desc:string;
    strTypeReq_Cod:string;
   
    strCreation_User:string ;
    dtmCreation_Date:Date ;
    strModified_User:string ;
    dtmModified_Date:Date ;
    chrStatus:string ;
    constructor(){
        this.intIdPurReqH_ID=-1;
        this.intIdCompany_ID=-1;
        this.strRequis_NO='';
        this.intIdWHS_ID=-1;
        this.intIdTypeReq_ID=-1;
        this.strRequested_By='';
        this.dtmRequested_Date=new Date();
        this.strReq_By_Pos='';
        this.strAuthsd_By='';
        this.strDesc_Header='';
        this.dtmAuthsd_Date=new Date();
        this.chrAuthsd_Status='';
        this.strCompany_Cod='';
        this.strCompany_Desc='';
        this.strWHS_Cod='';
        this.strWHS_Desc='';
        this.strTipReq_Desc='';
        this.strTypeReq_Cod='';
    }
}
