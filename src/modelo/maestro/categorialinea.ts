export class CategoriaLineaModel {
    intIdCategLine_ID:number;
    strCategItem_Cod: string;
    strCategItem_Desc:string;
    
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intIdCategLine_ID=-1;
        this.strCategItem_Cod='';
        this.strCategItem_Desc='';
        this.strCreation_User='';
        this.strModified_User='';
        this.dtmCreation_Date=new Date();
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}