export class DepartamentoModel {
    intIdRegion_ID:number;
    strRegion_Cod:string;
    strRegion_Desc:string;
    
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    intIdCountry_ID:number;

    strCountry_Cod:string;
    strCountry_Name:string;

    constructor(){
        this.intIdRegion_ID=-1;
        this.strRegion_Cod='';
        this.strRegion_Desc='';
        this.intIdCountry_ID=-1;
        this.strCountry_Cod='';
        this.strCountry_Name='';
    }
 }