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

import Handsontable from 'handsontable-pro';

import {SalidaMaterialModel} from '@/modelo/maestro/salidamaterial';
import {SalidaModel} from '@/modelo/maestro/salida';
import {SalidaDetalleModel} from '@/modelo/maestro/salidadetalle';

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
  name: 'salidam-pr',
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
export default class ModificarSalidaMaterialComponent extends Vue {
  timer=0;
  sizeScreen:string = (window.innerHeight - 420).toString();//'0';
  sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  
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
  code_almacen:string='';
  cell_ocultar:string='transparent';
  value: string='';
  vifprogress:boolean=true;
  textosave:string='';
  iserror:boolean=false;
  issave:boolean=false;
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
  visualizar:boolean;
  
  vifaprobarrechasar:boolean=false;
  txtmodulo:string='';
  valuem:number=0;
  tiporequisicionant:string='';
  constructor(){
    super();
    this.fecha_actual=Global.getParseDate(new Date().toDateString());
    debugger;
    this.tiporequisicion="A";
    for(var i=0;i<10;i++){
      var item:any={
        date:Global.getParseDate(new Date().toDateString()),
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
        fecha_estimada:Global.getParseDate(new Date().toDateString()),
        centrocosto:'',
      }
      this.tableData1.push(item);
    }
    console.log(this.tableData1);
    setTimeout(() => {
      this.load();
    }, 200)
  }
  load(){
    var object = JSON.parse(this.$route.query.data);
    var modulo = this.$route.query.vista;
    if(modulo.toLowerCase()!='aprobar'){
      this.txtmodulo='Modificar Salida';
      this.vifaprobarrechasar=false;
      if(modulo.toLowerCase()!='visualizar'){
        this.visualizar=true;
      }
      else{
        this.visualizar=false;
      }
    }
    else{
        this.visualizar=true;
        this.vifaprobarrechasar=true;
        this.txtmodulo='Aprobar Salida';
        console.log('Aprobar',object.strIssueAjust_NO);
        this.cargar(object.strIssueAjust_NO);
    }
  }
  cargar(code){
    salidaService.getSalidaId(code)
    .then(res=>{
      if(res!=undefined){
        console.log('cargarData1',res)
        salidaService.getSalidaDetalleId(res[0].intIssueAjustH_ID)
        .then(resd=>{
          this.salidaModel=res[0];
          this.tableData1=resd;
          console.log('cargarData2',resd,this.tableData1)
        })
        .catch(error=>{
          console.log('error',error)
        })     
      }
    })
    .catch(error=>{
      console.log('error',error)
    })
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
    // if (row === undefined || row.EstadoAprobacion === undefined) return '';
    // if (row.EstadoAprobacion === 'R'){
    //   return 'rechazado-row';
    // } else if (row.EstadoAprobacion === 'A') {
    //   return 'aprobado-row';
    // } else if (row.EstadoAprobacion === 'M'){
    //   return 'modificado-row';
    // }
    // return '';
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
    }, 120)
  }
  activar_tipo_movimiento(){
    setTimeout(() => {
      this.btnactivartipomovimiento=true;
      this.btnactivarcompania=false;
    }, 120)
  }
  desactivar_compania(){
    debugger;
    if(this.dialogCompania){
      this.btnactivarcompania=false;
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
      this.btnactivarproveedor=false;
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
    this.code_almacen=val.CODIGO;
    this.desalmacen=val.DESCRIPCION;
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
    this.selectrow.centrocosto=val.strCostCenter_NO;
    this.dialogCentroCostos=false;
  }
  SeleccionadoCuentaContable(val){
    debugger;
    this.selectrow.cuentacontable=val.strAcc_NO_Corp;
    this.dialogCuentaContable=false;
  }
  SeleccionadoMaterial(val){
    debugger;
    this.selectrow.material='';
    this.selectrow.material_descripcion='';
    this.selectrow.unidad_medida='';
    this.selectrow.cuentacontable='';

    this.selectrow.material=val.strStock_Cod;
    this.selectrow.material_descripcion=val.strStock_Desc;
    this.selectrow.unidad_medida=val.strUM_Cod;
    this.selectrow.cuentacontable=val.strExp_Acct;
    this.selectrow.cantidad=val.fltQuantity;
    
    this.dialogMaterial=false;
  }
  SeleccionadoUnidadMedida(val){
    debugger;
    this.selectrow.unidad_medida=val.strUM_Cod;
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
    this.selectrow.prioridad=val.strPriority_Cod;
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
    // this.salidaModel.tipomovimiento=val.strTypeMov_Cod
    // this.destipomovimiento=val.strTypeMov_Desc;
   
    // this.dialogTipoMovimiento=false;
  }
  companiaSeleccionado(val){
    debugger;
    // this.salidaModel.compania=val.strCompany_Cod
    // this.descompania=val.strCompany_Desc;
   
    // this.dialogCompania=false;
  }
  async aprobar(){
    this.valuem=0;
    this.salidaModel.strApproved_User='ADMINISTRADOR';
    await setTimeout(() => {
      for(var i=0;i<100;i++){
        this.valuem++; 
      }
    }, 200)
    console.log('aprobar',this.salidaModel);
    await salidaService.aprobarSalida(this.salidaModel)
    .then(res=>{
      debugger;
      console.log(this.valuem);
      this.salidaModel.listaDetalle=this.tableData1;
      salidaService.inventarioSalida(this.salidaModel)
      .then(res=>{
        setTimeout(() => {
          this.vifprogress=false;
          this.issave=true;
          this.textosave='Se aprobó correctamente. '+res.strIssueAjust_NO;
          this.openMessage('Se aprobó correctamente '+res.strIssueAjust_NO);
        }, 600)
      })
      .catch(error=>{
        this.textosave='Ocurrio un error inesperado. ';
      })
    })
    .catch(error=>{
      this.textosave='Ocurrio un error inesperado. ';
    })
  }
  async rechasar(){
    this.valuem=0;
    this.salidaModel.strApproved_Status='ADMINISTRADOR';
    await setTimeout(() => {
      for(var i=0;i<100;i++){
        this.valuem++; 
      }
    }, 200)
    await salidaService.rechasarSalida(this.salidaModel)
    .then(res=>{
      debugger;
      console.log(this.valuem);
      setTimeout(() => {
        this.vifprogress=false;
        this.issave=true;
        this.textosave='Se rechazó correctamente. '+res.strIssueAjust_NO;
        this.openMessage('Se rechazó correctamente '+res.strIssueAjust_NO);
      }, 600)
    })
    .catch(error=>{
      this.textosave='Ocurrio un error inesperado. ';
    })
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
