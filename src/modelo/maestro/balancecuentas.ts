export class BalanceCuentaModel {
    intBalanAcc_ID:number;
    strCompany_Cod:string | null;
    strCompany_Desc:string | null;
    intYear:number | null;
    dtmPeriod:Date | null;
    strPeriodRepo:string | null;
    strAcc_Local_NO:string | null;
    fltOpening_Balance:number | null;
    fltDebit_Acc:number | null;
    fltCredit_Acc:number | null;
    fltBalance_Month:number | null;
    fltClosing_Balance:number | null;
    strCreation_User:string | null;        
    dtmCreation_Date:Date | null;
    strModified_User:string | null;
    dtmModified_Date:Date | null;
    chrStatus:string | null;
}