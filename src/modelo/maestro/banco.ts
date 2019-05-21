export class BancoModel {
    intBank_ID: number;
    strCountry:string;
    strBank_Cod:string;
    strBank_Type:string;
    strBank_Name:string;
    strBank_Curr:string;
    strBank_Address:string;
    strBank_Region:string;
    strBranch_Cod:string;
    strSwift_Cod:string;
    strBank_Account:string;
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    strBank_Account_CCI:string;
    strCompany_Cod:string;
    strCompany_Desc:string;
    strCountry_Desc:string;
    strBank_Curr_Desc:string;
    strBank_Region_Desc:string;
    constructor(){
        this.intBank_ID=-1;
        this.strCountry='';
        this.strBank_Cod='';
        this.strBank_Type='';
        this.strBank_Name='';
        this.strBank_Curr='';
        this.strBank_Address='';
        this.strBank_Account_CCI='';
        this.strBank_Region='';
        this.strBranch_Cod='';
        this.strSwift_Cod='';
        this.strBank_Account='';
        this.strCreation_User='';
        this.dtmCreation_Date=new Date();
        this.strModified_User='';
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}