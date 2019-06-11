import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import FileSaver from 'file-saver';

import 'element-ui/lib/theme-default/index.css';
import BCompaniaProveedor from '@/components/buscadores/b_compania/b_compania.vue';
import BProveedorComponent from '@/components/buscadores/b_proveedor/b_proveedor.vue';
import BCategoriaCuentaComponent from '@/components/buscadores/b_categoria_cuenta/b_categoria_cuenta.vue';
import BCategoriaLineaComponent from '@/components/buscadores/b_categoria_linea/b_categoria_linea.vue';
import BAlmacenComponent from '@/components/buscadores/b_almacen/b_almacen.vue';
import BCuentaContableComponent from '@/components/buscadores/b_cuenta_contable/b_cuenta_contable.vue';
import BMaterialComponent from '@/components/buscadores/b_material/b_material.vue';
import BUnidadMedidaComponent from '@/components/buscadores/b_unidad_medida/b_unidad_medida.vue';
import BMonedaComponent from '@/components/buscadores/b_moneda/b_moneda.vue';
import BPrioridadComponent from '@/components/buscadores/b_prioridad/b_prioridad.vue';
import BCentroCostoComponent from '@/components/buscadores/b_centro_costo/b_centro_costo.vue';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';


import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from 'axios';
import { Loading } from 'element-ui';
import XLSX from 'xlsx';

// import '../../../../assets/css/excel-2007.scss';
import documentService from '@/components/service/documents.service';
import msmsendService from '@/components/service/msnSend.service';
import historialService from '@/components/service/historial.service';
import inicioService from '@/components/service/inicio.service';
import almacenService from '@/components/service/almacen.service';
import proveedorService from '@/components/service/proveedor.service';
import requisicionService from '@/components/service/requisicion.service';
import productoService from '@/components/service/producto.service';
import categoriacuentaService from '@/components/service/categoriacuenta.service';
import maestroService from '@/components/service/maestro.service';

import {MaestroModel} from '@/modelo/maestro/maestro';
import {RequisicionDetalleModel} from '@/modelo/maestro/requisiciondetalle';
import {RequisicionModel} from '@/modelo/maestro/requisicion';
import {ProductoModel} from '@/modelo/maestro/producto';
import {AlmacenModel} from '@/modelo/maestro/almacen';
import {ProveedorModel} from '@/modelo/maestro/proveedor';
import tipoRequisicionService from '@/components/service/tipoRequisicion.service';
import {TipoRequisicionModel} from '@/modelo/maestro/tipoRequisicion';
import {CategoriaCuentaModel} from '@/modelo/maestro/categoriacuenta';
import JsonExcel from '@/components/vue-json-excel/JsonExcel.vue';

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
  name: 'crear-pr',
  components:{
    'bcompania':BCompaniaProveedor,
    'bproveedor':BProveedorComponent,
    'balmacen':BAlmacenComponent,
    'buttons-accions':ButtonsAccionsComponent,
    'bcategoriacuenta':BCategoriaCuentaComponent,
    'bcategorialinea':BCategoriaLineaComponent,
    'bcuentacontable':BCuentaContableComponent,
    'bmaterial':BMaterialComponent,
    'bunidadmedida':BUnidadMedidaComponent,
    'bmoneda':BMonedaComponent,
    'bprioridad':BPrioridadComponent,
    'bcentrocosto':BCentroCostoComponent,
    'quickaccessmenu':QuickAccessMenuComponent,
    'download-excel' : JsonExcel
  } ,
})
export default class CrearPRComponent extends Vue {
  timer=0;
  
  sizeScreen:string = (window.innerHeight - 420).toString();//'0';
  sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  currentRow:any;
  txtnroline:any='';
  titleExcel:string ='Comercial_.xls';
  options = {  day: '2-digit',month: '2-digit', year: 'numeric' };

  hours:number;
  minutos:number;
  seconds:number;
  textosave:string='';
  user:any;
  vifprogress:boolean=true;
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
  iserror:boolean=false;
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
  valuem:number=0;
  issave:boolean=false;

  /*input*/
  btnactivarcompania:boolean=false;
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
  percentage:number;
  descompania:string='';
  code_compania:string='';
  desalmacen:string='';
  code_almacen:string='';
  cell_ocultar:string='transparent';
  value: string='';
  
  public tableData1:Array<RequisicionDetalleModel>=[]; 
  public requisicionModel:RequisicionModel=new RequisicionModel();
  public productoModel:ProductoModel=new ProductoModel();
  public selectrow:RequisicionDetalleModel=new RequisicionDetalleModel();
  public proveedorModel:ProveedorModel=new ProveedorModel();
  public categoriaCuentaModel:CategoriaCuentaModel=new CategoriaCuentaModel();
  public tipoRequisicionModel:TipoRequisicionModel=new TipoRequisicionModel();
  public tabletipoRequisicion:Array<TipoRequisicionModel>=[]; 

  getTotals:number=0;
  
  /*tabla*/
  editing:any= {
    row:'',
    column:''
  };
  fecha_actual:string;
  selectcolumn:any;
  blntiporequisicion:boolean=true;
  blncategorialinea:boolean=true;
  blncuentacontable:boolean=false;
  blncentrocosto:boolean=true;
  blnunidadmedida:boolean=true;
  blnproveedor:boolean=true;
  intlineaselect:number=-1;
  tiporequisicion:string='';  
  tiporequisicionant:string='';
  strTypeMov_Cod:string='';
  strTypeMov_Desc:string='';

  /*paginatio*/
  

  blnilterdtmRequested_Date:boolean=false;
  blnilterstrPriority_Cod:boolean=false;
  blnilterstrCurr:boolean=false;
  blnilterstrVendor_Suggested:boolean=false;
  blnilterstrUM:boolean=false;
  blnilterfltUnitPrice	:boolean=false;
  blnilterfltQuantity:boolean=false;
  blnilterstrDescription:boolean=false;
  blnilterstrMaterial_Cod:boolean=false;
  blnilterstrCostCenter:boolean=false;
  blnilterstrAccount_NO:boolean=false;
  blnilterstrCateg_Line:boolean=false;
  blnilterstrCateg_Account :boolean=false;
  pagina: number =1;
  RegistersForPage: number = 10;
  totalRegistros: number = 100;
  public CompleteData:Array<RequisicionDetalleModel>=[]; 
  public CompleteData1:Array<RequisicionDetalleModel>=[]; 
  clickColumn:string='';
  txtbuscar:string='';
  Column:string='';
  dialogBusquedaFilter:boolean=false;
  el: '#app';
  strDescripcion:any='';
  strStockCod:any='';
  fltQuantitys:any='';
  dtmDelivery_Dates:any='';
  dtmRequested_Dates:any='';
  fltUnitPrices:any='';
  fltValue_Totals:any='';
  strAccount_NOs:any='';
  strCostCenters:any='';
  strVendor_NOs:any='';
  strVendor_Descs:any='';
  fltFactors:any='';

  constructor(){
    super();
    this.fecha_actual=(new Date()).toString();
    debugger;
    Global.nameComponent="requisicion"
    this.cell_ocultar='#e4e2e2';        
    this.blntiporequisicion=false;
    this.blncategorialinea=false;
    this.blncuentacontable=false;
    this.blncentrocosto=false;
    this.blnunidadmedida=false;
    this.blnproveedor=false;
    setTimeout(() => {
      this.load();
    }, 200)
  }

  load(){
    debugger;
    var desc:any=localStorage.getItem('compania_name');
    var cod:any=localStorage.getItem('compania_cod');
    this.requisicionModel.strCompany_Cod=cod;
    this.requisicionModel.strCompany_Desc=desc;
    tipoRequisicionService.GetAllTipoRequisicion()
    .then(res=>{
      debugger;
      this.tabletipoRequisicion=res;
      this.tiporequisicion="A";    
      this.tiporequisicionant='A';
  
    })
    .catch(error=>{
      console.log('error',error)
    })
    categoriacuentaService.GetOnlyOneCategoriaCuenta("ST")
    .then(res=>{
      this.categoriaCuentaModel=res[0];
      console.log('Categoria-Cuenta',this.categoriaCuentaModel);
      debugger;
      for(var i=0;i<this.totalRegistros;i++){
        var reqDetalle:RequisicionDetalleModel=new RequisicionDetalleModel();
        reqDetalle.strCateg_Account="ST";
        reqDetalle.intRequis_Item_NO=i+1;
        reqDetalle.strDescription="";
        reqDetalle.intIdAcctCateg_ID=this.categoriaCuentaModel.intIdAcctCateg_ID;
        this.CompleteData.push(reqDetalle);
      }
    this.CompleteData1=this.CompleteData;
      this.tableData1 = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));

    })
    .catch(error=>{
      console.log('error',error)
    })
    maestroService.GetMaestro('VIEW','LA05') 
    .then(res=>{
      debugger;
      if(res!=undefined){
        this.strTypeMov_Cod=res.strTypeMov_Cod;
        this.strTypeMov_Desc=res.strTypeMov_Desc;
      }
    })
    .catch(error=>{
      console.log('error',error)
    });
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
  //   this.txtnroline="["+val.intRequis_Item_NO+"] "+val.strDescription;
  //   this.intlineaselect=val.intRequis_Item_NO-1;
  //   this.currentRow = val;
  // }
  handleCurrentChange(val) {
    debugger;
    if(val!=undefined){
      this.txtnroline="["+val.intRequis_Item_NO+"] "+val.strDescription;
      if(val.intRequis_Item_NO==0){
        this.intlineaselect=0;  
      }
      else{
        this.intlineaselect=val.intRequis_Item_NO-1;
      }
      this.currentRow = val;
      //this.selectrow=val;
      this.strStockCod=val.strMaterial_Cod==undefined?'':val.strMaterial_Cod;
      this.strDescripcion=val.strDescription==undefined?'':val.strDescription;
      this.fltQuantitys=val.fltQuantity==undefined?'':val.fltQuantity;
      this.dtmDelivery_Dates=val.dtmDelivery_Date==undefined?'':val.dtmDelivery_Date;
      this.dtmRequested_Dates=val.dtmRequested_Date==undefined?'':val.dtmRequested_Date;
      this.fltUnitPrices=val.fltUnitPrice==undefined?'':val.fltUnitPrice;
      this.fltValue_Totals=val.fltValue_Total==undefined?'':val.fltValue_Total;
      this.strAccount_NOs=val.strAccount_NO==undefined?'':val.strAccount_NO;
      this.strCostCenters=val.strCostCenter==undefined?'':val.strCostCenter;
      this.strVendor_NOs=val.strVendor_NO==undefined?'':val.strVendor_NO;
      this.strVendor_Descs=val.strVendor_Desc==undefined?'':val.strVendor_Desc;
      this.fltFactors=val.fltFactor==undefined?'':val.fltFactor;
      console.log(this.currentRow);
      this.getDetalle(val);
    }
  }

  getDetalle(val){
    debugger;
    if(val.strDescription!='' && val.strDescription!=undefined)
    {
      productoService.GetOnlyOneProducto(val.strMaterial_Cod)
      .then(res=>{
        this.productoModel=res[0];
        console.log('producto--obtener',this.productoModel);
        this.getTotals=this.productoModel.fltPrecUnit_Local*this.selectrow.fltQuantity;
      })
      .catch(error=>{
        console.log('error',error)
      })

      proveedorService.GetOnlyOneProveedor(val.strVendor_Suggested)
      .then(res=>{
        this.proveedorModel=res[0];
        console.log('proveedor--obtener',this.proveedorModel);
      })
      .catch(error=>{
        console.log('error',error)
      })
      
    }
  }


 async nextTable(){
    debugger;
    
    var data:any=this.$refs.missionTable;
    
    var dd:any=this.$refs.missionTable;
    dd.scrollTop = 30;
//    alert(container.scrollHeight)

    this.intlineaselect++;
    
    var res:any;
    if(this.intlineaselect+1>this.tableData1.length){
      var ss=(this.intlineaselect+1)%this.tableData1.length;
      if(ss>0){
        res=ss-1;
        this.pagina=Math.floor((this.intlineaselect+1)/10)+1;
      }
      else{
        res=9;
        this.pagina=(this.intlineaselect+1)/10;
      }
    }
    else{
      this.pagina=1;
      res=this.intlineaselect;
    }
    this.tableData1 = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    var document:any = this.$refs.missionTable;
    this.txtnroline="["+this.tableData1[res].intRequis_Item_NO+"] "+this.tableData1[res].strDescription;
    this.strStockCod=this.tableData1[res].strMaterial_Cod==undefined?'':this.tableData1[res].strMaterial_Cod;
    this.strDescripcion=this.tableData1[res].strDescription==undefined?'':this.tableData1[res].strDescription;
    this.fltQuantitys=this.tableData1[res].fltQuantity==undefined?'':this.tableData1[res].fltQuantity;
    this.dtmDelivery_Dates=await this.tableData1[res].dtmDelivery_Date==undefined?'':this.getParseDate(this.tableData1[res].dtmDelivery_Date);
    this.dtmRequested_Dates=await this.tableData1[res].dtmRequested_Date==undefined?'':this.getParseDate(this.tableData1[res].dtmRequested_Date);
    debugger;
    this.fltUnitPrices=this.tableData1[res].fltUnitPrice==undefined?'':this.tableData1[res].fltUnitPrice;
    this.fltValue_Totals=this.tableData1[res].fltValue_Total==undefined?'':this.tableData1[res].fltValue_Total;
    this.strAccount_NOs=this.tableData1[res].strAccount_NO==undefined?'':this.tableData1[res].strAccount_NO;
    this.strCostCenters=this.tableData1[res].strCostCenter==undefined?'':this.tableData1[res].strCostCenter;
    this.strVendor_NOs=this.tableData1[res].strVendor_NO==undefined?'':this.tableData1[res].strVendor_NO;
    this.strVendor_Descs=this.tableData1[res].strVendor_Desc==undefined?'':this.tableData1[res].strVendor_Desc;
    this.fltFactors=this.tableData1[res].fltFactor==undefined?'':this.tableData1[res].fltFactor;
   
    
    this.dtmDelivery_Dates=this.fltQuantitys
    this.dtmRequested_Dates=this.fltQuantitys

    var document:any = this.$refs.missionTable;
    document.setCurrentRow(this.tableData1[res]);
    debugger;
    
      
  }
  async backTable(){
    debugger;
    if(this.intlineaselect>0){
      this.intlineaselect--;
    }
    
    var res:any;
    if(this.intlineaselect+1>this.tableData1.length){
      var ss=(this.intlineaselect+1)%this.tableData1.length;
      if(ss>0){
        res=ss-1;
        this.pagina=Math.floor((this.intlineaselect+1)/10)+1;
      }
      else{
        res=9;
        this.pagina=(this.intlineaselect+1)/10;
      }
    }
    else{
      this.pagina=1;
      res=this.intlineaselect;
    }
    this.tableData1 = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    var document:any = this.$refs.missionTable;
    var document:any = this.$refs.missionTable;
    document.setCurrentRow(this.tableData1[res]);
    this.strStockCod=this.tableData1[res].strMaterial_Cod==undefined?'':this.tableData1[res].strMaterial_Cod;
    this.strDescripcion=this.tableData1[res].strDescription==undefined?'':this.tableData1[res].strDescription;
    this.fltQuantitys=this.tableData1[res].fltQuantity==undefined?'':this.tableData1[res].fltQuantity;
    this.dtmDelivery_Dates=await this.tableData1[res].dtmDelivery_Date==undefined?'':this.getParseDate(this.tableData1[res].dtmDelivery_Date);
    this.dtmRequested_Dates=await this.tableData1[res].dtmRequested_Date==undefined?'':this.getParseDate(this.tableData1[res].dtmRequested_Date);
    debugger;
    this.fltUnitPrices=this.tableData1[res].fltUnitPrice==undefined?'':this.tableData1[res].fltUnitPrice;
    this.fltValue_Totals=this.tableData1[res].fltValue_Total==undefined?'':this.tableData1[res].fltValue_Total;
    this.strAccount_NOs=this.tableData1[res].strAccount_NO==undefined?'':this.tableData1[res].strAccount_NO;
    this.strCostCenters=this.tableData1[res].strCostCenter==undefined?'':this.tableData1[res].strCostCenter;
    this.strVendor_NOs=this.tableData1[res].strVendor_NO==undefined?'':this.tableData1[res].strVendor_NO;
    this.strVendor_Descs=this.tableData1[res].strVendor_Desc==undefined?'':this.tableData1[res].strVendor_Desc;
    this.fltFactors=this.tableData1[res].fltFactor==undefined?'':this.tableData1[res].fltFactor;
    this.txtnroline="["+this.tableData1[res].intRequis_Item_NO+"] "+this.tableData1[res].strDescription;
     
    // var document:any = this.$refs.missionTable;
    // document.setCurrentRow(this.tableData1[res]);
    // this.tableData1 = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      
  }
  /*Compania imput*/
  activar_compania(){
    setTimeout(() => {
      this.btnactivarcompania=true;
      this.btnactivaralmacen=false;
      this.btnactivarproveedor=false;
    }, 120)
  }
  desactivar_compania(){
    debugger;
    if(this.dialogCompania){
      this.btnactivarcompania=false;
    }
  }
 
  closeCompania(){
    debugger;
    this.btnactivarcompania=false;
    return false;
  }
  closePrioridad(){
    this.btnactivarprioridad=false;
    this.dialogPrioridad=false;
    return false;
  }
  closeUnidadMedida(){
    this.btnactivarunidadmedida=false;
    this.dialogUnidadMedida=false;
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
    this.dialogProveedor=false;
    return false;
  }
  closeMaterial(){
    debugger;
    this.dialogMaterial=false;
    this.btnactivarmaterial=false;
    return false;
  }
  closeCuentaContable(){
    this.dialogCuentaContable=false;
    return false;
  }
  closeCategoriaLinea(){
    this.dialogCategoriaLinea=false;
    return false;
  }
  closeCentroCostos(){
    this.dialogCentroCostos=false;
    return false;
  }
  closeCategoriaCuenta(){
    this.dialogCategoriaCuenta=false;
    return false;
  }
  closeMoneda(){
    this.dialogMoneda=false;
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
    this.dialogAlmacen=false;
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
    if(value=='N' || value=='AC'){
      this.cell_ocultar='transparent';
      this.blntiporequisicion=true;
      this.blncategorialinea=true;
      
      this.blncentrocosto=true;
      this.blnunidadmedida=true;
      this.blnproveedor=true;
      this.CompleteData=[];
      this.tableData1=[];
      for(var i=0;i<this.totalRegistros;i++){
        var reqDetalle:RequisicionDetalleModel=new RequisicionDetalleModel();
        reqDetalle.intRequis_Item_NO=i+1;
        reqDetalle.strDescription="";
        reqDetalle.intIdAcctCateg_ID=this.categoriaCuentaModel.intIdAcctCateg_ID;
        this.CompleteData.push(reqDetalle);
      }
      this.CompleteData1=this.CompleteData;
      this.tableData1 = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
  
    }
    else{
      this.cell_ocultar='#e4e2e2';        
      this.blntiporequisicion=false;
      this.blncategorialinea=false;
      this.blncuentacontable=false;
      this.blncentrocosto=false;
      this.blnunidadmedida=false;
      this.blnproveedor=false;
      this.tableData1=[];
      
      this.CompleteData=[];
      this.tableData1=[];
      for(var i=0;i<this.totalRegistros;i++){
        var reqDetalle:RequisicionDetalleModel=new RequisicionDetalleModel();
        reqDetalle.strCateg_Account="ST";
        reqDetalle.intRequis_Item_NO=i+1;
        reqDetalle.strDescription="";
        reqDetalle.intIdAcctCateg_ID=this.categoriaCuentaModel.intIdAcctCateg_ID;
        this.CompleteData.push(reqDetalle);
      }
      this.CompleteData1=this.CompleteData;
      this.tableData1 = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
  
    }
    // this.btnactivaralmacen=false;
    // this.btnactivarproveedor=false;
    // this.btnactivarcompania=false
  }

  /*tabla metodos*/
  handleBlur(event) {
    // debugger;
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
  // getParseDate(fecha){
  //   return Global.getParseDate(fecha);
  // }
  getParseDate(fecha:any){
    var dateString = new Date(fecha);
    var dia = dateString.getDate();
        var mes = (dateString.getMonth()<12) ? dateString.getMonth()+1 : mes = dateString.getMonth();
        var yyyy = dateString.getFullYear();
        var dd = (dia<10) ? '0'+dia : dd=dia;
        var mm = (mes<10) ? '0'+mes : mm=mes;
        return dd+'.'+mm+'.'+yyyy;
    }
  companiaSeleccionado(val){
    console.log('traer',val);
    this.requisicionModel.strCompany_Cod=val.strCompany_Cod;
    this.requisicionModel.strCompany_Desc=val.strCompany_Desc;
    this.dialogCompania=false;
  }
  SeleccionadoAlmacen(val){
    console.log('traer',val);
    this.requisicionModel.strWHS_Cod=val.strWHS_Cod;
    this.requisicionModel.strWHS_Desc=val.strWHS_Desc;
    this.requisicionModel.intIdWHS_ID=val.intIdWHS_ID;    
    this.dialogAlmacen=false;
  }
  SeleccionadoCategoriaCuenta(val){
    this.selectrow.strCateg_Account=val.strAcctCateg_Cod;
    this.selectrow.intIdAcctCateg_ID=val.intIdAcctCateg_ID;
    
    this.dialogCategoriaCuenta=false;
    
    setTimeout(() => {
      if(val.strAcctCateg_Cod=='CC'){
        this.dialogCentroCostos=true;
      }
    }, 300)
   
  }
  SeleccionadoCategoriaLinea(val){
    debugger;
    this.selectrow.strCateg_Line=val.strCategItem_Cod;
    this.selectrow.intIdCategLine_ID=val.intIdCategLine_ID;
    this.dialogCategoriaLinea=false;

    
    setTimeout(() => {
      debugger;
      if(this.selectrow.strCateg_Account=='CC'){
        if(this.selectrow.strCateg_Line=='B' || this.selectrow.strCateg_Line=='S'){
          this.dialogMaterial=true;
        }
      }
    }, 300)
  }
 
  SeleccionadoCentroCosto(val){
    debugger;
    this.selectrow.strCostCenter=val.strCostCenter_NO;
    this.selectrow.strCostCenter_Desc=val.strCostCenter_Desc;
    this.selectrow.intIdCostCenter_ID=val.intIdCostCenter_ID;
    this.dialogCentroCostos=false;
    this.strCostCenters=val.strCostCenter_NO==undefined?'':val.strCostCenter_NO;
    
  }
  SeleccionadoCuentaContable(val){
    debugger;
    this.selectrow.strAccount_NO=val.strAcc_NO_Local;
    this.dialogCuentaContable=false;

    this.strAccount_NOs=val.strAcc_NO_Local==undefined?'':val.strAcc_NO_Local;
  
  }
  SeleccionadoMaterial(val){
    debugger;
    this.selectrow.strMaterial_Cod=val.strStock_Cod;
    this.selectrow.intIdInvStock_ID=val.intIdInvStock_ID;
    this.selectrow.strUM=val.strUM_Cod;
    this.selectrow.strDescription=val.strStock_Desc;
    this.selectrow.strAccount_NO=val.strExp_Acct;
    this.selectrow.strVendor_Suggested=val.strVendor_NO;
    this.selectrow.strVendor_Desc=val.strVendor_Desc;
    this.selectrow.strMatClass_Cod=val.strMaterial_Class;
    this.selectrow.strMatClass_Desc=val.strMatClass_Desc;
    this.strVendor_NOs=val.strVendor_NO;
    this.strVendor_Descs=val.strVendor_Desc;
     
    this.selectrow.fltFactor=val.fltFactor;

    this.strStockCod=this.selectrow.strMaterial_Cod==undefined?'':this.selectrow.strMaterial_Cod;
    this.strDescripcion=this.selectrow.strDescription==undefined?'':this.selectrow.strDescription;
    
    this.selectrow.fltUnitPrice=val.fltPrecUnit_Local;
    this.selectrow.fltValue_Total=this.selectrow.fltUnitPrice*this.selectrow.fltQuantity;
    this.dialogMaterial=false;
  }
  cambiarCantidad(val){
    setTimeout(() => {
      this.selectrow.fltValue_Total=this.selectrow.fltUnitPrice*this.selectrow.fltQuantity;
    }, 200)
    
  }
  SeleccionadoUnidadMedida(val){
    debugger;
    this.selectrow.strUM=val.strUM_Cod;
    
    
    this.dialogUnidadMedida=false;
  }
  SeleccionadoProveedor(val){
    debugger;
    this.selectrow.strVendor_Suggested=val.strVendor_NO;

    this.strVendor_NOs=this.selectrow.strVendor_Suggested==undefined?'':this.selectrow.strVendor_Suggested;

    this.dialogProveedor=false;
  }
  SeleccionadoMoneda(val){
    debugger;
    this.selectrow.strCurr=val.strCurrency_Cod;
    this.selectrow.intIdCurrency_ID=val.intIdCurrency_ID;
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
  nuevoPR(){
    this.requisicionModel=new RequisicionModel();
    var desc:any=localStorage.getItem('compania_name');
    var cod:any=localStorage.getItem('compania_cod');
    this.requisicionModel.strCompany_Cod=cod;
    this.requisicionModel.strCompany_Desc=desc;
    this.tiporequisicion="A";    
    this.tiporequisicionant='A';
  
    this.requisicionModel.listaDetalle=[];
    this.CompleteData=[];
    this.tableData1=[];
    for(var i=0;i<this.totalRegistros;i++){
      var reqDetalle:RequisicionDetalleModel=new RequisicionDetalleModel();
      reqDetalle.strCateg_Account="ST";
      reqDetalle.intRequis_Item_NO=i+1;
      reqDetalle.strDescription="";
      reqDetalle.intIdAcctCateg_ID=this.categoriaCuentaModel.intIdAcctCateg_ID;
      this.CompleteData.push(reqDetalle);
    }
    this.CompleteData1=this.CompleteData;
    this.tableData1 = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));

    this.strStockCod="";
    this.strDescripcion="";
    this.fltQuantitys="";
    this.dtmDelivery_Dates="";
    this.dtmRequested_Dates="";
    this.fltUnitPrices="";
    this.fltValue_Totals="";
    this.strAccount_NOs="";
    this.strCostCenters="";
    this.strVendor_NOs="";
    this.strVendor_Descs="";
    this.fltFactors="";
  }
  async guardarTodo(val){
    debugger;
    
    this.vifprogress=true;
    this.issave=false;
    this.iserror=false;
    this.textosave=''
    this.percentage=0;  

    var tabla:Array<RequisicionDetalleModel>=[];
    
    console.log('guardar todo',this.tableData1);
    
    for(var i=0;i<this.tableData1.length;i++){
      if(this.tableData1[i].strCateg_Account!="" && this.tableData1[i].strDescription!="" && this.tableData1[i].strMaterial_Cod!=""){
        tabla.push(this.tableData1[i]);
      }
    }

    console.log('paso 2',tabla);   
    for(var i=0;i<50;i++){
      this.valuem=this.valuem+1; 
    }

    this.requisicionModel.strTypeReq_Cod=this.tiporequisicion;
    for(var i=0;i<this.tabletipoRequisicion.length;i++){
      if(this.tiporequisicion==this.tabletipoRequisicion[i].strTypeReq_Cod){
        this.requisicionModel.strTipReq_Desc=this.tabletipoRequisicion[i].strTipReq_Desc;
        this.requisicionModel.intIdTypeReq_ID=this.tabletipoRequisicion[i].intIdTypeReq_ID;
      }
    }
    for(var i=0;i<50;i++){
      this.percentage++;
    }
    this.requisicionModel.strTypeMov_Cod=this.strTypeMov_Cod;
    this.requisicionModel.strTypeMov_Desc=this.strTypeMov_Desc;
    this.requisicionModel.listaDetalle=tabla;
    console.log('---***---',this.requisicionModel);
    requisicionService.crearRequisicion(this.requisicionModel)
    .then(res=>{
      debugger;
      for(var i=0;i<50;i++){
        setTimeout(
          () => {this.percentage++;},1  
        )
      } 
      setTimeout(() => {   
        this.issave=true;
        this.textosave='Se guardo correctamente. '+res.strRequis_NO;
        this.openMessage('Se guardo correctamente '+res.strRequis_NO);
        this.vifprogress=false;
        this.nuevoPR();
        //window.location.reload();  
      }, 600)

      // for(var i=0;i<50;i++){
      //   this.valuem++; 
      // }
      // console.log(this.valuem);
      // if(this.valuem>=100){
      //   setTimeout(() => {
      //     this.vifprogress=false;
      //     this.issave=true;
          
      //     this.textosave='Se guardo correctamente. '+res.strRequis_NO;
      //     this.openMessage('Se guardo correctamente '+res.strRequis_NO);
      //   }, 600)
      // }
    })
    .catch(error=>{
      
    })

    // var vcabecera=await this.validate();
    // var vdetalle=await this.validateTabla(tabla,0);
    // if(!vcabecera && !vdetalle){
    //   this.salidaModel.listaDetalle=tabla;
    //   let loading = Loading.service({
    //     fullscreen: true,
    //     text: 'Cargando...',
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0.8)'
    //     }
    //   );
    //   for(var i=0;i<50;i++){
    //     this.valuem=this.valuem+1; 
    //   }

    //   salidaService.CrearSalida(this.salidaModel)
    //   .then(res=>{
    //     debugger;
    //     for(var i=0;i<50;i++){
    //       this.valuem++; 
    //     }
    //     console.log(this.valuem);
    //     loading.close();
    //     if(this.valuem>=100){
    //       setTimeout(() => {
    //         this.vifprogress=false;
    //         this.issave=true;
    //         this.textosave='Se guardo correctamente.'
    //         this.openMessage('Se guardo correctamente');
    //       }, 2000)
    //     }
    //   })
    //   .catch(error=>{
    //     loading.close();
    //     this.$message({
    //       showClose: true,
    //       type: 'error',
    //       message: 'No se pudo guardar salida'
    //     });
    //   })
    // }
    
  }
  backPage(){
    window.history.back();
  }
  reloadpage(){
    window.location.reload();
  }
  
  filterstrCateg_Account(h,{column,$index}){
    debugger;
    
    if(this.blnilterstrCateg_Account){
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
  filterstrCateg_Line(h,{column,$index}){
    debugger;
    
    
    if(this.blnilterstrCateg_Line){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterstrAccount_NO(h,{column,$index}){
    debugger;
    
    
    if(this.blnilterstrAccount_NO){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}), h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterstrCostCenter(h,{column,$index}){
    debugger;
    
    
    
    if(this.blnilterstrCostCenter){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }

  filterstrMaterial_Cod(h,{column,$index}){
    debugger;
    
    
    if(this.blnilterstrMaterial_Cod){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}), h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterstrDescription(h,{column,$index}){
    debugger;
    
    
    if(this.blnilterstrDescription){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterfltQuantity(h,{column,$index}){
    debugger;
    
    
    if(this.blnilterfltQuantity){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterfltUnitPrice(h,{column,$index}){
    debugger;
    
    
    if(this.blnilterfltUnitPrice){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterstrUM(h,{column,$index}){
    debugger;
    
    
    if(this.blnilterstrUM){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterstrVendor_Suggested(h,{column,$index}){
    debugger;
    
    
    if(this.blnilterstrVendor_Suggested){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterstrCurr(h,{column,$index}){
    debugger;
    
    
    if(this.blnilterstrCurr){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterstrPriority_Cod(h,{column,$index}){
    debugger;
    
    
    if(this.blnilterstrPriority_Cod){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}), h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterdtmRequested_Date(h,{column,$index}){
    debugger;
    
    
    if(this.blnilterdtmRequested_Date){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}
      ),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  
  headerclick(val){
    
    this.Column=val.label;
    Global.setColumna(this.Column);
    if(val.property=="dtmRequested_Date"){
      this.clickColumn="dtmRequested_Date";
      this.blnilterdtmRequested_Date=true;
      this.blnilterstrPriority_Cod=false;
      this.blnilterstrCurr=false;
      this.blnilterstrVendor_Suggested=false;
      this.blnilterstrUM=false;
      this.blnilterfltUnitPrice	=false;
      this.blnilterfltQuantity=false;
      this.blnilterstrDescription=false;
      this.blnilterstrMaterial_Cod=false;
      this.blnilterstrCostCenter=false;
      this.blnilterstrAccount_NO=false;
      this.blnilterstrCateg_Line=false;
      this.blnilterstrCateg_Account =false;
    }
    if(val.property=="strPriority_Cod"){
      this.clickColumn="strPriority_Cod";
      this.blnilterdtmRequested_Date=false;
      this.blnilterstrPriority_Cod=true;
      this.blnilterstrCurr=false;
      this.blnilterstrVendor_Suggested=false;
      this.blnilterstrUM=false;
      this.blnilterfltUnitPrice	=false;
      this.blnilterfltQuantity=false;
      this.blnilterstrDescription=false;
      this.blnilterstrMaterial_Cod=false;
      this.blnilterstrCostCenter=false;
      this.blnilterstrAccount_NO=false;
      this.blnilterstrCateg_Line=false;
      this.blnilterstrCateg_Account =false;
    }
    if(val.property=="strCurr"){
      this.clickColumn="strCurr";
      this.blnilterdtmRequested_Date=false;
      this.blnilterstrPriority_Cod=false;
      this.blnilterstrCurr=true;
      this.blnilterstrVendor_Suggested=false;
      this.blnilterstrUM=false;
      this.blnilterfltUnitPrice	=false;
      this.blnilterfltQuantity=false;
      this.blnilterstrDescription=false;
      this.blnilterstrMaterial_Cod=false;
      this.blnilterstrCostCenter=false;
      this.blnilterstrAccount_NO=false;
      this.blnilterstrCateg_Line=false;
      this.blnilterstrCateg_Account =false;
    }
    
    if(val.property=="strVendor_Suggested"){
      this.clickColumn="strVendor_Suggested";
      this.blnilterdtmRequested_Date=false;
      this.blnilterstrPriority_Cod=false;
      this.blnilterstrCurr=false;
      this.blnilterstrVendor_Suggested=true;
      this.blnilterstrUM=false;
      this.blnilterfltUnitPrice	=false;
      this.blnilterfltQuantity=false;
      this.blnilterstrDescription=false;
      this.blnilterstrMaterial_Cod=false;
      this.blnilterstrCostCenter=false;
      this.blnilterstrAccount_NO=false;
      this.blnilterstrCateg_Line=false;
      this.blnilterstrCateg_Account =false;
    }
    if(val.property=="strUM"){
      this.clickColumn="strUM";
      this.blnilterdtmRequested_Date=false;
      this.blnilterstrPriority_Cod=false;
      this.blnilterstrCurr=false;
      this.blnilterstrVendor_Suggested=false;
      this.blnilterstrUM=true;
      this.blnilterfltUnitPrice	=false;
      this.blnilterfltQuantity=false;
      this.blnilterstrDescription=false;
      this.blnilterstrMaterial_Cod=false;
      this.blnilterstrCostCenter=false;
      this.blnilterstrAccount_NO=false;
      this.blnilterstrCateg_Line=false;
      this.blnilterstrCateg_Account =false;
    }
    if(val.property=="fltUnitPrice"){
      this.clickColumn="fltUnitPrice";
      this.blnilterdtmRequested_Date=false;
      this.blnilterstrPriority_Cod=false;
      this.blnilterstrCurr=false;
      this.blnilterstrVendor_Suggested=false;
      this.blnilterstrUM=false;
      this.blnilterfltUnitPrice	=true;
      this.blnilterfltQuantity=false;
      this.blnilterstrDescription=false;
      this.blnilterstrMaterial_Cod=false;
      this.blnilterstrCostCenter=false;
      this.blnilterstrAccount_NO=false;
      this.blnilterstrCateg_Line=false;
      this.blnilterstrCateg_Account =false;
    }
    if(val.property=="fltQuantity"){
      this.clickColumn="fltQuantity";
      this.blnilterdtmRequested_Date=false;
      this.blnilterstrPriority_Cod=false;
      this.blnilterstrCurr=false;
      this.blnilterstrVendor_Suggested=false;
      this.blnilterstrUM=false;
      this.blnilterfltUnitPrice	=false;
      this.blnilterfltQuantity=true;
      this.blnilterstrDescription=false;
      this.blnilterstrMaterial_Cod=false;
      this.blnilterstrCostCenter=false;
      this.blnilterstrAccount_NO=false;
      this.blnilterstrCateg_Line=false;
      this.blnilterstrCateg_Account =false;
    }
    if(val.property=="strDescription"){
      this.clickColumn="strDescription";
      this.blnilterdtmRequested_Date=false;
      this.blnilterstrPriority_Cod=false;
      this.blnilterstrCurr=false;
      this.blnilterstrVendor_Suggested=false;
      this.blnilterstrUM=false;
      this.blnilterfltUnitPrice	=false;
      this.blnilterfltQuantity=false;
      this.blnilterstrDescription=true;
      this.blnilterstrMaterial_Cod=false;
      this.blnilterstrCostCenter=false;
      this.blnilterstrAccount_NO=false;
      this.blnilterstrCateg_Line=false;
      this.blnilterstrCateg_Account =false;
    }
    if(val.property=="strMaterial_Cod"){
      this.clickColumn="strMaterial_Cod";
      this.blnilterdtmRequested_Date=false;
      this.blnilterstrPriority_Cod=false;
      this.blnilterstrCurr=false;
      this.blnilterstrVendor_Suggested=false;
      this.blnilterstrUM=false;
      this.blnilterfltUnitPrice	=false;
      this.blnilterfltQuantity=false;
      this.blnilterstrDescription=false;
      this.blnilterstrMaterial_Cod=true;
      this.blnilterstrCostCenter=false;
      this.blnilterstrAccount_NO=false;
      this.blnilterstrCateg_Line=false;
      this.blnilterstrCateg_Account =false;
    }

    if(val.property=="strCostCenter"){
      this.clickColumn="strCostCenter";
      this.blnilterdtmRequested_Date=false;
      this.blnilterstrPriority_Cod=false;
      this.blnilterstrCurr=false;
      this.blnilterstrVendor_Suggested=false;
      this.blnilterstrUM=false;
      this.blnilterfltUnitPrice	=false;
      this.blnilterfltQuantity=false;
      this.blnilterstrDescription=false;
      this.blnilterstrMaterial_Cod=false;
      this.blnilterstrCostCenter=true;
      this.blnilterstrAccount_NO=false;
      this.blnilterstrCateg_Line=false;
      this.blnilterstrCateg_Account =false;
    }

    if(val.property=="strAccount_NO"){
      this.clickColumn="strAccount_NO";
      this.blnilterdtmRequested_Date=false;
      this.blnilterstrPriority_Cod=false;
      this.blnilterstrCurr=false;
      this.blnilterstrVendor_Suggested=false;
      this.blnilterstrUM=false;
      this.blnilterfltUnitPrice	=false;
      this.blnilterfltQuantity=false;
      this.blnilterstrDescription=false;
      this.blnilterstrMaterial_Cod=false;
      this.blnilterstrCostCenter=false;
      this.blnilterstrAccount_NO=true;
      this.blnilterstrCateg_Line=false;
      this.blnilterstrCateg_Account =false;
    }

    if(val.property=="strCateg_Line"){
      this.clickColumn="strCateg_Line";
      this.blnilterdtmRequested_Date=false;
      this.blnilterstrPriority_Cod=false;
      this.blnilterstrCurr=false;
      this.blnilterstrVendor_Suggested=false;
      this.blnilterstrUM=false;
      this.blnilterfltUnitPrice	=false;
      this.blnilterfltQuantity=false;
      this.blnilterstrDescription=false;
      this.blnilterstrMaterial_Cod=false;
      this.blnilterstrCostCenter=false;
      this.blnilterstrAccount_NO=false;
      this.blnilterstrCateg_Line=true;
      this.blnilterstrCateg_Account =false;
    }

    if(val.property=="strCateg_Account"){
      this.clickColumn="strCateg_Account";
      this.blnilterdtmRequested_Date=false;
      this.blnilterstrPriority_Cod=false;
      this.blnilterstrCurr=false;
      this.blnilterstrVendor_Suggested=false;
      this.blnilterstrUM=false;
      this.blnilterfltUnitPrice	=false;
      this.blnilterfltQuantity=false;
      this.blnilterstrDescription=false;
      this.blnilterstrMaterial_Cod=false;
      this.blnilterstrCostCenter=false;
      this.blnilterstrAccount_NO=false;
      this.blnilterstrCateg_Line=false;
      this.blnilterstrCateg_Account =true;
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
     
      this.strStockCod=this.tableData1[this.intlineaselect].strMaterial_Cod==undefined?'':this.tableData1[this.intlineaselect].strMaterial_Cod;
      this.strDescripcion=this.tableData1[this.intlineaselect].strDescription==undefined?'':this.tableData1[this.intlineaselect].strDescription;
      this.fltQuantitys=this.tableData1[this.intlineaselect].fltQuantity==undefined?'':this.tableData1[this.intlineaselect].fltQuantity;
      this.dtmDelivery_Dates=this.tableData1[this.intlineaselect].dtmDelivery_Date==undefined?'':this.tableData1[this.intlineaselect].dtmDelivery_Date;
      this.dtmRequested_Dates=this.tableData1[this.intlineaselect].dtmRequested_Date==undefined?'':this.tableData1[this.intlineaselect].dtmRequested_Date;
      this.fltUnitPrices=this.tableData1[this.intlineaselect].fltUnitPrice==undefined?'':this.tableData1[this.intlineaselect].fltUnitPrice;
      this.fltValue_Totals=this.tableData1[this.intlineaselect].fltValue_Total==undefined?'':this.tableData1[this.intlineaselect].fltValue_Total;
      this.strAccount_NOs=this.tableData1[this.intlineaselect].strAccount_NO==undefined?'':this.tableData1[this.intlineaselect].strAccount_NO;
      this.strCostCenters=this.tableData1[this.intlineaselect].strCostCenter==undefined?'':this.tableData1[this.intlineaselect].strCostCenter;
      this.strVendor_NOs=this.tableData1[this.intlineaselect].strVendor_NO==undefined?'':this.tableData1[this.intlineaselect].strVendor_NO;
      this.strVendor_Descs=this.tableData1[this.intlineaselect].strVendor_Desc==undefined?'':this.tableData1[this.intlineaselect].strVendor_Desc;
      this.fltFactors=this.tableData1[this.intlineaselect].fltFactor==undefined?'':this.tableData1[this.intlineaselect].fltFactor;
      this.txtnroline="["+this.tableData1[this.intlineaselect].intRequis_Item_NO+"] "+this.tableData1[this.intlineaselect].strDescription;
    
    }

  }

  Limpiar(){
    debugger;
      
    this.CompleteData=this.CompleteData1;
    this.tableData1 = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    var document:any = this.$refs.missionTable;
    document.setCurrentRow(this.tableData1[this.intlineaselect]);

    this.blnilterdtmRequested_Date=false;
    this.blnilterstrPriority_Cod=false;
    this.blnilterstrCurr=false;
    this.blnilterstrVendor_Suggested=false;
    this.blnilterstrUM=false;
    this.blnilterfltUnitPrice	=false;
    this.blnilterfltQuantity=false;
    this.blnilterstrDescription=false;
    this.blnilterstrMaterial_Cod=false;
    this.blnilterstrCostCenter=false;
    this.blnilterstrAccount_NO=false;
    this.blnilterstrCateg_Line=false;
    this.blnilterstrCateg_Account =false;
    
    this.CompleteData=this.CompleteData1;
    this.tableData1 = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    var document:any = this.$refs.missionTable;
    
  }
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION = '.xlsx';

  saveAsExcelFile(buffer: any, fileName: string){
    const data: Blob = new Blob([buffer], {
      type: this.EXCEL_TYPE
      });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + this.EXCEL_EXTENSION);
  }
  Print(){
    window.print();
  }
  
  EliminarItem(){
    console.log(this.currentRow.intRequis_Item_NO);
    this.CompleteData.splice(this.currentRow.intRequis_Item_NO-1, 1);
    for(var i=this.currentRow.intRequis_Item_NO;i<this.CompleteData.length;i++){
      this.CompleteData[i].intRequis_Item_NO=i+1;
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
      el: '#app',
      selectrow:{},
      dialogTableVisible: false,
      dialogVisible:false,
      currentRow: null,
      tableData:[{}],
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
      fltQuantitys:'',
      dtmDelivery_Dates:'',
      dtmRequested_Dates:'',
      fltUnitPrices:'',
      fltValue_Totals:'',
      strAccount_NOs:'',
      strCostCenters:'',
      strVendor_NOs:'',
      strVendor_Descs:'',
      strDescription:'',
      percentage: '0',
      json_fields : {
        "dtmRequested_Date":"dtmRequested_Date",
        "strPriority_Cod":"strPriority_Cod",
        "strCurr":"strCurr",
        "strVendor_Suggested":"strVendor_Suggested",
        "strUM":"strUM",
        "fltUnitPrice":"fltUnitPrice",	
        "fltQuantity":"fltQuantity",
        "strDescription":"strDescription",
        "strMaterial_Cod":"strMaterial_Cod",
        "strCostCenter":"strCostCenter",
        "strAccount_NO":"strAccount_NO",
        "strCateg_Line":"strCateg_Line",
        "strCateg_Account":"strCateg_Account", 
      },
      json_meta:[
        [{
          "key": "charset",
          "value": "utf-8"
        }]
      ]
    }
  }
  
}
