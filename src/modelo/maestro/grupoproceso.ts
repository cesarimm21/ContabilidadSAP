export class GrupoProcesoModel {    
    intIdProccGrp_ID:number;
    strCCGrpProc_Cod:string;
    strCCGrpProc_Name:string;
    strCCGrpProc_Desc:string;  
    strCompany_Cod:string;
    strCompany_Desc:string;
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intIdProccGrp_ID=-1;
        this.strCCGrpProc_Cod='';
        this.strCCGrpProc_Desc='';
        this.strCCGrpProc_Name='';
        this.strCompany_Cod='';
        this.strCompany_Desc='';
        this.strCreation_User='';
        this.strModified_User='';
        this.dtmCreation_Date=new Date();
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}