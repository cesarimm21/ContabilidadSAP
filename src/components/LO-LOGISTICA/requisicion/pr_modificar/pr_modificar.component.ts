import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';

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
import tipoRequisicionService from '@/components/service/tipoRequisicion.service';
import {RequisicionDetalleModel} from '@/modelo/maestro/requisiciondetalle';
import {AlmacenModel} from '@/modelo/maestro/almacen';
import {RequisicionModel} from '@/modelo/maestro/requisicion';
import {ProductoModel} from '@/modelo/maestro/producto';
import {ProveedorModel} from '@/modelo/maestro/proveedor';
import {TipoRequisicionModel} from '@/modelo/maestro/tipoRequisicion';
import {CategoriaCuentaModel} from '@/modelo/maestro/categoriacuenta';
import maestroService from '@/components/service/maestro.service';


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
  name: 'modificar-pr',
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
    
  } ,
})
export default class ModificarPRComponent extends Vue {
  timer=0;
  sizeScreen:string = (window.innerHeight - 420).toString();//'0';
  sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  currentRow:any;
  txtnroline:any='';
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
  vifprogress:boolean=true;
  textosave:string='';
  iserror:boolean=false;
  issave:boolean=false;
  percentage:number;
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

  descompania:string='';
  code_compania:string='';
  desalmacen:string='';
  code_almacen:string='';
  cell_ocultar:string='transparent';
  value: string='';
  
  public tableData1:Array<RequisicionDetalleModel>=[]; 
  public requisicionModel:RequisicionModel=new RequisicionModel();
  public almacenModel:AlmacenModel=new AlmacenModel();
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
  valuem:number=0;
  vifaprobarrechasar:boolean=false;
  tiporequisicion:string='';
  txtmodulo:string='';
  tiporequisicionant:string='';
  visualizar:boolean=false;
  fltQuantity:number=0;
  dtmRequested_Date:string='';
  fltUnitPrice:number=0;
  fltValue_Total:number=0;
  strAccount_NO:string='';
  strCostCenter:string='';
  strVendor_NO:string='';
  strVendor_Desc:string='';

    
  pagina: number =1;
  RegistersForPage: number = 10;
  totalRegistros: number = 100;
  public CompleteData:Array<RequisicionDetalleModel>=[]; 
  public CompleteData1:Array<RequisicionDetalleModel>=[]; 
  clickColumn:string='';
  txtbuscar:string='';
  Column:string='';
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
  strTypeMov_Cod:string='';
  strTypeMov_Desc:string='';

  constructor(){
    super();
    this.fecha_actual=Global.getParseDate(new Date().toDateString());
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
    setTimeout(() => {
      this.cargarData()
    }, 200)
  }
  // load(){
  //   categoriacuentaService.GetOnlyOneCategoriaCuenta("ST")
  //   .then(res=>{
  //     this.categoriaCuentaModel=res[0];
  //     console.log('Categoria-Cuenta',this.categoriaCuentaModel);
  //     for(var i=0;i<10;i++){
  //       // var reqDetalle:RequisicionDetalleModel=new RequisicionDetalleModel();
  //       // reqDetalle.strCateg_Account="A";
  //       // reqDetalle.intRequis_Item_NO=i+1;
  //       // reqDetalle.intIdAcctCateg_ID=this.categoriaCuentaModel.intIdAcctCateg_ID;
  //       // this.tableData1.push(reqDetalle);

  //       var reqDetalle:RequisicionDetalleModel=new RequisicionDetalleModel();
  //       reqDetalle.strCateg_Account="ST";
  //       reqDetalle.intRequis_Item_NO=i+1;
  //       reqDetalle.strDescription="";
  //       reqDetalle.intIdAcctCateg_ID=this.categoriaCuentaModel.intIdAcctCateg_ID;
  //       this.tableData1.push(reqDetalle);
  //     }
  //     console.log(this.tableData1);

  //     var object = JSON.parse(this.$route.query.data);
  //     var modulo = this.$route.query.vista;
  //     if(modulo.toLowerCase()!='aprobar'){
  //       if(modulo.toLowerCase()!='modificar'){
  //         this.visualizar=true;
  //         this.txtmodulo='Visualizar Requisición';
  //       }
  //       else{
  //         this.visualizar=false;
  //         this.txtmodulo='Modificar Requisición';
  //       }
  //     }
  //     else{
  //       this.visualizar=true;
  //       this.vifaprobarrechasar=true;
  //       this.txtmodulo='Aprobar Requisición';
  //     }
  //     this.cargar(object.strRequis_NO);
  //   })
  //   .catch(error=>{
  //     console.log('error',error)
  //   })
  //   tipoRequisicionService.GetAllTipoRequisicion()
  //   .then(res=>{
  //     debugger;
  //     this.tabletipoRequisicion=res;
  //     this.tiporequisicion="A";    
  //     this.tiporequisicionant='A';
  
  //   })
  //   .catch(error=>{
  //     console.log('error',error)
  //   })
  // }
  async load(){
    debugger;
    var desc:any=localStorage.getItem('compania_name');
    var cod:any=localStorage.getItem('compania_cod');
    this.requisicionModel.strCompany_Cod=cod;
    this.requisicionModel.strCompany_Desc=desc;
    await tipoRequisicionService.GetAllTipoRequisicion()
    .then(res=>{
      debugger;
      this.tabletipoRequisicion=res;
      this.tiporequisicion="A";    
      this.tiporequisicionant='A';
  
    })
    .catch(error=>{
      console.log('error',error)
    })
    await categoriacuentaService.GetOnlyOneCategoriaCuenta("ST")
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
    })
    .catch(error=>{
      console.log('error',error)
    })
    await maestroService.GetMaestro('VIEW','LA05') 
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
  async cargarData(){
    var object = JSON.parse(this.$route.query.data);
    var modulo = this.$route.query.vista;
    if(modulo.toLowerCase()!='aprobar'){
      if(modulo.toLowerCase()!='modificar'){
        this.visualizar=true;
        this.txtmodulo='Visualizar Requisición';
      }
      else{
        this.visualizar=false;
        this.txtmodulo='Modificar Requisición';
      }
    }
    else{
      this.visualizar=true;
      this.vifaprobarrechasar=true;
      this.txtmodulo='Aprobar Requisición';
    }
   await  this.cargar(object.strRequis_NO);
  }
  async cargar(codRequisicion){
    
    await requisicionService.getRequisicionByCod(codRequisicion)
    .then(res=>{
      if(res!=undefined){
        console.log('cargarData1',res)
        requisicionService.getrequisiciondetalle(res[0].intIdPurReqH_ID)
        .then(resd=>{
          if(resd!=undefined){
            this.requisicionModel=res[0];
            
            for(var i=0;i<resd.length;i++){
              console.log('detalle',resd);
              if(resd[i].intRequis_Item_NO!=null){
                this.CompleteData[resd[i].intRequis_Item_NO-1]=resd[i];
              }
            }
            this.CompleteData1=this.CompleteData;
            this.tableData1 = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      
          }
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
    if(val!=null){
      this.txtnroline="["+val.intRequis_Item_NO+"] "+val.strDescription;
      if(val.intRequis_Item_NO==0){
        this.intlineaselect=0;  
      }
      else{
        this.intlineaselect=val.intRequis_Item_NO-1;
      }
      console.log('handleCurrentChange',val);
      this.currentRow = val;
      this.fltQuantity=val.fltQuantity;
      this.dtmRequested_Date=this.getParseDate(val.dtmRequested_Date);
      this.fltUnitPrice=val.fltUnitPrice;
      this.fltValue_Total=this.fltUnitPrice*this.fltQuantity;
      this.strAccount_NO=val.strAccount_NO;
      this.strCostCenter=val.strCostCenter;
      this.getDetalle(val);
    }
  }

  getDetalle(val){
    debugger;
    if(val.strDescription!='')
    {
      productoService.GetOnlyOneProducto(val.strMaterial_Cod)
      .then(res=>{
        this.productoModel=res[0];
        console.log('producto--obtener',this.productoModel);
        this.getTotals=this.productoModel.fltPrecUnit_Local*this.selectrow.fltQuantity;
        proveedorService.GetOnlyOneProveedor(val.strVendor_Suggested)
        .then(ress=>{
          debugger;
          this.proveedorModel=ress;
          this.strVendor_NO=ress.strVendor_NO;
          this.strVendor_Desc=ress.strVendor_Desc;
          console.log('proveedor--obtener',this.proveedorModel);
        })
        .catch(error=>{
          console.log('error',error)
        })
        
      })
      .catch(error=>{
        console.log('error',error)
      })
    }
  }

  inlineText(){
    var document:any = this.$refs.missionTable;
    this.txtnroline="["+this.tableData1[this.intlineaselect].intRequis_Item_NO+"] "+this.tableData1[this.intlineaselect].strDescription;
    document.setCurrentRow(this.tableData1[this.intlineaselect]); 
    this.getDetalle(this.tableData1[this.intlineaselect]);
  }

  nextTable(){
    debugger;
    if(this.intlineaselect<this.tableData1.length-1){
      this.intlineaselect++;
    }
    var document:any = this.$refs.missionTable;
    this.txtnroline="["+this.tableData1[this.intlineaselect].intRequis_Item_NO+"] "+this.tableData1[this.intlineaselect].strDescription;
    document.setCurrentRow(this.tableData1[this.intlineaselect]);
    
  }
  backTable(){
    debugger;
    if(this.intlineaselect>0){
      this.intlineaselect--;
    }
    var document:any = this.$refs.missionTable;
    this.txtnroline="["+this.tableData1[this.intlineaselect].intRequis_Item_NO+"] "+this.tableData1[this.intlineaselect].strDescription;
    document.setCurrentRow(this.tableData1[this.intlineaselect]);
 
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
    return false;
  }
  closeUnidadMedida(){
    this.btnactivarunidadmedida=false;
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
  closeMaterial(){
    debugger;
    this.btnactivarmaterial=false;
    return false;
  }
  closeCuentaContable(){
    
    return false;
  }
  closeCategoriaLinea(){
    return false;
  }
  closeCentroCostos(){
    return false;
  }
  closeCategoriaCuenta(){
    return false;
  }
  closeMoneda(){
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
    if(this.tiporequisicionant!=value){
    this.tiporequisicionant=value;
    if(value=='N'){
      this.cell_ocultar='transparent';
      this.blntiporequisicion=true;
      this.blncategorialinea=true;
      
      this.blncentrocosto=true;
      this.blnunidadmedida=true;
      this.blnproveedor=true;
      this.tableData1=[];
      
      for(var i=0;i<10;i++){
        var reqDetalle:RequisicionDetalleModel=new RequisicionDetalleModel();
        reqDetalle.intRequis_Item_NO=i+1;
        this.tableData1.push(reqDetalle);
      }
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
      
      for(var i=0;i<10;i++){
        var reqDetalle:RequisicionDetalleModel=new RequisicionDetalleModel();
        reqDetalle.intRequis_Item_NO=i+1;
        reqDetalle.strCateg_Account="A"
        this.tableData1.push(reqDetalle);
      }
    }
    // this.btnactivaralmacen=false;
    // this.btnactivarproveedor=false;
    // this.btnactivarcompania=false
  }
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
  getTotal(){
    debugger;
    var cantidad=parseFloat(this.selectrow.fltQuantity.toString());
    var precio=parseFloat(this.productoModel.fltPrecUnit_Local.toString());
    return cantidad+precio;
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
    this.inlineText();
  }
  SeleccionadoCategoriaCuenta(val){
    this.selectrow.strCateg_Account=val.strAcctCateg_Cod;
    this.selectrow.intIdAcctCateg_ID=val.intIdAcctCateg_ID;
    this.dialogCategoriaCuenta=false;

    setTimeout(() => {
      if(val.strAcctCateg_Cod=='C'){
        this.dialogCentroCostos=true;
      }
    }, 300)
   this.inlineText();
  }
  SeleccionadoCategoriaLinea(val){
    debugger;
    this.selectrow.strCateg_Line=val.strCategItem_Cod;
    this.selectrow.intIdCategLine_ID=val.intIdCategLine_ID;
    this.dialogCategoriaLinea=false;

    setTimeout(() => {
      debugger;
      if(this.selectrow.strCateg_Account=='C'){
        if(this.selectrow.strCateg_Line=='B' || this.selectrow.strCateg_Line=='S'){
          this.dialogMaterial=true;
        }
      }
    }, 300)
    this.inlineText();
  }
  SeleccionadoCentroCosto(val){
    debugger;
    this.selectrow.strCostCenter=val.strCostCenter_NO;
    this.selectrow.intIdCostCenter_ID=val.intIdCostCenter_ID;
    this.selectrow.strCostCenter_Desc=val.strCostCenter_Desc;
    this.dialogCentroCostos=false;
    this.inlineText();
  }
  SeleccionadoCuentaContable(val){
    debugger;
    this.selectrow.strAccount_NO=val.strAcc_NO_Local;
    this.dialogCuentaContable=false;
    this.inlineText();
  }
  SeleccionadoMaterial(val){
    debugger;
    // this.selectrow.strMaterial_Cod=val.strStock_Cod;
    // this.selectrow.strWHS_Cod=val.strStock_Cod;
    // this.selectrow.intIdInvStock_ID=val.intIdInvStock_ID;
    // this.selectrow.strUM=val.strUM_Cod;
    // this.selectrow.strDescription=val.strStock_Desc;
    // //this.selectrow.strs=val.strStock_Desc;
    // this.selectrow.strAccount_NO=val.strExp_Acct;
    // this.selectrow.strVendor_Suggested=val.strVendor_NO;
 
    this.selectrow.strMaterial_Cod=val.strStock_Cod;
    this.selectrow.intIdInvStock_ID=val.intIdInvStock_ID;
    this.selectrow.strUM=val.strUM_Cod;
    this.selectrow.strDescription=val.strStock_Desc;
    this.selectrow.strAccount_NO=val.strExp_Acct;
    this.selectrow.strVendor_Suggested=val.strVendor_NO;
    this.selectrow.strVendor_Desc=val.strVendor_Desc;
    this.selectrow.strMatClass_Cod=val.strMaterial_Class;
    this.selectrow.strMatClass_Desc=val.strMatClass_Desc;
    this.selectrow.fltUnitPrice=val.fltPrecUnit_Local;
    this.selectrow.fltQuantity=0;
    this.selectrow.strCurr='';
    this.selectrow.strPriority_Cod='';
    this.selectrow.fltValue_Total=this.selectrow.fltUnitPrice*this.selectrow.fltQuantity;
    
    this.strVendor_NO=val.strVendor_NO;
    this.strVendor_Desc=val.strVendor_Desc;
    this.strAccount_NO=val.strExp_Acct;
    this.fltValue_Total=this.selectrow.fltUnitPrice*this.selectrow.fltQuantity;
    this.fltUnitPrice=val.fltPrecUnit_Local;
    this.fltQuantity=0;

    this.dialogMaterial=false;
    this.inlineText();
  }
 
  SeleccionadoUnidadMedida(val){
    debugger;
    this.selectrow.strUM=val.strUM_Cod;
    
    this.dialogUnidadMedida=false;
    this.inlineText();
  }
  SeleccionadoProveedor(val){
    debugger;
    this.selectrow.strVendor_Suggested=val.strVendor_NO;
    this.dialogProveedor=false;
    this.inlineText();
  }
  SeleccionadoMoneda(val){
    debugger;
    this.selectrow.strCurr=val.strCurrency_Cod;
    this.selectrow.intIdCurrency_ID=val.intIdCurrency_ID;
    this.dialogMoneda=false;
    this.inlineText();
  }
  SeleccionadoPrioridad(val){
    debugger;
    this.selectrow.strPriority_Cod=val.strPriority_Cod;
    this.selectrow.intIdPriority_ID=val.intIdPriority_ID;
    this.dialogPrioridad=false;
    this.inlineText();
  }
  cambioTipoRequisicion(selected){
    if(this.tiporequisicion!=selected){
      this.tiporequisicion=selected;
    }
    console.log('select',selected);
  }



  async guardarTodo(val){
    debugger;
      
    this.vifprogress=true;
    this.issave=false;
    this.iserror=false;
    this.textosave=''
    this.percentage=0;  

    var tabla:Array<RequisicionDetalleModel>=[];
    var tablan:Array<RequisicionDetalleModel>=[];

    for(var i=0;i<this.tableData1.length;i++){
      if(this.tableData1[i].strCateg_Account!="" && this.tableData1[i].strDescription!="" && this.tableData1[i].intIdPurReqH_ID!=0){
        // this.tableData1[i].intRequis_Item_NO=i;
        tabla.push(this.tableData1[i]);
      }
      else{
        if(this.tableData1[i].strCateg_Account!="" && this.tableData1[i].strDescription!=""){
          tablan.push(this.tableData1[i]);
        }
      }
    }
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
    this.requisicionModel.listaDetalle=tabla;
    this.requisicionModel.listaDetalleNuevo=tablan;
    for(var i=0;i<50;i++){
      this.percentage++;
    }
    console.log('---***---',this.requisicionModel);
    requisicionService.updateRequisicion(this.requisicionModel)
    .then(res=>{
      debugger;
      for(var i=0;i<50;i++){
        setTimeout(
          () => {this.percentage++;},1  
        )
      } 
      setTimeout(() => {   
        this.issave=true;
        this.textosave='Se modifico correctamente. '+res.strRequis_NO;
        this.openMessage('Se modifico correctamente '+res.strRequis_NO);
        this.vifprogress=false;
        
      }, 600)
    })
    .catch(error=>{
      
    })
    
  }
  async aprobar(){
    this.valuem=0;
    this.requisicionModel.strAuthsd_By='ADMINISTRADOR';
    await setTimeout(() => {
      for(var i=0;i<100;i++){
        this.valuem++; 
      }
    }, 200)
    console.log('aprobar',this.requisicionModel);
    await requisicionService.aprobarRequisicion(this.requisicionModel)
    .then(res=>{
      debugger;
      console.log(this.valuem);
      setTimeout(() => {
        this.vifprogress=false;
        this.issave=true;
        this.textosave='Se aprobó correctamente. '+res.strRequis_NO;
        this.openMessage('Se aprobó correctamente '+res.strRequis_NO);
      }, 600)
    })
    .catch(error=>{
      this.textosave='Ocurrio un error inesperado. ';
    })
  }
  async rechasar(){
    this.valuem=0;
    this.requisicionModel.strAuthsd_By='ADMINISTRADOR';
    await setTimeout(() => {
      for(var i=0;i<100;i++){
        this.valuem++; 
      }
    }, 200)
    await requisicionService.rechasarRequisicion(this.requisicionModel)
    .then(res=>{
      debugger;
      console.log(this.valuem);
      setTimeout(() => {
        this.vifprogress=false;
        this.issave=true;
        this.textosave='Se rechazó correctamente. '+res.strRequis_NO;
        this.openMessage('Se rechazó correctamente '+res.strRequis_NO);
      }, 600)
    })
    .catch(error=>{
      this.textosave='Ocurrio un error inesperado. ';
    })
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
      this.txtnroline="["+this.tableData1[this.intlineaselect].intRequis_Item_NO+"] "+this.tableData1[this.intlineaselect].strDescription;
    
    }

  }

  Limpiar(){
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
    //document.setCurrentRow(this.tableData[this.intlineaselect]);
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
    console.log(this.CompleteData);
  }
  siguiente(){
    if(this.pagina<(this.totalRegistros/this.RegistersForPage)){
      this.pagina++;
      this.tableData1 = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    }
  }
  data(){
    return{
      dialogTableVisible: false,
      dialogVisible:false,
      currentRow: null,
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
