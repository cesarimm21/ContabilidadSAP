import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import BCompaniaProveedor from '@/components/buscadores/b_compania/b_compania.vue';
import BAlmacenComponent from '@/components/buscadores/b_almacen/b_almacen.vue';
import BCuentaContableComponent from '@/components/buscadores/b_cuenta_contable/b_cuenta_contable.vue';
import BClaseMaterialComponent from '@/components/buscadores/b_clase_material/b_clase_material.vue';
import BCategoriaMaterialComponent from '@/components/buscadores/b_categoria_material/b_categoria_material.vue';
import BCriticidadComponent from '@/components/buscadores/b_criticidad/b_criticidad.vue';
import BGrupoCompradorComponent from '@/components/buscadores/b_grupo_comprador/b_grupo_comprador.vue';
import BProveedorComponent from '@/components/buscadores/b_proveedor/b_proveedor.vue';
import BControlPrecioComponent from '@/components/buscadores/b_control_precio/b_control_precio.vue';
import BImpuestoComponent from '@/components/buscadores/b_impuesto/b_impuesto.vue';
import BUnidadMedidaComponent from '@/components/buscadores/b_unidad_medida/b_unidad_medida.vue';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
// import BCategoriaCuentaComponent from '@/components/buscadores/b_categoria_cuenta/b_categoria_cuenta.vue';
import BCategoriaLineaComponent from '@/components/buscadores/b_categoria_linea/b_categoria_linea.vue';
// import BMaterialComponent from '@/components/buscadores/b_material/b_material.vue';
// import BMonedaComponent from '@/components/buscadores/b_moneda/b_moneda.vue';
// import BPrioridadComponent from '@/components/buscadores/b_prioridad/b_prioridad.vue';
// import BCentroCostoComponent from '@/components/buscadores/b_centro_costo/b_centro_costo.vue';

import tipoRequisicionService from '@/components/service/tipoRequisicion.service';
import {TipoRequisicionModel} from '@/modelo/maestro/tipoRequisicion';
//***Modelos */
import {ProductoModel} from '@/modelo/maestro/producto';

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



import { Notification } from 'element-ui';
import Global from '@/Global';
import companiaService from '@/components/service/compania.service';
import almacenService from '@/components/service/almacen.service';
import clasematerialService from '@/components/service/clasematerial.service';
import criticidadService from '@/components/service/criticidad.service';
import proveedorService from '@/components/service/proveedor.service';
import cuentacontableService from '@/components/service/cuentacontable.service';
import categoriamaterialService from '@/components/service/categoriamaterial.service';
import grupocompradorService from '@/components/service/grupocomprador.service';
import controlprecioService from '@/components/service/controlprecio.service';
import impuestoService from '@/components/service/impuesto.service';
import unidadmedidaService from '@/components/service/unidadmedida.service';
import productoService from '@/components/service/producto.service';
import { ClaseMaterialModel } from '@/modelo/maestro/clasematerial';
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
  name: 'al-crear',
  components:{
    'buttons-accions':ButtonsAccionsComponent,
    'bcompania':BCompaniaProveedor,
    'balmacen':BAlmacenComponent,
    'bcuentacontable':BCuentaContableComponent,
    'bclasematerial':BClaseMaterialComponent,
    'bcategoriamaterial':BCategoriaMaterialComponent,
    'bcategorialinea':BCategoriaLineaComponent,
    'bcriticidad':BCriticidadComponent,
    'bgrupocomprador':BGrupoCompradorComponent,
    'bproveedor':BProveedorComponent,
    'bcontrolprecio':BControlPrecioComponent,
    'bimpuesto':BImpuestoComponent,
    'bunidadmedida':BUnidadMedidaComponent,
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
export default class CrearServicioMateComponent extends Vue {
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
  dialogClaseMaterial:boolean=false;
  dialogCategoriaMaterial:boolean=false;
  dialogCriticidad:boolean=false;
  dialogGrupoComprador:boolean=false;
  dialogControlPrecio:boolean=false;
  dialogImpuesto:boolean=false;

  /*input*/
  btnactivarcompania:boolean=false;
  btnactivarproveedor:boolean=false;
  btnactivaralmacen:boolean=false;
  btnactivarmaterial:boolean=false;
  btnactivarunidadmedida:boolean=false;
  btnactivarmoneda:boolean=false;
  btnactivarprioridad:boolean=false;
  btnactivarcentrocosto:boolean=false;
  btnactivarcuentacontable:boolean=false;
  btnactivarclasematerial:boolean=false;
  btnactivarcategoriamaterial:boolean=false;
  btnactivarcriticidad:boolean=false;
  btnactivargrupocomprador:boolean=false;
  btnactivarcontrolprecio:boolean=false;
  btnactivarimpuesto:boolean=false;
  
  /*Model*/
  public productoModel:ProductoModel=new ProductoModel();
  public clasematerialSelectModel:ClaseMaterialModel=new ClaseMaterialModel();

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
  
  code_compania:string='';
  desalmacen:string='';
  desclasematerial:string='';
  desCuentaGasto:string='';
  desunidadmedida:string='';
  descategoriamaterial:string='';
  desgrupocomprador:string='';
  descontrolprecio:string='';
  desimpuesto:string='';
  desproveedor:string='';
  descriticidad:string='';
  code_almacen:string='';
  cell_ocultar:string='transparent';
  value: string='';
  tableData1:any=[
    {
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
  ];
  
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
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  public tabletipoRequisicion:Array<TipoRequisicionModel>=[]; 
  public tableClaseMaterial:ClaseMaterialModel[]; 
  tableClaseMaterial1:ClaseMaterialModel[]; 

  valboolalmacen:boolean=false;
  valbooltipo:boolean=false;
  valboolcantmax:boolean=false;
  valboolcantmin:boolean=false;
  valboolclasem:boolean=false;
  valboolfactor:boolean=false;
  valboolunidadmedida:boolean=false;
  valboolproveedor:boolean=false;

  vifprogress:boolean=true;
  percentage:number;

  blnilterstrMatClass_Cod:boolean=true;
  blnilterstrExp_Cod_Loc:boolean=false;
  blnilterstrMatClass_Desc:boolean=false;
  clickColumn:string='';
  Column:string='';
  inputAtributo:any;
  loading1:boolean=true;
  constructor(){
    super();
    this.fecha_actual=Global.getParseDate(new Date().toDateString());
    
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
    setTimeout(() => {
      this.load();
    }, 200)
  }
  load(){    
    var desc:any=localStorage.getItem('compania_name');
    var cod:any=localStorage.getItem('compania_cod');
    this.productoModel.strCompany_Cod=cod;
    this.productoModel.strCompany_Desc=desc;
    this.productoModel.fltQtyLimit_Max=1;
    this.productoModel.fltQtyLimit_Min=1;
    this.productoModel.fltFactor=1;
    tipoRequisicionService.GetAllTipoRequisicion()
    .then(res=>{      
      this.tabletipoRequisicion=res;
      this.tiporequisicion="S";  
      clasematerialService.GetClaseMaterialServicio(this.productoModel.strCompany_Cod)
      .then(response=>{
        this.tableClaseMaterial=response;       
        this.tableClaseMaterial1=response;   
        this.loading1=false;    
      }).catch(error=>{
        this.$message({
          showClose: true,
          type: 'error',
          message: 'No se pudo cargar clase material'
        });
        this.loading1=false;    
      })    
    })
    .catch(error=>{
      console.log('error',error)
    })
  }

  fnOcultar(){
    this.ocultar=!this.ocultar;
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
  // handleCurrentChange(val) {
  //   
  //   if(val.date){
  //       return 'selected-row';
  //   }
  // }
  handleCurrentChange(val){
    this.clasematerialSelectModel=val;
  }
  /*Compania imput*/
  activar_control_precio(){
    setTimeout(() => {
      this.limpiarBotones();
      this.btnactivarcontrolprecio=true;
    }, 120)
  }
  activar_cuenta_contable(){
    setTimeout(() => {
      this.limpiarBotones();
      this.btnactivarcuentacontable=true;
    }, 120)
  }
  desactivar_unidad_medida(){
    
    if(this.dialogUnidadMedida){
      this.btnactivarunidadmedida=false;
    }
  }
  desactivar_impuesto(){
    
    if(this.dialogImpuesto){
      this.btnactivarimpuesto=false;
    }
  }
  desactivar_control_precio(){
    
    if(this.dialogControlPrecio){
      this.btnactivarcontrolprecio=false;
    }
  }
  desactivar_clase_material(){
    
    if(this.dialogClaseMaterial){
      this.btnactivarclasematerial=false;
    }
  }
  desactivar_criticidad(){
    
    if(this.dialogCriticidad){
      this.btnactivarcriticidad=false;
    }
  }
  desactivar_grupo_comprador(){
    
    if(this.dialogGrupoComprador){
      this.btnactivargrupocomprador=false;
    }
  }
  desactivar_categoria_material(){
    
    if(this.dialogCategoriaMaterial){
      this.btnactivarcategoriamaterial=false;
    }
  }
  desactivar_cuenta_contable(){
    
    if(this.dialogCuentaContable){
      this.btnactivarcuentacontable=false;
    }
  }
  /*Proveedor imput*/
  activar_proveedor(){
    setTimeout(() => {
      this.limpiarBotones();
      this.btnactivarproveedor=true;
    }, 120)
  }
  activar_impuesto(){
    setTimeout(() => {
      this.limpiarBotones();
      this.btnactivarimpuesto=true;
    }, 120)
  }
  activar_clase_material(){
    setTimeout(() => {
      this.limpiarBotones();
      this.btnactivarclasematerial=true;
    }, 120)
  }
  activar_unidad_medida(){
    setTimeout(() => {
      this.limpiarBotones();
      this.btnactivarunidadmedida=true;
    }, 120)
  }
  activar_grupo_comprador(){
    setTimeout(() => {
      this.limpiarBotones();
      this.btnactivargrupocomprador=true;
    }, 120)
  }
  activar_criticidad(){
    setTimeout(() => {
      this.limpiarBotones();
      this.btnactivarcriticidad=true;
    }, 120)
  }
  activar_categoria_material(){
    setTimeout(() => {
      this.limpiarBotones();
      this.btnactivarcategoriamaterial=true;
    }, 120)
  }
  desactivar_proveedor(){
    
    if(this.dialogProveedor){
      this.btnactivarproveedor=false;
    }
  }
  closeProveedor(){
    
    this.btnactivarproveedor=false;
    return false;
  }

  /*Almacen imput*/
  activar_almacen(){
    setTimeout(() => {
      this.limpiarBotones();
      this.btnactivaralmacen=true;
    }, 120)
  }
  desactivar_almacen(){
    
    if(this.dialogAlmacen){
      this.btnactivaralmacen=false;
    }
  }
  closeAlmacen(){
    this.btnactivaralmacen=false;
    return false;
  }
  activar_descripcion(){
    this.btnactivaralmacen=false;
    this.btnactivarproveedor=false;
    this.btnactivarcompania=false
  }
  activar_tipo_requisicion(value){
    
    setTimeout(() => {
      this.productoModel.strMaterial_Class="";
      this.productoModel.intIdMatClass_ID=-1;
      this.productoModel.strMatClass_Desc="";
      this.desclasematerial="";
      this.dialogClaseMaterial=false;
    }, 200)
  }

  /*tabla metodos*/
  handleBlur(event) {
    
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
  LoadCuentaContable(){
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
  LoadProveedor(){
    //this.selectrow=row;
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
    
    this.bln_tbl_categoria_cuenta=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  clickcategorialinea(event,edit,column){
    
    this.bln_tbl_categoria_linea=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  clickcuentacontable(event,edit,column){
    
    this.bln_tbl_cuenta_contable=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  clickmaterial(event,edit,column){
    
    this.bln_tbl_material=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  clickmaterialdescripcion(event,edit,column){
    
    this.bln_tbl_material_descripcion=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  clickcantidad(event,edit,column){
    
    this.bln_tbl_cantidad=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  clickunidadmedida(event,edit,column){
    
    this.bln_tbl_unidad_medida=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  clickproveedor(event,edit,column){
    
    this.bln_tbl_proveedor=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  clickmoneda(event,edit,column){
    
    this.bln_tbl_moneda=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  clickprioridad(event,edit,column){
    
    this.bln_tbl_prioridad=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  clickfechaestimada(event,edit,column){
    
    this.bln_tbl_fecha_estimada=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  clickcentrocosto(event,edit,column){
    
    this.bln_tbl_centro_costo=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  getParseDate(fecha){
    return Global.getParseDate(fecha);
  }
  criticidadClose(val){
    this.dialogCriticidad=false;
  }
  clasematerialClose(val){
    this.dialogClaseMaterial=false;
  }
  companiaAlmacen(val){
    this.dialogAlmacen=false;
  }
  SeleccionadoImpuesto(val){
    
    this.productoModel.strWH_Cod=val.strWH_Cod
    this.productoModel.strWH_Desc=val.strWH_Desc
    this.productoModel.intIdCommTax_ID=val.intIdWH_ID
    this.desimpuesto=val.strWH_Desc;
    this.dialogImpuesto=false;
  }
  SeleccionadoCategoriaMaterial(val){
    
    this.productoModel.strMaterial_Categ=val.strCategItem_Cod;
    this.productoModel.intIdCategMat_ID=val.intIdCategLine_ID;
    this.productoModel.strCategMat_Desc=val.strCategItem_Desc;
    this.descategoriamaterial=val.strCategItem_Desc;
    this.dialogCategoriaMaterial=false;
  }
  SeleccionadoControlPrecio(val){
    
    this.productoModel.fltPriceControl=val.strCtlPrec_Cod;
    this.productoModel.intIdCtlPrec_ID=val.intIdCtlPrec_ID;
    this.productoModel.strCtlPrec_Desc=val.strCtlPrec_Desc;
    this.descontrolprecio=val.strCtlPrec_Desc;
    this.dialogControlPrecio=false;
  }
  grupocompradorSeleccionado(val){
    
    this.productoModel.strGrpPurch_Cod=val.strGrpPurch_Cod;
    this.productoModel.intIdGrpPurch_ID=val.intIdGrpPurch_ID;
    this.productoModel.strGrpPurch_Desc=val.strGrpPurch_Desc;
    this.desgrupocomprador=val.strGrpPurch_Desc;
    this.dialogGrupoComprador=false;
  }
  controlprecioClose(){
    this.dialogControlPrecio=false;
  }
  impuestoClose(){
    this.dialogImpuesto=false;
  }
  unidadmedidaClose(){
    this.dialogUnidadMedida=false;
  }
  criticidadSeleccionado(val){
    
    this.productoModel.strCritical_Item=val.strCritical_Cod;
    this.productoModel.intIdCritical_ID=val.intIdCritical_ID;
    this.productoModel.strCritical_Desc=val.strCritical_Desc;
    this.descriticidad=val.strCritical_Desc;
    this.dialogCriticidad=false;
  }
  SeleccionadoAlmacen(val){
    this.productoModel.strWHS_Cod=val.strWHS_Cod;
    this.productoModel.intIdWHS_Stat_ID=val.intIdWHS_ID;
    this.productoModel.strWHS_Desc=val.strWHS_Desc;
    this.desalmacen=val.strWHS_Desc;
    this.dialogAlmacen=false;
  }
  SeleccionadoClaseMaterial(val){
    
    this.productoModel.strMaterial_Class=this.clasematerialSelectModel.strMatClass_Cod;
    this.productoModel.intIdMatClass_ID=this.clasematerialSelectModel.intIdMatClass_ID;
    this.productoModel.strMatClass_Desc=this.clasematerialSelectModel.strMatClass_Desc;
    this.productoModel.strExp_Acct=this.clasematerialSelectModel.strExp_Cod_Loc;
    this.productoModel.strAcc_Desc=this.clasematerialSelectModel.strExp_Desc_Loc;
    this.desclasematerial=this.clasematerialSelectModel.strMatClass_Desc;
    this.dialogClaseMaterial=false;
  }
  SeleccionadoCategoriaCuenta(val){
    this.selectrow.categoriacuenta=val.CODIGO;
    this.dialogCategoriaCuenta=false;
  }
  SeleccionadoCategoriaLinea(val){
    
    this.selectrow.categorialinea=val.CODIGO;
    this.dialogCategoriaLinea=false;
  }
  SeleccionadoCentroCosto(val){
    
    this.selectrow.centrocosto=val.CostCenter_NO;
    this.dialogCentroCostos=false;
  }
  SeleccionadoCuentaContable(val){
    
    this.productoModel.strExp_Acct=val.strAcc_Local_NO;
    this.productoModel.intIdAcctCont_ID=val.intIdAcctCont_ID;
    this.productoModel.strAcc_Desc=val.strAcc_Local_Name;
    this.desCuentaGasto=val.strAcc_Desc;
    this.dialogCuentaContable=false;
  }
  SeleccionadoMaterial(val){
    
    this.selectrow.material=val.Stock_Cod;
    this.dialogMaterial=false;
  }
  SeleccionadoUnidadMedida(val){
    
    this.productoModel.strUM_Cod=val.strUM_Cod;
    this.productoModel.intIdUnidadMedida=val.intUnit_Measure_ID;
    this.productoModel.strUM_Desc=val.strUM_Desc;
    this.desunidadmedida=val.strUM_Desc;
    this.dialogUnidadMedida=false;
  }
  SeleccionadoProveedor(val){
    

    this.productoModel.strVendor_NO=val.strVendor_NO;
    this.productoModel.intIdVendor_ID=val.intIdVendor_ID;
    this.productoModel.strVendor_Desc=val.strVendor_Desc;
    this.desproveedor=val.strVendor_Desc;
    this.dialogProveedor=false;
  }
  SeleccionadoMoneda(val){
    
    this.selectrow.moneda=val.CODIGO;
    this.dialogMoneda=false;
  }
  SeleccionadoPrioridad(val){
    
    this.selectrow.prioridad=val.CODIGO;
    this.dialogPrioridad=false;
  }
  loadClaseMaterial(){
    this.dialogClaseMaterial=true;    
  }
  loadCategoriaMaterial(){
    this.dialogCategoriaMaterial=true;
  }
  loadCriticidad(){
    this.dialogCriticidad=true;
  }
  loadGrupoComprador(){
    this.dialogGrupoComprador=true;
  }
  loadControlPrecio(){
    this.dialogControlPrecio=true;
  }
  loadImpuesto(){
    this.dialogImpuesto=true;
  }
  loadUnidadMedida(){
    this.dialogUnidadMedida=true;
  }
  limpiarBotones(){
      this.btnactivarcompania=false;
      this.btnactivarcuentacontable=false;
      this.btnactivarproveedor=false;
      this.btnactivaralmacen=false;
      this.btnactivarmaterial=false;
      this.btnactivarunidadmedida=false;
      this.btnactivarmoneda=false;
      this.btnactivarprioridad=false;
      this.btnactivarcentrocosto=false;
      this.btnactivarclasematerial=false;
      this.btnactivarcategoriamaterial=false;
      this.btnactivarcriticidad=false;
      this.btnactivargrupocomprador=false;
      this.btnactivarcontrolprecio=false;
      this.btnactivarimpuesto=false;
  }
  
  closeImpuesto(){
    
    this.btnactivarimpuesto=false;
    return false;
  }
  proveedorClose(){
    this.dialogProveedor=false;
  }
  cuentacontableClose(){
    this.dialogCuentaContable=false;
  }
  categoriamaterialClose(){
    this.dialogCategoriaMaterial=false;
  }
  grupocompradorClose(){
    this.dialogGrupoComprador=false;
  }
  closeControlPrecio(){
    
    this.btnactivarcontrolprecio=false;
    return false;
  }
  closeGrupoComprador(){
    
    this.btnactivargrupocomprador=false;
    return false;
  }
  closeCriticidad(){
    
    this.btnactivarcriticidad=false;
    return false;
  }
  closeCategoriaMaterial(){
    
    this.btnactivarcategoriamaterial=false;
    this.dialogCategoriaMaterial=false;
    return false;
  }
  closeClaseMaterial(){
    
    this.btnactivarclasematerial=false;
    this.dialogClaseMaterial=false;
    return false;
  }
  closeCentroCostos(){
    
    this.btnactivarcentrocosto=false;
    return false;
  }
  closePrioridad(){
    
    this.btnactivarprioridad=false;
    return false;
  }
  closeMoneda(){
    
    this.btnactivarmoneda=false;
    return false;
  }
  closeUnidadMedida(){
    
    this.btnactivarunidadmedida=false;
    return false;
  }
  closeMaterial(){
    
    this.btnactivarmaterial=false;
    return false;
  }
  closeCuentaContable(){
    
    this.btnactivarcuentacontable=false;
    return false;
  }
  borrarAlmacen(){
    this.desalmacen='';
    this.productoModel.strWHS_Desc='';
    this.dialogAlmacen=false;
    this.btnactivaralmacen=false;
  }
  enterAlmacen(code){
    //alert('Bien'+code);
    
    almacenService.GetOnlyOneAlmacen(code)
    .then(response=>{
      
      if(response!=undefined){
        if(response.length>0){
          this.productoModel.strWHS_Cod=response[0].strWHS_Cod
          this.productoModel.intIdWHS_Stat_ID=response[0].intIdWHS_Stat_ID;
          this.productoModel.strWHS_Desc=response[0].strWHS_Desc;
          this.desalmacen=response[0].strWHS_Desc;
          this.dialogAlmacen=false;
          this.btnactivaralmacen=false;
        }
      }
      //this.unidadmedidaModel=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar almacen'
      });
    })
  }
  borrarClaseMaterial(){
    this.desclasematerial='';
    this.productoModel.strMatClass_Desc='';
    this.dialogClaseMaterial=false;
    this.btnactivarclasematerial=false;
  }
  enterClaseMaterial(code){
    //alert('Bien'+code);
    
    clasematerialService.GetOnlyOneClaseMaterial(code)
    .then(response=>{
      
      if(response!=undefined){
        if(response.length>0){
          this.productoModel.strMaterial_Class=response[0].strMatClass_Cod;
          this.productoModel.intIdMatClass_ID=response[0].intIdMatClass_ID;
          this.productoModel.strMatClass_Desc=response[0].strMatClass_Desc;
          this.desclasematerial=response[0].strMatClass_Desc;
          this.dialogClaseMaterial=false;
          this.btnactivarclasematerial=false;
        }
      }
      //this.unidadmedidaModel=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar clase material'
      });
    })
  }
  borrarCriticidad(){
    this.desclasematerial='';
    this.productoModel.strMatClass_Desc='';
    this.dialogClaseMaterial=false;
    this.btnactivarclasematerial=false;
  }
  enterCriticidad(code){
    //alert('Bien'+code);
    
    criticidadService.GetOnlyOneCriticidad(code)
    .then(response=>{
      
      if(response!=undefined){
        if(response.length>0){
          this.productoModel.strCritical_Item=response[0].strCritical_Cod;
          this.productoModel.intIdCritical_ID=response[0].intIdCritical_ID;
          this.productoModel.strCritical_Desc=response[0].strCritical_Desc;
          this.descriticidad=response[0].strCritical_Desc;
          this.dialogCriticidad=false;
          this.btnactivarcriticidad=false;
        }
      }
      //this.unidadmedidaModel=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar criticidad'
      });
    })
  }
  borrarProveedor(){
    this.desproveedor='';
    this.productoModel.strVendor_Desc='';
    this.dialogProveedor=false;
    this.btnactivarproveedor=false;
  }
  enterProveedor(code){
    //alert('Bien'+code);
    
    proveedorService.GetOnlyOneProveedor(code)
    .then(response=>{
      
      if(response!=undefined){
        if(response.length>0){
          this.productoModel.strVendor_NO=response[0].strVendor_NO;
          this.productoModel.intIdVendor_ID=response[0].intIdVendor_ID;
          this.productoModel.strVendor_Desc=response[0].strVendor_Desc;
          this.desproveedor=response[0].strVendor_Desc;
          this.dialogProveedor=false;
          this.btnactivarproveedor=false;
        }
      }
      //this.unidadmedidaModel=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar proveedor'
      });
    })
  }
  borrarCuentaGastos(){
    this.desCuentaGasto='';
    this.productoModel.strAcc_Desc='';
    this.dialogCuentaContable=false;
    this.btnactivarcuentacontable=false;
  }
  enterCuentaGastos(code){
    //alert('Bien'+code);
    
    cuentacontableService.GetOnlyOneCuentaGastos(code)
    .then(response=>{
      
      if(response!=undefined){
        if(response.length>0){
          this.productoModel.strExp_Acct=response[0].strAcct_NO_Corp;
          this.productoModel.intIdAcctCont_ID=response[0].intIdAcctCont_ID;
          this.productoModel.strAcc_Desc=response[0].strAcc_Desc;
          this.desCuentaGasto=response[0].strAcc_Desc;
          this.dialogCuentaContable=false;
          this.btnactivarcuentacontable=false;
        }

      }
      //this.unidadmedidaModel=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar cuenta contable'
      });
    })
  }
  borrarCategoriaMaterial(){
    this.descategoriamaterial='';
    this.productoModel.strCategMat_Desc='';
    this.dialogCategoriaMaterial=false;
    this.btnactivarcategoriamaterial=false;
  }
  enterCategoriaMaterial(code){
    //alert('Bien'+code);
    
    categoriamaterialService.GetOnlyOneCategoriaMaterial(code)
    .then(response=>{
      
      if(response!=undefined){
        if(response.length>0){
          this.productoModel.strMaterial_Categ=response[0].strCategMat_Cod;
          this.productoModel.intIdCategMat_ID=response[0].intIdCategMat_ID;
          this.productoModel.strCategMat_Desc=response[0].strCategMat_Desc;
          this.descategoriamaterial=response[0].strCategMat_Desc;
          this.dialogCategoriaMaterial=false;
          this.btnactivarcategoriamaterial=false;
        }

      }
      //this.unidadmedidaModel=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar categoria material'
      });
    })
  }
  borrarGrupoComprador(){
    this.desgrupocomprador='';
    this.productoModel.strGrpPurch_Desc='';
    this.dialogGrupoComprador=false;
    this.btnactivargrupocomprador=false;
  }
  enterGrupoComprador(code){
    //alert('Bien'+code);
    
    grupocompradorService.GetOnlyOneGrupoComprador(code)
    .then(response=>{
      
      if(response!=undefined){
        if(response.length>0){
          this.productoModel.strGrpPurch_Cod=response[0].strGrpPurch_Cod;
          this.productoModel.intIdGrpPurch_ID=response[0].intIdGrpPurch_ID;
          this.productoModel.strGrpPurch_Desc=response[0].strGrpPurch_Desc;
          this.desgrupocomprador=response[0].strGrpPurch_Desc;
          this.dialogGrupoComprador=false;
          this.btnactivargrupocomprador=false;
        }

      }
      //this.unidadmedidaModel=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar grupo comprador'
      });
    })
  }
  borrarControlPrecio(){
    this.descontrolprecio='';
    this.productoModel.strCtlPrec_Desc='';
    this.dialogControlPrecio=false;
    this.btnactivarcontrolprecio=false;
  }
  enterControlPrecio(code){
    //alert('Bien'+code);
    
    controlprecioService.GetOnlyOneControlPrecio(code)
    .then(response=>{
      
      if(response!=undefined){
        if(response.length>0){
          this.productoModel.fltPriceControl=response[0].strCtlPrec_Cod;
          this.productoModel.intIdCtlPrec_ID=response[0].intIdCtlPrec_ID;
          this.productoModel.strCtlPrec_Desc=response[0].strCtlPrec_Desc;
          this.descontrolprecio=response[0].strCtlPrec_Desc;
          this.dialogControlPrecio=false;
          this.btnactivarcontrolprecio=false;
        }
      }
      //this.unidadmedidaModel=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar control precio'
      });
    })
  }
  borrarImpuesto(){
    this.desimpuesto='';
    this.dialogImpuesto=false;
    this.btnactivarimpuesto=false;
  }
  enterImpuesto(code){
    //alert('Bien'+code);
    
    impuestoService.GetOnlyOneImpuesto(code)
    .then(response=>{
      
      if(response!=undefined){
        if(response.length>0){
          this.productoModel.strWH_Cod=response[0].strWH_Cod;
          this.productoModel.strWH_Desc=response[0].strWH_Desc;
          this.productoModel.intIdCommTax_ID=response[0].intIdCommTax_ID;
          this.desimpuesto=response[0].strWH_Desc;
          this.dialogImpuesto=false;
          this.btnactivarimpuesto=false;
        }
      }
      //this.unidadmedidaModel=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar impuesto'
      });
    })
  }
  
  borrarUnidadMedida(){
    this.desunidadmedida='';
    this.productoModel.strUM_Desc='';
    this.dialogUnidadMedida=false;
    this.btnactivarunidadmedida=false;
  }
  enterUnidadMedida(code){
    //alert('Bien'+code);
    
    unidadmedidaService.GetOnlyOneUnidadMedida(code)
    .then(response=>{
      
      if(response!=undefined){
        if(response.length>0){
          this.productoModel.strUM_Cod=response[0].strUM_Cod;
          this.productoModel.intIdUnidadMedida=response[0].intIdUnidadMedida;
          this.productoModel.strUM_Desc=response[0].strUM_Desc;
          this.desunidadmedida=response[0].strUM_Desc;
          this.dialogUnidadMedida=false;
          this.btnactivarunidadmedida=false;
        }
      }
      //this.unidadmedidaModel=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar unidad medida'
      });
    })
  }

  guardar(){
    this.SendDocument=true;
  }
  cambioTipoRequisicion(selected){
    if(this.tiporequisicion!=selected){
      this.tiporequisicion=selected;
    }
    console.log('select',selected);
  }
  validador(){    
    if(this.productoModel.strUM_Cod==undefined){
      return true;
    }
    if(this.tiporequisicion==""){
      return true;
    }
    if(this.productoModel.fltQtyLimit_Min<=0){
      return true;
    }
    if(this.productoModel.intIdMatClass_ID==undefined){
      return true;
    }
    if(this.productoModel.fltFactor<=0){
      return true;
    }
    if(this.productoModel.intIdUnidadMedida==undefined){
      return true;
    }
    return false;
  }

  guardarTodo(){
    this.issave=false;
    this.iserror=false; 
    if(!this.validador()){
      this.productoModel.intIdWHS_Stat_ID=1;
      this.productoModel.intIdCommTax_ID=1;      
      this.productoModel.strWHS_Status='A';
      this.productoModel.strStock_Type=this.tiporequisicion;
      var user:any=localStorage.getItem('User_Usuario');
      this.productoModel.strCreation_User=user;
      for(var i=0;i<this.tabletipoRequisicion.length;i++){
        if(this.tabletipoRequisicion[i].strTypeReq_Cod==this.tiporequisicion){
          this.productoModel.strStock_Type_Desc=this.tabletipoRequisicion[i].strTipReq_Desc;
        }
      }
      let loadingInstance = Loading.service({
        fullscreen: true,
        text: 'Guardando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
        );
      productoService.saveProducto(this.productoModel)
      .then(res=>{ 
        loadingInstance.close();
        this.productoModel=new ProductoModel();
        this.load();
        setTimeout(() => {   
          this.issave=true;
          this.textosave='Se guardo correctamente. '+ res.strStock_Cod;
          this.$message({
            showClose: true,
            type: 'success',
            message: 'Se guardo correctamente.'
          });
        }, 600)
       
      }).catch(error=>{
        loadingInstance.close();
        this.iserror=true; 
        this.$message({
          showClose: true,
          type: 'error',
          message: 'No se pudo guardar servicio'
        });
      })
    }
    else{
      this.issave=false;
      this.iserror=true;
      this.textosave='No se pudo guardar. Revise los datos'
    }
  }
  buscarClaseMaterial(){
    var data=Global.like(this.tableClaseMaterial1,this.clickColumn,this.inputAtributo)
    this.tableClaseMaterial=[];
    this.tableClaseMaterial=data;
  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strMatClass_Cod"){
      this.clickColumn=val.property;  
      this.inputAtributo='';  
      this.blnilterstrMatClass_Cod=true;
      this.blnilterstrExp_Cod_Loc=false;
      this.blnilterstrMatClass_Desc=false;
    }
    if(val.property=="strExp_Cod_Loc"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrMatClass_Cod=false;
      this.blnilterstrExp_Cod_Loc=true;
      this.blnilterstrMatClass_Desc=false;
    }
    if(val.property=="strMatClass_Desc"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrMatClass_Cod=false;
      this.blnilterstrExp_Cod_Loc=false;
      this.blnilterstrMatClass_Desc=true;
    }
  }
  filterstrMatClass_Cod(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnilterstrMatClass_Cod){
      this.Column=column1;
      this.clickColumn=column.property;
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
  filterstrExp_Cod_Loc(h,{column,$index}){
    if(this.blnilterstrExp_Cod_Loc){
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
  filterstrMatClass_Desc(h,{column,$index}){
    if(this.blnilterstrMatClass_Desc){
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
  backPage(){
    window.history.back();
  }
  reloadpage(){
    window.location.reload();
  }
  data(){
    return{
      dialogTableVisible: false,
      dialogVisible:false,
      tableDataServicio:[{}],
      tableClaseMaterial:[],
      tableClaseMaterial1:[],
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
      loading1:true
    }
  }
  
}
