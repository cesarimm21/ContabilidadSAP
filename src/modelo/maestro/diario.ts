export class DiarioModel {
    intDaily_ID:number;
    strDaily_Cod:string;
    strDaily_Desc:string;
    strDaily_Type:string;
    strDaily_AccLocal:string;
    strDaily_AccForen:string;
    strUser_ID:string;
    dtmCreation_Date:Date;
    strModify_User:string;
    dmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intDaily_ID=-1;
        this.strDaily_Cod='';
        this.strDaily_Desc='';
        this.strDaily_Type='';
        this.strDaily_AccLocal='';
        this.strDaily_AccForen='';
        this.strUser_ID='';
        this.dtmCreation_Date=new Date();
        this.strModify_User='';
        this.dmModified_Date=new Date();
        this.chrStatus='';
    }
}