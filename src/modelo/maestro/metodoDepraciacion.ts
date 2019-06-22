export class MetodoDepreciacionModel {
    intIdDeprMeth_ID:number;
    strDeprMeth_Cod:string;
    strDeprMeth_Desc:string;    
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intIdDeprMeth_ID=-1;
        this.strDeprMeth_Cod='';
        this.strDeprMeth_Desc='';
        this.strCreation_User='';
        this.strModified_User='';
        this.dtmCreation_Date=new Date();
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}    