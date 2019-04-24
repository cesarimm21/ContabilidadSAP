
export class MovimientoInventarioModel {    
    strCompany_Cod:string ;
    strCompany_Desc:string ;
    strIssueAjust_NO:string ;
    strPlant_Cod:string ;
    strWHS_Cod_Old:string ;
    strWHS_Cod_Dest:string ;
    strWHS_Cod:string ;    
    strStock_Cod:string ;
    strStock_Desc:string ;
    strWHS_Categ:string ;
    strOrigenDocum_NO:string ;
    strType_Doc:string ;
    strSerie_Doc:string;
    strTypeOper_Cod:string;
    dtmProcess_Date:Date;
    dtmApproved_Date:Date ;
    strPeriod:string;
    strVendor_Cod:string ;
    strDocument_NO:string ;
    strFleet:string ;
    strMaterial_Class:string ;
    strMaterial_Categ:string ;
    strTypeMov_Cod:string ;
    strFactor:string ;
    strUM_Cod:string ;
    fltQuantity:number ;
    fltQuantity_Balance:number ;
    fltPrecUnit_Local:number;
    fltPrecUnit_Bal_Local:number;
    fltPrecUnit_Bal_USD:number;
    strPO_NO:string;
    intPO_Item_NO:number;
    fltAmount_PEN:number ;
    fltBalance_PEN:number ;
    fltPrecUnit_USD:number ;
    fltAmount_USD:number ;
    fltBalance_USD:number ;
    strAcctCateg_Cod:string ;
    strAcc_NO_Local:string ;
    strCostCenter_NO:string ;
    strLote_NO:string;
    dtmLote_Date:Date;
    strCreation_User:string ;
    dtmCreation_Date:Date ;
    strModified_User:string ;
    dtmModified_Date:Date ; 
    chrStatus:string ;  
    constructor(){
        this.strCompany_Cod='';
        this.strCompany_Desc='';
        this.strIssueAjust_NO='';
        this.strPlant_Cod='';
        this.strWHS_Cod_Old='';
        this.strWHS_Cod_Dest='';
        this.strWHS_Cod='';    
        this.strStock_Cod='';
        this.strStock_Desc='';
        this.strWHS_Categ='';
        this.strOrigenDocum_NO='';
        this.strType_Doc='';
        this.strSerie_Doc='';
        this.strTypeOper_Cod='';
        this.dtmProcess_Date=new Date();
        this.dtmApproved_Date=new Date();
        this.strPeriod='';
        this.strVendor_Cod='';
        this.strDocument_NO='';
        this.strFleet='';
        this.strMaterial_Class='';
        this.strMaterial_Categ='';
        this.strTypeMov_Cod='';
        this.strFactor='';
        this.strUM_Cod='';
        this.fltQuantity=0;
        this.fltQuantity_Balance=0;
        this.fltPrecUnit_Local=0;
        this.fltPrecUnit_Bal_Local=0;
        this.fltPrecUnit_Bal_USD=0;
        this.strPO_NO='';
        this.intPO_Item_NO=0;
        this.fltAmount_PEN=0;
        this.fltBalance_PEN=0;
        this.fltPrecUnit_USD=0;
        this.fltAmount_USD=0;
        this.fltBalance_USD=0;
        this.strAcctCateg_Cod='';
        this.strAcc_NO_Local='';
        this.strCostCenter_NO='';
        this.strLote_NO='';
        this.dtmLote_Date=new Date();
        this.strCreation_User='';
        this.dtmCreation_Date=new Date();
        this.strModified_User='';
        this.dtmModified_Date=new Date(); 
        this.chrStatus='';  
    }
}