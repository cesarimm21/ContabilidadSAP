export class GrupoCompradorModel {
    intIdGrpPurch_ID:number;
    strGrpPurch_Cod:string;
    strGrpPurch_Name:string;
    strGrpPurch_Desc:string;
    strCompany_Cod:string;
    strCompany_Desc:string;

    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intIdGrpPurch_ID=-1;
        this.strGrpPurch_Cod='';
        this.strGrpPurch_Desc='';
        this.strGrpPurch_Name='';
        this.strCompany_Cod='';
        this.strCompany_Desc='';
        this.strCreation_User='';
        this.dtmCreation_Date=new Date();
        this.strModified_User='';
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}