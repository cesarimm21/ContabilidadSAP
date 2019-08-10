import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
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
import tipocambioService from '@/components/service/tipocambio.service';
import facturaService from '@/components/service/factura.service';
import prooveedorService from '@/components/service/proveedor.service';
//***Modelos */
import {TipoDocIdentidadModel} from '@/modelo/maestro/tipodocidentidad';
import {MonedaModel} from '@/modelo/maestro/moneda';
import {FacturaModel} from '@/modelo/maestro/factura';
import {TipoCambioModel} from '@/modelo/maestro/tipocambio';
import {CentroCostosModel} from '@/modelo/maestro/centrocostos';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';

import { Notification } from 'element-ui';
import centrocostosService from '@/components/service/centrocostos.service';
import servicioprestadoService from '@/components/service/servicioprestado.service';
@Component({
  name: 'crear-centro-costos',
  components:{
  'buttons-accions':ButtonsAccionsComponent,
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
export default class ModificarCentroCostosComponent extends Vue {
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
  selectData:string;
  tabletipo:any=[{}]

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
  fecha_actual:string;
  fecha_ejecucion:string;
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  companyName:any='';
  companyCod:any='';
  nameuser:any='';
  txtviewmodulo:string;
  txtmodulo:string;
  visualizar:boolean=false;
  constructor(){    
    super();
    Global.nameComponent='crear-centro-costos';
    this.fecha_actual=Global.getDate(new Date().toDateString());   
    this.fecha_ejecucion=Global.getParseDate(new Date().toDateString());  

    this.dtmEnd_Date.setFullYear(9999)
    this.companyName=localStorage.getItem('compania_name');
    this.companyCod=localStorage.getItem('compania_cod');
    this.nameuser=localStorage.getItem('User_Usuario');
    setTimeout(() => {
      this.load();
    }, 100)
  }
  load(){
    var object= JSON.parse(this.$route.query.data);    
    var modulo = this.$route.query.vista;
    this.txtviewmodulo=modulo;
    if(modulo.toLowerCase()!='visualizar'){
      this.txtmodulo='Modificar Centro Costos';
      this.visualizar=false;
    }
    else{
      this.txtmodulo='Visualizar Centro Costos';
      this.visualizar=true;
    }
    this.cargar(object.strCostCenter_NO,this.companyCod);
  }
  cargar(strCostCenter_NO,companyCod){
    centrocostosService.GetOnlyOneCentroCostos(strCostCenter_NO,companyCod)
    .then(reponse=>{
      this.centrocosto=reponse;  
      this.dtmStart_Date=new Date(this.centrocosto.dtmStart_Date.toString());
      this.dtmEnd_Date=new Date(this.centrocosto.dtmEnd_Date.toString());
      this.centrocosto.intCCCategory_ID=reponse.intCCCategory_ID.intCCCategory_ID;
      this.centrocosto.intIdCCGrpArea_ID=reponse.intIdCCGrpArea_ID.intIdCCGrpArea_ID;
      this.centrocosto.intIdProccGrp_ID=reponse.intIdProccGrp_ID.intIdProccGrp_ID;      
    }).catch(ee=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'Error en cargar'
      });
    })
  }
  //#region [GRUPO AREA]
  activar_GrupoArea(){
    setTimeout(() => {
      this.btnactivarCuentaContableDebe=false;
      this.btnactivarGrupoProceso=false;
      this.btnactivarCuentaContableHaber=false;
      this.btnactivarCategoriaCentroCosto=false;
      this.btnactivarCentroCosto=false;
      this.btnactivarGrupoArea=true;
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
  grupoareaseleccionado(val,dialog:boolean){
    this.centrocosto.strCCGrpArea_Cod=val.strCCGrpArea_Cod;
    this.centrocosto.strCCGrpArea_Desc=val.strCCGrpArea_Desc;
    this.centrocosto.intIdCCGrpArea_ID=val.intIdCCGrpArea_ID;
    this.dialogGrupoArea=false;  
  }
  activar_CuentaContableHaber(){
    setTimeout(() => {
      this.btnactivarCuentaContableDebe=false;
      this.btnactivarGrupoProceso=false;
      this.btnactivarCuentaContableHaber=true;
      this.btnactivarCategoriaCentroCosto=false;
      this.btnactivarCentroCosto=false;
      this.btnactivarGrupoArea=false;
    }, 120)
  }
  desactivar_CuentaContableHaber (){
    debugger;
    if(this.dialogCuentaContableHaber){
      this.btnactivarCuentaContableHaber=false;      
    }
  }
  loadCuentaContableHaber()
  {
    this.dialogCuentaContableHaber=true;
  }
  closeDialogCuentaContableHaber(){
    this.dialogCuentaContableHaber=false;
  }
  cuentacontableselecionadohaber(val,dialog:boolean){
    this.centrocosto.strAcctDest_Credit=val.strAcc_Local_NO;
    this.dialogCuentaContableHaber=false;  
  }

  activar_CuentaContableDebe(){
    setTimeout(() => {
      this.btnactivarCuentaContableDebe=true;
      this.btnactivarGrupoProceso=false;
      this.btnactivarCuentaContableHaber=false;
      this.btnactivarCategoriaCentroCosto=false;
      this.btnactivarCentroCosto=false;
      this.btnactivarGrupoArea=false;
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
      this.btnactivarCuentaContableDebe=false;
      this.btnactivarGrupoProceso=false;
      this.btnactivarCuentaContableHaber=false;
      this.btnactivarCategoriaCentroCosto=true;
      this.btnactivarCentroCosto=false;
      this.btnactivarGrupoArea=false;
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
    this.centrocosto.strCCCategory_Cod=val.strCCCategory_Cod;
    this.centrocosto.strCCCategory_Desc=val.strCCCategory_Desc;
    this.centrocosto.intCCCategory_ID=val.intCCCategory_ID;
    this.dialogCategoriaCentroCosto=false;  
  }

  
  activar_CentroCosto(){
    setTimeout(() => {
      this.btnactivarCuentaContableDebe=false;
      this.btnactivarGrupoProceso=false;
      this.btnactivarCuentaContableHaber=false;
      this.btnactivarCategoriaCentroCosto=false;
      this.btnactivarCentroCosto=true;
      this.btnactivarGrupoArea=false;
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
  centrocostoseleccionado(val,dialog:boolean){
    this.centrocosto.strCostCen_Father_NO=val.strCostCenter_NO;
    this.centrocosto.strCostCen_Father_Desc=val.strCostCenter_Desc;
    this.dialogCentroCosto=false;  
  }

  activar_GrupoProceso(){
    setTimeout(() => {
      this.btnactivarCuentaContableDebe=false;
      this.btnactivarGrupoProceso=true;
      this.btnactivarCuentaContableHaber=false;
      this.btnactivarCategoriaCentroCosto=false;
      this.btnactivarCentroCosto=false;
      this.btnactivarGrupoArea=false;
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
    this.centrocosto.strCCGrpProc_Desc=val.strCCGrpProc_Desc;
    this.centrocosto.intIdProccGrp_ID=val.intIdProccGrp_ID;
    this.dialogGrupoProceso=false;  
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
      this.btnactivarMoneda=true;
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
  guardarTodo(){
    if(this.txtviewmodulo=='modificar'){
      if(this.centrocosto.strCostCenter_NO==''){ this.$message('Complete los campos obligatorios')}
      if(this.centrocosto.strCostCenter_Name==''){ this.$message('Complete los campos obligatorios')}
      if(this.centrocosto.strCostCenter_Desc==''){ this.$message('Complete los campos obligatorios')}
      if(this.centrocosto.strCCGrpProc_Cod==''){ this.$message('Complete los campos obligatorios')}
      if(this.centrocosto.strCodAcctDest_Debit==''){ this.$message('Complete los campos obligatorios')}
      if(this.centrocosto.strAcctDest_Credit==''){ this.$message('Complete los campos obligatorios')}
      if(this.centrocosto.strCCCategory_Cod==''){ this.$message('Complete los campos obligatorios')}
      if(this.centrocosto.strCCGrpArea_Cod==''){ this.$message('Complete los campos obligatorios')}
      else{
        this.centrocosto.dtmStart_Date=this.dtmStart_Date;
        this.centrocosto.dtmEnd_Date=this.dtmEnd_Date;
        this.centrocosto.strModified_User=this.nameuser;  
        let loadingInstance = Loading.service({
          fullscreen: true,
          text: 'Actualizando...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.8)'
          }
      );   
        centrocostosService.UpdateCentroCostos(this.centrocosto)
        .then(response=>{
          loadingInstance.close();
          this.$message({
            showClose: true,
            type: 'success',
            message: 'Se Actualizo Correctamente '+response.strCostCenter_NO
          });
          this.issave = true;
          this.iserror = false;
          this.textosave='Se Actualizo correctamente. ' +response.strCostCenter_NO
        }).catch(error=>{
          this.$message({
            showClose: true,
            type: 'error',
            message: 'No se pudo Actualizo'
          });
          this.issave = false;
          this.iserror = true;
          this.textosave = 'Error al guardar.';
          loadingInstance.close();
        })
      }
      }
      else{
        this.$message({
            showClose: true,
            type: 'warning',
            message: 'Accion no permitida'
          });
    }
    
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
  getDateStringView(fecha:string){
    var dateString = new Date(fecha);
    var dia = dateString.getDate();
    var mes = (dateString.getMonth()<12) ? dateString.getMonth()+1 : mes = dateString.getMonth();
    var yyyy = dateString.getFullYear();
    var dd = (dia<10) ? '0'+dia : dd=dia;
    var mm = (mes<10) ? '0'+mes : mm=mes;
    return dd+'.'+mm+'.'+yyyy;
  }
  backPage(){
    window.history.back();
  }
  reloadpage(){
    window.location.reload();
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
      habilitarPane:true,
      txtviewmodulo:''
     
    }
  }
  
}
