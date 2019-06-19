export class CorrelativoModel {
    intIdCorrelativo_ID:number;
    strModule:string | null;
    strCorrel_Cod:string | null;
    strProccess_Name:string | null;
    strTransaction_Name:string | null;
    fltOrigenDocum_NO:number | null;
    
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
}