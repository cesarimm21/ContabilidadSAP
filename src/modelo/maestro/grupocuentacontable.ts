export class GrupoCuentaContableModel {
    intIdGrpCta_ID:number;
    strGrpAcctCont_Cod: string;
    strGrpAcctCont_Name:string;
    strGrpAcctCont_Desc:string;
    strCompany_Cod:string;
    strCompany_Desc:string;
    strComp_Cod:string;
    strComp_Desc:string;
    strGrpAcct_Pos:string;    
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intIdGrpCta_ID=-1;
        this.strGrpAcctCont_Cod='';
        this.strGrpAcctCont_Name='';
        this.strGrpAcctCont_Desc='';
        this.strCompany_Cod='';
        this.strCompany_Desc='';
        this.strComp_Cod='';
        this.strComp_Desc='';
        this.strGrpAcct_Pos='';
        this.strCreation_User='';
        this.strModified_User='';
        this.dtmCreation_Date=new Date();
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}