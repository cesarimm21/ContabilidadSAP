import {SalidaDetalleModel} from '@/modelo/maestro/salidadetalle';
export class SalidaModel {
    index:number;
    intIssueAjustH_ID:number;
    strCompany_Cod:string ;    
    strCompany_Desc:string ;
    strIssueAjust_NO:string ;
    strTypeMov_Cod:string ;     
    strTypeMov_Desc:string ;
    strWHS_Cod:string ;    
    strWHS_Desc:string ;        
    dtmTransaction_Date:Date ;    
    dtmApproved_Date:Date ; 
    strApproved_Status:string ;    
    strApproved_User:string ;
    intIdWHS_ID:number;
    intIdTypeMov_ID:number;
    listaDetalle: Array<SalidaDetalleModel> = new Array();  
    strPlant_Cod:string;
    strPlan_Desc:string;
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
}
    
   