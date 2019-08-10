export class ComponenteCuentaContableModel {
    intComp_Cod:number;
    strComp_Cod:string;
    strComp_Name:string;
    strComp_Desc:string;
    strCompany_Cod:string;
    strCompany_Desc:string;
    
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intComp_Cod=-1;
        this.strComp_Cod='';
        this.strComp_Desc='';
        this.strComp_Name='';
        this.strCompany_Cod='';
        this.strCompany_Desc='';
        this.strCreation_User='';
        this.strModified_User='';
        this.dtmCreation_Date=new Date();
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}