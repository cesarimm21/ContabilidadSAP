import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import BCompaniaProveedor from '@/components/buscadores/b_compania/b_compania.vue';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';

import BAlmacenComponent from '@/components/buscadores/b_almacen/b_almacen.vue';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from 'axios';
import { Loading } from 'element-ui';


//***Modelos */
import {ProductoModel} from '@/modelo/maestro/producto';

import almacenService from '@/components/service/almacen.service';
import { Notification } from 'element-ui';
import Global from '@/Global';
import companiaService from '@/components/service/compania.service';
import productoService from '@/components/service/producto.service';
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
    'balmacen':BAlmacenComponent,
  } ,
 
})
export default class VisualizarModificarMaterialComponent extends Vue {
  sizeScreen:string = (window.innerHeight - 420).toString();//'0';
  sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  
  nameuser:string;
  namecomplete:string;
  SendDocument:boolean=false;
  vmaterial:string='';
  checkFecha:boolean=true;
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
  company_cod:any='';
  company_desc:any='';
  
  desalmacen:string='';
  dialogEliminar:boolean=false;
  formBusqueda:any={
    'strPO_NO':'',
    'desde':new Date(),
    'hasta':new Date(),
    'strWHS_Cod':'',
    'strVendor_NO':''
  }
  public tableData:Array<ProductoModel>=[]; 
  valuem:number=50;
  striped=true;
  per:number=3;
  percentage:number;
  btnbuscarb:boolean=false;
  fechaHasta:any=new Date();
  strStock_Cod:string='';
  fechaDesde:any=new Date();
  strPO_NO:string='';
  btnactivarproveedor:boolean=false;
  btnactivaralmacen:boolean=false;
 
  dialogAlmacen:boolean=false;
  strWHS_Cod:string='';
  strWHS_Desc:string='';
  dialogProveedor:boolean=false;
  strVendor_NO:string='';
  strVendor_Desc:string='';
  vifprogress:boolean=true;

  ///#region
  blnfilterstrWHS_Cod:boolean=false;
  blnfilterstrWHS_Desc:boolean=false;
  blnfilterstrStock_Cod:boolean=false;
  blnfilterstrStock_Desc:boolean=false;
  blnfilterstrUM_Cod:boolean=false;
  blnfilterfltQuantity:boolean=false;
  blnfilterfltPrecUnit_Local:boolean=false;
  dialogBusquedaFilter:boolean=false;
  public CompleteData:Array<ProductoModel>=[]; 
  public CompleteData1:Array<ProductoModel>=[]; 
  clickColumn:string='';
  txtbuscar:string='';
  Column:string='';
  pagina: number =1;
  RegistersForPage: number = 100;
  totalRegistros: number = 100;
  
  //#endregion
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
    var data=localStorage.getItem('compania_name');
    this.company_desc=data;
    this.company_cod=localStorage.getItem('compania_cod');
    this.cargarList();
    if(this.checkFecha){
      this.fechaDesde=""
      this.fechaHasta=""
    }
    else{
      this.fechaDesde=new Date();
      this.fechaHasta=new Date();
    }
  }
  async cargarList(){
    debugger;
    this.vifprogress=true;
    this.percentage=0;
    var data:any=this.formBusqueda;
    this.tableData=[];
    if(this.strStock_Cod==''){
      data.strStock_Cod='*'
    }
    else{
      data.strStock_Cod=this.strStock_Cod
    }
    var hdate=new Date(this.fechaHasta);
    hdate.setDate(hdate.getDate()+1)
    if(!this.checkFecha){
      data.desde=await Global.getDateString(this.fechaDesde)
      data.hasta= await Global.getDateString(this.fechaHasta)
    }
    else{
      data.desde="*";
      data.hasta="*";
    }
    if(this.strWHS_Cod==''){
      data.strWHS_Cod='*';
    }
    else{
      data.strWHS_Cod=this.strWHS_Cod;
    }
    
    for(var i=0;i<50;i++){
      this.valuem++; 
      this.percentage++;
      this.per++;
    }
    await productoService.busquedaProducto(data)
    .then(res=>{
      debugger;
     
      console.log(res);
     // if(this.valuem>=100){
        // setTimeout(() => {
          for(var i=0;i<50;i++){
            setTimeout(
              () => {this.percentage++;},1  
            )
          }
          console.log('/****************Busqueda***************/')
          console.log(res)
         // }, 1200)
        setTimeout(() => {    this.CompleteData=res;
          this.CompleteData1=this.CompleteData;
          this.totalRegistros=this.CompleteData1.length;
          this.tableData = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      this.vifprogress=false;}, 600)
      //}
    })
    .catch(error=>{
      
    })
  }
  async BuscarProducto(){
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
        // this.selectrow.intIdPurReqH_ID=this.selectrow.intIdPurReqH_ID.intIdPurReqH_ID;
        // this.selectrow.intIdVendor_ID=this.selectrow.intIdVendor_ID.intIdVendor_ID;
        // this.selectrow.intIdTypeReq_ID=this.selectrow.intIdTypeReq_ID.intIdTypeReq_ID;
        // this.selectrow.intIdWHS_ID=this.selectrow.intIdWHS_ID.intIdWHS_ID;
        console.log('----,,,',this.selectrow);
        if(this.selectrow!=undefined && this.selectrow!=null && this.selectrow.intIdInvStock_ID!=-1){
          router.push({ path: `/barmenu/LO-LOGISTICA/almacen/al_modificar`, query: { vista: 'modificar',data:JSON.stringify(this.selectrow) }  })
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
  backPage(){
    window.history.back();
  }
  reloadpage(){
    window.location.reload();
  }
  changeFecha(){
    debugger;
    if(this.checkFecha){
      this.fechaDesde=""
      this.fechaHasta=""
    }
  }
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
  enterAlmacen(code){
    //alert('Bien'+code);
    debugger;
    almacenService.GetOnlyOneAlmacen(code)
    .then(response=>{
      debugger;
      if(response!=undefined){
        if(response.length>0){
          this.strWHS_Cod=response[0].strWHS_Cod
          this.strWHS_Desc=response[0].strWHS_Desc;;
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
  
  borrarAlmacen(){
    this.desalmacen='';
    this.productoModel.strWHS_Desc='';
    this.dialogAlmacen=false;
    this.btnactivaralmacen=false;
  }
  
  loadAlmacen(){
    this.dialogAlmacen=true;
  }
  
  SeleccionadoAlmacen(val){
    debugger;
    this.strWHS_Cod=val.strWHS_Cod;
    this.strWHS_Desc=val.strWHS_Desc;
    this.desalmacen=val.strWHS_Desc;
    this.dialogAlmacen=false;
  }

  EliminarItem(){
    debugger;
    if(this.selectrow!=undefined){
      this.dialogEliminar=true;
    }
    else{
      alert('Debe de seleccionar una fila!!!');
    }
    
  }
  async btnEliminar(){
    await productoService.eliminarProducto(this.selectrow)
    .then(response=>{
      debugger;
      console.log('eliminar',response);
      if(response!=undefined){
         this.textosave='Se elimino correctamento.' + response.strStock_Cod;
         this.issave=true;
         this.iserror=false;
      }
      else{
        this.issave=false;
        this.iserror=true;
        this.textosave='Ocurrio un error al eliminar.';
      }
      this.dialogEliminar=false;
      //this.unidadmedidaModel=response;       
    }).catch(error=>{
      
      this.dialogEliminar=false;
      this.issave=false;
      this.iserror=true;
      this.textosave='Ocurrio un error al eliminar.';
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar almacen'
      });
    })
    await this.cargarList();
  }

  ///#region  button accion
  filterstrWHS_Cod(h,{column,$index}){
    debugger;
    
    if(this.blnfilterstrWHS_Cod){
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
  filterstrWHS_Desc(h,{column,$index}){
    debugger;
    
    if(this.blnfilterstrWHS_Desc){
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
  filterfltPrecUnit_Local(h,{column,$index}){
    debugger;
    
    if(this.blnfilterfltPrecUnit_Local){
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
    
    this.Column=val.label;
    Global.setColumna(this.Column);
    this.clickColumn=val.property;
     
    if(val.property=="strWHS_Cod"){
      this.blnfilterstrWHS_Cod=true;
      this.blnfilterstrWHS_Desc=false;
      this.blnfilterstrStock_Cod=false;
      this.blnfilterstrStock_Desc=false;
      this.blnfilterstrUM_Cod=false;
      this.blnfilterfltQuantity=false;
      this.blnfilterfltPrecUnit_Local=false;
    }
    if(val.property=="strWHS_Desc"){
      this.blnfilterstrWHS_Cod=false;
      this.blnfilterstrWHS_Desc=true;
      this.blnfilterstrStock_Cod=false;
      this.blnfilterstrStock_Desc=false;
      this.blnfilterstrUM_Cod=false;
      this.blnfilterfltQuantity=false;
      this.blnfilterfltPrecUnit_Local=false;
    }
    if(val.property=="strStock_Cod"){
      this.blnfilterstrWHS_Cod=false;
      this.blnfilterstrWHS_Desc=false;
      this.blnfilterstrStock_Cod=true;
      this.blnfilterstrStock_Desc=false;
      this.blnfilterstrUM_Cod=false;
      this.blnfilterfltQuantity=false;
      this.blnfilterfltPrecUnit_Local=false;
    }
    
    if(val.property=="strStock_Desc"){
      this.blnfilterstrWHS_Cod=false;
      this.blnfilterstrWHS_Desc=false;
      this.blnfilterstrStock_Cod=false;
      this.blnfilterstrStock_Desc=true;
      this.blnfilterstrUM_Cod=false;
      this.blnfilterfltQuantity=false;
      this.blnfilterfltPrecUnit_Local=false;
    }
    if(val.property=="strUM_Cod"){
      this.blnfilterstrWHS_Cod=false;
      this.blnfilterstrWHS_Desc=false;
      this.blnfilterstrStock_Cod=false;
      this.blnfilterstrStock_Desc=false;
      this.blnfilterstrUM_Cod=true;
      this.blnfilterfltQuantity=false;
      this.blnfilterfltPrecUnit_Local=false;
    }
    if(val.property=="fltQuantity"){
      this.blnfilterstrWHS_Cod=false;
      this.blnfilterstrWHS_Desc=false;
      this.blnfilterstrStock_Cod=false;
      this.blnfilterstrStock_Desc=false;
      this.blnfilterstrUM_Cod=false;
      this.blnfilterfltQuantity=true;
      this.blnfilterfltPrecUnit_Local=false;
    }
    if(val.property=="fltPrecUnit_Local"){
      this.blnfilterstrWHS_Cod=false;
      this.blnfilterstrWHS_Desc=false;
      this.blnfilterstrStock_Cod=false;
      this.blnfilterstrStock_Desc=false;
      this.blnfilterstrUM_Cod=false;
      this.blnfilterfltQuantity=false;
      this.blnfilterfltPrecUnit_Local=true;
    }
    
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
      if(array[i][key]!=undefined){
        if(array[i][key].toString().indexOf(keyword) > -1 ) {
          responsearr.push(array[i])
        }
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
    this.tableData=data;
    this.dialogBusquedaFilter=false;
  }
  sortBy = (key, reverse) => {

    const moveSmaller = reverse ? 1 : -1;
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
    this.tableData = await this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    await loading.close();
  }
  DscItem(){
    debugger;
    console.log("desc",this.clickColumn)
    var data=this.sortByKeyDesc(this.CompleteData,this.clickColumn) 
    this.CompleteData=data;
    this.tableData = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
  
  }
  anterior(){
    debugger
    console.log('anterior',this.pagina);
    if(this.pagina>1){
    this.pagina--;
    this.tableData = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    }
  }
  Limpiar(){
    this.blnfilterstrWHS_Cod=false;
    this.blnfilterstrWHS_Desc=false;
    this.blnfilterstrStock_Cod=false;
    this.blnfilterstrStock_Desc=false;
    this.blnfilterstrUM_Cod=false;
    this.blnfilterfltQuantity=false;
    this.blnfilterfltPrecUnit_Local=false;
    this.CompleteData=this.CompleteData1;
    this.tableData = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    var document:any = this.$refs.missionTable;
    //document.setCurrentRow(this.tableData[this.intlineaselect]);
  }
  Print(){
    window.print();
  }

  siguiente(){
    debugger;
    console.log('sigiente',this.totalRegistros/this.RegistersForPage)
    if(this.pagina<(this.totalRegistros/this.RegistersForPage)){
      this.pagina++;
      this.tableData = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    }
  }
  //#endregion
  
  data(){
    return{
      percentage: '0',
      dialogTableVisible: false,
      dialogVisible:false,
      tableDataServicio:[{}],
      user: {
        authenticated: false
      },
    }
  }
  
  
}
