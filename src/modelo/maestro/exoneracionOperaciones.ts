export class ExoneracionOperacionesModel {
    intIdNDExonIR_ID:number;
    strNDExonIR_Cod:string;
    strNDExonIR_Desc:string;
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    // strCompany_Cod:string;
    // strCompany_Desc:string;

    constructor(){
        this.intIdNDExonIR_ID=-1;
        this.strNDExonIR_Cod='';
        this.strNDExonIR_Desc='';
        this.strCreation_User='';
        this.strModified_User='';
        this.dtmCreation_Date=new Date();
        this.dtmModified_Date=new Date();
        this.chrStatus='';
        // this.strCompany_Cod='';
        // this.strCompany_Desc='';
    }
}