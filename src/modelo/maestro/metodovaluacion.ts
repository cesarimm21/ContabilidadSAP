export class MetodoValuacionModel {
    intIdValMeth_ID: number;
    strValMeth_Cod:string;
    strValMeth_Desc:string;    
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intIdValMeth_ID=-1;
        this.strValMeth_Cod='';
        this.strValMeth_Desc='';
        this.strCreation_User='';
        this.dtmCreation_Date=new Date();
        this.strModified_User='';
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}