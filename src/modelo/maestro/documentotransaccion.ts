export class DocumentoTransacionModel {
    intDoc_Trans_ID:number;
    strDoc_Trans_Cod:string;
    strDoc_Trans_Desc:string;
    strDoc_Trans_Num:string;
    chrDoc_Trans_Ind:string;
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intDoc_Trans_ID=-1;
        this.strDoc_Trans_Cod='';
        this.strDoc_Trans_Desc='';
        this.strDoc_Trans_Num='';
        this.chrDoc_Trans_Ind='';
        this.strCreation_User='';
        this.strModified_User='';
        this.dtmCreation_Date=new Date();
        this.dmModified_Date=new Date();
        this.chrStatus='';
    }
 
}