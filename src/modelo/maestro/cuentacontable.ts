export class CuentaContableModel {
    intIdAcctCont_ID:number;
    intIdCompany_ID: number;
    intIdChartAcct_L_ID:number;
    strAcc_NO_Local:string;
    intIdChartAcct_C_ID:number;
    strAcc_NO_Corp:string;
    strAcc_Name:string;
    strAcc_Desc:string;
    strAcc_Level:string;
    strAcc_Type:string;
    intIdGrpCta_ID:number;
    intIdAcctItem_ID:number;
    intIdExpGroup_ID:number;
    intIdCurrency_ID:number;
    blnAcc_Destino:boolean;
    fltDebit_AccDest:number;
    fltCredit_AcctDest:number;
    blnAcc_Status_Open:boolean;
    intIdWH_ID:number;
    blnAct_LO:boolean;
    blnAct_GL:boolean;
    blnAct_CC:boolean;
    blnAct_AP:boolean;
    blnAct_AR:boolean;
    blnAct_DI:boolean;
    blnAct_ST:boolean;
    blnAct_FA:boolean;
    blnAct_PY:boolean;

    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
}