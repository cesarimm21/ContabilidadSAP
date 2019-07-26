export class CriticidadModel {
    intIdCritical_ID:number;
    strCritical_Cod:string;
    strCritical_Desc:string;

    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intIdCritical_ID=-1;
        this.strCritical_Cod='';
        this.strCritical_Desc='';
        this.strCreation_User='';
        this.strModified_User='';
        this.dtmCreation_Date=new Date();
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}