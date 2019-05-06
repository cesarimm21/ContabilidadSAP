import {FacturaDetalleModel} from "./facturadetalle";
export class FacturaModel{
    intAPDocH_ID:number;//*
    strCompany_Cod:string;//*
    strCompany_Desc:string;//*
    strPO_NO:string;//*
    strVoucher_NO:string;//autogenerado*
    strPeriod_NO:string;//*
    dtmPeriod:Date;//*
    strVendor_NO:string;//*
    strVendor_Desc:string;//*
    strDaily_Cod:string;//*
    strDaily_Desc:string;//*
    dtmDoc_Acc_Date:Date;//falta
    strDesc_Doc:string;//*
    dtmDoc_Date:Date;//fecha del documento a insertar, no hoy dia// para jalar el tipo de documento "fecha de emision"
    dtmDue_Date:Date;//fecha de vencimiento, pueden poner o no, si no ponen es hoy dia
    strType_Doc:string;//*tblTipocomprobantepago strDocType_Cod
    strSerie_Doc:string;//*
    strDocument_NO:string;//*
    strType_Doc2:string;//*tblTipocomprobantepago strDocType_Cod
    strSerie_Doc2:string;//*
    strDocument_NO2:string;//*
    strDocument_NO_ND:string;//*
    strCurrency_Doc:string;//*
    fltExchange_Rate:number;//*tipo de cambio de venta/ de acuerdo a la fecha de emision de la factura
    intQuantity_Doc:number;//*
    fltValue_Doc:number;//*
    fltValue_Local:number;//*
    fltValue_Corp:number;//*
    fltOperation_NoTax_Local:number;//sin IGV//Sale del detalle
    fltOperation_NoTax_Corp:number;//sin IGV//Sale del detalle
    fltISC_Local:number;//0
    fltISC_Corp:number;//0
    fltOther_WH_Local:number;//0
    fltOther_WH_Corp:number;//0
    fltNetValue_Doc_Local:number;//* fltValue_Doc+ fltValue_Tax+fltOperation_NoTax
    fltNetValue_Doc_Corp:number;//* fltValue_Doc+ fltValue_Tax+fltOperation_NoTax
    strTax_Cod:string;//*
    fltValue_Tax:number;
    strValue_Local:string;
    strExchange_Rate:string;
    strValue_Corp:string;
    intValue_Doc:number;
    intNetValue_Doc:number;
    fltValue_Tax_Local:number;//* TOTAL DEL IVG
    fltValue_Tax_Corp:number;//* TOTAL DEL IVG
    strWH_Detrac_Cod:string;//codigo 
    fltValue_WH_Detrac:number;// ejemplo: 4% del total intNetValue_Doc
    strDetrac_Cod:string;//viene de sunat cuando pagaste a la sunat
    fltDetrac_NO:number;//actualiza cuando pagaste a la sunat
    dtmDetrac_Date:Date;//fecha del pago de la detraccion
    strDetrac_Lote_NO:string;//cuando pagaste a la sunat
    strWH_Reten_Cod:string;//codigo de impuesto
    fltDetraccion_Porcen:number;//codigo de impuesto
    fltValue_WH_Retention:number;//valor de impuesto
    dtmDoc_Date_Ref:Date;//notas de credito y debito 7 y 8
    strType_Doc_Ref:string;
    strSerie_Doc_Ref:string;
    fltDocument_NO_Ref:number;
    fltValue_Doc_Ref:number;
    fltValue_Tax_Ref:number;
    strPurch_Type:string;//tblcomprobante casi todos son "01" y, 50 y 91 es exteerno "02"
    strDoc_Status:string;//*01 ,10 etc
    intIdPayRunD_ID:number;
    strPayRun_NO:string;
    dtmRunCreation_Date:Date;
    dtmPayRun_Date:Date;
    strApprRun_User:string;
    strPaid_Bank:string;
    strPaid_Curr_Bank:string;
    strPaid_Acct_Bank:string;
    fltPaid_Vendor:number;
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    listaDetalle:any[];
    constructor(){
        this.intAPDocH_ID=-1;
        this.strCompany_Cod='';
        this.strCompany_Desc='';
        this.strPO_NO='';
        this.strVoucher_NO='';
        this.strPeriod_NO='';
        this.dtmPeriod=new Date;
        this.strVendor_NO='';
        this.strVendor_Desc='';
        this.strDaily_Cod='';
        this.strDaily_Desc='';
        this.dtmDoc_Acc_Date= new Date;
        this.strDesc_Doc='';
        this.dtmDoc_Date=new Date;
        this.dtmDue_Date=new Date;
        this.strType_Doc='';
        this.strSerie_Doc='';
        this.strDocument_NO='';
        this.strType_Doc2='';
        this.strSerie_Doc2='';
        this.strDocument_NO2='';
        this.strDocument_NO_ND='';
        this.strCurrency_Doc='';
        this.fltExchange_Rate=0;
        this.intQuantity_Doc=0;
        this.fltValue_Doc=0;
        this.fltValue_Local=0;
        this.fltValue_Corp=0;
        this.fltOperation_NoTax_Local=0;
        this.fltOperation_NoTax_Corp=0;
        this.fltISC_Local=0;
        this.fltISC_Corp=0;
        this.fltOther_WH_Local=0;  
        this.fltOther_WH_Corp=0;  
        this.fltNetValue_Doc_Local=0;
        this.fltNetValue_Doc_Corp=0;
        this.strTax_Cod='';
        this.fltValue_Tax_Local=0;
        this.fltValue_Tax_Corp=0;
        this.strWH_Detrac_Cod='';
        this.fltValue_WH_Detrac=0;
        this.strDetrac_Cod='';
        this.fltDetrac_NO=0;
        this.dtmDetrac_Date=new Date;
        this.strDetrac_Lote_NO='';
        this.strWH_Reten_Cod='';
        this.fltDetraccion_Porcen=0;
        this.fltValue_WH_Retention=0;
        this.dtmDoc_Date_Ref=new Date;
        this.strType_Doc_Ref='';
        this.strSerie_Doc_Ref='';
        this.fltDocument_NO_Ref=0;
        this.fltValue_Doc_Ref=0;
        this.fltValue_Tax_Ref=0;
        this.strPurch_Type='';
        this.strDoc_Status='';
        this.intIdPayRunD_ID=-1;
        this.strPayRun_NO='';
        this.dtmRunCreation_Date=new Date;
        this.dtmPayRun_Date=new Date;
        this.strApprRun_User='';
        this.strPaid_Bank='';
        this.strPaid_Curr_Bank='';
        this.strPaid_Acct_Bank='';
        this.fltPaid_Vendor=0;
        this.strCreation_User='';
        this.dtmCreation_Date=new Date;
        this.strModified_User='';
        this.dtmModified_Date=new Date;
        this.chrStatus='';
        this.listaDetalle=[];
    } 
}