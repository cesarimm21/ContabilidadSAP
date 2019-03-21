
export class RequisicionDetalleModel {
    intIdPurReqD_ID:number;
    intRequis_Item_NO:number;
    intIdPurReqH_ID:number;
    intIdInvStock_ID:number;
    intIdAcctCateg_ID:number;
    intIdCategLine_ID:number;
    intIdCurrency_ID:number;
    intIdCostCenter_ID:number ;
    intIdPriority_ID:number;
    strDescription:string;
    strCateg_Account:string;
    strCateg_Line:string;
    strMaterial_Cod:string;
    strPriority_Cod:string;
    fltQuantity:number=0 ;
    strUM:string ;
    fltUnitPrice:number;
    fltValue_Total:number ;
    strCurr:string ;
    dtmRequested_Date:Date ;
    dtmDelivery_Date:Date ;
    strMat_Group_Cod:string ;
    strWHS_Cod:string;        
    strVendor_Suggested:string; 
    strAccount_NO:string ;
    strCostCenter:string ;
    dtmCompleted_Date:Date;
    strMatClass_Cod:string;
    strMatClass_Desc:string;
    strCostCenter_Desc:string;
    strVendor_Desc:string;
    intConv_Factor:number;
    blnCheck:boolean;
    strMatClass_Cod:string;
    strMatClass_Desc:string;
    strCostCenter_Desc:string;
    strVendor_Desc:string;
    
    strCreation_User:Date ;
    dtmCreation_Date:string ;
    strModified_User:Date ;
    dmModified_Date:string ;
    chrStatus:string ;
    
    constructor(){
        this.intIdPurReqD_ID=0
        this.intRequis_Item_NO=0
        this.intIdPurReqH_ID=0
        this.intIdInvStock_ID=0
        this.intIdAcctCateg_ID=0
        this.intIdCategLine_ID=0
        this.intIdCurrency_ID=0
        this.intIdCostCenter_ID=0
        this.intIdPriority_ID=0
        this.strDescription=''
        this.strCateg_Account=''
        this.strCateg_Line=''
        this.strMaterial_Cod=''
        this.strPriority_Cod=''
        this.fltQuantity=0
        this.strUM=''
        this.fltUnitPrice=0
        this.fltValue_Total=0
        this.strCurr=''
        this.dtmRequested_Date=new Date()
        this.dtmDelivery_Date=new Date()
        this.strMat_Group_Cod=''
        this.strWHS_Cod=''
        this.strVendor_Suggested=''
        this.strAccount_NO=''
        this.strCostCenter=''
        this.dtmCompleted_Date =new Date()
        this.strMatClass_Cod='';
        this.strMatClass_Desc='';
        this.strCostCenter_Desc='';
        this.strVendor_Desc='';
        this.intConv_Factor=1
        this.blnCheck=true;
        this.strMatClass_Cod='';
        this.strMatClass_Desc='';
        this.strCostCenter_Desc='';
        this.strVendor_Desc='';
    }
}
