export class PaisModel {
    intIdCountry_ID: number;
    strCountry_Cod:string;
    strCountry_Name:string;
    strLanguage:string;
    strCountry_Curr:string;
    
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intIdCountry_ID=-1;
        this.strCountry_Cod='';
        this.strCountry_Name='';
        this.strLanguage='';
        this.strCountry_Curr='';        
    }
}