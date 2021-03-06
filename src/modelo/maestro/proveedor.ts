export class ProveedorModel {
    
    intIdVendor_ID:number;//*
    intIdRegion_ID:number ;//*
    intIdDocIdent_ID:number;//*
    // intIdCompany_ID:number;//
    intIdVenCateg_ID:number;//
    intIdCountry_ID:number;
    strDocIdent_Name:string;
    strCountry_Name:string;
    strRegion_Cod:string;
    strCompany_Cod:string;//
    strVendor_NO:string ;//*
    strCountry:string;//    
    strCat_Person:string;//
    strTax_ID:string;//
    strVendor_Desc:string;//
    strLastName:string;//
    strSurName:string;//
    strAddress:string;//
    strProvince:string;//
    strDistrict:string;//
    strPostal_Cod:string;//
    strDocIdent_NO:string;//
    strCurrency_Cod:string;//
    strBank_Cod:string;//
    intDayToPay:number;//
    strBankAcct_Local_NO:string;
    strCurrency_Corp:string;
    strBank_Corp_Cod:string;
    strBankAcct_Corp_NO:string;
    strBank_Other_Cod:string;
    strBankAcct_Other_NO:string;
    strOther_Curr_Cod:string;
    strFore_Swift_NO:string;//
    strFore_Branch_NO:string;//
    strFore_Bank_Cod:string;//
    // strFore_Bank_Desc:string;
    strFore_AccBank_NO:string;//
    strFore_Curr_Cod:string;//
    strRetention_Cod:string;//
    fltRetention_Porcen:number;//
    strDetraccion_Cod:string;//
    fltDetraccion_Porcen:number;//
    strAcc_Local_NO:string;//
    strCreation_User:string;
    dtmCreation_Date:Date ;
    strModified_User:string 
    dtmModified_Date:Date ;        
    chrStatus:string ;  
    constructor(){
        this.intIdVendor_ID=-1;
        this.intIdRegion_ID=-1;
        this.intIdDocIdent_ID=-1;
        // this.intIdCompany_ID=-1;
        this.intIdVenCateg_ID=-1;
        this.intIdCountry_ID=-1;
        this.strDocIdent_Name='';
        this.strCountry_Name='';
        this.strCompany_Cod='';
        this.strRegion_Cod='';
        this.strVendor_NO='';
        this.strCountry='';
        this.strCat_Person='';
        this.strTax_ID='';
        this.strVendor_Desc='';
        this.strLastName='';
        this.strSurName='';
        this.strAddress='';
        this.strProvince='';
        this.intDayToPay=0;
        this.strBankAcct_Local_NO='';
        this.strCurrency_Corp='';
        this.strBank_Corp_Cod='';
        this.strBankAcct_Corp_NO='';
        this.strBank_Other_Cod='';
        this.strBankAcct_Other_NO='';
        this.strOther_Curr_Cod='';
        this.strFore_Swift_NO='';
        this.strFore_Branch_NO='';
        this.strFore_Bank_Cod='';
        // this.strFore_Bank_Desc='';
        this.strFore_AccBank_NO='';
        this.strFore_Curr_Cod='';
        this.strRetention_Cod='';
        this.fltRetention_Porcen=0;
        this.strDetraccion_Cod='';
        this.fltDetraccion_Porcen=0;
        this.strAcc_Local_NO='';        
    }    
}