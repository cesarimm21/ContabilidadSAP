export class TipoAdquisicionModel {
  
    intTypeAdq_PDB_Cod:number;
    strTypeAdq_PDB_Cod:string;
    strTypeAdq_PDB_Desc:string;  
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intTypeAdq_PDB_Cod=-1;
        this.strTypeAdq_PDB_Cod='';
        this.strTypeAdq_PDB_Desc='';
        this.strCreation_User='';
        this.strModified_User='';
        this.dtmCreation_Date=new Date();
        this.dmModified_Date=new Date();
        this.chrStatus='';
    }
}