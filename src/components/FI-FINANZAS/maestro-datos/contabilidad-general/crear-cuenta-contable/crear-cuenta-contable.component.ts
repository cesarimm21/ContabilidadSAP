import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import BCompaniaProveedor from '@/components/buscadores/b_compania/b_compania.vue';
import BProveedorComponent from '@/components/buscadores/b_proveedor/b_proveedor.vue';
import BDocumentoComponent from '@/components/buscadores/b_tipoDocumento/b_tipoDocumento.vue';
import BMonedaComponent from '@/components/buscadores/b_moneda/b_moneda.vue';
import BImpuestoComponent from '@/components/buscadores/b_impuesto/b_impuesto.vue';
import BGrupoCuentaContableComponent from '@/components/buscadores/b_grupo_cuentacontable/b_grupo_cuentacontable.vue';
import BGrupoGastosComponent from '@/components/buscadores/b_grupo_gastos/b_grupo_gastos.vue';
import BRubroComponent from '@/components/buscadores/b_rubro/b_rubro.vue';
import BPlanContableLocalComponent from '@/components/buscadores/b_plan_contable_local/b_plan_contable_local.vue';

import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';

///**Servicios */
import ordencompraService from '@/components/service/ordencompra.service';
import diarioService from '@/components/service/diario.service'; 
import tipocambioService from '@/components/service/tipocambio.service';
import facturaService from '@/components/service/factura.service';
import prooveedorService from '@/components/service/proveedor.service';
//***Modelos */
import {TipoDocIdentidadModel} from '@/modelo/maestro/tipodocidentidad';
import {AlmacenModel} from '@/modelo/maestro/almacen';
import {CompaniaModel} from '@/modelo/maestro/compania';
import {OrdenCompraModel} from '@/modelo/maestro/ordencompra';
import {CuentaContableModel} from '@/modelo/maestro/cuentacontable';
import {OrdenCompraDetalleModel} from '@/modelo/maestro/ordencompradetalle';
import {CategoriaLineaModel} from '@/modelo/maestro/categorialinea';
import {CategoriaCuentaModel} from '@/modelo/maestro/categoriacuenta';
import {PrioridadModel} from '@/modelo/maestro/prioridad';
import {MonedaModel} from '@/modelo/maestro/moneda';
import {ProveedorModel} from '@/modelo/maestro/proveedor';
import {FacturaModel} from '@/modelo/maestro/factura';
import {FacturaDetalleModel} from '@/modelo/maestro/facturadetalle';
import {DiarioModel} from '@/modelo/maestro/diario';
import {TipoCambioModel} from '@/modelo/maestro/tipocambio';
import {ImpuestoModel} from '@/modelo/maestro/impuesto';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';

import { Notification } from 'element-ui';
import cuentaContableService from '@/components/service/cuentaContable.service';
@Component({
  name: 'crear-ingreso-comprobante',
  components:{
  'buttons-accions':ButtonsAccionsComponent,
  'bproveedor':BProveedorComponent,
  'bcompania':BCompaniaProveedor,
  'bdocumento':BDocumentoComponent,
  'bmoneda':BMonedaComponent,
  'bimpuesto':BImpuestoComponent,
  'quickaccessmenu':QuickAccessMenuComponent,
  'bgrupocuentacontable':BGrupoCuentaContableComponent,
  'bgrupogastos':BGrupoGastosComponent,
  'brubro':BRubroComponent,
  'bplancontablelocal':BPlanContableLocalComponent,
  }
})
export default class CrearCuentaContableComponent extends Vue {
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
  //**Compania */
  btnactivarcompania:boolean=false;
  dialogCompania:boolean=false;
  dataCompania:any[];
  public companiaModel:CompaniaModel=new CompaniaModel();
  //**Orden compra */
  dialogOrdenCompra:boolean=false;
  btnactivarOrdenCompra:boolean=false;
  dataOrdenCompra:any[];
  selectData:string;
  // public ordencompraDetalle:Array<OrdenCompraDetalleModel>[];
  public ordencompraDetalle:OrdenCompraDetalleModel[];
  public ordencompra:OrdenCompraModel=new OrdenCompraModel();
  public ordencompraSelect:OrdenCompraModel=new OrdenCompraModel();
  //**Proveedor */
  public proveedor:ProveedorModel=new ProveedorModel();
  //**Tipo Documento */
  dialogTipoDocumento:boolean=false;
  btnactivarTipoDocumento:boolean=false;
  public selectTipoDoc:TipoDocIdentidadModel=new TipoDocIdentidadModel();

  //**Documento */

  //**Moneda */
  dialogMoneda:boolean=false;
  dialogGrupoCuentaContable:boolean=false;
  dialogRubro:boolean=false;
  dialogGrupoGastos:boolean=false;
  btnactivarMoneda:boolean=false;
  btnactivarGrupo:boolean=false;
  btnactivarRubro:boolean=false;
  btnactivarGrupoGastos:boolean=false;
  dataMoneda:any[];
  public moneda:MonedaModel=new MonedaModel();
  //**Factura */
  public cuentacontable:CuentaContableModel=new CuentaContableModel();

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

  dialogplancontablelocal:boolean=false;
  dialogplancontablecorporativo:boolean=false;
  btnactivarPlanCuentaLocal:boolean=false;
  btnactivarPlanCuentaCorporativo:boolean=false;

  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';

  constructor(){    
    super();
    Global.nameComponent='crear-ingreso-comprobante';
    this.fecha_actual=Global.getDate(new Date().toDateString());   
    this.fecha_ejecucion=Global.getParseDate(new Date().toDateString());  
    this.loadTipocambio();
  }
  loadTipocambio(){
    tipocambioService.GetAllTipoCambio()
    .then(response=>{
      this.tipocambio=response;  
    }).catch(error=>{})
  }

  //#region [COMPANIA]
  loadCompania(){
    this.dialogCompania=true;
  }
  grupocuentacontableselecionado(val,dialog:boolean){
    this.cuentacontable.strGrpAcctCont_Cod=val.strGrpAcctCont_Cod;
    this.cuentacontable.intIdGrpCta_ID=val.intIdGrpCta_ID;
    this.dialogGrupoCuentaContable=false;    
  }
  rubroselecionado(val,dialog:boolean){
    this.cuentacontable.strAcctItem_Cod=val.strAcctItem_Cod;
    this.cuentacontable.intIdAcctItem_ID=val.intIdAcctItem_ID;
    this.dialogRubro=false;    
  }
  grupogastosselecionado(val,dialog:boolean){
    this.cuentacontable.strExpGroup_Cod=val.strExpGroup_Cod;
    this.cuentacontable.intIdExpGroup_ID=val.intIdExpGroup_ID;
    this.dialogGrupoGastos=false;    
  }
  companiaSeleccionado(val:CompaniaModel,dialog:boolean){
    this.companiaModel=val;
    this.cuentacontable.intIdCompany_ID=this.companiaModel.intIdCompany_ID;
    this.cuentacontable.strCompany_Cod=this.companiaModel.strCompany_Cod;
    this.cuentacontable.strCompany_Name=this.companiaModel.strCompany_Name;
    this.dialogCompania=false;    
  }
  plancuentacontableselecionado(val,dialog:boolean){
    debugger;
    this.cuentacontable.strChartAcct_L_Cod=val.strChartAcct_L_Cod;
    this.dialogplancontablelocal=false;    
  }
  plancuentacontablecorpselecionado(val,dialog:boolean){
    debugger;
    this.cuentacontable.strChartAcct_C_Cod=val.strChartAcct_L_Cod;
    this.dialogplancontablecorporativo=false;    
  }
  dialogplancontablelocalClose(){

  }
  dialogplancontablecorporativoClose(){

  }
  desactivar_PlanCuentaLocal(){
    debugger;
    if(this.dialogCompania){
      this.btnactivarcompania=false;      
    }
  }
  desactivar_PlanCuentaCorporativo(){
    debugger;
    if(this.dialogCompania){
      this.btnactivarcompania=false;      
    }
  }
  activar_PlanCuentaLocal(){
    setTimeout(() => {
      this.btnactivarPlanCuentaLocal=true;
      this.btnactivarMoneda=false;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=false;
      this.btnactivarImpuesto=false;
    }, 120)
    //this.dialogplancontablelocal=true;
  }
  activar_PlanCuentaCorporativo(){
    setTimeout(() => {
      this.btnactivarPlanCuentaCorporativo=true;
      this.btnactivarMoneda=false;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=false;
      this.btnactivarImpuesto=false;
    }, 120)
    //this.dialogplancontablelocal=true;
  }
  loadPlanCuentaLocal(){
    this.dialogplancontablelocal=true;
  }
  loadPlanCuentaCorporativo()
  {
    this.dialogplancontablecorporativo=true;
  }
  companiaClose(){
    this.companiaModel=new CompaniaModel();
    this.dialogCompania=false;
  }
  dialogCompaniaClose(){
    this.dialogCompania=false;
    this.btnactivarcompania=false;
  }
  dialogGrupoCuentaContableClose(){
    this.dialogGrupoCuentaContable=false;
    this.btnactivarGrupo=false;
  }
  dialogRubroClose(){
    this.dialogRubro=false;
    this.btnactivarRubro=false;
  }
  dialogGrupoGastosClose(){
    this.dialogGrupoGastos=false;
    this.btnactivarGrupoGastos=false;
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
    // if(this.factura.strCompany_Cod===undefined){
    //   // alert('aaaaa');
    // }
  }
  closeCompania(){
    this.btnactivarcompania=false;
    this.dialogCompania=false;
    return false;
  }
  //#endregion
  
  //#region [MONEDA]
  loadMoneda(){
    this.dialogMoneda=true;
  }
  loadGrupo(){
    this.dialogGrupoCuentaContable=true;
  }
  loadRubro(){
    this.dialogRubro=true;
  }
  loadGrupoGastos(){
    this.dialogGrupoGastos=true;
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
  
  activar_Rubro(){
    setTimeout(() => {
      this.btnactivarcompania=false;
      this.btnactivarRubro=true;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=false;
      this.btnactivarImpuesto=false;
    }, 120)
  }
  activar_Grupo(){
    setTimeout(() => {
      this.btnactivarcompania=false;
      this.btnactivarGrupo=true;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=false;
      this.btnactivarImpuesto=false;
    }, 120)
  }
  activar_GrupoGastos(){
    setTimeout(() => {
      this.btnactivarcompania=false;
      this.btnactivarGrupoGastos=true;
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
  desactivar_Grupo(){
    if(this.dialogGrupoCuentaContable){
        this.btnactivarGrupo=false;
    } 
  }
  guardarTodo(){
    cuentaContableService.CreateCuentaContable(this.cuentacontable)
    .then(response=>{
      
      this.issave=true;
      this.textosave='Se guardo correctamente.'
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo guardar producto'
      });
    })
  }
  
  desactivar_Rubro(){
    if(this.dialogRubro){
        this.btnactivarGrupo=false;
    } 
  }
  desactivar_GrupoGastos(){
    if(this.dialogGrupoGastos){
        this.btnactivarGrupoGastos=false;
    } 
  }
  
  checkSelectMoneda(val){
    this.moneda.strCurrency_Cod=val.codigo
  }
  MonedaSeleccionado(val:MonedaModel){
    this.moneda=val
    this.cuentacontable.strCurrency_Cod=this.moneda.strCurrency_Cod;
    this.dialogMoneda=false;
  }

  closeMoneda(){
    this.moneda=new MonedaModel();
    // this.factura.strPaid_Bank=this.moneda.strCurrency_Cod;
    this.dialogMoneda=false;
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
  ImpuestoSeleccionado(val){
    debugger;
    this.Impuesto=val
    this.cuentacontable.strWH_Cod=this.Impuesto.strWH_Cod;
    this.cuentacontable.intIdWH_ID=this.Impuesto.intIdWH_ID;
    
    this.dialogImpuesto=false;
    // this.factura.strTax_Cod=this.Impuesto.strWH_Cod;
    // this.factura.fltValue_Tax=this.Impuesto.fltPorcent;
    // this.dialogImpuesto=false;
    // this.factura.intNetValue_Doc=this.totalDinero+ this.totalDinero*(this.Impuesto.fltPorcent/100);
    // this.TotalPagarS='S/. '+(this.totalDinero+ this.totalDinero*(this.Impuesto.fltPorcent/100)).toFixed(2);
    // this.TotalPagarD='$. '+((this.totalDinero+ this.totalDinero*(this.Impuesto.fltPorcent/100))/this.tipocambio.fltExchRate_Buy).toFixed(2);
  }
  closeImpuesto(){
    this.Impuesto=new ImpuestoModel();
    // this.factura.strTax_Cod=this.Impuesto.strWH_Cod;
    this.dialogImpuesto=false;
  }
  //#endregion
  
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
  
  data(){
    return{
      nameComponent:'crear-ingreso-comprobante',
      fechavencida:'',
      dialogTableVisible: false,
      periodoData:'',
      selectData:'',
      selectType:'',
      dataProveedor:[],
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
      habilitarPane:true
     
    }
  }
  
}
