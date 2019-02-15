export class CuentasCobrarDetalleModel {
    intAPDOCD_ID:number;
    intIdCompany_ID:string;
    strPO_Item_NO:string;
    strUM:string;
    fltQuantity:number;
    fltUnit_Price:number;
    fltValue_Doc:number;
    fltValue_Local:number;
    fltValue_Corp:number;
    strDesc_Item:string;

    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
}