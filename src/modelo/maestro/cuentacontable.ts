import {TipoCuentaContableModel} from "./tipocuentacontable";
import {GrupoCuentaContableModel} from "./grupocuentacontable";
import {RubroModel} from "./rubro";
import {GrupoGastosModel} from "./grupogastos";
import {MonedaModel} from "./moneda";
import { NumericDictionary } from "lodash";

export class CuentaContableModel {
    intIdCuentaContable:number;
    strCodigo: string;
    strIdCuentaContable:string;
    strNombre:string;
    strDescripcion:string;
    intIdTipo:number;
    intIdTipoCuentaContable:number;
    intIdGrupoCuentaContable:number;
    intIdRubro:number;
    intIdGrupoGasto:number;
    intIdMoneda:number;
    intIdCompania:number;
    intIdPlanCuenta:number;
    intIdPlanCuentaCorporativo:number;
    blnDestino:boolean;
    blnCtaAbierta:boolean;
    intIdImpuesto:number;
    blnLogistica:boolean;
    blnContabilidad:boolean;
    blnCostos:boolean;
    blnCtaPagar:boolean;
    blnCtaCobrar:boolean;
    blnCombustible:boolean;
    blnProduccionEstadistica:boolean;
    blnActivosFijos:boolean;
    blnPanillas:boolean;

    strUsuarioCrea:string;
    dtmFechaCrea:Date;
    strUsuarioModif:string;
    dtmFechaModif:Date;
    chrEstado:string;
}