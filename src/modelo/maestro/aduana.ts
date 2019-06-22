export class AduanaModel {
    intCustom_ID:number;
    strCustom_Cod: string;
    strCustom_Desc:string;    
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intCustom_ID=-1;
        this.strCustom_Cod='';
        this.strCustom_Desc='';
        this.strCreation_User='';
        this.strModified_User='';
        this.dtmCreation_Date=new Date();
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}