export class DepartamentoModel {
    intIdRegion_ID:number;
    strRegión_Cod:string;
    strRegión_Desc:string;
    
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    intIdCountry_ID:number;
    constructor(){
        this.intIdRegion_ID=-1;
        this.strRegión_Cod='';
        this.strRegión_Desc='';
        this.intIdCountry_ID=-1;
    }
 }