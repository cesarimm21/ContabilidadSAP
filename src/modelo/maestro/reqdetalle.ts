
export class ReqDetalleModel {
    intAutoIncremental:number;
    strCodCategoriaCuenta:string;
    strCodPrioridad:string;
    strCodCategoriaLinea:string;
    strCurrency_Code:string;
    strCodProducto:string;
    intIdRequisicionDetalle:number;
    intRequis_Item_NO:number ;
    intIdRequisicion:any ;
    intIdProducto:any ;    
    intIdCategoriaCuenta:any ;
    intIdCategoriaLinea:any ;
    intIdMoneda:any ;
    intIdCentroCosto:any ;
    strMaterial_Code:string ;
    strDescription:string ;
    intIdPrioridad:any ;
    fltQuantity:number ;
    strUM:string ;
    fltUnitPrice:number ;
    fltValue_Total:number ;
    strCurr:string ;
    dtmRequested_Date:string ;        
    dtmDelivery_Date:string ; 
    strWarehouse_Code:string ;
    strVendor_Suggested:string ;
    strVendor_Number:string;
    chrTipo:string ;
    intIdCuentaContable:number;
    codigoCuentaPP:string;
    strUser_ID:string ;
    dtmCreation_Date:Date ;
    strModify_User:string ;
    dmModified_Date:Date ;
    chrStatus:string ;

    constructor(item: ReqDetalleModel = {} as ReqDetalleModel){
        this.strCodCategoriaCuenta=item.strCodCategoriaCuenta;
        this.strCodPrioridad=item.strCodPrioridad;
        this.strCodCategoriaLinea=item.strCodCategoriaLinea;
        this.strCurrency_Code=item.strCurrency_Code;
        this.strCodProducto=item.strCodProducto;
        this.intIdRequisicionDetalle=item.intIdRequisicionDetalle;
        this.intRequis_Item_NO=item.intRequis_Item_NO;
        this.intIdRequisicion=item.intIdRequisicion;
        this.intIdProducto=item.intIdProducto;
        this.intIdCategoriaCuenta=item.intIdCategoriaCuenta;
        this.intIdCategoriaLinea=item.intIdCategoriaLinea;
        this.intIdMoneda=item.intIdMoneda;
        this.intIdCentroCosto=item.intIdCentroCosto;
        this.strMaterial_Code=item.strMaterial_Code;
        this.strDescription=item.strDescription;
        this.intIdPrioridad=item.intIdPrioridad;
        this.fltQuantity=item.fltQuantity;
        this.strUM=item.strUM;
        this.fltUnitPrice=item.fltUnitPrice;
        this.fltValue_Total=item.fltValue_Total;
        this.strCurr=item.strCurr;
        this.dtmRequested_Date=item.dtmRequested_Date;
        this.dtmDelivery_Date=item.dtmDelivery_Date;
        this.strWarehouse_Code=item.strWarehouse_Code;
        this.strVendor_Suggested=item.strVendor_Suggested;
        this.chrTipo=item.chrTipo;
        this.intIdCuentaContable=item.intIdCuentaContable;
        this.codigoCuentaPP=item.codigoCuentaPP;
        this.strUser_ID=item.strUser_ID;
        this.dtmCreation_Date=item.dtmCreation_Date;
        this.strModify_User=item.strModify_User;
        this.dmModified_Date=item.dmModified_Date;
        this.chrStatus=item.chrStatus;
    

    }
}
