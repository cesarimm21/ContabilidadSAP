
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

import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from 'axios';
import { Loading } from 'element-ui';

import documentService from '@/components/service/documents.service';
import msmsendService from '@/components/service/msnSend.service';
import historialService from '@/components/service/historial.service';
import inicioService from '@/components/service/inicio.service';
import salidaService from '@/components/service/salida.service';
import ordencompraService from '@/components/service/ordencompra.service';

import BProveedorComponent from '@/components/buscadores/b_proveedor/b_proveedor.vue';


import proveedorService from '@/components/service/proveedor.service';
import {SalidaMaterialModel} from '@/modelo/maestro/salidamaterial';
import { Notification } from 'element-ui';
import Global from '@/Global';
import { SalidaModel } from '@/modelo/maestro/salida';
import {OrdenCompraModel } from '@/modelo/maestro/ordencompra';
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
  name: 'aprobar-po',
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
    'bproveedor':BProveedorComponent,
  } ,
})
export default class AprobarPOComponent extends Vue {
  timer=0;
  sizeScreen:string = (window.innerHeight - 420).toString();//'0';
  sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  formBusqueda:any={
    'strPO_NO':'',
    'desde':new Date(),
    'hasta':new Date(),
    'strVendor_NO':''
  }
  strPO_NO:string='';

  public salidaModel:SalidaMaterialModel=new SalidaMaterialModel();
  // public OrdenCompra: Array<OrdenCompraModel>;
    public tableData11: Array<OrdenCompraModel>;
    public tableData12: Array<OrdenCompraModel>;
  public opSelect: OrdenCompraModel=new OrdenCompraModel();
  fechaHasta:any=new Date();
  fechaDesde:any=new Date();
  public tableData:Array<OrdenCompraModel>=[]; 
  vifprogress:boolean=true;
  textosave:string='';
  iserror:boolean=false;
  issave:boolean=false;
  valuem=0;
  clickColumn:string='';
    txtbuscar:string='';
    Column:string='';
    blnilterstrPO_NO:boolean=false;
    blnilterstrRequis_NO:boolean=false;
    blnilterstrPO_Desc:boolean=false;
    blnilterstrVendor_Desc:boolean=false;
    blnilterdtmProcess_Date:boolean=false;
    blnilterfltTotal_Val:boolean=false;
  btnactivarproveedor:boolean=false;
  dialogProveedor:boolean=false;

  dialogBusquedaFilter:boolean=false;
  pagina: number =1;
    RegistersForPage: number = 100;
    totalRegistros: number = 100;
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
  currentRow:any;
  selectcolumn:any;
  blntiporequisicion:boolean=true;
  tiporequisicion:string='';
  visualizar:boolean;
  strVendor_NO:string='';
  strVendor_Desc:string='';
  codigoCompania:any;
  descripcionCompania:any;
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
    this.codigoCompania=localStorage.getItem('compania_cod');
    this.descripcionCompania=localStorage.getItem('compania_name');
    var view = this.$route.query.vista;
    if(view==="visualizar"){
      this.visualizar=true;
    }
    else{
      this.visualizar=false;
    }
    this.cargar()
  }
  desactivar_proveedor(){
    if(this.dialogProveedor){
      this.btnactivarproveedor=false;
    }
  }
  activar_proveedor(){
    setTimeout(() => {
      this.limpiarBotones();
      this.btnactivarproveedor=true;
    }, 120)
  }
  limpiarBotones(){
    this.btnactivarproveedor=false;
  }
  closeProveedor(){
    this.btnactivarproveedor=false;
    return false;
  }
  SeleccionadoProveedor(val){
    this.strVendor_NO=val.strVendor_NO;
    this.strVendor_Desc=val.strVendor_Desc;
    this.dialogProveedor=false;
  }
  enterProveedor(code){
    //alert('Bien'+code);
    proveedorService.GetOnlyOneProveedor(code)
    .then(response=>{
      if(response!=undefined){
        if(response.length>0){
          this.strVendor_NO=response[0].strVendor_NO;
          this.strVendor_Desc=response[0].strVendor_Desc;
          this.dialogProveedor=false;
          this.btnactivarproveedor=false;
        }
      }     
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar proveedor'
      });
    })
  }
  borrarProveedor(){
    this.strVendor_Desc='';
    this.dialogProveedor=false;
    this.btnactivarproveedor=false;
  }
  LoadProveedor(){
    this.dialogProveedor=true;      
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
  handleCurrentChange(val) {
    this.opSelect=val;
    this.strPO_NO=this.opSelect.strPO_NO;
    if(val!=null){
      this.selectrow=val;      
      this.currentRow = val;
    }
  }
  isEditing() {
    return this.editing !== null
  }
  onCellBlur(row, column, cell, event) {
    this.editing = null
  }
  onCellClick(row, column, cell, event) {
    this.editing = {
      row,
      column,
      cell
    }
  }  
  getParseDate(fecha:string){
    var dateString = new Date(fecha);
    var dia = dateString.getDate();
        var mes = (dateString.getMonth()<12) ? dateString.getMonth()+1 : mes = dateString.getMonth();
        var yyyy = dateString.getFullYear();
        var dd = (dia<10) ? '0'+dia : dd=dia;
        var mm = (mes<10) ? '0'+mes : mm=mes;
        return dd+'.'+mm+'.'+yyyy;
    }
  async validarView(){
    if(this.selectrow!=undefined && this.selectrow!=null && this.selectrow.intIdPOH_ID!=-1){
      this.vifprogress=true;
      this.valuem=0;
      await setTimeout(() => {
        for(var i=0;i<100;i++){
          this.valuem++; 
        }
      }, 200)
      await setTimeout(() => {
        this.selectrow.intIdPurReqH_ID=this.selectrow.intIdPurReqH_ID.intIdPurReqH_ID;
        this.selectrow.intIdVendor_ID=this.selectrow.intIdVendor_ID.intIdVendor_ID;
        this.selectrow.intIdTypeReq_ID=this.selectrow.intIdTypeReq_ID.intIdTypeReq_ID;
        this.selectrow.intIdWHS_ID=this.selectrow.intIdWHS_ID.intIdWHS_ID;
        if(this.selectrow!=undefined && this.selectrow!=null && this.selectrow.intIdPOH_ID!=-1){
          router.push({ path: `/barmenu/LO-LOGISTICA/orden_compra/po_viewandedit`, query: { vista: 'aprobar',data:JSON.stringify(this.selectrow) }  })
        }
      }, 600)
    }
    else{
      this.vifprogress=false;
      this.textosave='Seleccione alguna salida. ';
      this.warningMessage('Seleccione  alguna salida. ');
    }
  }
  validad(){
    if(this.strPO_NO!=""){
      ordencompraService.getPOONEview(this.strPO_NO)
      .then(respo=>{
        this.opSelect=respo;            
        if(this.opSelect.strPO_NO!=undefined){
          router.push({ path: `/barmenu/LO-LOGISTICA/orden_compra/po_viewandedit`, query: { vista:'aprobar' ,data:JSON.stringify(this.opSelect) }  })
        }     
        else{
          this.warningMessage('No existe Orden Compra');
        }      
      })
      .catch(error=>{
        this.warningMessage('No existe Orden Compra');
      })          
    }
    else{
      this.warningMessage('Inserte Orden Compra');
    }
  }
  warningMessage(newMsg : string) {
    this.$message({
      showClose: true,
      message: newMsg,
      type: 'warning'
    });
  }
  async cargar(){
    var data:any=this.formBusqueda;
    data.strPO_NO='*'
    data.strVendor_NO='*'
    data.desde='*'
    data.hasta= '*'
    for(var i=0;i<50;i++){
      this.valuem++; 
    }
    await ordencompraService.getOCForAprove(this.codigoCompania)
    .then(res=>{
      for(var i=0;i<50;i++){
        this.valuem++; 
      }
      if(this.valuem>=100){
        setTimeout(() => {
          this.tableData=[];
          this.tableData11=[];
          this.tableData12=[];
          this.tableData=res;
          this.tableData11=res;
          this.tableData12=res;
          this.vifprogress=false;
        }, 600)
      }
    })
    .catch(error=>{
      
    })
  }
  Buscar(){
    debugger;
    if(this.Column!=""){
      this.dialogBusquedaFilter=true;
      this.txtbuscar='';
    }
    else{
      this.$message('Seleccione columna')
    }
  }
  Limpiar(){
    this.tableData=[];
    this.blnilterstrPO_NO=false;
    this.blnilterstrRequis_NO=false;
    this.blnilterstrPO_Desc=false;
    this.blnilterstrVendor_Desc=false;
    this.blnilterdtmProcess_Date=false;
    this.blnilterfltTotal_Val=false;
    this.tableData = this.tableData12.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    
  }
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
    var data=await this.sortByKeyAsc(this.tableData11,this.clickColumn) 
    this.tableData12=[];
    this.tableData12=data;
    this.tableData = await this.tableData12.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    await loading.close();
  }
  DscItem(){
    debugger;
    console.log("desc",this.clickColumn)
    var data=this.sortByKeyDesc(this.tableData11,this.clickColumn) 
    this.tableData12=[];
    this.tableData12=data;
    this.tableData = this.tableData12.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
  
  }
  btnBuscar(){
    var data=this.like(this.tableData11,this.clickColumn,this.txtbuscar)
    this.tableData=[];
    this.tableData=data;
    this.dialogBusquedaFilter=false;
  }
  siguiente(){
    if(this.pagina<(this.totalRegistros/this.RegistersForPage)){
      this.pagina++;
      this.tableData = this.tableData11.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    }
  }
  anterior(){
    if(this.pagina>1){
    this.pagina--;
    this.tableData = this.tableData11.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    }
  }
  EliminarItem(){

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
  // async Buscar(){
  //   var data:any=this.formBusqueda;
  //   if(this.strPO_NO==''){
  //     data.strPO_NO='*'
  //   }
  //   else{
  //     data.strPO_NO=this.strPO_NO
  //   }
  //   if(this.strVendor_NO==''){
  //     data.strVendor_NO='*'
  //   }
  //   else{
  //     data.strVendor_NO=this.strVendor_NO
  //   }
  //   var hdate=new Date(this.fechaHasta);
  //   hdate.setDate(hdate.getDate()+1)
  //   data.desde=await Global.getDateString(this.fechaDesde)
  //   data.hasta= await Global.getDateString(hdate)
  //   for(var i=0;i<50;i++){
  //     this.valuem++; 
  //   }
  //   await ordencompraService.busquedaPO(data)
  //   .then(res=>{
  //     for(var i=0;i<50;i++){
  //       this.valuem++; 
  //     }
  //     if(this.valuem>=100){
  //       setTimeout(() => {
  //         this.tableData=res;
  //         this.vifprogress=false;
  //       }, 600)
  //     }
  //   })
  //   .catch(error=>{
      
  //   })
  // }
  getDateString(fecha:string){
    var dateString = new Date(fecha);
    var dia = dateString.getDate();
        var mes = (dateString.getMonth()<12) ? dateString.getMonth()+1 : mes = dateString.getMonth();
        var yyyy = dateString.getFullYear();
        var dd = (dia<10) ? '0'+dia : dd=dia;
        var mm = (mes<10) ? '0'+mes : mm=mes;
        return dd+'.'+mm+'.'+yyyy;
    }
  headerclick(val){    
    this.Column=val.label;
    Global.setColumna(this.Column);
    if(val.property=="strPO_NO"){
        this.clickColumn="strPO_NO";
        this.blnilterstrPO_NO=true;
        this.blnilterstrRequis_NO=false;
        this.blnilterstrPO_Desc=false;
        this.blnilterstrVendor_Desc=false;
        this.blnilterdtmProcess_Date=false;
        this.blnilterfltTotal_Val=false;
    }
    if(val.property=="strRequis_NO"){
        this.clickColumn="strRequis_NO";
        this.blnilterstrPO_NO=false;
        this.blnilterstrRequis_NO=true;
        this.blnilterstrPO_Desc=false;
        this.blnilterstrVendor_Desc=false;
        this.blnilterdtmProcess_Date=false;
        this.blnilterfltTotal_Val=false;
    }
    if(val.property=="strPO_Desc"){
        this.clickColumn="strPO_Desc";
        this.blnilterstrPO_NO=false;
        this.blnilterstrRequis_NO=false;
        this.blnilterstrPO_Desc=true;
        this.blnilterstrVendor_Desc=false;
        this.blnilterdtmProcess_Date=false;
        this.blnilterfltTotal_Val=false;
    }
    if(val.property=="strVendor_Desc"){
        this.clickColumn="strVendor_Desc";
        this.blnilterstrPO_NO=false;
        this.blnilterstrRequis_NO=false;
        this.blnilterstrPO_Desc=false;
        this.blnilterstrVendor_Desc=true;
        this.blnilterdtmProcess_Date=false;
        this.blnilterfltTotal_Val=false;
    }
    if(val.property=="dtmProcess_Date"){
        this.clickColumn="dtmProcess_Date";
        this.blnilterstrPO_NO=false;
        this.blnilterstrRequis_NO=false;
        this.blnilterstrPO_Desc=false;
        this.blnilterstrVendor_Desc=false;
        this.blnilterdtmProcess_Date=true;
        this.blnilterfltTotal_Val=false;
    }
    if(val.property=="fltTotal_Val"){
        this.clickColumn="fltTotal_Val";
        this.blnilterstrPO_NO=false;
        this.blnilterstrRequis_NO=false;
        this.blnilterstrPO_Desc=false;
        this.blnilterstrVendor_Desc=false;
        this.blnilterdtmProcess_Date=false;
        this.blnilterfltTotal_Val=true;
    }
}
filterstrPO_NO(h,{column,$index}){
    if(this.blnilterstrPO_NO){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterstrRequis_NO(h,{column,$index}){
    
    if(this.blnilterstrRequis_NO){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterstrPO_Desc(h,{column,$index}){
    
    if(this.blnilterstrPO_Desc){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterstrVendor_Desc(h,{column,$index}){
    if(this.blnilterstrVendor_Desc){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterdtmProcess_Date(h,{column,$index}){
    
    if(this.blnilterdtmProcess_Date){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterfltTotal_Val(h,{column,$index}){
    
    if(this.blnilterfltTotal_Val){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
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
  guardarTodo(){
    this.$message({
      showClose: true,
      message: 'Accion no permitida',
      type: 'warning'
    });
  }
  data(){
    return{
      dialogTableVisible: false,
      dialogVisible:false,
      tableData:[],
      tableData11:[],
      tableData12:[],
      tableDataServicio:[{}],
      codigoCompania:'',
      descripcionCompania:'',
      user: {
        authenticated: false
      },
      data:{
        Usuario:localStorage.getItem('User_Nombre'),
      },
      value: '',
      accesosUser: [],
      hours: 0,
      minutos:0,
      seconds:0,
      strPO_NO:''
    }
  }
}
