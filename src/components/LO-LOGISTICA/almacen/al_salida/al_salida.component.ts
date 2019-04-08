import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import BCompaniaComponent from '@/components/buscadores/b_compania/b_compania.vue';
import BTipoMovimientoComponent from '@/components/buscadores/b_tipo_movimiento/b_tipo_movimiento.vue';
import BCentroCostoComponent from '@/components/buscadores/b_centro_costo/b_centro_costo.vue';
import BPrioridadComponent from '@/components/buscadores/b_prioridad/b_prioridad.vue';
import BUnidadMedidaComponent from '@/components/buscadores/b_unidad_medida/b_unidad_medida.vue';
import BCuentaContableComponent from '@/components/buscadores/b_cuenta_contable/b_cuenta_contable.vue';
import BMaterialComponent from '@/components/buscadores/b_material/b_material.vue';
import BPlantaComponent from '@/components/buscadores/b_planta/b_planta.vue';
import BAlmacenComponent from '@/components/buscadores/b_almacen/b_almacen.vue';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
// import BProveedorComponent from '@/components/buscadores/b_proveedor/b_proveedor.vue';
// import BCategoriaCuentaComponent from '@/components/buscadores/b_categoria_cuenta/b_categoria_cuenta.vue';
// import BCategoriaLineaComponent from '@/components/buscadores/b_categoria_linea/b_categoria_linea.vue';
// import BAlmacenComponent from '@/components/buscadores/b_almacen/b_almacen.vue';
// import BMaterialComponent from '@/components/buscadores/b_material/b_material.vue';
// import BUnidadMedidaComponent from '@/components/buscadores/b_unidad_medida/b_unidad_medida.vue';
// import BMonedaComponent from '@/components/buscadores/b_moneda/b_moneda.vue';
// import BPrioridadComponent from '@/components/buscadores/b_prioridad/b_prioridad.vue';
// import BCentroCostoComponent from '@/components/buscadores/b_centro_costo/b_centro_costo.vue';


import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from 'axios';
import { Loading } from 'element-ui';
import { mixin as focusMixin }  from 'vue-focus';
// import '../../../../assets/css/excel-2007.scss';
import documentService from '@/components/service/documents.service';
import msmsendService from '@/components/service/msnSend.service';
import historialService from '@/components/service/historial.service';
import inicioService from '@/components/service/inicio.service';
import salidaService from '@/components/service/salida.service';
import {SalidaDetalleModel} from '@/modelo/maestro/salidadetalle';
import {SalidaModel} from '@/modelo/maestro/salida';
import Handsontable from 'handsontable-pro';

import { Notification } from 'element-ui';
import Global from '@/Global';
Vue.directive('focus', {
  inserted: function(el) {
    el.focus()
  }
})
var EditableColumn = {
  template: '#editable-column-content',
  props: ['is-editing', 'scope', 'editing', 'on-blur', 'on-enter', 'property']
}
@Component({
  name: 'salida-pr',
  components:{
    'buttons-accions':ButtonsAccionsComponent,
    'bcompania':BCompaniaComponent,
    'btipomovimiento':BTipoMovimientoComponent,
    'bcentrocosto':BCentroCostoComponent,
    'bprioridad':BPrioridadComponent,
    'bunidadmedida':BUnidadMedidaComponent,
    'bcuentacontable':BCuentaContableComponent,
    'bmaterial':BMaterialComponent,
    'quickaccessmenu':QuickAccessMenuComponent,
    'bplanta':BPlantaComponent,
    'balmacen':BAlmacenComponent,
  } ,
  // components:{
  //   'bcompania':BCompaniaProveedor,
  //   'bproveedor':BProveedorComponent,
  //   'balmacen':BAlmacenComponent,
  //   'buttons-accions':ButtonsAccionsComponent,
  //   'bcategoriacuenta':BCategoriaCuentaComponent,
  //   'bcategorialinea':BCategoriaLineaComponent,
  //   'bcuentacontable':BCuentaContableComponent,
  //   'bmaterial':BMaterialComponent,
  //   'bunidadmedida':BUnidadMedidaComponent,
  //   'bmoneda':BMonedaComponent,
  //   'bprioridad':BPrioridadComponent,
  //   'bcentrocosto':BCentroCostoComponent
  // } ,
})
export default class CrearSalidaAlmacenComponent extends Vue {
  timer=0;
  sizeScreen:string = (window.innerHeight - 420).toString();//'0';
  sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  vifprogress:boolean=true;
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';

  hours:number;
  minutos:number;
  seconds:number;
  user:any;
  tiempoagotado:any;
  contador:any=0;
  _10min:boolean=false;
  ocultarConfig:boolean = true;
  nameuser:string;
  namecomplete:string;
  accesosUser:any=[];
  ocultar:boolean=false;
  dialogVisible:boolean=false;
  SendDocument:boolean=false;

  /*dialog*/
  dialogCompania:boolean=false;
  dialogTipoMovimiento:boolean=false;
  dialogProveedor:boolean=false;
  dialogAlmacen:boolean=false;
  dialogCategoriaCuenta:boolean=false;
  dialogCategoriaLinea:boolean=false;
  dialogCuentaContable:boolean=false;
  dialogMaterial:boolean=false;
  dialogUnidadMedida:boolean=false;
  dialogMoneda:boolean=false;
  dialogPrioridad:boolean=false;
  dialogCentroCostos:boolean=false;
  dialogPlanta:boolean=false;
  valuem:number=0;

  public salidaModel:SalidaModel=new SalidaModel();

  /*input*/
  btnactivarcompania:boolean=false;
  btnactivartipomovimiento:boolean=false;
  btnactivarproveedor:boolean=false;
  btnactivaralmacen:boolean=false;
  btnactivarmaterial:boolean=false;
  btnactivarunidadmedida:boolean=false;
  btnactivarmoneda:boolean=false;
  btnactivarprioridad:boolean=false;
  btnactivarcentrocosto:boolean=false;
  btnactivarplanta:boolean=false;

  /*bolean_tabla_dinamica*/
  bln_tbl_categoria_cuenta:boolean=false;
  bln_tbl_categoria_linea:boolean=false;
  bln_tbl_cuenta_contable:boolean=false;
  bln_tbl_material:boolean=false;
  bln_tbl_material_descripcion:boolean=false;
  bln_tbl_cantidad:boolean=false;
  bln_tbl_unidad_medida:boolean=false;
  bln_tbl_proveedor:boolean=false;
  bln_tbl_moneda:boolean=false;
  bln_tbl_prioridad:boolean=false;
  bln_tbl_fecha_estimada:boolean=false;
  bln_tbl_centro_costo:boolean=false;

  descompania:string='';
  destipomovimiento:string='';
  code_compania:string='';
  desalmacen:string='';
  desplanta:string='';
  code_almacen:string='';
  code_planta:string='';
  cell_ocultar:string='transparent';
  value: string='';
  txtSave:string='';
  blntxtSave:boolean=false;
  public tableData1:Array<SalidaDetalleModel>=[]; 
  
  /*tabla*/
  editing:any= {
    row:'',
    column:''
  };
  fecha_actual:string;
  selectrow:any;
  selectcolumn:any;
  blntiporequisicion:boolean=true;
  tiporequisicion:string='';

  valmacen:boolean=false;
  vtipomovimiento:boolean=false;
  vcompania:boolean=false;


  constructor(){
    super();
    this.fecha_actual=Global.getParseDate(new Date().toDateString());
    debugger;
    this.tiporequisicion="A";
    for(var i=0;i<10;i++){
      var items:SalidaDetalleModel=new SalidaDetalleModel();
      items.intIssueAjust_Item=i+1;
      items.strStock_Cod='';
      items.strStock_Desc='';
      items.fltIssueRequest_QTY=0;
      items.fltAjust_QTY=0;
      items.fltIssueDelivery_QTY=0;
      items.strUM_Cod='';
      items.strCostCenter_NO='';
      items.strAcc_NO_Local='';
      items.strDelivery_Place='';
      items.dtmDelivery_Date=new Date();
      items.strPriority_Cod='';
      items.errorCentroCosto=false;
      items.errorLugarEntrega=false;
      items.errorPrioridad=false;

      this.tableData1.push(items);
    }
    console.log(this.tableData1);
  }
  fnOcultar(){
    this.ocultar=!this.ocultar;
  }
  guardar(){
    this.SendDocument=true;
  }
  
  openMessage(newMsg : string) {
    this.$message({
      showClose: true,
      message: newMsg,
      type: 'success'
    });
  }
  openMessageError(strMessage:string){
    this.$message({
        showClose: true,
        type: 'error',
        message: strMessage
      });
  }
  linkLogout(){
   localStorage.clear();
   window.sessionStorage.clear();
    router.push('/')
  }
  confirmaraceptar(){
    this.SendDocument=false;
  }
  linksUser(comand){
    router.push('/barmenu/'+comand)
  }
  linksLogin(){
    router.push('/inicio')
  }
  linkRoute(route){
    router.push(route)
  }
  redirectLogin(msg){
    Notification.warning(msg)
    localStorage.clear();
    router.push('/')
  }
  calcular(temp){
    if(temp < 600){
      return { rojo: true,}
    }
    else{
      return { verde: true, }
    }
  }
  loadCompania(){
    this.dialogCompania=true;
  }
  loadTipoMovimiento(){
    this.dialogTipoMovimiento=true;
  }
  
  loadAlmacen(){
    this.dialogAlmacen=true;
  }
  handleClose(){
    // this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
    //     confirmButtonText: 'OK',
    //     cancelButtonText: 'Cancel',
    //     type: 'warning'
    //   }).then(() => {
    //     this.$message({
    //       type: 'success',
    //       message: 'Delete completed'
    //     });
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: 'Delete canceled'
    //     });          
    //   });
  }
  tableRowClassName(row, rowIndex) {
      debugger;
      return 'rechazado-row';
    
  }
  handleCurrentChange(val) {
    debugger;
    if(val.date){
        return 'selected-row';
    }
  }
  /*Compania imput*/
  activar_compania(){
    setTimeout(() => {
      this.btnactivarcompania=true;
      this.btnactivaralmacen=false;
      this.btnactivarproveedor=false;
      this.btnactivartipomovimiento=false;
      this.btnactivarplanta=false;
    }, 120)
  }
  activar_tipo_movimiento(){
    setTimeout(() => {
      this.btnactivartipomovimiento=true;
      this.btnactivarcompania=false;
      this.btnactivarplanta=false;
    }, 120)
  }
  desactivar_compania(){
    debugger;
    if(this.dialogCompania){
      this.btnactivarcompania=false;
    }
  }
  desactivar_planta(){
    debugger;
    if(this.dialogPlanta){
      this.btnactivarplanta=false;
    }
  }
  desactivar_tipo_movimiento(){
    debugger;
    if(this.dialogTipoMovimiento){
      this.btnactivartipomovimiento=false;
    }
  }
  closeCompania(){
    debugger;
    this.btnactivarcompania=false;
    return false;
  }

  /*Proveedor imput*/
  activar_proveedor(){
    setTimeout(() => {
      this.btnactivarproveedor=true;
      this.btnactivarcompania=false;
      this.btnactivaralmacen=false;
    }, 120)
  }
  activar_planta(){
    setTimeout(() => {
      this.btnactivarplanta=true;
      this.btnactivarcompania=false;
      this.btnactivartipomovimiento=false;
    }, 120)
  }
  desactivar_proveedor(){
    debugger;
    if(this.dialogProveedor){
      this.btnactivarproveedor=false;
    }
  }
  closeProveedor(){
    debugger;
    this.btnactivarproveedor=false;
    return false;
  }

  /*Almacen imput*/
  activar_almacen(){
    setTimeout(() => {
      console.log("activar_almacen");
      this.btnactivaralmacen=true;
      this.btnactivarcompania=false;
      this.btnactivartipomovimiento=false;
    }, 120)
  }
  desactivar_almacen(){
    debugger;
    if(this.dialogAlmacen){
      this.btnactivaralmacen=false;
    }
  }
  closeAlmacen(){
    debugger;
    console.log("closeAlmacen");
    this.btnactivaralmacen=false;
    return false;
  }
  activar_descripcion(){
    this.btnactivaralmacen=false;
    this.btnactivarproveedor=false;
    this.btnactivarcompania=false
  }
  activar_tipo_requisicion(value){
    debugger;
    console.log("activar_tipo_requisicion");
    this.tiporequisicion=value;
    if(value=='N'){
      this.cell_ocultar='transparent';
      this.blntiporequisicion=true;
    }
    else{
      this.cell_ocultar='#e4e2e2';        
      this.blntiporequisicion=false;
    }
    this.btnactivaralmacen=false;
    this.btnactivarproveedor=false;
    this.btnactivarcompania=false
  }

  /*tabla metodos*/
  handleBlur(event) {
    debugger;
    this.bln_tbl_categoria_cuenta=false;
    event.edit=false;
    this.editing.row='';
    this.editing.column='';
    console.log('blur');
  }
  isEditing() {
    return this.editing !== null
  }
  onCellBlur(row, column, cell, event) {
    debugger;
    this.editing = null
    console.log('onCellBlur',row, column, cell, event);
  }
  onCellClick(row, column, cell, event) {
    this.editing = {
      row,
      column,
      cell
    }
  }  
  LoadCategoriaCuenta(row,column){
    this.selectrow=row;
    this.selectcolumn=column;
    console.log(row);
    this.dialogCategoriaCuenta=true;
  }
  LoadCategoriaLinea(row){
    this.selectrow=row;
    this.dialogCategoriaLinea=true;
  }
  LoadCuentaContable(row){
    this.selectrow=row;
    this.dialogCuentaContable=true;
  }
  LoadMaterial(row){
    this.selectrow=row;
    this.dialogMaterial=true;
  }
  LoadUnidadMedida(row){
    this.selectrow=row;
    this.dialogUnidadMedida=true;
  }
  LoadProveedor(row){
    this.selectrow=row;
    this.dialogProveedor=true;      
  }
  LoadMoneda(row){
    this.selectrow=row;
    this.dialogMoneda=true;      
  }
  LoadPrioridad(row){
    this.selectrow=row;
    this.dialogPrioridad=true;      
  }
  LoadCentroCosto(row){
    this.selectrow=row;
    this.dialogCentroCostos=true;
  }
  alerta(event,edit,column){
    debugger;
    this.bln_tbl_categoria_cuenta=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  clickcategorialinea(event,edit,column){
    debugger;
    this.bln_tbl_categoria_linea=true;
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
  clickmaterial(event,edit,column){
    debugger;
    this.bln_tbl_material=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
    console.log("---edit",this.editing);
  }
  clickmaterialdescripcion(event,edit,column){
    debugger;
    this.bln_tbl_material_descripcion=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  clickcantidad(event,edit,column){
    debugger;
    this.bln_tbl_cantidad=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  clickunidadmedida(event,edit,column){
    debugger;
    this.bln_tbl_unidad_medida=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  clickproveedor(event,edit,column){
    debugger;
    this.bln_tbl_proveedor=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  clickmoneda(event,edit,column){
    debugger;
    this.bln_tbl_moneda=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  clickprioridad(event,edit,column){
    debugger;
    this.bln_tbl_prioridad=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  clickfechaestimada(event,edit,column){
    debugger;
    this.bln_tbl_fecha_estimada=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  clickcentrocosto(event,edit,column){
    debugger;
    this.bln_tbl_centro_costo=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  getParseDate(fecha){
    return Global.getParseDate(fecha);
  }
  
  SeleccionadoAlmacen(val){
    console.log('traer',val);
    this.code_almacen=val.strWHS_Cod;
    this.desalmacen=val.strWHS_Name;
    this.code_planta=val.strPlant_Cod;
    this.dialogAlmacen=false;
  }
  SeleccionadoCategoriaCuenta(val){
    this.selectrow.categoriacuenta=val.CODIGO;
    this.dialogCategoriaCuenta=false;
  }
  SeleccionadoCategoriaLinea(val){
    debugger;
    this.selectrow.categorialinea=val.CODIGO;
    this.dialogCategoriaLinea=false;
  }
  SeleccionadoCentroCosto(val){
    debugger;
    this.selectrow.strCostCenter_NO=val.strCostCenter_NO;
    this.selectrow.intIdCostCenter_ID=val.intIdCostCenter_ID;

    this.dialogCentroCostos=false;
  }
  SeleccionadoCuentaContable(val){
    debugger;
    this.selectrow.strAcc_NO_Local=val.strAcc_Local_NO;
    this.dialogCuentaContable=false;
  }
  SeleccionadoMaterial(val){
    debugger;
    this.selectrow.strStock_Cod='';
    this.selectrow.strStock_Desc='';
    this.selectrow.strUM_Cod='';
    this.selectrow.strAcc_NO_Local='';

    this.selectrow.strStock_Cod=val.strStock_Cod;
    this.selectrow.intIdInvStock_ID=val.intIdInvStock_ID;
    this.selectrow.strStock_Desc=val.strStock_Desc;
    this.selectrow.strUM_Cod=val.strUM_Cod;
    this.selectrow.strAcc_NO_Local=val.strExp_Acct;
    this.selectrow.fltQuantity=val.fltQuantity_Virtual;
    this.selectrow.fltPrecUnit_Local=val.fltPrecUnit_Local;
    this.selectrow.fltPrecUnit_USD=val.fltPrecUnit_USD;
    this.dialogMaterial=false;
    
  }
  SeleccionadoUnidadMedida(val){
    debugger;
    this.selectrow.strUM_Cod=val.strUM_Cod;
    this.dialogUnidadMedida=false;
  }
  SeleccionadoProveedor(val){
    debugger;
    this.selectrow.proveedor=val.Vendor_NO;
    this.dialogProveedor=false;
  }
  SeleccionadoMoneda(val){
    debugger;
    this.selectrow.moneda=val.CODIGO;
    this.dialogMoneda=false;
  }
  SeleccionadoPrioridad(val){
    debugger;
    this.selectrow.strPriority_Cod=val.strPriority_Cod;
    this.selectrow.intIdPriority_ID=val.intIdPriority_ID;
    this.dialogPrioridad=false;
  }
  cambioTipoRequisicion(selected){
    if(this.tiporequisicion!=selected){
      this.tiporequisicion=selected;
    }
    console.log('select',selected);
  }

  /*prioridad*/
  closePrioridad(){
    this.btnactivarcompania=false;
    return false;
  }
  prioridadClose(){
    this.dialogPrioridad=false;
  }

  centrocostoClose(){
    this.dialogCentroCostos=false;
  }
  cuentacontableClose(){
    this.dialogCuentaContable=false;
  }
  unidadmedidaClose(){
    this.dialogUnidadMedida=false;
  }
  tipomovimientoSelecionado(val){
    this.salidaModel.strTypeMov_Cod=val.strTypeMov_Cod;
    this.salidaModel.strTypeMov_Desc=val.strTypeMov_Desc;
    this.salidaModel.intIdTypeMov_ID=val.intIdTypeMov_ID;
    this.destipomovimiento=val.strTypeMov_Desc;
   
    this.dialogTipoMovimiento=false;
    this.validate();
  }
  companiaSeleccionado(val){
    debugger;
    this.salidaModel.strCompany_Cod=val.strCompany_Cod;
    this.salidaModel.strCompany_Desc=val.strCompany_Desc;
    this.descompania=val.strCompany_Desc;
    this.validate();
   
    this.dialogCompania=false;
  }
  LoadAlmacen(){
    this.dialogAlmacen=true;      
  }
  SeleccionadoPlanta(val){
    this.code_planta=val.strPlant_Cod;
    this.desplanta=val.strPlan_Desc;
    this.dialogPlanta=false;
  }
  plantaClose(){
    this.dialogPlanta=false;
  }
  almacenseleccionado(val){
    debugger;
    this.salidaModel.strWHS_Cod=val.strWHS_Cod;
    this.salidaModel.intIdWHS_ID=val.intIdWHS_ID;
    this.salidaModel.strWHS_Desc=val.strWHS_Desc;
    
    var planta=val.intPlant_ID;
    if(planta!=undefined && planta!=null){
      this.code_planta=planta.strPlant_Cod;
      this.desplanta=planta.strPlan_Desc;
    }
    
    this.dialogAlmacen=false;
    this.validate();
  }
  submit() {
    if(!this.validate()) {
      alert('Submitted')
    } else {
      alert('Not Submitted')
    }
  }  
  change(){
    this.validate();
  }

  async validateTabla(tabla,index){
    debugger;
    var bandera=false;
    for(var i=index;i<tabla.length;i++){
      if(tabla[i].strCostCenter_NO=="" || tabla[i].strCostCenter_NO==undefined){
        this.tableData1[tabla[i].index].errorCentroCosto=true;
        bandera=true;
      }
      if(tabla[i].strDelivery_Place=="" || tabla[i].strDelivery_Place==undefined){
        this.tableData1[tabla[i].index].errorLugarEntrega=true;
        bandera=true;
      }
      if(tabla[i].strPriority_Cod=="" || tabla[i].strPriority_Cod==undefined){
        this.tableData1[tabla[i].index].errorPrioridad=true;
        bandera=true;
      }
     
    }

    if(bandera){
      this.txtSave=" Verifique los campos"
      this.blntxtSave=true;
    }
    return bandera;
  }

  async validate() {
    debugger;
    var validation=false;
    if(this.salidaModel.strCompany_Cod==undefined || this.salidaModel.strCompany_Cod==""){
      validation=true;
      this.vcompania=true;
    }
    else{
      this.vcompania=false;
    }
    if(this.salidaModel.strTypeMov_Cod==undefined || this.salidaModel.strTypeMov_Cod==""){
      validation=true;
      this.vtipomovimiento=true;
    }
    else{
      this.vtipomovimiento=false;
    }
    if(this.salidaModel.strWHS_Cod==undefined || this.salidaModel.strWHS_Cod==""){
      validation=true;
      this.valmacen=true;
    }
    else{
      this.valmacen=false;
    }
    this.limpiarbotones();
    return validation;
  }
  limpiarbotones(){
    this.btnactivaralmacen=false;
    this.btnactivartipomovimiento=false;
    this.btnactivarcompania=false;
  }
  async guardarTodo(val){
    debugger;
    
    var tabla:Array<SalidaDetalleModel>=[];

    for(var i=0;i<this.tableData1.length;i++){
      if(this.tableData1[i].strStock_Cod!=""){
        this.tableData1[i].index=i;
        tabla.push(this.tableData1[i]);
      }
    }
    console.log(tabla);
    var vcabecera=await this.validate();
    var vdetalle=await this.validateTabla(tabla,0);
    if(!vcabecera && !vdetalle){
      this.salidaModel.listaDetalle=tabla;
      let loading = Loading.service({
        fullscreen: true,
        text: 'Cargando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
      );
      for(var i=0;i<50;i++){
        this.valuem=this.valuem+1; 
      }
      console.log('salida',this.salidaModel);
      this.salidaModel.strPlant_Cod=this.code_planta;
      this.salidaModel.strPlan_Desc=this.desplanta;

      salidaService.CrearSalida(this.salidaModel)
      .then(res=>{
        debugger;
        for(var i=0;i<50;i++){
          this.valuem++; 
        }
        console.log(this.valuem);
        loading.close();
        if(this.valuem>=100){
          setTimeout(() => {
            this.vifprogress=false;
            this.issave=true;
            this.textosave='Se guardo correctamente.'
            this.openMessage('Se guardo correctamente');
          }, 2000)
        }
      })
      .catch(error=>{
        loading.close();
        this.$message({
          showClose: true,
          type: 'error',
          message: 'No se pudo guardar salida'
        });
      })
    }
    
  }
  data(){
    return{
      dialogTableVisible: false,
      dialogVisible:false,
      tableDataServicio:[{}],
      item:{
        date: '',
        categoriacuenta: '',
        categorialinea: '',
        cuentacontable: '',
        material:'',
        material_descripcion:'',
        cantidad:0,
        unidad_medida:'',
        proveedor:'',
        moneda:'',
        prioridad:'',
        fecha_estimada:'',
        centrocosto:'',
      },
      tableData: [{
        date: '0001',
        categoriacuenta: 'Ferreyros',
        categorialinea: 'Ferreyros',
        cuentacontable: 'Ferreyros',
        material:'piedra',
        material_descripcion:'chancada',
        cantidad:1,
        unidad_medida:'Kg',
        proveedor:'Juan Toledo',
        moneda:'PEN',
        prioridad:'urgente',
        fecha_estimada:'12/02/2019',
        centrocosto:'6302071000',
      }, {
        date: '0002',
        categoriacuenta: 'Yura SAC',
        categorialinea: 'Ferreyros',
        cuentacontable: 'Ferreyros',
        material:'piedra',
        material_descripcion:'chancada',
        cantidad:1,
        unidad_medida:'Kg',
        proveedor:'Juan Toledo',
        moneda:'PEN',
        prioridad:'urgente',
        fecha_estimada:'12/02/2019',
        centrocosto:'6302071000',
      }, {
        date: '0003',
        categoriacuenta: 'Signal company',
        categorialinea: 'Ferreyros',
        cuentacontable: 'Ferreyros',
        material:'piedra',
        material_descripcion:'chancada',
        cantidad:1,
        unidad_medida:'Kg',
        proveedor:'Juan Toledo',
        moneda:'PEN',
        prioridad:'urgente',
        fecha_estimada:'12/02/2019',
        centrocosto:'6302071000',
      }, {
        date: '0004',
        categoriacuenta: 'Cruz del Sur',
        categorialinea: 'Ferreyros',
        cuentacontable: 'Ferreyros',
        material:'piedra',
        material_descripcion:'chancada',
        cantidad:1,
        unidad_medida:'Kg',
        proveedor:'Juan Toledo',
        moneda:'PEN',
        prioridad:'urgente',
        fecha_estimada:'12/02/2019',
        centrocosto:'6302071000',
      }
      , {
        date: '0005',
        categoriacuenta: 'Tisur',
        categorialinea: 'Ferreyros',
        cuentacontable: 'Ferreyros',
        material:'piedra',
        material_descripcion:'chancada',
        cantidad:1,
        unidad_medida:'Kg',
        proveedor:'Juan Toledo',
        moneda:'PEN',
        prioridad:'urgente',
        fecha_estimada:'12/02/2019',
        centrocosto:'6302071000',
      }, {
        date: '0006',
        categoriacuenta: 'Seguro',
        categorialinea: 'Ferreyros',
        cuentacontable: 'Ferreyros',
        material:'piedra',
        material_descripcion:'chancada',
        cantidad:1,
        unidad_medida:'Kg',
        proveedor:'Juan Toledo',
        moneda:'PEN',
        prioridad:'urgente',
        fecha_estimada:'12/02/2019',
        centrocosto:'6302071000',
      }, {
        date: '0007',
        categoriacuenta: 'Cruz del Sur',
        categorialinea: 'Ferreyros',
        cuentacontable: 'Ferreyros',
        material:'piedra',
        material_descripcion:'chancada',
        cantidad:1,
        unidad_medida:'Kg',
        proveedor:'Juan Toledo',
        moneda:'PEN',
        prioridad:'urgente',
        fecha_estimada:'12/02/2019',
        centrocosto:'6302071000',
      }, {
        date: '0008',
        categoriacuenta: 'Cruz del Sur',
        categorialinea: 'Ferreyros',
        cuentacontable: 'Ferreyros',
        material:'piedra',
        material_descripcion:'chancada',
        cantidad:1,
        unidad_medida:'Kg',
        proveedor:'Juan Toledo',
        moneda:'PEN',
        prioridad:'urgente',
        fecha_estimada:'12/02/2019',
        centrocosto:'6302071000',
      }, {
        date: '0009',
        categoriacuenta: 'Cruz del Sur',
        categorialinea: 'Ferreyros',
        cuentacontable: 'Ferreyros',
        material:'piedra',
        material_descripcion:'chancada',
        cantidad:1,
        unidad_medida:'Kg',
        proveedor:'Juan Toledo',
        moneda:'PEN',
        prioridad:'urgente',
        fecha_estimada:'12/02/2019',
        centrocosto:'6302071000',
      }, {
        date: '0010',
        categoriacuenta: 'Linea',
        categorialinea: 'Ferreyros',
        cuentacontable: 'Ferreyros',
        material:'piedra',
        material_descripcion:'chancada',
        cantidad:1,
        unidad_medida:'Kg',
        proveedor:'Juan Toledo',
        moneda:'PEN',
        prioridad:'urgente',
        fecha_estimada:'12/02/2019',
        centrocosto:'6302071000',
      }, {
        date: '0011',
        categoriacuenta: 'Cruz del Sur',
        categorialinea: 'Ferreyros',
        cuentacontable: 'Ferreyros',
        material:'piedra',
        material_descripcion:'chancada',
        cantidad:1,
        unidad_medida:'Kg',
        proveedor:'Juan Toledo',
        moneda:'PEN',
        prioridad:'urgente',
        fecha_estimada:'12/02/2019',
        centrocosto:'6302071000',
      }],
      user: {
        authenticated: false
      },
      data:{
        Usuario:localStorage.getItem('User_Nombre'),
      },
      options: [{
        value: 'A',
        label: 'Almacenable'
      }, {
        value: 'N',
        label: 'No Almacenable'
      }
      ],
      value: '',
      accesosUser: [],
      hours: 0,
      minutos:0,
      seconds:0
    }
  }
  
}
