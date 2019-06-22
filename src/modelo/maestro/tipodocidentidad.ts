export class TipoDocIdentidadModel {
    intIdDocIdent_ID: number;
    strDocIdent_NO:string;
    strDocIdent_Name:string;
    strDocIdent_Desc:string;    
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intIdDocIdent_ID=-1;
        this.strDocIdent_NO='';
        this.strDocIdent_Name='';
        this.strDocIdent_Desc='';
        this.strCreation_User='';
        this.strModified_User='';
        this.chrStatus='';
        this.dtmCreation_Date=new Date();
        this.dtmModified_Date=new Date();
    }
}