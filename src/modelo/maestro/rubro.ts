export class RubroModel {
    intIdAcctItem_ID:number;
    strAcctItem_Cod: string;
    strAcctItem_Name:string;
    strAcctItem_Desc:string;
    strAcctItem_Pos:string;
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    strCompany_Cod:string;
    strCompany_Desc:string;

    constructor(){
        this.intIdAcctItem_ID=0;
        this.strAcctItem_Cod='';
        this.strAcctItem_Pos='';
        this.strAcctItem_Name='';
        this.strAcctItem_Desc='';
        this.strCreation_User='';
        this.dtmCreation_Date=new Date();
        this.strModified_User='';
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}