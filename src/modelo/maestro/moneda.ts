export class MonedaModel {
    intIdCurrency_ID:number;
    intIdAcctCont_ID:number;
    strAcc_Local_NO:string;
    strAcc_Corp_NO:string;
    strCurrency_Cod:string ;
    strCurrency_Desc:string ;
    strReference:string ;
	strCountry:string ;
	
    strCreation_User:string ;      
    dtmCreation_Date:Date ;           
    strModified_User:string ;
    dtmModified_Date:Date ;
    chrStatus:string ;
    constructor(){
        this.intIdCurrency_ID=-1;
        this.intIdAcctCont_ID=-1;
        this.strAcc_Local_NO='';
        this.strAcc_Corp_NO='';
        this.strCurrency_Cod='';
        this.strCurrency_Desc='';
        this.strReference='';
        this.strCountry='';
    }
}