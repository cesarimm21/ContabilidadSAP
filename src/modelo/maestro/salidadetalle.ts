export class SalidaDetalleModel {
    index:number;
    intIssueAjustD_ID: number;
    intIssueAjust_Item: number | null;
    fltIssueRequest_QTY: number | null;
    fltIssueDelivery_QTY: number | null;
    fltAjust_QTY: number | null;
    fltQuantity:number;
    fltQuantityR:number;
    strStock_Cod: string | null;
    strStock_Desc: string | null;
    strUM_Cod: string | null;
    strCostCenter_NO: string | null;
    strAcc_NO_Local: string | null;
    strDelivery_Place: string | null;
    dtmDelivery_Date: Date | null;
    strPriority_Cod: string | null;
    strPriority_Desc: string | null;
    strIssueAjust_NO:string | null;
    intIdInvStock_ID:number;
    intIdCostCenter_ID:number;
    intIdPriority_ID:number;
    intIssueAjustH_ID:number;
    errorCentroCosto:boolean;
    errorLugarEntrega:boolean;
    errorPrioridad:boolean;

    strCreation_User: string;
    dtmCreation_Date: Date;
    strModified_User: string;
    dtmModified_Date: Date;
    chrStatus: string;
}

