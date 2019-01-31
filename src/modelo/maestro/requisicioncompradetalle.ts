export class RequisicionCompraDetalleModel {
    intAutoIncremental:number;
    strCodProducto:string;
    strDescripcion: string;
    strUnidad:string;
    strCuenta:string;
    dblCantidad:number;
    dblPrecio:number;
    strCodMoneda:string;
    dblNeto:number;
    
    strUsuarioCrea:string;
    dtmFechaCrea:Date;
    strUsuarioModif:string;
    dtmFechaModif:Date;
    chrEstado:string;
}