
export class OrdenCompraDetalleModel {
    intIdPOD_ID:number;//
    intIdPOH_ID:number;
    intIdPurReqD_ID:number;
    intIdAcctCateg_ID:number;//
    intIdCategLine_ID:number;//
    intIdCurrency_ID:number;//
    intIdCostCenter_ID:number; //
    strPO_NO:string;//
    intPO_Item_NO:number; //
    strAcctCateg_Cod:string;//
    strCategItem_Cod:string;//
    strCostCenter_NO:string;//
    strCostCenter_Desc:string;//
    strStock_Cod:string;//
    strUM_Cod:string;//
    strVendor_NO:string;//
    strVendor_Desc:string;//
    strCurrency_Cod:string;//
    strPriority_Cod:string;//    
    strPriority_Desc:string;//    
    strPO_Item_Desc:string;//
    chrPO_Item_Status:string;//
    strPO_Curr:string;  //
    strRequis_NO:string;//
    intRequis_Item_NO:number;//
    intChange_Count:number;//
    chrReceipt_Status:string ;//
    strMaterial_Group:string ;//
    strPreq_Stock_Cod:string ;//
    intIdInvStock_ID:number ;//
    dtmOrig_Due_Date:Date ;//
    strUnit_Of_Purch:string ;//
    fltPO_QTY_I:number ;//
    fltPay_Factura:number ;//
    fltFacture_Net_PR_I:number ;//
    fltPO_Net_PR_I:number ;//
    fltCurr_Net_PR_P:number ;//
    intConv_Factor:number ;//
    strTax_Cod:string ;//
    strWH_Tax_Detraccion:string;//
    fltWH_Retention:number;//
    fltTax_Percent:number ;//
    intIdWHS_ID:number ;//
    intInv_QTY_UOP:number ;
    intInvoice_NO:number;
    fltInv_Pend_QTY_P:number ;
    fltInv_Pend_Val_F:number ;
    fltInv_Pend_Val_L:number ;
    fltInv_Pend_Val_S:number ;
    strDeliv_Location:string ;
    fltTot_PO_Item:number ;
    strAccount_Cod:string ;
    strWBS_Project:string;
    
    fltRec_QYT:number;
    fltRec_Value:number;
    fltRec_Pend_QTY:number;
    strGuiaRem_NO:string;
    dtmGuiaRem_Date:Date;
    strGuiaTrans_NO:string;
    dtmGuiaTrans_Date:Date;
    dtmReceived_Date:Date;
    strReceived_User:string;
    strMatClass_Cod:string;
    strMatClass_Desc:string;
    strRec_Driver:string;
    strPlaca:string;
    blnSelection:boolean=false;
    blnCheck:boolean;

    strCreation_User:string ;
    dtmCreation_Date:string ;
    strModified_User:Date ;
    dmModified_Date: Date ;
    chrStatus:string ;
    strVoucher_NO:string;
    dtmDoc_Date:Date;
    fltExchange_Rate:number;
    strGuiaRem_Type:string;
    strGuiaRem_Serie:string;
    strDocument_NO_Ref:string;
    dtmDoc_Date_Ref:Date;
    strAcc_Local_Name:string;
    fltRec_QYT1:number;
    strDocument_NO_Ref_desc:string;
    strCateg_Line:string;
    constructor(){
        this.intIdPOD_ID=0;//
        this.intIdPurReqD_ID=-1;//
        this.intIdPOH_ID=-1;//
        this.intIdAcctCateg_ID=-1;//
        this.intIdCategLine_ID=-1; //
        this.intIdCurrency_ID=-1;//
        this.intIdCostCenter_ID=-1;   //
        this.strPO_NO='';//
        this.intPO_Item_NO=1;   //
        this.strAcctCateg_Cod='';
        this.strCategItem_Cod='';
        this.strCostCenter_NO='';
        this.strCostCenter_Desc='';
        this.strStock_Cod='';
        this.strUM_Cod='';
        this.strVendor_NO='';
        this.strVendor_Desc='';
        this.strCurrency_Cod='';
        this.strPriority_Cod='';    
        this.strPriority_Desc='';    
        this.strPO_Item_Desc='';//
        this.chrPO_Item_Status='';//
        this.strPO_Curr='';    //
        this.strRequis_NO='';//
        this.intRequis_Item_NO=0;//
        this.intChange_Count=0;//
        this.chrReceipt_Status='A';//
        this.strMaterial_Group='';//
        this.strPreq_Stock_Cod='';//
        this.intIdInvStock_ID=0;//
        this.dtmOrig_Due_Date=new Date;//
        this.strUnit_Of_Purch='';//
        this.fltPO_QTY_I=0 ;//
        this.fltPay_Factura=0 ;//
        this.fltFacture_Net_PR_I=0 ;//
        this.fltPO_Net_PR_I=0 ;//
        this.fltCurr_Net_PR_P=0;//
        this.intConv_Factor=0;//
        this.strTax_Cod='' ;//
        this.strWH_Tax_Detraccion='';//
        this.fltWH_Retention=0;//
        this.fltTax_Percent=0 ;//
        this.intIdWHS_ID=-1 ;//
        this.intInv_QTY_UOP=0;//
        this.intInvoice_NO=0;//
        this.fltInv_Pend_QTY_P=0 ;//
        this.fltInv_Pend_Val_F=0 ;//
        this.fltInv_Pend_Val_L=0;//
        this.fltInv_Pend_Val_S=0;//
        this.strDeliv_Location='';//
        this.fltTot_PO_Item=0 ;//
        this.strAccount_Cod='';//
        this.strWBS_Project='';//
        this.fltExchange_Rate=0;
        this.fltRec_QYT=0;
        this.fltRec_QYT1=0;
        this.fltRec_Value=0;
        this.fltRec_Pend_QTY=0;
        this.strGuiaRem_NO='';
        this.dtmGuiaRem_Date=new Date;
        this.strGuiaTrans_NO='';
        this.dtmGuiaTrans_Date=new Date;
        this.dtmReceived_Date=new Date;
        this.strReceived_User='';
        this.strMatClass_Cod='';
        this.strMatClass_Desc='';
        this.strRec_Driver='';
        this.strPlaca='';
        this.blnSelection=false;
        this.blnCheck=true; 
        this.strAcc_Local_Name='';  
        this.strDocument_NO_Ref_desc='';
        this.strCateg_Line='';
    }
}


