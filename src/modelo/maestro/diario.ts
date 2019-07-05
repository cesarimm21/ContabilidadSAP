export class DiarioModel {
    intDaily_ID:number;
    strDaily_Cod:string;
    strDaily_Desc:string;
    strDaily_Type:string;
    strDaily_AccLocal:string;
    strDaily_AccForen:string;
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intDaily_ID=-1;
        this.strDaily_Cod='';
        this.strDaily_Desc='';
        this.strDaily_Type='';
        this.strDaily_AccLocal='';
        this.strDaily_AccForen='';
        this.strCreation_User='';
        this.dtmCreation_Date=new Date();
        this.strModified_User='';
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}