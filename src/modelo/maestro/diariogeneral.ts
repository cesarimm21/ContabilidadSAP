export class DiarioGeneralModel {
    intDailyG_ID:number;
    strCompany_Cod:string;//*
    strCompany_Desc:string;//*
    strAccDocum_NO:string;//*
    dtmPosting_Date:Date;//*   
    strPosting_Status:string;  //*
    strdtmPeriod:any;//*
    strYear:string;//*
    dtmProcess_Date:Date;//*
    strTypeMov_Cod:string;//se agrega de la tabla maestro de acuerdo a que ventana estoy
    strTypeMov_Desc:string;
    strDaily_Cod:string;
    strDaily_Desc:string;
    strAcc_Local_NO:string;
    strReferDocum_NO:string;
    strAcc_Corp_NO:string;
    strAcc_Local_Name:string;
    strAcc_Corp_Name:string;
    strCenCosWBS_Cod:string;
    strCenCosWBS_Desc:string;
    strVendor_NO:string;//*/
    strVendor_Desc:string;//*
    strRequis_NO:string;//*
    intRequis_Item_NO:number;//*
    dtmRequis_Date:Date;//*
    strWHS_Cod:string;
    strPO_NO:string;//*
    strPlant_Cod:string;        
    intPO_Item_NO:number;//*
    dtmPO_Date:Date;//*
    dtmApproved_Date:Date;
    dtmLote_Date:Date;
    strLote_NO:string;
    fltQuantity:number;//*
    strWO_NO:string;
    dtmWO_Date:Date;
    strOrigenDocum_NO:string;//*
    strType_Doc:string;//*
    strSerie_Doc:string;/** */
    strDocument_NO:string;//*
    dtmDoc_Date:Date;
    strTax_Cod:string;
    strIssueAjust_NO:string;
    fltIssueRequest_QTY:number;
    fltIssueDelivery_QTY:number;
    fltAjust_QTY:number;
    strWHS_Cod_Dest:string;
    strStock_Cod:string;
    strStock_Desc:string;
    strHES_NO:string;
    intHES_Item_NO:number;
    strDesc_Header:string;
    strPayRun_NO:string;
    strPaid_Vendor:string;
    strBank_Cod:string;
    dtmPayRun_Date:Date;
    fltExchange_Rate:number;
    strCurrency_Cod:string;
    fltAmount_Orig:number;
    fltAmount_Local:number;
    fltAmount_Corp:number;
    intDoc_No:number;
    strCreation_User:string;
    strModified_User:string;
    dtmCreation_Date:Date;
    dmModified_Date:Date;
    chrStatus:string;
    strPeriod_NO:string;
    strAcctCateg_Cod:string;
    strDetail_Desc:string;
    fltQuantityDebe:number;
    fltQuantityHaber:number;
    blnAutoreverse:any;
    strDoc_Trans_Cod:string;
    strHeader_Desc:string;
    strDoc_Status:string;
    strApproved_Status:string;
    strApproved_User:string;
    strUser_Status:string;
    dtmDate_Status:Date;
    constructor(){
        this.strCompany_Cod='';
        this.strCompany_Desc='';
        this.strAccDocum_NO='';
        this.dtmPosting_Date=new Date();
        this.strPosting_Status='';
        this.strYear='';
        this.dtmProcess_Date=new Date();
        this.strTypeMov_Cod='';
        this.strTypeMov_Desc='';
        this.strDaily_Cod='';
        this.strDaily_Desc='';
        this.strPosting_Status='';
        this.strAcc_Local_NO='';
        this.strReferDocum_NO='';
        this.strAcc_Corp_NO='';
        this.strAcc_Local_Name='';
        this.strAcc_Corp_Name='';
        this.strCenCosWBS_Cod='';
        this.strCenCosWBS_Desc='';
        this.strVendor_NO='';
        this.strVendor_Desc='';
        this.strRequis_NO='';
        this.intRequis_Item_NO=0;
        this.dtmRequis_Date=new Date();
        this.strWHS_Cod='';
        this.strPO_NO='';
        this.strPlant_Cod='';
        this.intPO_Item_NO=0;
        this.dtmPO_Date=new Date();
        this.dtmApproved_Date=new Date();
        this.dtmLote_Date=new Date();
        this.strLote_NO='';
        this.fltQuantity=0;
        this.strWO_NO='';
        this.dtmWO_Date=new Date();
        this.strOrigenDocum_NO='';
        this.strType_Doc='';
        this.strSerie_Doc='';
        this.strDocument_NO='';
        this.dtmDoc_Date=new Date();
        this.strTax_Cod='';
        this.strIssueAjust_NO='';
        this.fltIssueRequest_QTY=0;
        this.fltIssueDelivery_QTY=0;
        this.fltAjust_QTY=0;
        this.strWHS_Cod_Dest='';
        this.strStock_Cod='';
        this.strStock_Desc='';
        this.strHES_NO='';
        this.intHES_Item_NO=0;
        this.strDesc_Header='';
        this.strPayRun_NO='';
        this.strPaid_Vendor='';
        this.strBank_Cod='';
        this.dtmPayRun_Date=new Date();
        this.fltExchange_Rate=0;
        this.strCurrency_Cod='';
        this.fltAmount_Orig=0;
        this.fltAmount_Local=0;
        this.fltAmount_Corp=0;
        this.intDoc_No=0;
        this.strCreation_User='';
        this.strModified_User='';
        this.dtmCreation_Date=new Date();
        this.dmModified_Date=new Date();
        this.chrStatus='';
        this.strApproved_Status='';
        this.strApproved_User='';
        this.strPeriod_NO='';
        this.strAcctCateg_Cod='';
        this.strDetail_Desc='';
        this.fltQuantityDebe=0;
        this.fltQuantityHaber=0;
        this.blnAutoreverse=false;
    }
}