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
import VisualizarMaterialComponent from '@/components/LO-LOGISTICA/almacen/al_visualizar/al_visualizar.vue';
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
import BCategoriaLineaComponent from '@/components/buscadores/b_categoria_linea/b_categoria_linea.vue';
import tipoRequisicionService from '@/components/service/tipoRequisicion.service';
import {TipoRequisicionModel} from '@/modelo/maestro/tipoRequisicion';

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
    'bcriticidad':BCriticidadComponent,
    'bgrupocomprador':BGrupoCompradorComponent,
    'bproveedor':BProveedorComponent,
    'bcontrolprecio':BControlPrecioComponent,
    'bimpuesto':BImpuestoComponent,
    'bunidadmedida':BUnidadMedidaComponent,
    'quickaccessmenu':QuickAccessMenuComponent,
    'alvisualizar':VisualizarMaterialComponent,
    'bcategorialinea':BCategoriaLineaComponent,
  } ,
})
export default class ModificarMaterialComponent extends Vue {
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
  visualizar:boolean;
  public clasematerialSelectModel:ClaseMaterialModel=new ClaseMaterialModel();
  public tableClaseMaterial:Array<ClaseMaterialModel>=[]; 
  public tabletipoRequisicion:Array<TipoRequisicionModel>=[]; 
  
  tiporequisicionant:string='';
  vifprogress:boolean=true;
  percentage:number;

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
      this.Load();
    }, 200)
  }
  Load(){
    debugger;
    var view = this.$route.query.vista;
    var object = JSON.parse(this.$route.query.data);
    if(view==="visualizar"){
      this.visualizar=true;
    }
    else{
      this.visualizar=false;
    }
    let loading = Loading.service({
      fullscreen: true ,
      spinner: 'el-icon-loading',
      text:'Cargando...'
    });
    var id=object.strStock_Cod;
    productoService.GetOnlyOneProducto(id)
    .then(response=>{
      debugger;
      if(response!=undefined){
        this.productoModel=response[0];
        this.desimpuesto=this.productoModel.strWH_Desc;
        if(response[0].intIdUnidadMedida!=null){
          var _unidadmedida=response[0].intIdUnidadMedida;
          this.productoModel.intIdUnidadMedida=_unidadmedida.intUnit_Measure_ID;
        }
        if(response[0].intIdVendor_ID!=null){
          var _vendor=response[0].intIdVendor_ID;
          this.productoModel.intIdVendor_ID=_vendor.intIdVendor_ID;
        }
        if(response[0].intIdMatClass_ID!=null){
          var _class=response[0].intIdMatClass_ID;
          this.productoModel.intIdMatClass_ID=_class.intIdMatClass_ID;
          
        }
        console.log('cargar-Material:',response);
        loading.close();
        tipoRequisicionService.GetAllTipoRequisicion()
        .then(res=>{
          debugger;
          this.tabletipoRequisicion=res;
          this.tiporequisicion="A";    
          this.tiporequisicionant='A';
          clasematerialService.GetAllClaseMaterial()
          .then(response=>{
            this.tableClaseMaterial=response;    
            this.tableClaseMaterial=[];
              clasematerialService.GetTypeClaseMaterial(this.tiporequisicion)
                .then(response=>{
                  this.tableClaseMaterial=response;       
                }).catch(error=>{
                  this.$message({
                    showClose: true,
                    type: 'error',
                    message: 'No se pudo cargar clase material'
                  });
                })   
          }).catch(error=>{
            this.$message({
              showClose: true,
              type: 'error',
              message: 'No se pudo cargar clase material'
            });
          })
        })
        .catch(error=>{
          console.log('error',error)
        })
      }
      //this.unidadmedidaModel=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar el Material'
      });
      loading.close();
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
  loadCompania(){
    this.dialogCompania=true;
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
  // handleCurrentChange(val) {
  //   debugger;
  //   if(val.date){
  //       return 'selected-row';
  //   }
  // }
  handleCurrentChangeM(val){
    this.clasematerialSelectModel=val;
  }
  /*Compania imput*/
  activar_compania(){
    setTimeout(() => {
      this.limpiarBotones();
      this.btnactivarcompania=true;
    }, 120)
  }
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
  desactivar_compania(){
    debugger;
    if(this.dialogCompania){
      this.btnactivarcompania=false;
    }
  }
  desactivar_unidad_medida(){
    debugger;
    if(this.dialogUnidadMedida){
      this.btnactivarunidadmedida=false;
    }
  }
  desactivar_impuesto(){
    debugger;
    if(this.dialogImpuesto){
      this.btnactivarimpuesto=false;
    }
  }
  desactivar_control_precio(){
    debugger;
    if(this.dialogControlPrecio){
      this.btnactivarcontrolprecio=false;
    }
  }
  desactivar_clase_material(){
    debugger;
    if(this.dialogClaseMaterial){
      this.btnactivarclasematerial=false;
    }
  }
  desactivar_criticidad(){
    debugger;
    if(this.dialogCriticidad){
      this.btnactivarcriticidad=false;
    }
  }
  desactivar_grupo_comprador(){
    debugger;
    if(this.dialogGrupoComprador){
      this.btnactivargrupocomprador=false;
    }
  }
  desactivar_categoria_material(){
    debugger;
    if(this.dialogCategoriaMaterial){
      this.btnactivarcategoriamaterial=false;
    }
  }
  desactivar_cuenta_contable(){
    debugger;
    if(this.dialogCuentaContable){
      this.btnactivarcuentacontable=false;
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
      this.limpiarBotones();
      this.btnactivaralmacen=true;
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
    // console.log("activar_tipo_requisicion");
    // this.tiporequisicion=value;
    // if(value=='N'){
    //   this.cell_ocultar='transparent';
    //   this.blntiporequisicion=true;
    // }
    // else{
    //   this.cell_ocultar='#e4e2e2';        
    //   this.blntiporequisicion=false;
    // }
    // this.btnactivaralmacen=false;
    // this.btnactivarproveedor=false;
    // this.btnactivarcompania=false
    setTimeout(() => {
      this.productoModel.strMaterial_Class="";
      this.productoModel.intIdMatClass_ID=-1;
      this.productoModel.strMatClass_Desc="";
      this.desclasematerial="";
      this.dialogClaseMaterial=false;
      console.log('activar_tipo_requisicion',this.tiporequisicion);
    }, 200)
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
  companiaSeleccionado(val){
    debugger;
    console.log('traer',val);
    this.productoModel.strCompany_Cod=val.strCompany_Cod
    this.descompania=val.strCompany_Desc;
   
    this.dialogCompania=false;
  }
  companiaClose(val){
    this.dialogCompania=false;
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
    debugger;
    this.productoModel.strWH_Cod=val.strWH_Cod
    this.productoModel.strWH_Desc=val.strWH_Desc
    this.productoModel.intIdCommTax_ID=val.intIdWH_ID
    this.productoModel.strWHS_Desc=val.strWH_Desc
    this.desimpuesto=val.strWH_Desc;
    this.dialogImpuesto=false;
  }
  SeleccionadoCategoriaMaterial(val){
    debugger;
    this.productoModel.strMaterial_Categ=val.strCategItem_Cod;
    this.productoModel.intIdCategMat_ID=val.intIdCategLine_ID;
    this.productoModel.strCategMat_Desc=val.strCategItem_Desc;
    this.descategoriamaterial=val.strCategItem_Desc;
    this.dialogCategoriaMaterial=false;
  }
  SeleccionadoControlPrecio(val){
    debugger;
    this.productoModel.fltPriceControl=val.strCtlPrec_Cod;
    this.productoModel.intIdCtlPrec_ID=val.intIdCtlPrec_ID;
    this.productoModel.strCtlPrec_Desc=val.strCtlPrec_Desc;
    this.descontrolprecio=val.strCtlPrec_Desc;
    this.dialogControlPrecio=false;
  }
  grupocompradorSeleccionado(val){
    debugger;
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
    debugger;
    this.productoModel.strCritical_Item=val.strCritical_Cod;
    this.productoModel.intIdCritical_ID=val.intIdCritical_ID;
    this.productoModel.strCritical_Desc=val.strCritical_Desc;
    this.descriticidad=val.strCritical_Desc;
    this.dialogCriticidad=false;
  }
  SeleccionadoAlmacen(val){
    debugger;
    console.log('traer',val);
    this.productoModel.strWHS_Cod=val.strWHS_Cod;
    this.desalmacen=val.strWHS_Desc;
    this.productoModel.strWHS_Desc=val.strWHS_Desc;
    this.dialogAlmacen=false;
  }
  SeleccionadoClaseMaterial(val){
  debugger;
    this.productoModel.strMaterial_Class=this.clasematerialSelectModel.strMatClass_Cod;
    this.productoModel.strMatClass_Desc=this.clasematerialSelectModel.strMatClass_Desc;
    this.productoModel.intIdMatClass_ID=this.clasematerialSelectModel.intIdMatClass_ID;
    this.desclasematerial=this.clasematerialSelectModel.strMatClass_Desc;
    this.productoModel.strExp_Acct=this.clasematerialSelectModel.strExp_Cod_Loc;
    this.productoModel.strAcc_Desc=this.clasematerialSelectModel.strExp_Desc_Loc;
   this.dialogClaseMaterial=false;
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
    this.selectrow.centrocosto=val.CostCenter_NO;
    this.dialogCentroCostos=false;
  }
  SeleccionadoCuentaContable(val){
    debugger;
    this.productoModel.strExp_Acct=val.strAcc_NO_Corp;
    this.productoModel.intIdAcctCont_ID=val.intIdAcctCont_ID;
    this.productoModel.strAcc_Desc=val.strAcc_Desc;
    this.desCuentaGasto=val.strAcc_Desc;
    this.dialogCuentaContable=false;
  }
  SeleccionadoMaterial(val){
    debugger;
    this.selectrow.material=val.Stock_Cod;
    this.dialogMaterial=false;
  }
  SeleccionadoUnidadMedida(val){
    debugger;
    this.productoModel.strUM_Cod=val.strUM_Cod;
    this.productoModel.intIdUnidadMedida=val.intUnit_Measure_ID;
    this.productoModel.strUM_Desc=val.strUM_Desc;
    this.desunidadmedida=val.strUM_Desc;
    this.dialogUnidadMedida=false;
  }
  SeleccionadoProveedor(val){
    debugger;
    this.productoModel.strVendor_NO=val.strVendor_NO;
    this.productoModel.intIdVendor_ID=val.intIdVendor_ID;
    this.productoModel.strVendor_Desc=val.strVendor_Desc;
    this.desproveedor=val.strVendor_Desc;
    this.dialogProveedor=false;
  }
  SeleccionadoMoneda(val){
    debugger;
    this.selectrow.moneda=val.CODIGO;
    this.dialogMoneda=false;
  }
  SeleccionadoPrioridad(val){
    debugger;
    this.selectrow.prioridad=val.CODIGO;
    this.dialogPrioridad=false;
  }
  loadClaseMaterial(){
    this.dialogClaseMaterial=true;
    this.tableClaseMaterial=[];
    clasematerialService.GetTypeClaseMaterial(this.tiporequisicion)
      .then(response=>{
        this.tableClaseMaterial=response;       
      }).catch(error=>{
        this.$message({
          showClose: true,
          type: 'error',
          message: 'No se pudo cargar clase material'
        });
      })
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
  cambioTipoRequisicion(selected){
    if(this.tiporequisicion!=selected){
      this.tiporequisicion=selected;
    }
    console.log('select',selected);
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
    debugger;
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
    debugger;
    this.btnactivarcontrolprecio=false;
    return false;
  }
  closeGrupoComprador(){
    debugger;
    this.btnactivargrupocomprador=false;
    return false;
  }
  closeCriticidad(){
    debugger;
    this.btnactivarcriticidad=false;
    return false;
  }
  closeCategoriaMaterial(){
    debugger;
    this.btnactivarcategoriamaterial=false;
    return false;
  }
  closeClaseMaterial(){
    debugger;
    this.btnactivarclasematerial=false;
    return false;
  }
  closeCentroCostos(){
    debugger;
    this.btnactivarcentrocosto=false;
    return false;
  }
  closePrioridad(){
    debugger;
    this.btnactivarprioridad=false;
    return false;
  }
  closeMoneda(){
    debugger;
    this.btnactivarmoneda=false;
    return false;
  }
  closeUnidadMedida(){
    debugger;
    this.btnactivarunidadmedida=false;
    return false;
  }
  closeMaterial(){
    debugger;
    this.btnactivarmaterial=false;
    return false;
  }
  closeCuentaContable(){
    debugger;
    this.btnactivarcuentacontable=false;
    return false;
  }
  borrarCompania(){
    this.descompania='';
    this.dialogCompania=false;
    this.btnactivarcompania=false;
  }
  enterCompania(code){
    //alert('Bien'+code);
    debugger;
    console.log('compania_enter_1',code);
    companiaService.GetOnlyOneCompania(code)
    .then(response=>{
      if(response!=undefined){
        if(response.length>0){
          this.productoModel.strCompany_Cod=response[0].strCompany_Cod
          this.descompania=response[0].strCompany_Desc;
          this.dialogCompania=false;
          this.btnactivarcompania=false;
        }
      }
      //this.unidadmedidaModel=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar compañia'
      });
    })
  }
  borrarAlmacen(){
    this.desalmacen='';
    this.dialogAlmacen=false;
    this.btnactivaralmacen=false;
  }
  enterAlmacen(code){
    //alert('Bien'+code);
    debugger;
    almacenService.GetOnlyOneAlmacen(code)
    .then(response=>{
      debugger;
      if(response!=undefined){
        if(response.length>0){
          this.productoModel.strWHS_Cod=response[0].strWHS_Cod
          this.productoModel.intIdWHS_Stat_ID=response[0].intIdWHS_Stat_ID;
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
    this.dialogClaseMaterial=false;
    this.btnactivarclasematerial=false;
  }
  enterClaseMaterial(code){
    //alert('Bien'+code);
    debugger;
    clasematerialService.GetOnlyOneClaseMaterial(code)
    .then(response=>{
      debugger;
      if(response!=undefined){
        if(response.length>0){
          this.productoModel.strMaterial_Class=response[0].strMatClass_Cod;
          this.productoModel.intIdMatClass_ID=response[0].intIdMatClass_ID;
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
    this.dialogClaseMaterial=false;
    this.btnactivarclasematerial=false;
  }
  enterCriticidad(code){
    //alert('Bien'+code);
    debugger;
    criticidadService.GetOnlyOneCriticidad(code)
    .then(response=>{
      debugger;
      if(response!=undefined){
        if(response.length>0){
          this.productoModel.strCritical_Item=response[0].strCritical_Cod;
          this.productoModel.intIdCritical_ID=response[0].intIdCritical_ID;
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
    this.dialogProveedor=false;
    this.btnactivarproveedor=false;
  }
  enterProveedor(code){
    //alert('Bien'+code);
    debugger;
    proveedorService.GetOnlyOneProveedor(code)
    .then(response=>{
      debugger;
      if(response!=undefined){
        if(response.length>0){
          this.productoModel.strVendor_NO=response[0].strVendor_NO;
          this.productoModel.intIdVendor_ID=response[0].intIdVendor_ID;
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
    this.dialogCuentaContable=false;
    this.btnactivarcuentacontable=false;
  }
  enterCuentaGastos(code){
    //alert('Bien'+code);
    debugger;
    cuentacontableService.GetOnlyOneCuentaGastos(code)
    .then(response=>{
      debugger;
      if(response!=undefined){
        if(response.length>0){
          this.productoModel.strExp_Acct=response[0].strAcct_NO_Corp;
          this.productoModel.intIdAcctCont_ID=response[0].intIdAcctCont_ID;
          this.desCuentaGasto=response[0].strVendor_Desc;
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
    this.dialogCategoriaMaterial=false;
    this.btnactivarcategoriamaterial=false;
  }
  enterCategoriaMaterial(code){
    //alert('Bien'+code);
    debugger;
    categoriamaterialService.GetOnlyOneCategoriaMaterial(code)
    .then(response=>{
      debugger;
      if(response!=undefined){
        if(response.length>0){
          this.productoModel.strMaterial_Categ=response[0].strCategMat_Cod;
          this.productoModel.intIdCategMat_ID=response[0].intIdCategMat_ID;
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
    this.dialogGrupoComprador=false;
    this.btnactivargrupocomprador=false;
  }
  enterGrupoComprador(code){
    //alert('Bien'+code);
    debugger;
    grupocompradorService.GetOnlyOneGrupoComprador(code)
    .then(response=>{
      debugger;
      if(response!=undefined){
        if(response.length>0){
          this.productoModel.strGrpPurch_Cod=response[0].strGrpPurch_Cod;
          this.productoModel.intIdGrpPurch_ID=response[0].intIdGrpPurch_ID;
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
    this.dialogControlPrecio=false;
    this.btnactivarcontrolprecio=false;
  }
  enterControlPrecio(code){
    //alert('Bien'+code);
    debugger;
    controlprecioService.GetOnlyOneControlPrecio(code)
    .then(response=>{
      debugger;
      if(response!=undefined){
        if(response.length>0){
          this.productoModel.fltPriceControl=response[0].strCtlPrec_Cod;
          this.productoModel.intIdCtlPrec_ID=response[0].intIdCtlPrec_ID;
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
    debugger;
    impuestoService.GetOnlyOneImpuesto(code)
    .then(response=>{
      debugger;
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
    this.dialogUnidadMedida=false;
    this.btnactivarunidadmedida=false;
  }
  enterUnidadMedida(code){
    //alert('Bien'+code);
    debugger;
    unidadmedidaService.GetOnlyOneUnidadMedida(code)
    .then(response=>{
      debugger;
      if(response!=undefined){
        if(response.length>0){
          this.productoModel.strUM_Cod=response[0].strUM_Cod;
          this.productoModel.intIdUnidadMedida=response[0].intIdUnidadMedida;
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


  validador(){
    debugger;
    
    if(this.tiporequisicion==""){
      return true;
    }
    // if(this.productoModel.fltQtyLimit_Max<=0 || this.productoModel.fltQtyLimit_Max<=this.productoModel.fltQtyLimit_Min){
    //   return true;
    // }
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
  async guardarTodo(val){
    debugger;
    this.vifprogress=true;
    this.issave=false;
    this.iserror=false;
    this.textosave=''
    this.percentage=0;      
    if(!this.validador()){
      for(var i=0;i<50;i++){
        this.percentage++;
      }
      debugger;
      this.productoModel.intIdWHS_Stat_ID=1;
      this.productoModel.intIdCommTax_ID=1;
      productoService.UpdateProducto(this.productoModel)
      .then(res=>{ 
        debugger;
        for(var i=0;i<50;i++){
          setTimeout(
            () => {this.percentage++;},1  
          )
        } 
        setTimeout(() => {   
          this.issave=true;
          this.textosave='Se guardo correctamente.'
          this.vifprogress=false;
        }, 600)
        
      }).catch(error=>{
        this.$message({
          showClose: true,
          type: 'error',
          message: 'No se pudo guardar producto'
        });
      })
    }
    else{
      this.issave=false;
      this.iserror=true;
      this.textosave='No se pudo guardar. Revise los datos-Error'
    }
  }
  clickable(){
    return false;
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
