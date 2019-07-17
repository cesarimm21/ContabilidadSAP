import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import BCompaniaProveedor from '@/components/buscadores/b_compania/b_compania.vue';
import BTipoCuentaContableProveedor from '@/components/buscadores/b_tipo_cuenta_contable/b_tipo_cuenta_contable.vue';
import BProveedorComponent from '@/components/buscadores/b_proveedor/b_proveedor.vue';
import BDocumentoComponent from '@/components/buscadores/b_tipoDocumento/b_tipoDocumento.vue';
import BMonedaComponent from '@/components/buscadores/b_moneda/b_moneda.vue';
import BImpuestoComponent from '@/components/buscadores/b_impuesto/b_impuesto.vue';
import BGrupoCuentaContableComponent from '@/components/buscadores/b_grupo_cuentacontable/b_grupo_cuentacontable.vue';
import BCuentaContableComponent from '@/components/buscadores/b_cuenta_contable/b_cuenta_contable.vue';
import BGrupoGastosComponent from '@/components/buscadores/b_grupo_gastos/b_grupo_gastos.vue';
import BRubroComponent from '@/components/buscadores/b_rubro/b_rubro.vue';
import BCostItemComponent from '@/components/buscadores/b_costitem/b_costitem.vue';
import BPlanContableLocalComponent from '@/components/buscadores/b_plan_contable_local/b_plan_contable_local.vue';
import BTipoAdquisicionComponent from '@/components/buscadores/b_tipo_adquisicion/b_tipo_adquisicion.vue';

import {CuentaContableModel} from '@/modelo/maestro/cuentacontable';

// import cuentaContableService from '@/components/service/cuentaContable.service';
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
import cuentaContableService from '@/components/service/cuentacontable.service';
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
  'bcuentacontable':BCuentaContableComponent,
  'bgrupogastos':BGrupoGastosComponent,
  'brubro':BRubroComponent,
  'bplancontablelocal':BPlanContableLocalComponent,
  'btipocuentacontable':BTipoCuentaContableProveedor,
  'bcostitem':BCostItemComponent,
  'btipoadquisicion':BTipoAdquisicionComponent
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
  tabletipo:any=[{}];
  tabletipo1:any=[{}];
  tableAbierto:any=[{}];
  strlevel:string='';
  strlevelTipo:string='';
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
  dialogTipoAquisicion:boolean=false;
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
  dialogCuentaContablePadre:boolean=false;
  dialogCuentaContablePadreCorp:boolean=false;

  btnactivarMoneda:boolean=false;
  btnactivarTipoCuentaContable:boolean=false;
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
  btnactivarCostItem:boolean=false;

  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  ctaPadre:boolean=true;
  strAcc_Status_Open:string='';
  strAccFth_Local_Desc:string='';

  btnactivarCuentaContablePadre:boolean=false;
  dialogTipoCuentaContable:boolean=false;
  dialogCostItem:boolean=false;

  public cuentacontableModel:Array<CuentaContableModel>=[];
  public cuentacontableModel1:Array<CuentaContableModel>=[];

  public cuentacontableSelectModel:CuentaContableModel=new CuentaContableModel();
  btntipoadquisicion:boolean=false;
  blnfilterstrAcc_Local_NO:boolean=true;
  blnfilterstrAcc_Corp_NO:boolean=false;
  blnfilterstrAcc_Local_Name:boolean=false;
  clickColumn:string='';
  Column:string='';
  
  public search:CuentaContableModel=new CuentaContableModel();
  inputAtributo:any;

  constructor(){    
    super();
    Global.nameComponent='crear-ingreso-comprobante';
    this.fecha_actual=Global.getDate(new Date().toDateString());   
    this.fecha_ejecucion=Global.getParseDate(new Date().toDateString());  
    setTimeout(() => {
      this.loadTipocambio();
    }, 100)
  }
  loadTipocambio(){
    this.strlevel='10';
    this.strAcc_Status_Open='A';
    var desc:any=localStorage.getItem('compania_name');
    var cod:any=localStorage.getItem('compania_cod');
    var id:any=localStorage.getItem('compania_ID');
    this.cuentacontable.strCompany_Desc=desc; 
    this.cuentacontable.strCompany_Cod=cod;
    this.cuentacontable.intIdCompany_ID=id;

    tipocambioService.GetAllTipoCambio1()
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
    this.cuentacontable.strCompany_Desc=this.companiaModel.strCompany_Name;
    this.dialogCompania=false;    
  }
  cuentacontableselecionadoPadre(val){
    // this.cuentacontable.intIdCompany_ID=this.companiaModel.intIdCompany_ID;
    // this.cuentacontable.strCompany_Cod=this.companiaModel.strCompany_Cod;
    // this.cuentacontable.strCompany_Name=this.companiaModel.strCompany_Name;
    debugger;
    this.cuentacontable.strAccFth_Local=this.cuentacontableSelectModel.strAcc_Local_NO;
    this.strAccFth_Local_Desc=this.cuentacontableSelectModel.strAcc_Local_Name;
    this.dialogCuentaContablePadre=false; 
  }
  cuentacontableselecionadoPadreCorp(val){
    this.cuentacontable.strAccFth_Corp=val.strAcc_Local_NO;
    this.dialogCuentaContablePadreCorp=false; 
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
    this.dialogplancontablelocal=false;
  }
  dialogplancontablecorporativoClose(){

  }
  closeDialogTipoCuentaContable(){
    this.dialogTipoCuentaContable=false;
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
  activar_TipoCuentaContable(){
    setTimeout(() => {
      this.desactivarBtn();
      this.btnactivarTipoCuentaContable=true;
    }, 120)
  }
  desactivarBtn(){
    this.btnactivarcompania=false;
    this.btnactivarOrdenCompra=false;
    this.btnactivarTipoDocumento=false;
    this.btnactivarMoneda=false;
    this.btnactivarTipoCuentaContable=false;
    this.btnactivarGrupo=false;
    this.btnactivarRubro=false;
    this.btnactivarGrupoGastos=false;
    this.btnactivarDiario=false;
    this.btnactivarImpuesto=false;
    this.btnactivarPlanCuentaLocal=false;
    this.btnactivarPlanCuentaCorporativo=false;
    this.btnactivarCostItem=false;
    this.btnactivarCuentaContablePadre=false;
  }
  activar_PlanCuentaLocal(){
    setTimeout(() => {
      this.desactivarBtn();
      this.btnactivarPlanCuentaLocal=true;
    }, 120)
    //this.dialogplancontablelocal=true;
  }
  activar_CostItem(){
    setTimeout(() => {
      this.desactivarBtn();
      this.btnactivarCostItem=true;
    }, 120)
  }
  activar_PlanCuentaCorporativo(){
    setTimeout(() => {
      this.desactivarBtn();
      this.btnactivarPlanCuentaCorporativo=true;
    }, 120)
    //this.dialogplancontablelocal=true;
  }
  loadPlanCuentaLocal(){
    this.dialogplancontablelocal=true;
  }
  loadCostItem(){
    this.dialogCostItem=true;
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
      this.desactivarBtn();
      this.btnactivarcompania=true;
    }, 120)
  }
  desactivar_compania(){
    debugger;
    if(this.dialogCompania){
      this.btnactivarcompania=false;      
    }
  }
  desactivar_CostItem(){
    debugger;
    if(this.dialogCostItem){
      this.btnactivarCostItem=false;      
    }
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
  loadTipoCuentaContable(){
    this.dialogTipoCuentaContable=true;
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
  closeDialogCuentaContablePadre(){
    //this.btnactivarMoneda=false;
    this.dialogCuentaContablePadre=false;
  }
  
  closeDialogCuentaContablePadreCorp(){
    this.dialogCuentaContablePadreCorp=false;    
  }

  activar_Moneda(){
    setTimeout(() => {
      this.desactivarBtn();
      this.btnactivarMoneda=true;
    }, 120)
  }
  
  activar_Rubro(){
    setTimeout(() => {
      this.desactivarBtn();
      this.btnactivarRubro=true;
    }, 120)
  }
  activar_Grupo(){
    setTimeout(() => {
      this.desactivarBtn();
      this.btnactivarGrupo=true;
    }, 120)
  }
  activar_GrupoGastos(){
    setTimeout(() => {
      this.desactivarBtn();
      this.btnactivarGrupoGastos=true;
    }, 120)
  }
  desactivar_Moneda(){
    if(this.dialogMoneda){
      this.btnactivarMoneda=false;
    }
  }
  desactivar_TipoCuentaContable(){
    if(this.dialogTipoCuentaContable){
      this.btnactivarTipoCuentaContable=false;
    }
  }
  desactivar_Grupo(){
    if(this.dialogGrupoCuentaContable){
        this.btnactivarGrupo=false;
    } 
  }
  guardarTodo(){
    
    this.issave=false;
    this.textosave='';
    this.cuentacontable.strAcc_Categ_Cod=this.strlevel;
    this.cuentacontable.strAcc_Level=this.strlevelTipo;
    this.cuentacontable.blnAcc_Status_Open=this.strAcc_Status_Open=='A'?true:false;
    var user:any=localStorage.getItem('User_Usuario');
    let loading = Loading.service({
      fullscreen: true,
      text: 'Guardando...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
    );
    for(var i=0;i<this.tabletipo.length;i++){
      if(this.tabletipo[i].strType_Cod==this.strlevel){
        this.cuentacontable.strAcc_Categ_Desc=this.tabletipo[i].strType_Desc;
      }
    }
    this.cuentacontable.strCreation_User=user;
    cuentaContableService.GetCuentaContableID(this.cuentacontable.strAcc_Local_NO,this.cuentacontable.strCompany_Cod)
    .then(response=>{
      debugger;
      if(response==""){
        cuentaContableService.CreateCuentaContable(this.cuentacontable)
        .then(response=>{
          loading.close(); 
          this.issave=true;
          this.iserror = false;
          this.textosave='Se guardo correctamente.'+this.cuentacontable.strAcc_Local_NO;
        }).catch(error=>{
          loading.close(); 
          this.issave = false;
          this.iserror = true;
          this.textosave='No se pudo guardar Cuenta Contable '+this.cuentacontable.strAcc_Local_NO;
     
          this.$message({
            showClose: true,
            type: 'error',
            message: 'No se pudo guardar Cuenta Contable'
          });
        })
      }
      else{
        loading.close(); 
        this.issave = false;
        this.iserror = true;
        this.textosave='No se pudo guardar Cuenta Contable '+this.cuentacontable.strAcc_Local_NO;
   
        this.$message({
          showClose: true,
          type: 'error',
          message: 'La cuenta ya existe'
        });
      }
    })
    .catch(error=>{
      this.issave = false;
      this.iserror = true;
      this.textosave='No se pudo guardar Cuenta Contable '+this.cuentacontable.strAcc_Local_NO;
 
      loading.close(); 
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo guardar cuenta contable'
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
      this.desactivarBtn();
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
  desactivar_CuentaContablePadre (){
    debugger;
    if(this.dialogCuentaContablePadre){
      this.btnactivarCuentaContablePadre=false;      
    } 
  }
  activar_CuentaContablePadre(){
    setTimeout(() => {
      this.desactivarBtn();
      this.btnactivarCuentaContablePadre=true;
    }, 120)
  }
  loadCuentaContablePadre()
  {
    debugger;
    var code=this.cuentacontable.strAcc_Local_NO.substr(0,2);
    cuentaContableService.GetAllCuentaContableLike(code)
    .then(response=>{
      debugger
      console.log('cuentacontable',response);
      this.cuentacontableModel=response;   
      this.cuentacontableModel1=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar'
      });
    })
    this.dialogCuentaContablePadre=true;
  }
  activarpadre(val){
    debugger;
    if(val.length>=2){
      this.ctaPadre=false;
    }
    else{
      this.ctaPadre=true;
    }
  }
  handleCurrentChangeCCPadre(val:CuentaContableModel){
    this.cuentacontableSelectModel=val;
  }
  tipocuentacontableSeleccionado(val){
    debugger;
    this.cuentacontable.strAcc_Type=val.strAcc_Type_Cod;
    this.dialogTipoCuentaContable=false;
  }
  costitemselecionado(val){
    this.cuentacontable.strCost_Item_Cod=val.strCost_Item_Cod;
    this.dialogCostItem=false;
  }
  closeDialogCostItem(){
    this.dialogCostItem=false;
  }
  tipoadquisicionSeleccionado(val){
    this.cuentacontable.strTypeAdq_PDB=val.intTypeAdq_PDB_Cod;
    this.dialogTipoAquisicion=false;
  }
  closeDialogTipoAdquisicion(){
    this.dialogTipoAquisicion=false;
  }

  activar_TipoAdquisicion(){
    setTimeout(() => {
      this.desactivarBtn();
      this.btntipoadquisicion=true;
    }, 120)
  }
  desactivar_TipoAdquisicion (){
    debugger;
    if(this.dialogTipoAquisicion){
      this.btntipoadquisicion=false;      
    } 
  }
  loadTipoAdquisicion(){
    this.dialogTipoAquisicion=true;
  }
  
  filterstrAcc_Local_NO(h,{column,$index}){
    debugger;
    var column1 = column.label; 
    if(this.blnfilterstrAcc_Local_NO){
      this.Column=column1;
      this.clickColumn=column.property;
      this.search=new CuentaContableModel();
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [  h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),
        h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label),
       ])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterstrAcc_Corp_NO(h,{column,$index}){
    debugger;
    var column1 = column.label; 
    if(this.blnfilterstrAcc_Corp_NO){
      this.Column=column1;
      this.clickColumn=column.property;
      this.search=new CuentaContableModel();
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [  h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),
        h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label),
       ])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterstrAcc_Local_Name(h,{column,$index}){
    debugger;
    var column1 = column.label; 
    if(this.blnfilterstrAcc_Local_Name){
      this.Column=column1;
      this.clickColumn=column.property;
      this.search=new CuentaContableModel();
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [  h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),
        h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label),
       ])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strAcc_Local_NO"){
      this.clickColumn=val.property;  
      this.search=new CuentaContableModel();  
      this.inputAtributo='';  
      this.blnfilterstrAcc_Local_NO=true;
      this.blnfilterstrAcc_Corp_NO=false;
      this.blnfilterstrAcc_Local_Name=false;
    }
    if(val.property=="strAcc_Corp_NO"){
      this.clickColumn=val.property;
      this.search=new CuentaContableModel();
      this.inputAtributo='';
      this.blnfilterstrAcc_Local_NO=false;
      this.blnfilterstrAcc_Corp_NO=true;
      this.blnfilterstrAcc_Local_Name=false;
    }
    if(val.property=="strAcc_Local_Name"){
      this.clickColumn=val.property;
      this.search=new CuentaContableModel();
      this.inputAtributo='';
      this.blnfilterstrAcc_Local_NO=false;
      this.blnfilterstrAcc_Corp_NO=false;
      this.blnfilterstrAcc_Local_Name=true;
    }
  }
  like(array, key,keyword) {
    
    var responsearr:any = []
    for(var i=0;i<array.length;i++) {
        if(array[i][key].toString().toLowerCase().indexOf(keyword) > -1 ) {
          responsearr.push(array[i])
      }
    }
    return responsearr
  }
  buscarfilterCuenta(){
    var input=this.inputAtributo.toLowerCase();
    var data=this.like(this.cuentacontableModel1,this.clickColumn,input)
    this.cuentacontableModel=[];
    this.cuentacontableModel=data;
  }
  data(){
    return{
      cuentacontableModel1:[],
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
      habilitarPane:true,
     
      tabletipo:[{
        strType_Cod:"10",
        strType_Desc:"Cuenta Balance"
      },
      {
        strType_Cod:"20",
        strType_Desc:"Elemento Gasto"
      }],
      tabletipo1:[{
        strType_Cod:"T",
        strType_Desc:"Titulo"
      },
      {
        strType_Cod:"D",
        strType_Desc:"Detalle"
      }],
      tableAbierto:[{
        strType_Cod:"A",
        strType_Desc:"Abierto"
      },
      {
        strType_Cod:"C",
        strType_Desc:"Cerrado"
      }],
    }
  }
  
}
