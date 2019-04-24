import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import BCompaniaProveedor from '@/components/buscadores/b_compania/b_compania.vue';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';

import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from 'axios';
import { Loading } from 'element-ui';
import { mixin as focusMixin }  from 'vue-focus';

//***Modelos */
import {ProductoModel} from '@/modelo/maestro/producto';

import { Notification } from 'element-ui';
import Global from '@/Global';
import companiaService from '@/components/service/compania.service';
import cuentacontableService from '@/components/service/cuentacontable.service';
import proveedorService from '@/components/service/proveedor.service';
import BProveedorComponent from '@/components/buscadores/b_proveedor/b_proveedor.vue';
import {OrdenCompraModel } from '@/modelo/maestro/ordencompra';
import ordencompraService from '@/components/service/ordencompra.service';
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
    'quickaccessmenu':QuickAccessMenuComponent,
    'bproveedor':BProveedorComponent,
  } ,
 
})
export default class VisualizarModificarCuentaContableComponent extends Vue {
  sizeScreen:string = (window.innerHeight - 420).toString();//'0';
  sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  
  nameuser:string;
  namecomplete:string;
  SendDocument:boolean=false;
  vmaterial:string='';
  /*dialog*/
  dialogCompania:boolean=false;
 
  /*input*/
  btnactivarcompania:boolean=false;
   
  /*Model*/
  public productoModel:ProductoModel=new ProductoModel();

  descompania:string='';
  code_compania:string='';

  fecha_actual:string;
  selectrow:any;
  currentRow:any;
  selectcolumn:any;
  blntiporequisicion:boolean=true;
  tiporequisicion:string='';
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  
  formBusqueda:any={
    'strPO_NO':'',
    'desde':new Date(),
    'hasta':new Date(),
    'strVendor_NO':''
  }
  public tableData:Array<OrdenCompraModel>=[]; 
  valuem=0;
  btnbuscarb:boolean=false;
  fechaHasta:any=new Date();
  fechaDesde:any=new Date();
  strPO_NO:string='';
  btnactivarproveedor:boolean=false;
  dialogProveedor:boolean=false;
  strVendor_NO:string='';
  strVendor_Desc:string='';
  vifprogress:boolean=true;
  constructor(){
    super();
    this.fecha_actual=Global.getParseDate(new Date().toDateString());
    debugger;
    this.tiporequisicion="A";
    setTimeout(() => {
      this.load();
    }, 200)
  }
  load(){
    this.cargarList();
  }
  async cargarList(){
    debugger;
    var data:any=this.formBusqueda;
    if(this.strPO_NO==''){
      data.strPO_NO='*'
    }
    else{
      data.strPO_NO=this.strPO_NO
    }
    if(this.strVendor_NO==''){
      data.strStock_Cod='*'
    }
    else{
      data.strStock_Cod=this.strVendor_NO
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
    await cuentacontableService.GetBusquedaCuentaContable(data.strPO_NO,data.desde,data.hasta)
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
  loadCompania(){
    this.dialogCompania=true;
  }
  handleCurrentChange(val) {
    debugger;
    if(val!=null){
      this.selectrow=val;
      this.currentRow = val;
    }
  }
  /*Compania imput*/
  activar_compania(){
    setTimeout(() => {
      this.limpiarBotones();
      this.btnactivarcompania=true;
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
  // validarView(){
  //   debugger;
  //   Global.codematerial=this.productoModel.strStock_Cod;
  //   router.push({ path: `/barmenu/LO-LOGISTICA/almacen/al_salida_modificar`, query: { vista: 'modificar' }  })
  
  // }
  created() {
    debugger;
    if(typeof window != 'undefined') {
      // this.getAccesos();
      debugger;
      this.vmaterial=Global.vmmaterial;
    }
  }
  async validarView(){
    debugger;
    if(this.selectrow!=undefined && this.selectrow!=null && this.selectrow.intIdInvStock_ID!=-1){
      this.vifprogress=true;
      this.valuem=0;
      await setTimeout(() => {
        for(var i=0;i<100;i++){
          this.valuem++; 
        }
      }, 200)
      await setTimeout(() => {
        debugger;
        console.log('----,,,',this.selectrow);
        if(this.selectrow!=undefined && this.selectrow!=null && this.selectrow.strAcc_Local_NO!=''){
          router.push({ path: `/barmenu/FI-FINANZAS/maestro-datos/contabilidad-general/modificar_cuenta_contable`, query: { vista: 'modificar',data:JSON.stringify(this.selectrow) }  })
        }
      }, 600)
    }
    else{
      this.vifprogress=false;
      this.textosave='Seleccione alguna salida. ';
    }
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
  data(){
    return{
      dialogTableVisible: false,
      dialogVisible:false,
      tableDataServicio:[{}],
      user: {
        authenticated: false
      },
    }
  }
  
}
