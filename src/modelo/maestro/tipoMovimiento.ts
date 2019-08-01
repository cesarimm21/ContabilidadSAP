export class TipoMovimientoModel {
    intIdTypeMov_ID:number;
    strTypeMov_Cod:string;
    strTypeMov_Name:string;
    strTypeMov_Desc:string;
    strDoc_Trans_Num:string;
    chrTypeMov_Ind:string;
    strTypeOper_Cod:string;
    strCompany_Cod:string;
    strCompany_Desc:string;    
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intIdTypeMov_ID=-1;
        this.strTypeMov_Cod='';
        this.strTypeMov_Name='';
        this.strTypeMov_Desc='';
        this.strDoc_Trans_Num='';
        this.chrTypeMov_Ind='';
        this.strTypeOper_Cod='';
        this.strCompany_Cod='';
        this.strCompany_Desc='';
        this.strCreation_User='';
        this.strModified_User='';
        this.dtmCreation_Date=new Date();
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}