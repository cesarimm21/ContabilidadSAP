export class AlmacenModel {
    intIdWHS_ID:number;
    intIdCompany_ID:number;
    intIdSubsidiary_ID:number;
    intPlant_ID:number;
    strCompany_Cod :string;
    strSubsComp_Cod :string;
    strPlant_Cod:string;
    strSubsidiary_Cod:string;
    strWHS_Cod:string;
    strWHS_Name :string;
    strWHS_Desc :string;
    strLocation :string;
    strLocation_Type :string;

    strCreation_User:string ;      
    dtmCreation_Date:Date ;           
    strModified_User:string ;
    dtmModified_Date:Date ;
    chrStatus:string ;        
    constructor(){
        this.intIdWHS_ID=-1;
        this.intIdCompany_ID=-1;
        this.intIdSubsidiary_ID=-1;
        this.intPlant_ID=-1;
        this.strCompany_Cod='';
        this.strPlant_Cod='';
        this.strSubsidiary_Cod='';
        this.strSubsComp_Cod='';
        this.strWHS_Cod='';
        this.strWHS_Name='';
        this.strWHS_Desc='';
        this.strLocation='';
        this.strLocation='';
        this.strCreation_User='';
        this.strModified_User='';
        this.dtmCreation_Date=new Date();
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }

}