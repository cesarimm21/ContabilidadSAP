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
        this.strGrpAcctCont_Cod='';
        this.strGrpAcctCont_Name='';
        this.strGrpAcctCont_Desc='';
        this.strCompany_Cod='';
        this.strCompany_Desc='';
        this.strComp_Cod='';
        this.strComp_Desc='';
        this.strGrpAcct_Pos='';
    }
}