export class TipoAdquisicionModel {
  
    intTypeAdq_PDB_Cod:number;
    strTypeAdq_PDB_Cod:string;
    strTypeAdq_PDB_Desc:string | null;    
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModify_User:string;
    dmModified_Date:Date;
    chrStatus:string;

    strCompany_Cod:string;
    strCompany_Desc:string;
    constructor(){
        this.intTypeAdq_PDB_Cod=-1;
        this.strTypeAdq_PDB_Cod='';
        this.strTypeAdq_PDB_Desc='';
        this.strCreation_User='';
        this.strModify_User='';
        this.dtmCreation_Date=new Date();
        this.dmModified_Date=new Date();
        this.chrStatus='';
    }
}