export class CompaniaModel {
    intIdCompany_ID:number;
    strCompany_Cod: string;
    strCompany_Name:string;
    strCompany_Desc:string;
    strRUC:string;
    strCountry:string;
    strRegion:string;
    strAddress:string;
    strCurr_Funct:string;
    strCurr_Loc:string;
    strCurr_Grp:string;
    
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    strRegion_desc:string;
    strCountry_desc:string;

    constructor(){
        this.intIdCompany_ID=-1;
        this.strCompany_Cod='';
        this.strCompany_Desc='';
        this.strCompany_Name='';
        this.strRUC='';
        this.strCountry='';
        this.strRegion='';
        this.strAddress='';
        this.strCurr_Funct='';
        this.strCurr_Loc='';
        this.strCurr_Grp='';
        this.strCreation_User='';
        this.dtmCreation_Date=new Date();
        this.strModified_User='';
        this.dtmModified_Date=new Date();
        this.chrStatus='';
        this.strRegion_desc='';
        this.strCountry_desc='';
    }
}