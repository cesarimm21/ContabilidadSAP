export class IdiomaModel {
    intLenguaje_ID:number;
    strLenguaje_Cod: string;
    strLenguaje_Desc:string;    
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intLenguaje_ID=-1;
        this.strLenguaje_Cod='';
        this.strLenguaje_Desc='';
        this.strCreation_User='';
        this.strModified_User='';
        this.dtmCreation_Date=new Date();
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}