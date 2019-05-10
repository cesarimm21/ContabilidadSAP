export class TipoCambioModel {
    intExchRate_ID:number;
    intExchRate_Year: number;
    dtmExchRate_Date:Date;
    strExchRate_OF:string;
    strExchRate_OF_desc:string;
    strExchRate_TO:string;
    strExchRate_TO_desc:string;
    fltExchRate_Buy:number;
    fltExchRate_Sale:number;
    fltExchRate_Agrem:number;    
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intExchRate_ID=-1;
        this.intExchRate_Year=new Date().getFullYear();
        this.dtmExchRate_Date=new Date();
        this.strExchRate_OF='';
        this.strExchRate_OF_desc='';
        this.strExchRate_TO='';
        this.strExchRate_TO_desc='';
        this.fltExchRate_Buy=0;
        this.fltExchRate_Sale=0;
        this.fltExchRate_Agrem=0;
        this.strCreation_User='';
        this.dtmCreation_Date=new Date();
        this.strModified_User='';
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}