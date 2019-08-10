export class CuentaContableModel {
    intIdAcctCont_ID:number;
    strCompany_Cod:string;
    strCompany_Desc:string;
    strChartAcct_L_Cod:string;
    strAcctCateg_Cod:string;
    strAccFth_Local:string;
    strAccFth_Local_name:string;
    strAccFth_Corp:string;
    strTypeAdq_PDB_Desc:string;
    strAcctCateg_Desc:string;
    strChartAcct_C_Cod:string;
    strAcc_Local_NO:string;
    strAcc_Corp_NO:string;
    strAcc_Local_Name:string;
    strAcc_Corp_Name:string;
    strAcc_Level:string;
    strCost_Item_Cod:string;
    strCost_Item_Pos1:string;
    strAcc_Type:string;
    strGrpAcctCont_Cod:string;
    strExpGroup_Cod:string;
    strTypeAdq_PDB_Cod:string;
    strCurrency_Cod:string;
    blnAcc_Destino:boolean;
    fltDebit_AccDest:number;
    fltCredit_AcctDest:number;
    blnAcc_Status_Open:boolean;
    chrAcc_Status:string;    
    strWH_Cod:string;    
    blnAcc_LO:boolean;
    blnAcc_DI:boolean;
    blnAcc_GL:boolean;
    blnAcc_CC:boolean;
    blnAcc_AP:boolean;
    blnAcc_AR:boolean;
    blnAcc_ST:boolean;
    blnAcc_FA:boolean;
    blnAcc_PY:boolean;
    chrAccFth_Local:string;
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;

    constructor(){
        this.intIdAcctCont_ID=-1;
        this.strCompany_Cod='';
        this.strCompany_Desc='';
        this.strChartAcct_L_Cod='';
        this.strAcctCateg_Cod='';
        this.strAccFth_Local='';
        this.strAccFth_Local_name='';
        this.strAccFth_Corp='';
        this.strTypeAdq_PDB_Desc='';
        this.strAcctCateg_Desc='';
        this.strChartAcct_C_Cod='';
        this.strAcc_Local_NO='';
        this.strAcc_Corp_NO='';
        this.strAcc_Local_Name='';
        this.strAcc_Corp_Name='';
        this.strAcc_Level='';
        this.strCost_Item_Cod='';
        this.strCost_Item_Pos1='';
        this.strAcc_Type='';
        this.strGrpAcctCont_Cod='';
        this.strExpGroup_Cod='';
        this.strTypeAdq_PDB_Cod='';
        this.strCurrency_Cod='';
        this.blnAcc_Destino=false;
        this.fltDebit_AccDest=0;
        this.fltCredit_AcctDest=0;
        this.blnAcc_Status_Open=false;
        this.chrAcc_Status='';    
        this.strWH_Cod='';    
        this.blnAcc_LO=false;
        this.blnAcc_DI=false;
        this.blnAcc_GL=false;
        this.blnAcc_CC=false;
        this.blnAcc_AP=false;
        this.blnAcc_AR=false;
        this.blnAcc_ST=false;
        this.blnAcc_FA=false;
        this.blnAcc_PY=false;
        this.chrAccFth_Local='';
        this.strCreation_User='';
        this.dtmCreation_Date=new Date();
        this.strModified_User='';
        this.dtmModified_Date=new Date();
        this.chrStatus='';

    }
}