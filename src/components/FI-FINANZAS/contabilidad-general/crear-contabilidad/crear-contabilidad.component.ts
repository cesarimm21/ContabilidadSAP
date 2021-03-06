import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import BCompaniaProveedor from '@/components/buscadores/b_compania/b_compania.vue';
import BProveedorComponent from '@/components/buscadores/b_proveedor/b_proveedor.vue';
import BDocumentoComponent from '@/components/buscadores/b_tipoDocumento/b_tipoDocumento.vue';
import BGrupoProcesoComponent from '@/components/buscadores/b_grupo_proceso/b_grupo_proceso.vue';
import BMonedaComponent from '@/components/buscadores/b_moneda/b_moneda.vue';
import BImpuestoComponent from '@/components/buscadores/b_impuesto/b_impuesto.vue';
import BGrupoAreaComponent from '@/components/buscadores/b_grupo_area/b_grupo_area.vue';
import BCentroCostoComponent from '@/components/buscadores/b_centro_costo/b_centro_costo.vue';
import BCuentaContableComponent from '@/components/buscadores/b_cuenta_contable/b_cuenta_contable.vue';
import BDiarioComponent from '@/components/buscadores/b_diario/b_diario.vue';
import BCategoriaCentroCostoComponent from '@/components/buscadores/b_categoria_centrocosto/b_categoria_centrocosto.vue';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';

///**Servicios */
import ordencompraService from '@/components/service/ordencompra.service';
import periodoService from '@/components/service/periodo.service';

import diarioService from '@/components/service/diario.service'; 
import correlativoService from '@/components/service/correlativo.service'; 
import tipocambioService from '@/components/service/tipocambio.service';
import facturaService from '@/components/service/factura.service';
import prooveedorService from '@/components/service/proveedor.service';
//***Modelos */
import {TipoDocIdentidadModel} from '@/modelo/maestro/tipodocidentidad';
import {AlmacenModel} from '@/modelo/maestro/almacen';
import {CompaniaModel} from '@/modelo/maestro/compania';
import {OrdenCompraModel} from '@/modelo/maestro/ordencompra';
import {OrdenCompraDetalleModel} from '@/modelo/maestro/ordencompradetalle';
import {CategoriaLineaModel} from '@/modelo/maestro/categorialinea';
import {CategoriaCuentaModel} from '@/modelo/maestro/categoriacuenta';
import {PrioridadModel} from '@/modelo/maestro/prioridad';
import {MonedaModel} from '@/modelo/maestro/moneda';
import {ProveedorModel} from '@/modelo/maestro/proveedor';
import {FacturaModel} from '@/modelo/maestro/factura';
import {FacturaDetalleModel} from '@/modelo/maestro/facturadetalle';
import {DiarioModel} from '@/modelo/maestro/diario';
import {DiarioGeneralModel} from '@/modelo/maestro/diariogeneral';
import {TipoCambioModel} from '@/modelo/maestro/tipocambio';
import {ImpuestoModel} from '@/modelo/maestro/impuesto';
import {CentroCostosModel} from '@/modelo/maestro/centrocostos';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import BDocumentoTransaccionComponent from '@/components/buscadores/b_documento_transaccion/b_documento_transaccion.vue';
import { Notification } from 'element-ui';
import centrocostosService from '@/components/service/centrocostos.service';
import diariogeneralService from '@/components/service/diariogeneral.service';
import documentoTransaccionService from '@/components/service/documentotransaccion.service';
import BCategoriaCuentaComponent from '@/components/buscadores/b_categoria_cuenta/b_categoria_cuenta.vue';
import { PeriodoModel } from '@/modelo/maestro/periodo';

@Component({
  name: 'crear-ingreso-comprobante',
  components:{
  'buttons-accions':ButtonsAccionsComponent,
  'bproveedor':BProveedorComponent,
  'bcompania':BCompaniaProveedor,
  'bdocumento':BDocumentoComponent,
  'bcategoriacuenta':BCategoriaCuentaComponent,
  'bmoneda':BMonedaComponent,
  'bimpuesto':BImpuestoComponent,
  'quickaccessmenu':QuickAccessMenuComponent,
  'bgrupoproceso':BGrupoProcesoComponent,
  'bgrupoarea':BGrupoAreaComponent,
  'bcategoriacentrocosto':BCategoriaCentroCostoComponent,
  'bcuentacontable':BCuentaContableComponent,
  'bcentrocosto':BCentroCostoComponent,
  'bdiario':BDiarioComponent,
  'bdocumentotransaccion':BDocumentoTransaccionComponent
  }
})
export default class CrearContabilidadComponent extends Vue {
  nameComponent:string;
  habilitar:boolean=false;
  habilitarPane:boolean=true;
  timer=0;
  codigoCompania:string;
  descripcionCompania:string;
  sizeScreen:string = (window.innerHeight - 420).toString();
  TableIngreso:any[];
  periodoData:Date;
  totalUnidad:number;
  totalDinero:number;
  salidaUnidad:string;
  salidaDinero:string;
  totalDolars:string;
  TotalPagarS:string;
  TotalPagarD:string;
  voucher:string;
  fechavencida:string;
  public tipocambio:TipoCambioModel=new TipoCambioModel();
  public centrocosto:CentroCostosModel=new CentroCostosModel();
  //**Compania */
  btnactivarcompania:boolean=false;
  btndocumentotransaccion:boolean=false;
  dialogCompania:boolean=false;
  dialogDocumentoTransaccion:boolean=false;
  dataCompania:any[];
  public companiaModel:CompaniaModel=new CompaniaModel();
  public periodoModel:PeriodoModel=new PeriodoModel();
  public periodoModelArray:Array<PeriodoModel>=[];

  dialogGrupoProceso:boolean=false;
  btnactivarGrupoProceso:boolean=false;
  dialogGrupoArea:boolean=false;
  dialogPeriodo:boolean=false;
  btnactivarPeriodo:boolean=false;
  strPeriodo:string;
  btnactivarGrupoArea:boolean=false;
  dialogCategoriaCentroCosto:boolean=false;
  btnactivarCategoriaCentroCosto:boolean=false;
  btnactivarCuentaContableDebe:boolean=false;
  dialogCuentaContableDebe:boolean=false;
  btnactivarCuentaContableHaber:boolean=false;
  dialogCuentaContableHaber:boolean=false;
  
  btnactivarCentroCosto:boolean=false;
  dialogCentroCosto:boolean=false;
  //**Orden compra */
  dialogOrdenCompra:boolean=false;
  btnactivarOrdenCompra:boolean=false;
  dataOrdenCompra:any[];
  selectData:string;
  tabletipo:any=[{}]
  // public ordencompraDetalle:Array<OrdenCompraDetalleModel>[];
  public ordencompraDetalle:OrdenCompraDetalleModel[];
  
  pagina: number =1;
  RegistersForPage: number = 10;
  totalRegistros: number = 100;
  public CompleteData:Array<DiarioGeneralModel>=[]; 
  public CompleteData1:Array<DiarioGeneralModel>=[]; 


  public ordencompra:OrdenCompraModel=new OrdenCompraModel();
  public ordencompraSelect:OrdenCompraModel=new OrdenCompraModel();
  //**Proveedor */
  public proveedor:ProveedorModel=new ProveedorModel();
  //**Tipo Documento */
  dialogTipoDocumento:boolean=false;
  btnactivarTipoDocumento:boolean=false;
  public selectTipoDoc:TipoDocIdentidadModel=new TipoDocIdentidadModel();

  //**Documento */
  strlevel:string='';
  dtmStart_Date:Date=new Date();
  dtmEnd_Date:Date=new Date();
  //**Moneda */
  dialogMoneda:boolean=false;
  btnactivarMoneda:boolean=false;
  dataMoneda:any[];
  public moneda:MonedaModel=new MonedaModel();
  //**Factura */
  public factura:FacturaModel=new FacturaModel();

  //**Diario */
  public diarioModel:DiarioModel=new DiarioModel();
  dialogDiario:boolean=false;
  btnactivarDiario:boolean=false;
  public diarioSelect:DiarioModel=new DiarioModel();
  fecha_actual:string;
  fecha_ejecucion:string;

  //**impuesto */
  public Impuesto:ImpuestoModel=new ImpuestoModel();
  dialogImpuesto:boolean=false;
  btnactivarImpuesto:boolean=false;
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';

  strCompany_Cod:any;
  strCompany_Desc:any;
  strDaily_Cod:any;
  Period:Date=new Date();
  Doc_Trans_Cod:any;
  Posting_Date:Date=new Date();
  Autoreverse:boolean=false;
  Doc_Date:Date=new Date();
  Currency_Cod:any;
  Currency_Cod_Desc:any;
  OrigenDocum_NO:any;
  Desc_Header:any;
  
  strDaily_Cod_Desc:any;
  Doc_Trans_Cod_Desc:any;
  cell_ocultar:string='transparent';
  public selectrow:DiarioGeneralModel=new DiarioGeneralModel();
  public selectrowPeriodo:PeriodoModel=new PeriodoModel();
  
  selectcolumn:any;
  dialogCategoriaCuenta:boolean=false;
  bln_tbl_categoria_cuenta:boolean=false;
  bln_tbl_cuenta_contable:boolean=false;
  bln_tbl_centro_costo:boolean=false;
  dialogCuentaContable:boolean=false;
  bln_tbl_descripcion:boolean=false;
  bln_tbl_cantidad_debe:boolean=false;
  bln_tbl_cantidad_haber:boolean=false;
  
  editing:any= {
    row:'',
    column:''
  };
  constructor(){    
    super();
    Global.nameComponent='crear-ingreso-comprobante';
    this.fecha_actual=Global.getDate(new Date().toDateString());   
    this.fecha_ejecucion=Global.getParseDate(new Date().toDateString());  
    
    this.strCompany_Cod=localStorage.getItem('compania_cod');
    this.strCompany_Desc=localStorage.getItem('compania_name'); 

    for(var i=0;i<this.totalRegistros;i++){
      var diario:DiarioGeneralModel=new DiarioGeneralModel();
      this.CompleteData.push(diario);
    }
    setTimeout(() => {
      this.loadTipocambio();
      this.loadPeriodos();
      this.getLastPeriodo();
    }, 200)
  }
  loadTipocambio(){
    tipocambioService.GetAllTipoCambio1()
    .then(response=>{
      this.tipocambio=response;  
    }).catch(error=>{})
    documentoTransaccionService.GetOnlyOneDocumentoTransaccion2('FG01')    
    .then(response=>{
      this.Doc_Trans_Cod=response.strDoc_Trans_Cod;
      
    }).catch(error=>{
      
    })

  }
  loadPeriodos(){
    periodoService.GetAllPeriodo()
    .then(response=>{
        this.periodoModelArray=response;
    }).catch(error=>{
        this.$message({
            showClose: true,
            type: 'error',
            message: 'No se pudo cargar prioridad'
          });
    })
  }
  getLastPeriodo(){
    this.periodoModel.dtmModified_Date=new Date()
    periodoService.GetAllPeriodoLast(this.periodoModel)
    .then(response=>{
      if(response!=undefined){
        this.periodoModel=response;
        if(this.periodoModel.chrStatus!='A'){
          this.$message({
            showClose: true,
            type: 'error',
            message: 'Periodo Cerrado '
          });
        }
        else{
          this.strPeriodo=this.periodoModel.strPeriod
        }
      }
    }) 
  }
  DateContabilizacionClick(){ 
    var date1=Global.getDateVencida(this.factura.dtmDoc_Acc_Date,this.proveedor.intDayToPay);
    this.factura.dtmDue_Date=date1;
    this.fechavencida=Global.getDateString(date1);   
    
}

LoadCategoriaCuenta(row,column){
  this.selectrow=row;
  this.selectcolumn=column;
  console.log(row);
  this.dialogCategoriaCuenta=true;
}

clickmaterialdescripcion(event,edit,column){
  debugger;
  this.bln_tbl_descripcion=true;
  event.edit=!edit;
  this.editing.row=event;
  this.editing.column=column;
}

clickcantidadDebe(event,edit,column){
  debugger;
  this.bln_tbl_cantidad_debe=true;
  event.edit=!edit;
  this.editing.row=event;
  this.editing.column=column;
}
clickcantidadHaber(event,edit,column){
  debugger;
  this.bln_tbl_cantidad_haber=true;
  event.edit=!edit;
  this.editing.row=event;
  this.editing.column=column;
}

loadDocumentoTransaccion(){
  debugger;
  this.dialogDocumentoTransaccion=true;
}
loadPeriodo(){
  this.dialogPeriodo=true;
}
closeDialogPeriodo(){
  this.dialogPeriodo=false;
  return false;
}
SeleccionarPeriodo(val){
  this.strPeriodo=val.strPeriod;
  this.dialogPeriodo=false;
}

SeleccionadoCategoriaCuenta(val){
  this.selectrow.strAcctCateg_Cod=val.strAcctCateg_Cod;
  this.dialogCategoriaCuenta=false;
  this.selectrow.strCenCosWBS_Cod='';
  this.selectrow.strAcc_Local_NO='';
  debugger;
  if(val.strAcctCateg_Cod=="CC"){
    this.dialogCentroCosto=true;
  }
  if(val.strAcctCateg_Cod=="CB"){
    this.dialogCuentaContable=true;
  }
}

closeCategoriaCuenta(){
  return false;
}
  //#region [COMPANIA]
  loadCompania(){
    this.dialogCompania=true;
  }
  companiaSeleccionado(val:CompaniaModel,dialog:boolean){
    this.companiaModel=val;
    this.strCompany_Cod=this.companiaModel.strCompany_Cod;
    this.strCompany_Desc=this.companiaModel.strCompany_Desc;
    this.dialogCompania=false;    
  }
  companiaClose(){
    this.companiaModel=new CompaniaModel();
    this.dialogCompania=false;
  }
  dialogCompaniaClose(){
    this.dialogCompania=false;
    this.btnactivarcompania=false;
  }
  activar_GrupoArea(){
    setTimeout(() => {
      this.btnactivarGrupoArea=true;
      this.btnactivarMoneda=false;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=false;
      this.btnactivarImpuesto=false;
    }, 120)
  }
  activar_Periodo(){
    setTimeout(() => {
      this.btnactivarPeriodo=true;
      this.btnactivarMoneda=false;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=false;
      this.btnactivarImpuesto=false;
    }, 120)
  }
  desactivar_GrupoArea(){
    debugger;
    if(this.dialogGrupoArea){
      this.btnactivarGrupoArea=false;      
    }
  }
  desactivar_Periodo(){
    debugger;
    if(this.dialogPeriodo){
      this.btnactivarPeriodo=false;      
    }
  }
  loadGrupoArea()
  {
    this.dialogGrupoArea=true;
  }
  closeDialogGrupoArea(){
    this.dialogGrupoArea=false;
  }
  grupoareaseleccionado(val,dialog:boolean){
    this.centrocosto.strCCGrpArea_Cod=val.strCCGrpArea_Cod;
    this.centrocosto.intIdCCGrpArea_ID=val.intIdCCGrpArea_ID;
    this.dialogGrupoArea=false;  
  }
  activar_CuentaContableHaber(){
    setTimeout(() => {
      this.btnactivarCuentaContableHaber=true;
      this.btnactivarMoneda=false;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=false;
      this.btnactivarImpuesto=false;
    }, 120)
  }
  desactivar_CuentaContableHaber (){
    debugger;
    if(this.dialogCuentaContableHaber){
      this.btnactivarCuentaContableHaber=false;      
    }
  }
  loadCuentaContable()
  {
    this.dialogCuentaContable=true;
  }
  closeDialogCuentaContableHaber(){
    this.dialogCuentaContableHaber=false;
  }
  cuentacontableselecionadohaber(val,dialog:boolean){
    debugger;
    this.selectrow.strAcc_Local_NO=val.strAcc_Local_NO;
    this.dialogCuentaContable=false;  
  }

  activar_CuentaContableDebe(){
    setTimeout(() => {
      this.btnactivarCuentaContableDebe=true;
      this.btnactivarMoneda=false;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=false;
      this.btnactivarImpuesto=false;
    }, 120)
  }
  desactivar_CuentaContableDebe (){
    debugger;
    if(this.dialogCuentaContableDebe){
      this.btnactivarCuentaContableDebe=false;      
    }
  }
  loadCuentaContableDebe()
  {
    this.dialogCuentaContableDebe=true;
  }
  closeDialogCuentaContableDebe(){
    this.dialogCuentaContableDebe=false;
  }
  cuentacontableselecionadodebe(val,dialog:boolean){
    this.centrocosto.strCodAcctDest_Debit=val.strAcc_Local_NO;
    this.dialogCuentaContableDebe=false;  
  }

  activar_CategoriaCentroCosto(){
    setTimeout(() => {
      this.btnactivarCategoriaCentroCosto=true;
      this.btnactivarMoneda=false;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=false;
      this.btnactivarImpuesto=false;
    }, 120)
  }
  desactivar_CategoriaCentroCosto(){
    debugger;
    if(this.dialogCategoriaCentroCosto){
      this.btnactivarCategoriaCentroCosto=false;      
    }
  }
  loadCategoriaCentroCosto()
  {
    this.dialogCategoriaCentroCosto=true;
  }
  closeDialogCategoriaCentroCosto(){
    this.dialogCategoriaCentroCosto=false;
  }
  categoriacentrocostoseleccionado(val,dialog:boolean){
    this.selectrow.strCenCosWBS_Cod=val.strCCCategory_Cod;
    //this.selectrow.intIdCCCategory_ID=val.intCCCategory_ID;
    this.dialogCategoriaCentroCosto=false;  
  }

  
  activar_CentroCosto(){
    setTimeout(() => {
      this.btnactivarCentroCosto=true;
      this.btnactivarMoneda=false;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=false;
      this.btnactivarImpuesto=false;
    }, 120)
  }
  desactivar_CentroCosto(){
    debugger;
    if(this.dialogCentroCosto){
      this.btnactivarCentroCosto=false;      
    }
  }
  loadCentroCosto()
  {
    this.dialogCentroCosto=true;
  }
  
  clickcentrocosto(event,edit,column){
    debugger;
    this.bln_tbl_centro_costo=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  closeDialogCentroCosto(){
    this.dialogCentroCosto=false;
  }
  centrocostoseleccionado(val,dialog:boolean){
    this.selectrow.strCenCosWBS_Cod=val.strCostCenter_NO;
    this.dialogCentroCosto=false;  
  }

  activar_GrupoProceso(){
    setTimeout(() => {
      this.btnactivarGrupoProceso=true;
      this.btnactivarMoneda=false;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=false;
      this.btnactivarImpuesto=false;
    }, 120)
  }
  desactivar_GrupoProceso(){
    debugger;
    if(this.dialogGrupoProceso){
      this.btnactivarGrupoProceso=false;      
    }
  }
  loadGrupoProceso()
  {
    this.dialogGrupoProceso=true;
  }
  closeDialogGrupoProceso(){
    this.dialogGrupoProceso=false;
  }
  grupoprocesoseleccionado(val,dialog:boolean){
    this.centrocosto.strCCGrpProc_Cod=val.strCCGrpProc_Cod;
    this.centrocosto.intIdProccGrp_ID=val.intIdProccGrp_ID;
    this.dialogGrupoProceso=false;  
  }

  activar_documentoTransacional(){
    setTimeout(() => {
      this.btndocumentotransaccion=true;
      this.btnactivarMoneda=false;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=false;
      this.btnactivarImpuesto=false;
    }, 120)
  }
  desactivar_documentoTransacional(){
    debugger;
    if(this.dialogDocumentoTransaccion){
      this.btndocumentotransaccion=false;      
    }
    if(this.factura.strCompany_Cod===undefined){
      // alert('aaaaa');
    }
  }
  documentotransaccionselecionado(val){
    this.Doc_Trans_Cod=val.strDoc_Trans_Cod;
    this.Doc_Trans_Cod_Desc=val.strDoc_Trans_Desc;
    this.dialogDocumentoTransaccion=false;  
  }

  activar_compania(){
    setTimeout(() => {
      this.btnactivarcompania=true;
      this.btnactivarMoneda=false;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=false;
      this.btnactivarImpuesto=false;
    }, 120)
  }
  desactivar_compania(){
    debugger;
    if(this.dialogCompania){
      this.btnactivarcompania=false;      
    }
    if(this.factura.strCompany_Cod===undefined){
      // alert('aaaaa');
    }
  }
  closeCompania(){
    this.btnactivarcompania=false;
    this.dialogCompania=false;
    return false;
  }
  //#endregion
  //#region [ORDEN COMPRA]
  loadOrdenCompra(){
    ordencompraService.GetAllOrdenCompra()
    .then(respose=>{
      this.ordencompra=respose;
      this.dialogOrdenCompra=true;      
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'no se pudo cargar orden compra'
      });
      this.dialogOrdenCompra=false;
    })
  }
  loadProveedor(){
    prooveedorService.getProveedorID(this.ordencompraSelect.strVendor_NO)
    .then(response=>{
      this.proveedor=response;      
    })
  }
  loadOrdenCompraDetalle(val){
    ordencompraService.GetAllOrdenDetalle(val)
    .then(respose=>{
      this.factura.listaDetalle=[];
      this.ordencompraDetalle=respose;    
      for(var i=0;i<this.ordencompraDetalle.length;i++){
        this.factura.listaDetalle.push({
          intAPDocD_ID:0,
          intAPDocH_ID:0,
          strCompany_Cod:this.companiaModel.strCompany_Cod,
          strPO_NO:this.factura.strPO_NO,
          strPO_Item_NO:this.ordencompraDetalle[i].intPO_Item_NO,
          strUM:this.ordencompraDetalle[i].strPO_Item_Desc,
          intQuantity:this.ordencompraDetalle[i].fltPO_QTY_I,
          intUnit_Price:this.ordencompraDetalle[i].fltPO_Net_PR_I,
          strDesc_Item:this.ordencompraDetalle[i].strUnit_Of_Purch,
          strAccount_Cod:this.ordencompraDetalle[i].strAccount_Cod,
          strCostCenter_NO:'',
          strValue_Doc:this.ordencompraDetalle[i].fltCurr_Net_PR_P,
          strValue_Local:this.ordencompraDetalle[i].fltCurr_Net_PR_P,
          strValue_Corp:this.ordencompraDetalle[i].fltCurr_Net_PR_P,
          strTax_Porcent:this.tipocambio.fltExchRate_Buy,
          strWH_Detrac_Cod:this.proveedor.strDetraccion_Cod,
          strValue_WH_Detrac:this.proveedor.fltDetraccion_Porcen,
          strWH_Reten_Cod:this.proveedor.strRetention_Cod,
          strValue_WH_Retention:this.proveedor.fltRetention_Porcen,
          strCreation_User:'egaona',//localStorage.getItem('User_Usuario'),
          dtmCreation_Date:new Date(),
          strModified_User:'egaona',//localStorage.getItem('User_Usuario'),
          dtmModified_Date:new Date(),
          chrStatus:'A'

        });
        var a=this.ordencompraDetalle[i].fltPO_QTY_I;
        var c=this.ordencompraDetalle[i].fltCurr_Net_PR_P;
        var b=a;
        var d=c;
        this.totalUnidad=this.totalUnidad+b;
        this.totalDinero=this.totalDinero+d;
      }
    this.factura.intQuantity_Doc=this.totalUnidad;
    this.factura.intValue_Doc=this.totalDinero;
    this.salidaUnidad=this.factura.intQuantity_Doc+' Unid.';
    this.salidaDinero='S/. '+this.factura.intValue_Doc+'.00';

    this.totalDolars='$. '+(this.totalDinero/this.tipocambio.fltExchRate_Buy).toFixed(2);
    this.factura.strValue_Local=this.factura.intValue_Doc.toString();
    this.factura.strValue_Corp=(this.totalDinero/this.tipocambio.fltExchRate_Buy).toFixed(2);
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'no se pudo cargar orden compra detalle '+error
      });
    })
  }
  closeOrdenCompra(){
    this.btnactivarOrdenCompra=false;
    this.dialogOrdenCompra=false;
    this.ordencompraSelect=new OrdenCompraModel();
    return false;
  }
  activar_OrdenCompra(){
    setTimeout(() => {
      this.btnactivarcompania=false;
      this.btnactivarMoneda=false;
      this.btnactivarOrdenCompra=true;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=false;
      this.btnactivarImpuesto=false;
    }, 120)
  }
  desactivar_OrdenCompra(){
    if(this.dialogOrdenCompra){
      this.btnactivarOrdenCompra=false;
    }
  }
  selectOrdenCompra(val:OrdenCompraModel){
    this.ordencompraSelect=val;
  }
  checkOrdenCompra(){    
    this.factura.strPO_NO=this.ordencompraSelect.strPO_NO;
    // this.factura.strVendor_NO=this.ordencompraSelect.strVendor_NO;
    this.factura.strVendor_NO=this.ordencompraSelect.strVendor_NO;
    this.factura.strDesc_Doc=this.ordencompraSelect.strPO_Desc;
    this.dialogOrdenCompra=false;
    this.loadProveedor();
    this.loadOrdenCompraDetalle(this.ordencompraSelect.intIdPOH_ID);
  }
  //#endregion
 
  //#region [TIPO DOCUMENTO]
  loadTipoDocumento(){
    this.dialogTipoDocumento=true;
  }
  closeTipoDocumento(){
    this.dialogTipoDocumento=false;
    this.btnactivarTipoDocumento=false;
  }
  activar_TipoDocumento(){
    setTimeout(() => {
      this.btnactivarcompania=false;
      this.btnactivarMoneda=false;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=true;
      this.btnactivarDiario=false;
      this.btnactivarImpuesto=false;
    }, 120)
  }
  desactivar_TipoDocumento(){
    if(this.dialogTipoDocumento){
      this.btnactivarTipoDocumento=false;
    }
  }
  tipoSeleccionado(val:TipoDocIdentidadModel){
    this.selectTipoDoc=val
    this.factura.strType_Doc=this.selectTipoDoc.strDocIdent_NO;
    this.dialogTipoDocumento=false;
  }

  closeTipo(){
    this.selectTipoDoc=new TipoDocIdentidadModel();
    this.factura.strType_Doc=this.selectTipoDoc.strDocIdent_NO;
    this.dialogTipoDocumento=false;
  }
  //#endregion
  //#region [DOCUMENTO]
  //#endregion
  //#region [MONEDA]
  loadMoneda(){
    this.dialogMoneda=true;
  }
  
  closeDialogMoneda(){
    this.btnactivarMoneda=false;
    this.dialogMoneda=false;
  }
  activar_Moneda(){
    setTimeout(() => {
      this.btnactivarcompania=false;
      this.btnactivarMoneda=true;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=false;
      this.btnactivarImpuesto=false;
    }, 120)
  }
  desactivar_Moneda(){
    if(this.dialogMoneda){
      this.btnactivarMoneda=false;
    }
  }
  
  checkSelectMoneda(val){
    this.moneda.strCurrency_Cod=val.codigo
  }
  MonedaSeleccionado(val:MonedaModel){
    this.moneda=val
    this.Currency_Cod=this.moneda.strCurrency_Cod;
    this.Currency_Cod_Desc=this.moneda.strCurrency_Desc;
    this.dialogMoneda=false;
  }

  closeMoneda(){
    this.moneda=new MonedaModel();
    this.factura.strPaid_Bank=this.moneda.strCurrency_Cod;
    this.dialogMoneda=false;
  }
  //#endregion
  //#region [Diario]
  loadDiario(){
    diarioService.GetAllDiarios()
    .then(response=>{
      this.diarioModel=response;
      this.dialogDiario=true;
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'no se pudo cargar diarios'
      });
      this.dialogDiario=false;
    })
  }
  desactivar_Diario(){
    if(this.dialogDiario){
      this.btnactivarDiario=false;
    }
  }
  activar_Diario(){
    setTimeout(() => {
      this.btnactivarcompania=false;
      this.btnactivarMoneda=false;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=true;
      this.btnactivarImpuesto=false;
    }, 120)
  }
  checkSelectdbDiario(val:DiarioModel){
    this.strDaily_Cod=val.strDaily_Cod;
    this.strDaily_Cod_Desc=val.strDaily_Desc;
    this.dialogDiario=false;
  }
  handleCurrentChange(val) {
    debugger;
    if(val!=undefined){
      this.selectrow=val;
    }
  }
  handleCurrentChangePeriod(val){
    debugger;
    if(val!=undefined){
      this.selectrowPeriodo=val;
    }
  }
  checkSelectDiario(val:DiarioModel){
    this.diarioSelect=val;
  }
  clickcategoriacuenta (event,edit,column){
      debugger;
      this.bln_tbl_categoria_cuenta=true;
      event.edit=!edit;
      this.editing.row=event;
      this.editing.column=column;
  }
  clickcuentacontable(event,edit,column){
    debugger;
    this.bln_tbl_cuenta_contable=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  closeDiario(){
    this.diarioSelect=new DiarioModel();
    this.dialogDiario=false;
  }
  closeDialogDiario(){
    this.dialogDiario=false;
  }
  //#endregion
  //#region [IMPUESTO]
  loadImpuesto(){
    this.dialogImpuesto=true;
  }
  
  closeDialogImpuesto(){
    this.btnactivarImpuesto=false;
    this.dialogImpuesto=false;
  }
  activar_Impuesto(){
    setTimeout(() => {
      this.btnactivarcompania=false;
      this.btnactivarMoneda=false;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=false;
      this.btnactivarImpuesto=true;
    }, 120)
  }
  desactivar_Impuesto(){
    if(this.dialogImpuesto){
      this.btnactivarImpuesto=false;
    }
  }  
  ImpuestoSeleccionado(val:ImpuestoModel){
    this.Impuesto=val
    this.factura.strTax_Cod=this.Impuesto.strWH_Cod;
    this.factura.fltValue_Tax=this.Impuesto.fltPorcent;
    this.dialogImpuesto=false;
    this.factura.intNetValue_Doc=this.totalDinero+ this.totalDinero*(this.Impuesto.fltPorcent/100);
    this.TotalPagarS='S/. '+(this.totalDinero+ this.totalDinero*(this.Impuesto.fltPorcent/100)).toFixed(2);
    this.TotalPagarD='$. '+((this.totalDinero+ this.totalDinero*(this.Impuesto.fltPorcent/100))/this.tipocambio.fltExchRate_Buy).toFixed(2);
  }
  closeImpuesto(){
    this.Impuesto=new ImpuestoModel();
    this.factura.strTax_Cod=this.Impuesto.strWH_Cod;
    this.dialogImpuesto=false;
  }
  //#endregion
  //#region [Factura] 
  created(){
    
  }
  saveFactura(){
    if(this.factura.strPO_NO===undefined){
      this.$message({
        showClose: true,
        type: 'warning',
        message: 'debe seleccionar una orden de compra'
      });
    }
    else
    {
      var today = new Date();
      var dateWithoutTime = new Date(today.getFullYear() , today.getMonth(), today.getDate());
      this.factura.strPeriod_NO=this.fecha_actual;
      this.factura.strExchange_Rate=this.tipocambio.fltExchRate_Buy.toString();
      this.factura.dtmDoc_Date=dateWithoutTime;
      var name:any=localStorage.getItem('User_Usuario');
      this.factura.strDoc_Status=name;
      this.factura.strCreation_User=this.factura.strDoc_Status;    
      let loadingInstance = Loading.service({
        fullscreen: true,
        text: 'Guardando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
        );     
        facturaService.CreateFactura(this.factura)
        .then(response=>{
          this.voucher=response;
          this.habilitarPane=false;
          loadingInstance.close();
          this.openMessageSuccess('Se guardo correctamente '+response);
          this.factura=new FacturaModel();
    
        })
        .catch(e =>{
          debugger;
          console.log(e);
          
          this.openMessageError('Error guardar factura ');
          loadingInstance.close();
        })   
    }
  }
  guardarTodo(){
    var dateString = new Date();
    var dia = dateString.getDate();
    var mes = (dateString.getMonth()<12) ? dateString.getMonth()+1 : mes = dateString.getMonth();
    var yyyy = dateString.getFullYear();
    var dd = (dia<10) ? '0'+dia : dd=dia;
    var mm = (mes<10) ? '0'+mes : mm=mes;
    var anio=new Date().getFullYear();
    let loadingInstance = Loading.service({
      fullscreen: true,
      text: 'Guardando...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
      );  
    correlativoService.GetCorrelativoId('PFI006').then(resp=>{
    for(var i=0;i<this.totalRegistros;i++){
      debugger;
      if(this.CompleteData[i].strAcctCateg_Cod!=undefined && this.CompleteData[i].strAcctCateg_Cod!=''){
        var nuevo:DiarioGeneralModel=new DiarioGeneralModel();
        nuevo.strCompany_Cod=this.strCompany_Cod;
        nuevo.strCompany_Desc=this.strCompany_Desc;
        nuevo.strDaily_Cod=this.strDaily_Cod;
        nuevo.strDaily_Desc=this.strDaily_Cod_Desc;
        nuevo.strDoc_Trans_Cod=this.Doc_Trans_Cod;
        nuevo.strPeriod_NO=this.Period.getFullYear().toString()+this.Period.getMonth().toString();
        nuevo.strdtmPeriod=this.Period.getMonth().toString()+this.Period.getFullYear().toString();
        nuevo.dtmDoc_Date=this.Doc_Date;
        nuevo.strCurrency_Cod=this.Currency_Cod;
        nuevo.strOrigenDocum_NO=this.OrigenDocum_NO;
        nuevo.strHeader_Desc=this.Desc_Header;
        nuevo.blnAutoreverse=this.Autoreverse;
        nuevo.strAcctCateg_Cod=this.CompleteData[i].strAcctCateg_Cod;
        nuevo.strCenCosWBS_Cod=this.CompleteData[i].strCenCosWBS_Cod;
        nuevo.strAcc_Local_NO=this.CompleteData[i].strAcc_Local_NO;
        nuevo.strDetail_Desc=this.CompleteData[i].strDetail_Desc;
        if(this.CompleteData[i].fltQuantityDebe>0){
          nuevo.fltAmount_Local=this.CompleteData[i].fltQuantityDebe;
        }else{
          if(this.CompleteData[i].fltQuantityHaber>0){
            nuevo.fltAmount_Local=this.CompleteData[i].fltQuantityHaber*-1;
          }
          else{
            nuevo.fltAmount_Local=0;
          }
        }
      
          debugger;
          if(resp!=undefined){
            nuevo.strAccDocum_NO=resp.fltOrigenDocum_NO;
            diariogeneralService.createDiarioGeneral(nuevo) .then(response=>{
              this.voucher=response;
              this.habilitarPane=false;
              loadingInstance.close();
              this.openMessageSuccess('Se guardo correctamente '+response.strAccDocum_NO);
             
              this.strDaily_Cod='';
              this.strDaily_Cod_Desc='';
              this.Currency_Cod='';
              this.OrigenDocum_NO='';
              this.Desc_Header='';
              this.Autoreverse=false;
              this.CompleteData=[];
              for(var i=0;i<this.totalRegistros;i++){
                var diario:DiarioGeneralModel=new DiarioGeneralModel();
                this.CompleteData.push(diario);
              }
            })
            .catch(e =>{
              debugger;
              console.log(e);
              
              this.openMessageError('Error guardar contabilidad ');
              loadingInstance.close();
            })  
          }
        }
      }
    })
    .catch(e =>{
      debugger;
      console.log(e);
      
      this.openMessageError('Error guardar correlativo ');
      loadingInstance.close();
    })  
  }
  cambiarCantidadHaber(val){
    this.selectrow.fltQuantityDebe=0;
  }
  cambiarCantidadDebe(val){
    this.selectrow.fltQuantityHaber=0;
  }
  openMessageSuccess(strMessage:string){
    this.$message({
        showClose: true,
        type: 'success',
        message: strMessage
      });
  }
  openMessageError(strMessage:string){
    this.$message({
        showClose: true,
        type: 'error',
        message: strMessage
      });
  }
  //#endregion
  data(){
    return{
      nameComponent:'crear-ingreso-comprobante',
      fechavencida:'',
      dialogTableVisible: false,
      periodoData:'',
      selectData:'',
      selectType:'',
      dataProveedor:[],
      tabletipo:[{
        strType_Cod:"T",
        strType_Desc:"Titulo"
      },
      {
        strType_Cod:"D",
        strType_Desc:"Detalle"
      }],
      Doc_Trans_Cod:'',
      ordencompraDetalle:[],
      codigoCompania:'001',
      totalDinero:0,
      totalUnidad:0,
      salidaUnidad:'',
      salidaDinero:'',
      totalDolars:'',
      TotalPagarS:'',
      TotalPagarD:'',
      voucher:'',
      habilitar:false,
      habilitarPane:true,
      strDaily_Cod:'',
      strPeriodo:'',
      Doc_Trans_Cod_Desc:'',
      Currency_Cod:'',
      Currency_Cod_Desc:'',
      OrigenDocum_NO:'',
      Desc_Header:'',
      strDaily_Cod_Desc:'',
     
    }
  }
  
}
