export class AlmacenModel {
    intIdWHS_ID:number;
    intIdCompany_ID:number;
    strCompany_Cod :string;
    strSubsComp_Cod :string;
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
        this.strCompany_Cod='';
        this.strSubsComp_Cod='';
        this.strWHS_Cod='';
        this.strWHS_Name='';
        this.strWHS_Desc='';
        this.strLocation='';
        this.strLocation='';
        this.strCreation_User='';
        this.strModified_User='';
        this.chrStatus='';
    }

}