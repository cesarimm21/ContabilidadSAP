export class GrupoAreaModel {
    intIdCCGrpArea_ID:number;
    strCCGrpArea_Cod: string;
    strCCGrpArea_Desc:string;    
    strCompany_Cod:string;    
    strCompany_Desc:string;    
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intIdCCGrpArea_ID=-1;
        this.strCCGrpArea_Cod='';
        this.strCCGrpArea_Desc='';
        this.strCompany_Cod='';
        this.strCompany_Desc='';
        this.strCreation_User='';
        this.strModified_User='';
        this.dtmCreation_Date=new Date();
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}