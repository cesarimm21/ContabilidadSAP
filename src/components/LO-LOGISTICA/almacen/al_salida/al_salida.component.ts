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

// import '../../../../assets/css/excel-2007.scss';
import documentService from '@/components/service/documents.service';
import msmsendService from '@/components/service/msnSend.service';
import historialService from '@/components/service/historial.service';
import inicioService from '@/components/service/inicio.service';
import salidaService from '@/components/service/salida.service';
import {SalidaDetalleModel} from '@/modelo/maestro/salidadetalle';
import {SalidaModel} from '@/modelo/maestro/salida';


import {TipoMovimientoModel} from '@/modelo/maestro/tipoMovimiento';
import tipomovimientoService from '@/components/service/tipomovimiento.service';
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
  percentage:number;

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

  descompania:any='';
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

  blnfilterstrStock_Cod:boolean=false;
  blnfilterstrStock_Desc:boolean=false;
  blnfilterfltQuantity:boolean=false;
  blnfilterfltIssueRequest_QTY:boolean=false;
  blnfilterstrUM_Cod:boolean=false;
  blnfilterstrCostCenter_NO:boolean=false;
  blnfilterstrAcc_NO_Local:boolean=false;
  blnfilterstrDelivery_Place:boolean=false;
  blnfilterdtmDelivery_Date:boolean=false;
  blnfilterstrPriority_Cod:boolean=false;
  pagina: number =1;
  RegistersForPage: number = 10;
  totalRegistros: number = 100;
  public CompleteData:Array<SalidaDetalleModel>=[]; 
  public CompleteData1:Array<SalidaDetalleModel>=[]; 
  clickColumn:string='';
  txtbuscar:string='';
  Column:string='';
  dialogBusquedaFilter:boolean=false;
  el: '#app';
  txtnroline:any='';
  intlineaselect:number=-1;
  
  public tipomovimientoSelectModel:TipoMovimientoModel=new TipoMovimientoModel();
  public tipomovimientoModel:Array<TipoMovimientoModel>=[];

  constructor(){
    super();
    this.fecha_actual=Global.getParseDate(new Date().toDateString());
    debugger;

    this.tiporequisicion="A";
    for(var i=0;i<this.totalRegistros;i++){
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
      this.CompleteData.push(items);
    }
    this.CompleteData1=this.CompleteData;
    this.tableData1 = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));

    console.log(this.tableData1);
    
    this.descompania=localStorage.getItem('compania_name');
    var strCompany_Cod:any=localStorage.getItem('compania_cod');
    this.salidaModel.strCompany_Cod=strCompany_Cod;
    
    setTimeout(() => {
      this.loadTipoMovimientoC();
    }, 200)
  }

  loadTipoMovimientoC(){
    tipomovimientoService.GetAllTipoMovimiento()
    .then(response=>{
      debugger;
      console.log('tipomovimiento',response);
      //this.tipomovimientoModel=response; 
      for(var i=0;i<response.length;i++){
        var tipom=response[i].strTypeMov_Cod;
        if(tipom>=200 && tipom<300){
          this.tipomovimientoModel.push(response[i])
        }
      }      
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar tipo movimiento'
      });
    })
  }

  handleCurrentChangeTipo(val:TipoMovimientoModel){
    this.tipomovimientoSelectModel=val;
  }
  seleccionarTipo(row,index){
    this.$emit('tipomovimientoselecionado',row);
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
    // this.bln_tbl_categoria_cuenta=false;
    // event.edit=false;
    // this.editing.row='';
    // this.editing.column='';
    // console.log('blur');
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
    this.selectrow.strMatClass_Cod=val.strMaterial_Class;
    this.dialogMaterial=false;
    console.log('SeleccionadoMaterial',this.selectrow)
    
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
    
    this.selectrow.strPriority_Desc=val.strPriority_Desc;
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
  nuevoRegistro(){
    this.tableData1=[];
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
    this.salidaModel=new SalidaModel();
  }
  async guardarTodo(val){
    debugger;
    this.vifprogress=true;
    this.issave=false;
    this.iserror=false;
    this.textosave=''
    this.percentage=0;  
    
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
      for(var i=0;i<50;i++){
        this.percentage++;
      }

      salidaService.CrearSalida(this.salidaModel)
      .then(res=>{
        debugger;
        // for(var i=0;i<50;i++){
        //   this.valuem++; 
        // }
        // console.log(this.valuem);
        // loading.close();
        // if(this.valuem>=100){
        //   setTimeout(() => {
        //     this.vifprogress=false;
        //     this.issave=true;
        //     this.txtSave='';
        //     this.blntxtSave=false;
        //     this.textosave='Se guardo correctamente.'
        //     this.openMessage('Se guardo correctamente');
        //   }, 2000)
        // }
        for(var i=0;i<50;i++){
          setTimeout(
            () => {this.percentage++;},1  
          )
        } 
        setTimeout(() => {   
          this.issave=true;
          this.vifprogress=false;
          this.vifprogress=false;
          this.issave=true;
          this.txtSave='';
          this.blntxtSave=false;
          this.textosave='Se guardo correctamente. '+res.strIssueAjust_NO;
          this.openMessage('Se guardo correctamente '+res.strIssueAjust_NO);
          loading.close();
          this.nuevoRegistro();
          //window.location.reload();  
        }, 600)
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
  backPage(){
    window.history.back();
  }
  reloadpage(){
    window.location.reload();
  }

  filterstrStock_Cod(h,{column,$index}){
    debugger;
    
    if(this.blnfilterstrStock_Cod){
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
  filterstrStock_Desc(h,{column,$index}){
    debugger;
    
    if(this.blnfilterstrStock_Desc){
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
  filterfltQuantity(h,{column,$index}){
    debugger;
    
    if(this.blnfilterfltQuantity){
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
  filterfltIssueRequest_QTY(h,{column,$index}){
    debugger;
    
    if(this.blnfilterfltIssueRequest_QTY){
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
  filterstrUM_Cod(h,{column,$index}){
    debugger;
    
    if(this.blnfilterstrUM_Cod){
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
  filterstrCostCenter_NO(h,{column,$index}){
    debugger;
    
    if(this.blnfilterstrCostCenter_NO){
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
  filterstrAcc_NO_Local(h,{column,$index}){
    debugger;
    
    if(this.blnfilterstrAcc_NO_Local){
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
  filterstrDelivery_Place(h,{column,$index}){
    debugger;
    
    if(this.blnfilterstrDelivery_Place){
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
  filterdtmDelivery_Date(h,{column,$index}){
    debugger;
    
    if(this.blnfilterdtmDelivery_Date){
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
  filterstrPriority_Cod(h,{column,$index}){
    debugger;
    
    if(this.blnfilterstrPriority_Cod){
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
    debugger;
    this.Column=val.label;
    this.clickColumn=val.property;
    Global.setColumna(this.Column);
    if(val.property=="strStock_Cod"){
      this.blnfilterstrStock_Cod=true;
      this.blnfilterstrStock_Desc=false;
      this.blnfilterfltQuantity=false;
      this.blnfilterfltIssueRequest_QTY=false;
      this.blnfilterstrUM_Cod=false;
      this.blnfilterstrCostCenter_NO=false;
      this.blnfilterstrAcc_NO_Local=false;
      this.blnfilterstrDelivery_Place=false;
      this.blnfilterdtmDelivery_Date=false;
      this.blnfilterstrPriority_Cod=false;
    }
    if(val.property=="strStock_Desc"){
      this.blnfilterstrStock_Cod=false;
      this.blnfilterstrStock_Desc=true;
      this.blnfilterfltQuantity=false;
      this.blnfilterfltIssueRequest_QTY=false;
      this.blnfilterstrUM_Cod=false;
      this.blnfilterstrCostCenter_NO=false;
      this.blnfilterstrAcc_NO_Local=false;
      this.blnfilterstrDelivery_Place=false;
      this.blnfilterdtmDelivery_Date=false;
      this.blnfilterstrPriority_Cod=false;
    }
    if(val.property=="fltQuantity"){
      this.blnfilterstrStock_Cod=false;
      this.blnfilterstrStock_Desc=false;
      this.blnfilterfltQuantity=true;
      this.blnfilterfltIssueRequest_QTY=false;
      this.blnfilterstrUM_Cod=false;
      this.blnfilterstrCostCenter_NO=false;
      this.blnfilterstrAcc_NO_Local=false;
      this.blnfilterstrDelivery_Place=false;
      this.blnfilterdtmDelivery_Date=false;
      this.blnfilterstrPriority_Cod=false;
    }
    
    if(val.property=="fltIssueRequest_QTY"){
      this.blnfilterstrStock_Cod=false;
      this.blnfilterstrStock_Desc=false;
      this.blnfilterfltQuantity=false;
      this.blnfilterfltIssueRequest_QTY=true;
      this.blnfilterstrUM_Cod=false;
      this.blnfilterstrCostCenter_NO=false;
      this.blnfilterstrAcc_NO_Local=false;
      this.blnfilterstrDelivery_Place=false;
      this.blnfilterdtmDelivery_Date=false;
      this.blnfilterstrPriority_Cod=false;
    }
    if(val.property=="strUM_Cod"){
      this.blnfilterstrStock_Cod=false;
      this.blnfilterstrStock_Desc=false;
      this.blnfilterfltQuantity=false;
      this.blnfilterfltIssueRequest_QTY=false;
      this.blnfilterstrUM_Cod=true;
      this.blnfilterstrCostCenter_NO=false;
      this.blnfilterstrAcc_NO_Local=false;
      this.blnfilterstrDelivery_Place=false;
      this.blnfilterdtmDelivery_Date=false;
      this.blnfilterstrPriority_Cod=false;
    }
    if(val.property=="strCostCenter_NO"){
      this.blnfilterstrStock_Cod=false;
      this.blnfilterstrStock_Desc=false;
      this.blnfilterfltQuantity=false;
      this.blnfilterfltIssueRequest_QTY=false;
      this.blnfilterstrUM_Cod=false;
      this.blnfilterstrCostCenter_NO=true;
      this.blnfilterstrAcc_NO_Local=false;
      this.blnfilterstrDelivery_Place=false;
      this.blnfilterdtmDelivery_Date=false;
      this.blnfilterstrPriority_Cod=false;
    }
    if(val.property=="strAcc_NO_Local"){
      this.blnfilterstrStock_Cod=false;
      this.blnfilterstrStock_Desc=false;
      this.blnfilterfltQuantity=false;
      this.blnfilterfltIssueRequest_QTY=false;
      this.blnfilterstrUM_Cod=false;
      this.blnfilterstrCostCenter_NO=false;
      this.blnfilterstrAcc_NO_Local=true;
      this.blnfilterstrDelivery_Place=false;
      this.blnfilterdtmDelivery_Date=false;
      this.blnfilterstrPriority_Cod=false;
    }
    if(val.property=="strDelivery_Place"){
      this.blnfilterstrStock_Cod=false;
      this.blnfilterstrStock_Desc=false;
      this.blnfilterfltQuantity=false;
      this.blnfilterfltIssueRequest_QTY=false;
      this.blnfilterstrUM_Cod=false;
      this.blnfilterstrCostCenter_NO=false;
      this.blnfilterstrAcc_NO_Local=false;
      this.blnfilterstrDelivery_Place=true;
      this.blnfilterdtmDelivery_Date=false;
      this.blnfilterstrPriority_Cod=false;
    }
    if(val.property=="dtmDelivery_Date"){
      this.blnfilterstrStock_Cod=false;
      this.blnfilterstrStock_Desc=false;
      this.blnfilterfltQuantity=false;
      this.blnfilterfltIssueRequest_QTY=false;
      this.blnfilterstrUM_Cod=false;
      this.blnfilterstrCostCenter_NO=false;
      this.blnfilterstrAcc_NO_Local=false;
      this.blnfilterstrDelivery_Place=false;
      this.blnfilterdtmDelivery_Date=true;
      this.blnfilterstrPriority_Cod=false;
    }

    if(val.property=="strPriority_Cod"){
      this.blnfilterstrStock_Cod=false;
      this.blnfilterstrStock_Desc=false;
      this.blnfilterfltQuantity=false;
      this.blnfilterfltIssueRequest_QTY=false;
      this.blnfilterstrUM_Cod=false;
      this.blnfilterstrCostCenter_NO=false;
      this.blnfilterstrAcc_NO_Local=false;
      this.blnfilterstrDelivery_Place=false;
      this.blnfilterdtmDelivery_Date=false;
      this.blnfilterstrPriority_Cod=true;
    }

   var object=[ { TagId: 1, TagName: "C#", }, 
   { TagId: 3, TagName: "Visual Studio", },  
   { TagId: 4, TagName: "Fakes", },
   { TagId: 2, TagName: "Single Page Application", }, 
    ]

    console.log('headerclick',val)
    console.log(val)
    // this.CompleteData.sort(this.sortBy('intRequis_Item_NO',true));

   
  }
  sortByKeyDesc(array, key) {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        if(x === "" || y === null) return 1;
        if(x === "" || y === null) return -1;
        if(x === y) return 0;
          return ((x > y) ? -1 : ((x < y) ? 1 : 0));
       
    });
  }
  sortByKeyAsc(array, key) {
    return array.sort(function (a, b) {
        debugger;
        var x = a[key]; var y = b[key];
        if(x === "" || y === null) return 1;
        if(x === "" || y === null) return -1;
        if(x === y) return 0;
         return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        
    });
  }
  like(array, key,keyword) {
    
    var responsearr:any = []
    for(var i=0;i<array.length;i++) {
        if(array[i][key].toString().indexOf(keyword) > -1 ) {
          responsearr.push(array[i])
      }
    }
    return responsearr
  }

  Buscar(){
    debugger;
    if(this.Column!=""){
      this.dialogBusquedaFilter=true;
    }
    else{
      alert("Seleccione la columna");
    }
  }
  btnBuscar(){
    var data=this.like(this.CompleteData,this.clickColumn,this.txtbuscar)
    this.tableData1=data;
    console.log('-----like-----',data)
    this.dialogBusquedaFilter=false;
  }
  sortBy = (key, reverse) => {

      const moveSmaller = reverse ? 1 : -1;
  
    // Move larger items towards the front
    // or back of the array depending on if
    // we want to sort the array in reverse
    // order or not.
    const moveLarger = reverse ? -1 : 1;
  
    return (a, b) => {
      if (a[key] < b[key]) {
        return moveSmaller;
      }
      if (a[key] > b[key]) {
        return moveLarger;
      }
      return 0;
    };
  };
  async AscItem(){
    debugger;
    let loading = Loading.service({
      fullscreen: true,
      text: 'Cargando...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
    );
    console.log("asc",this.clickColumn)
    var data=await this.sortByKeyAsc(this.CompleteData,this.clickColumn) 
    this.CompleteData=data;
    this.tableData1 = await this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    await loading.close();
  }
  DscItem(){
    debugger;
    console.log("desc",this.clickColumn)
    var data=this.sortByKeyDesc(this.CompleteData,this.clickColumn) 
    this.CompleteData=data;
    this.tableData1 = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
  
  }
  anterior(){
    if(this.pagina>1){
    this.pagina--;
    this.tableData1 = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    }
  }
  
  nroLineaSelect(){
    debugger;
    if(!isNaN(this.txtnroline)){
      this.intlineaselect=parseInt(this.txtnroline)-1;
      var res:any;
      if(parseInt(this.txtnroline)>10){
        var ss=parseInt(this.txtnroline)%10;
        if(ss>0){
          res=ss-1;
          this.pagina=Math.floor(parseInt(this.txtnroline)/10)+1;
        }
        else{
          res=9;
          this.pagina=parseInt(this.txtnroline)/10;
        }
      }
      else{
        this.pagina=1;
        res=this.intlineaselect;
      }
      this.tableData1 = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      var document:any = this.$refs.missionTable;
      
      document.setCurrentRow(this.tableData1[res]);
    }

  }

  Limpiar(){
    debugger;
    this.CompleteData=this.CompleteData1;
    this.tableData1 = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    var document:any = this.$refs.missionTable;
    document.setCurrentRow(-1);

    this.blnfilterstrStock_Cod=false;
    this.blnfilterstrStock_Desc=false;
    this.blnfilterfltQuantity=false;
    this.blnfilterfltIssueRequest_QTY=false;
    this.blnfilterstrUM_Cod=false;
    this.blnfilterstrCostCenter_NO=false;
    this.blnfilterstrAcc_NO_Local=false;
    this.blnfilterstrDelivery_Place=false;
    this.blnfilterdtmDelivery_Date=false;
    this.blnfilterstrPriority_Cod=false;
    
    this.CompleteData=this.CompleteData1;
    this.tableData1 = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    var document:any = this.$refs.missionTable;
    //document.setCurrentRow(this.tableData[this.intlineaselect]);
  }
  Print(){
    window.print();
  }
  
  EliminarItem(){
    debugger;
    console.log(this.selectrow.intIssueAjust_Item);
    var item_nro=this.selectrow.intIssueAjust_Item-1;
    alert(item_nro);
    this.CompleteData.splice(item_nro, 1);
    for(var i=this.selectrow.intIssueAjust_Item-1;i<this.CompleteData.length;i++){
      this.CompleteData[i].intIssueAjust_Item=i+1;
    }
    this.CompleteData1=this.CompleteData;
    this.tableData1 = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
   
    console.log(this.CompleteData);
  }
  siguiente(){
    if(this.pagina<(this.totalRegistros/this.RegistersForPage)){
      this.pagina++;
      this.tableData1 = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    }
  }
  handleCurrentChange(val) {
    debugger;
    if(val!=undefined){
      if(val.intIssueAjust_Item==0){
        this.intlineaselect=0;  
      }
      else{
        this.intlineaselect=val.intIssueAjust_Item-1;
      }
      this.selectrow = val;
      
    }
  }
  getDateString(fecha:string){
    var dateString = new Date(fecha);
    var dia = dateString.getDate();
    var mes = (dateString.getMonth()<12) ? dateString.getMonth()+1 : mes = dateString.getMonth();
    var yyyy = dateString.getFullYear();
    var dd = (dia<10) ? '0'+dia : dd=dia;
    var mm = (mes<10) ? '0'+mes : mm=mes;
    return dd+'.'+mm+'.'+yyyy;
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
      seconds:0,
      percentage: '0',
    }
  }
  
}
