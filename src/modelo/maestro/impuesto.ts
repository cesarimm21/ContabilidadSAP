export class ImpuestoModel {
    intIdImpuesto:number;
    strCodigo: string;
    strCodigo2: string;
    strCodigo3: string;

    strBase: string;
    strBase2: string;
    strBase3: string;

    strCuentaDebito:string;
    strCuentaCredito:string;
    fltMonto:number;
    fltPorcent:number;
    blnGrupo:boolean;
    
    strDescripcion:string;
    
    strUsuarioCrea:string;
    dtmFechaCrea:Date;
    strUsuarioModif:string;
    dtmFechaModif:Date;
    chrEstado:string;
}