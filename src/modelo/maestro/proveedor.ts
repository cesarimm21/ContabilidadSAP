export class ProveedorModel {
    
    intIdVendor_ID:number;//*
    intIdRegion_ID:number ;//*
    intIdDocIdent_ID:number;//*
    intIdCompany_ID:number;//
    intIdVenCateg_ID:number;//
    intIdCountry_ID:number;
    strCompany_Cod:string='';//
    strVendor_NO:string ='';//*
    strCountry:string ='';//    
    strCat_Person:string ='';//
    strTax_ID:string='';//
    strVendor_Desc:string='';//
    strLastName:string='';//
    srtSurName:string='';//
    strAddress:string='' ;//
    strProvince:string='' ;//
    strDistrict:string='' ;//
    strPostal_Cod:string ='';//
    strDocIdent_NO:string='';//
    strCurrency_Cod:string='' ;//
    strBank_Cod:string='' ;//
    intDayToPay:number;//
    strBankAcct_Local_NO:string ='';
    strCurrency_Corp:string='' ;
    strBank_Corp_Cod:string ='';
    strBankAcct_Corp_NO:string ='';
    strBank_Other_Cod:string='';
    strBankAcct_Other_NO:string='' ;
    strFore_Swift_Cod:string ='';//
    strFore_Branch_Cod:string='' ;//
    strFore_Bank_Desc:string='';
    strFore_AccBank_NO:string ='';//
    strFore_Curr_Cod:string='' ;//
    strRetention_Cod:string='' ;//
    fltRetention_Porcen:number;//
    strDetraccion_Cod:string='' ;//
    fltDetraccion_Porcen:number;//
    intAcc_NO_Local:number;//
    strCreation_User:string ;
    dtmCreation_Date:Date ;
    strModified_User:string 
    dtmModified_Date:Date ;        
    chrStatus:string ;      
}