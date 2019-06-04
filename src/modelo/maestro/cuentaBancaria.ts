export class CuentaBancariaModel {
    intIdBankAcct_ID:number;
    strAcc_Local_NO:string | null;
    strBank_Account:string | null;
    strBank_Account_CCI:string | null;
    strBranch_Cod:string | null;
    strBank_Region:string | null;
    strSwift_Cod:string | null;
    strBank_Address:string | null;

    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intIdBankAcct_ID=-1;
        this.strAcc_Local_NO='';
        this.strBank_Account='';
        this.strBank_Account_CCI='';
        this.strBranch_Cod='';
        this.strBank_Region='';
        this.strSwift_Cod='';
        this.strBank_Address='';
    }
}