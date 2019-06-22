export class TipoComprobantePagoModel {
    intIdDocIdent_IDType_ID:number;
    strDocType_Cod:string;
    strDocType_Desc:string;    
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intIdDocIdent_IDType_ID=-1;
        this.strDocType_Cod='';
        this.strDocType_Desc='';
        this.strCreation_User='';
        this.strModified_User='';
        this.dtmCreation_Date=new Date();
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}