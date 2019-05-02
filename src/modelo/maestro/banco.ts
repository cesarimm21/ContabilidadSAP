export class BancoModel {
    intBank_ID: number;
    strCountry:string;
    strBank_Cod:string;
    strBank_Type:string;
    strBank_Name:string;
    strBank_Curr:string;
    strBank_Address:string;
    strBank_City:string;
    strBranch_Cod:string;
    strSwift_Cod:string;
    strBank_Account:string;
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intBank_ID=-1;
        this.strCountry='';
        this.strBank_Cod='';
        this.strBank_Type='';
        this.strBank_Name='';
        this.strBank_Curr='';
        this.strBank_Address='';
        this.strBank_City='';
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