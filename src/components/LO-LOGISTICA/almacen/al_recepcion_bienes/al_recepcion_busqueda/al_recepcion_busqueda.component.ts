
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
  name: 'recepcion-b',
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
export default class RecepcionBusquedaComponent extends Vue {
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
  
  fechaHasta:any=new Date();
  fechaDesde:any=new Date();
  public tableData:Array<OrdenCompraModel>=[]; 
  vifprogress:boolean=true;
  textosave:string='';
  iserror:boolean=false;
  issave:boolean=false;
  valuem=0;
  
  btnactivarproveedor:boolean=false;
  dialogProveedor:boolean=false;
  btnbuscarb:boolean=false;
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
    var view = this.$route.query.vista;
    if(view==="visualizar"){
      this.visualizar=true;
    }
    else{
      this.visualizar=false;
    }
    this.cargarList();
  }
  desactivar_proveedor(){
    debugger;
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
    debugger;
    this.btnactivarproveedor=false;
    return false;
  }
  SeleccionadoProveedor(val){
    debugger;

    this.strVendor_NO=val.strVendor_NO;
    this.strVendor_Desc=val.strVendor_Desc;
    this.dialogProveedor=false;
  }
  enterProveedor(code){
    //alert('Bien'+code);
    debugger;
    proveedorService.GetOnlyOneProveedor(code)
    .then(response=>{
      debugger;
      if(response!=undefined){
        if(response.length>0){
          this.strVendor_NO=response[0].strVendor_NO;
          this.strVendor_Desc=response[0].strVendor_Desc;
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
    debugger;
    if(val!=null){
      this.selectrow=val;
      this.currentRow = val;
    }
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
  getParseDate(fecha){
    return Global.getParseDate(fecha);
  }
  
  async validarView(){
    debugger;
    if(this.selectrow!=undefined && this.selectrow!=null && this.selectrow.intIdPOH_ID!=-1){
      this.vifprogress=true;
      this.valuem=0;
      await setTimeout(() => {
        for(var i=0;i<100;i++){
          this.valuem++; 
        }
      }, 200)
      await setTimeout(() => {
        debugger;
        this.selectrow.intIdPurReqH_ID=this.selectrow.intIdPurReqH_ID.intIdPurReqH_ID;
        this.selectrow.intIdVendor_ID=this.selectrow.intIdVendor_ID.intIdVendor_ID;
        this.selectrow.intIdTypeReq_ID=this.selectrow.intIdTypeReq_ID.intIdTypeReq_ID;
        this.selectrow.intIdWHS_ID=this.selectrow.intIdWHS_ID.intIdWHS_ID;
        console.log('----,,,',this.selectrow);
        if(this.selectrow!=undefined && this.selectrow!=null && this.selectrow.intIdPOH_ID!=-1){
          router.push({ path: `/barmenu/LO-LOGISTICA/almacen/al_recepcion_bienes/al_recepcion`, query: { vista: 'visualizar',data:JSON.stringify(this.selectrow) }  })
        }
      }, 600)
    }
    else{
      this.vifprogress=false;
      this.textosave='Seleccione alguna salida. ';
      this.warningMessage('Seleccione  alguna salida. ');
    }
  }
  
  warningMessage(newMsg : string) {
    this.$message({
      showClose: true,
      message: newMsg,
      type: 'warning'
    });
  }
  async cargarList(){
    var data:any=this.formBusqueda;
    if(this.strPO_NO==''){
      data.strPO_NO='*'
    }
    else{
      data.strPO_NO=this.strPO_NO
    }
    if(this.strVendor_NO==''){
      data.strVendor_NO='*'
    }
    else{
      data.strVendor_NO=this.strVendor_NO
    }
    var hdate=new Date(this.fechaHasta);
    hdate.setDate(hdate.getDate()+1)
    if(this.btnbuscarb){
      data.desde=await Global.getDateString(this.fechaDesde)
      data.hasta= await Global.getDateString(hdate)
    }
    else{
      data.desde="*";
      data.hasta="*";
    }
    
    for(var i=0;i<50;i++){
      this.valuem++; 
    }
    await ordencompraService.busquedaRPO(data)
    .then(res=>{
      debugger;
      for(var i=0;i<50;i++){
        this.valuem++; 
      }
      console.log(res);
      if(this.valuem>=100){
        setTimeout(() => {
          console.log('/****************Busqueda***************/')
          console.log(res)
          this.tableData=res;
          this.vifprogress=false;
        }, 600)
      }
    })
    .catch(error=>{
      
    })
  }
  async Buscar(){
    debugger;
    this.btnbuscarb=true;
    this.cargarList();
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
      seconds:0
    }
  }
}
