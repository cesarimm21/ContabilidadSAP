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
import BCategoriaCentroCostoComponent from '@/components/buscadores/b_categoria_centrocosto/b_categoria_centrocosto.vue';
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
import {ClaseMaterialModel} from '@/modelo/maestro/clasematerial';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';

import tipoRequisicionService from '@/components/service/tipoRequisicion.service';
import {TipoRequisicionModel} from '@/modelo/maestro/tipoRequisicion';
import { Notification } from 'element-ui';
import clasematerialService from '@/components/service/clasematerial.service';
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
  'bgrupoproceso':BGrupoProcesoComponent,
  'bgrupoarea':BGrupoAreaComponent,
  'bcategoriacentrocosto':BCategoriaCentroCostoComponent,
  'bcuentacontable':BCuentaContableComponent,
  'bcentrocosto':BCentroCostoComponent
  }
})
export default class ModificarClaseMaterialComponent extends Vue {
  public tabletipoRequisicion:Array<TipoRequisicionModel>=[]; 
  
  tiporequisicion:string='';
  tiporequisicionant:string='';
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
  public clasematerial:ClaseMaterialModel=new ClaseMaterialModel();
  //**Compania */
  btnactivarcompania:boolean=false;
  dialogCompania:boolean=false;
  dataCompania:any[];
  public companiaModel:CompaniaModel=new CompaniaModel();

  dialogGrupoProceso:boolean=false;
  btnactivarGrupoProceso:boolean=false;
  dialogGrupoArea:boolean=false;
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
  txtviewmodulo:string;
  txtmodulo:string;
  visualizar:boolean=false;
  cuentacontable:string='';
  
  btnstrIssue_Cred:boolean=false;
  btnstrIssue_Deb:boolean=false;
  btnstrInvoice_Cred:boolean=false;
  btnstrInvoice_Deb:boolean=false;
  btnstrRecep_Cred:boolean=false;
  btnstrRecep_Deb:boolean=false;
  btnstrExp_Cod_Corp:boolean=false;
  btnstrExp_Cod_Loc:boolean=false;
  btnstrAcct_Corp:boolean=false;
  blnstrAcct_Loc:boolean=false;
  nameuser:any;
  constructor(){    
    super();
    Global.nameComponent='crear-ingreso-comprobante';
    this.fecha_actual=Global.getDate(new Date().toDateString());   
    this.fecha_ejecucion=Global.getParseDate(new Date().toDateString());  
    this.loadTipocambio();
    var desc:any=localStorage.getItem('compania_name');
    var cod:any=localStorage.getItem('compania_cod');
    this.clasematerial.strCompany_Cod=cod;
    this.clasematerial.strCompany_Desc=desc;
    setTimeout(() => {
      this.load();
    }, 200)
  }
  load(){
    this.nameuser=localStorage.getItem('User_Usuario');
    tipoRequisicionService.GetAllTipoRequisicion()
    .then(res=>{
      debugger;
      this.tabletipoRequisicion=res;
      this.tiporequisicion="A";    
      this.tiporequisicionant='A';
    })
    .catch(error=>{})
    var object = JSON.parse(this.$route.query.data);
    var modulo = this.$route.query.vista;
    this.txtviewmodulo=modulo;
    if(modulo.toLowerCase()!='aprobar'){
      if(modulo.toLowerCase()!='despacho'){
        if(modulo.toLowerCase()!='visualizar'){
          this.txtmodulo='Modificar Salida';
          this.visualizar=false;
        }
        else{
          this.txtmodulo='Visualizar Salida';
          this.visualizar=true;
        }
      }
      else{
        this.txtmodulo='Despacho Material';
        this.visualizar=true;
      }
      
    }
    else{
        this.visualizar=true;
        this.txtmodulo='Aprobar Salida';
        console.log('Aprobar',object.strIssueAjust_NO);
        
    }
    this.cargar(object.strMatClass_Cod);
  }
  cargar(code){
    clasematerialService.GetOnlyOneClaseMaterial(code)
    .then(respose=>{
      this.clasematerial=respose[0];
      this.tiporequisicion=respose[0].strStock_Type_Cod;
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'no se pudo cargar orden compra detalle '+error
      });
    })
  }
  loadTipocambio(){
    tipocambioService.GetAllTipoCambio1()
    .then(response=>{
      this.tipocambio=response;  
    }).catch(error=>{})
  }
  DateContabilizacionClick(){ 
    var date1=Global.getDateVencida(this.factura.dtmDoc_Acc_Date,this.proveedor.intDayToPay);
    this.factura.dtmDue_Date=date1;
    this.fechavencida=Global.getDateString(date1);   
    
}

  //#region [COMPANIA]
  loadCompania(){
    this.dialogCompania=true;
  }
  companiaSeleccionado(val:CompaniaModel,dialog:boolean){
    this.companiaModel=val;
    this.clasematerial.strCompany_Cod=this.companiaModel.strCompany_Cod;
    this.clasematerial.strCompany_Desc=this.companiaModel.strCompany_Desc;
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
  desactivar_GrupoArea(){
    debugger;
    if(this.dialogGrupoArea){
      this.btnactivarGrupoArea=false;      
    }
  }
  loadGrupoArea()
  {
    this.dialogGrupoArea=true;
  }
  closeDialogGrupoArea(){
    this.dialogGrupoArea=false;
  }
  activar_CuentaContableHaber(atrib){
    setTimeout(() => {
      this.btnactivarCuentaContableHaber=true;
      this.btnactivarMoneda=false;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=false;
      this.btnactivarImpuesto=false;
      this.limpiarBotones(atrib);
    }, 120)
  }
  desactivar_CuentaContableHaber (){
    debugger;
    if(this.dialogCuentaContableHaber){
      this.btnactivarCuentaContableHaber=false;      
    }
  }
  loadCuentaContableHaber(cuenta)
  {
    this.cuentacontable=cuenta;
    this.dialogCuentaContableHaber=true;
  }
  closeDialogCuentaContableHaber(){
    this.dialogCuentaContableHaber=false;
  }
  cuentacontableselecionadohaber(val,dialog:boolean){
    if(this.cuentacontable=="strAcct_Loc"){
      console.log(val);
      this.clasematerial.strAcct_Loc=val.strAcc_Local_NO;
      this.clasematerial.strAcct_Loc_Desc=val.strAcc_Corp_Name;
    }
    if(this.cuentacontable=="strAcct_Corp"){
      this.clasematerial.strAcct_Corp=val.strAcc_Local_NO;
      this.clasematerial.strAcct_Corp_Desc=val.strAcc_Corp_Name;
    }
    if(this.cuentacontable=="strExp_Cod_Loc"){
      this.clasematerial.strExp_Cod_Loc=val.strAcc_Local_NO;
      this.clasematerial.strExp_Cod_Loc_Desc=val.strAcc_Corp_Name;
    }
    if(this.cuentacontable=="strExp_Cod_Corp"){
      this.clasematerial.strExp_Cod_Corp=val.strAcc_Local_NO;
      this.clasematerial.strExp_Cod_Corp_Desc=val.strAcc_Corp_Name;
    }
    if(this.cuentacontable=="strRecep_Deb"){
      this.clasematerial.strRecep_Deb=val.strAcc_Local_NO;
      this.clasematerial.strRecep_Deb_Desc=val.strAcc_Corp_Name;
    }
    if(this.cuentacontable=="strRecep_Cred"){
      this.clasematerial.strRecep_Cred=val.strAcc_Local_NO;
      this.clasematerial.strRecep_Cred_Desc=val.strAcc_Corp_Name;
    }
    if(this.cuentacontable=="strInvoice_Deb"){
      this.clasematerial.strInvoice_Deb=val.strAcc_Local_NO;
      this.clasematerial.strInvoice_Deb_Desc=val.strAcc_Corp_Name;
    }
    if(this.cuentacontable=="strInvoice_Cred"){
      this.clasematerial.strInvoice_Cred=val.strAcc_Local_NO;
      this.clasematerial.strInvoice_Cred_Desc=val.strAcc_Corp_Name;
    }
    if(this.cuentacontable=="strIssue_Deb"){
      this.clasematerial.strIssue_Deb=val.strAcc_Local_NO;
      this.clasematerial.strIssue_Deb_Desc=val.strAcc_Corp_Name;
    }
    if(this.cuentacontable=="strIssue_Cred"){
      this.clasematerial.strIssue_Cred=val.strAcc_Local_NO;
      this.clasematerial.strIssue_Cred_Desc=val.strAcc_Corp_Name;
    }
    
    this.dialogCuentaContableHaber=false;  
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
    this.clasematerial.strExp_Cod_Loc=val.strAcc_Local_NO;
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
  closeDialogCentroCosto(){
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
    this.factura.strCurrency_Doc=this.moneda.strCurrency_Cod;
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
    this.factura.strDaily_Cod=this.diarioSelect.strDaily_Cod;
    this.dialogDiario=false;
  }
  checkSelectDiario(val:DiarioModel){
    this.diarioSelect=val;
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
  limpiarBotones(boton){
    
    this.btnstrIssue_Cred=false;
    this.btnstrIssue_Deb=false;
    this.btnstrInvoice_Cred=false;
    this.btnstrInvoice_Deb=false;
    this.btnstrRecep_Cred=false;
    this.btnstrRecep_Deb=false;
    this.btnstrExp_Cod_Corp=false;
    this.btnstrExp_Cod_Loc=false;
    this.btnstrAcct_Corp=false;
    this.blnstrAcct_Loc=false;
    if(boton=="strIssue_Cred"){
      this.btnstrIssue_Cred=true;
    }
    if(boton=="strIssue_Deb"){
      this.btnstrIssue_Deb=true;
    }
    if(boton=="strInvoice_Cred"){
      this.btnstrInvoice_Cred=true;
    }
    if(boton=="strInvoice_Deb"){
      this.btnstrInvoice_Deb=true;
    }
    if(boton=="strRecep_Cred"){
      this.btnstrRecep_Cred=true;
    }
    if(boton=="strRecep_Deb"){
      this.btnstrRecep_Deb=true;
    }
    if(boton=="strExp_Cod_Corp"){
      this.btnstrExp_Cod_Corp=true;
    }
    if(boton=="strExp_Cod_Loc"){
      this.btnstrExp_Cod_Loc=true;
    }
    if(boton=="strAcct_Corp"){
      this.btnstrAcct_Corp=true;
    }
    if(boton=="strAcct_Loc"){
      this.blnstrAcct_Loc=true;
    }
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
      this.factura.strDoc_Status="egaona";//localStorage.getItem('User_Usuario');
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
  limpiar(){
    this.clasematerial=new ClaseMaterialModel();
    var desc:any=localStorage.getItem('compania_name');
    var cod:any=localStorage.getItem('compania_cod');
    this.clasematerial.strCompany_Cod=cod;
    this.clasematerial.strCompany_Desc=desc;
  }
  guardarTodo(){
    this.clasematerial.strStock_Type_Cod=this.tiporequisicion;
    for(var i=0;i<this.tabletipoRequisicion.length;i++){
      if(this.tabletipoRequisicion[i].strTypeReq_Cod==this.tiporequisicion){
        this.clasematerial.strStock_Type_Desc=this.tabletipoRequisicion[i].strTipReq_Desc;
      }
    }
    
    this.clasematerial.strCreation_User=this.nameuser;
    this.clasematerial.strModified_User=this.nameuser;
    
    let loading = Loading.service({
      fullscreen: true,
      text: 'Cargando...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
    );

    clasematerialService.update(this.clasematerial)
    .then(response=>{
      this.issave=true;
      loading.close();
      this.textosave='Se actualizo correctamente.'+response.strMatClass_Cod
      this.limpiar();
    }).catch(error=>{
      loading.close();
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo actualizar producto'
      });
    })
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
