export class DepartamentoModel {
    intIdRegion_ID:number;
    strRegion_Cod:string;
    strRegion_Desc:string;
    strCountry_Cod:string;
    strCountry_Name:string;    
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    intIdCountry_ID:number;
    constructor(){
        this.intIdRegion_ID=-1;
        this.strRegion_Cod='';
        this.strRegion_Desc='';
        this.strCountry_Cod='';
        this.strCountry_Name='';
        this.strCreation_User='';
        this.strModified_User='';
        this.dtmCreation_Date=new Date();
        this.dtmModified_Date=new Date();
        this.chrStatus='';
        this.intIdCountry_ID=-1;
    }
 }