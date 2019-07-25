export class UnidadMedidaModel {
    intUnit_Measure_ID:number;
    strUM_Cod:string;
    strUM_Desc:string ;    
    strCreation_User:string ;
    dtmCreation_Date:Date ;
    strModified_User:string ;
    dtmModified_Date:Date ;
    chrStatus:string ;
    constructor(){
        this.intUnit_Measure_ID=-1;
        this.strUM_Cod='';
        this.strUM_Desc='';
        this.strCreation_User='';
        this.strModified_User='';
        this.dtmCreation_Date=new Date();
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}