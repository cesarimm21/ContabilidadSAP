export class TipoRentaModel {
    intIdReveType_ID:number;
    strReveType_Cod:string;
    strReveType_Desc:string;
    strCompany_Cod:string;    
    strCompany_Desc:string;

    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;

    constructor(){
        this.intIdReveType_ID=0;
        this.strReveType_Cod='';
        this.strReveType_Desc='';
        this.strCompany_Cod='';    
        this.strCompany_Desc='';
        this.strCreation_User='';
        this.dtmCreation_Date=new Date();
        this.strModified_User='';
        this.dtmModified_Date=new Date();
        this.chrStatus=''; 
    }
}