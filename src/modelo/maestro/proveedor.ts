export class ProveedorModel {
    
    intIdVendor_ID:number;//*
    intIdRegion_ID:number ;//*
    intIdDocIdent_ID:number;//*
    intIdCompany_ID:number;//*
    intIdCountry_ID:number;
    strCountry:string;//*
    strVendor_NO:string ;//*
    intIdVenCateg_ID:number;
    // strCat_Person:string ;//*
    srtTax_ID:string ;  //*      
    strVendor_Desc:string ;//*
    strLastName:string ;//*
    strSurName:string ;//*
    strAddress:string ; //*    
    strDistrict:string ;  //*
    strCity:string;//*new
    strDocIdent_NO:string;//*new
    strProvince:string ;//*
    strPostal_Cod:string ;//*
    strCurrency_Cod:string ;//*
    strBank_Cod:string ;//*
    intDayToPay:number;//*
    strBankAcct_Local_NO:string ;//*
    strCurrency_Corp:string ;//*
    strBank_Corp_Cod:string ;//*
    strBankAcct_Corp_NO:string ;//*
    strBank_Other_Cod:string ;//*
    strBankAcct_Other_NO:string ;//*
    strFore_Swift_Cod:string ;//*
    strFore_Branch_Cod:string ;//*
    strFore_Bank_Desc:string;//*
    strFore_AccBank_NO:string ;//*
    strFore_Curr_Cod:string ;//*
    strRetention_Cod:string ;   //*
    fltRetention_Porcen:number ;//*
    strDetraccion_Cod:string ;   //*
    fltDetraccion_Porcen:number ;//*
    strCreation_User:string ;
    dtmCreation_Date:Date ;
    strModified_User:string ;
    dtmModified_Date:Date ;        
    chrStatus:string ;      
}