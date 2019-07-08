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
import {ClaseMaterialModel} from '@/modelo/maestro/clasematerial';

import almacenService from '@/components/service/almacen.service';
import { Notification } from 'element-ui';
import Global from '@/Global';
import companiaService from '@/components/service/compania.service';
import clasematerialService from '@/components/service/clasematerial.service';
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
export default class VisualizarModificarClaseServicioComponent extends Vue {
  sizeScreen:string = (window.innerHeight - 420).toString();//'0';
  sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  
  nameuser:string;
  namecomplete:string;
  SendDocument:boolean=false;
  vmaterial:string='';
  checkFecha:boolean=true;
  /*dialog*/
 
  /*input*/
  btnactivarcompania:boolean=false;
   
  /*Model*/
  public clasematerialmodel:ClaseMaterialModel=new ClaseMaterialModel();

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
  public tableData:Array<ClaseMaterialModel>=[]; 
  valuem:number=50;
  striped=true;
  per:number=3;
  percentage:number;
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
  blnfilterstrMatClass_Cod:boolean=false;
  blnfilterstrMatClass_Desc:boolean=false;
  blnfilterstrStock_Type_Desc:boolean=false;
  blnfilterstrAcct_Loc:boolean=false;
  blnfilterstrExp_Cod_Loc:boolean=false;
  blnfilterdtmModified_Date:boolean=false;
  blnfilterstrModified_User:boolean=false;
  dialogBusquedaFilter:boolean=false;
  public CompleteData:Array<ClaseMaterialModel>=[]; 
  public CompleteData1:Array<ClaseMaterialModel>=[]; 
  clickColumn:string='';
  txtbuscar:string='';
  Column:string='';
  pagina: number =1;
  RegistersForPage: number = 10;
  totalRegistros: number = 100;
  claseDialog:boolean=false;
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
    await clasematerialService.getClassProductoServicio()
    .then(res=>{
        setTimeout(() => {    
          this.CompleteData=res;
          this.CompleteData1=this.CompleteData;
          this.totalRegistros=this.CompleteData1.length;
          this.tableData = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      this.vifprogress=false;}, 100)
    })
    .catch(error=>{ 
      console.log(error);     
    })
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
  handleCurrentChange(val) {
    this.clasematerialmodel=val;
  }
  /*Compania imput*/
  getParseDate(fecha){
    return Global.getParseDate(fecha);
  }
  created() {
    debugger;
    if(typeof window != 'undefined') {
      // this.getAccesos();
      debugger;
      this.vmaterial=Global.vmmaterial;
    }
  }
   async BuscarProducto(){
    if(this.clasematerialmodel.strMatClass_Cod!=undefined){
      clasematerialService.GetOnlyOneClaseMaterial(this.clasematerialmodel.strMatClass_Cod)
      .then(respo=>{
        this.clasematerialmodel=respo;      
        if(this.clasematerialmodel.strMatClass_Cod!=undefined){
        router.push({ path: `/barmenu/LO-LOGISTICA/maestro_datos/servicio/clase_servicio/modificar_clase_servicio`, query: { vista: 'modificar',data:JSON.stringify(this.clasematerialmodel) }  })
        }
        else{
          this.openMessageError('No existe Clase Material')
        }
      })      
    }
    else{
      this.textosave='Ingrese Codigo Clase Material. ';
      this.warningMessage('Ingrese Codigo Clase Material.');
    }
  }

  async validarView(){
    if(this.clasematerialmodel.strMatClass_Cod!=undefined){
      await setTimeout(() => {
        if(this.clasematerialmodel.strMatClass_Cod!=undefined){
          router.push({ path: `/barmenu/LO-LOGISTICA/maestro_datos/servicio/clase_servicio/modificar_clase_servicio`, query: { vista: 'modificar',data:JSON.stringify(this.clasematerialmodel) }  })
        }
      }, 600)
    }
    else{
      this.textosave='Seleccione alguna item. ';
      this.warningMessage('Seleccione alguna item.');
    }
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
  async EliminarItem(){
    this.claseDialog=true;    
  }
  deletClaseServico(){
    var user:any=localStorage.getItem('User_Usuario');
    if(this.clasematerialmodel.strMatClass_Cod!=''){
      let loadingInstance = Loading.service({
        fullscreen: true,
        text: 'Eliminando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
        ); 
    clasematerialService.deleteClaseMaterial(this.clasematerialmodel.intIdMatClass_ID,user)
      .then(resp=>{
        loadingInstance.close();
        this.claseDialog=false;
        this.$message({
            showClose: true,
            message: 'Se Elimino correctamente '+resp,
            type: 'success'
          });

          this.clasematerialmodel=new ClaseMaterialModel();
          this.load();
          this.issave = true;
          this.iserror = false;
          this.textosave = 'Se Elimino Correctamente '+resp;
      })
      .catch(error=>{
        loadingInstance.close();
        this.claseDialog=false;
        this.$message({
            showClose: true,
            message: 'No se elimino',
            type: 'error'
          });
      })
      }
      else{
          this.warningMessage('Seleccione Clase Servicio. ');
      }
  }
  warningMessage(newMsg : string) {
    this.$message({
      showClose: true,
      message: newMsg,
      type: 'warning'
    });
  }
  ///#region  button accion
  getDateStringView(fecha:string){
    var dateString = new Date(fecha);
    var dia = dateString.getDate();
    var mes = (dateString.getMonth()<12) ? dateString.getMonth()+1 : mes = dateString.getMonth();
    var yyyy = dateString.getFullYear();
    var dd = (dia<10) ? '0'+dia : dd=dia;
    var mm = (mes<10) ? '0'+mes : mm=mes;
    return dd+'.'+mm+'.'+yyyy;
}
  filterstrMatClass_Cod(h,{column,$index}){
    if(this.blnfilterstrMatClass_Cod){
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
    if(this.blnfilterstrMatClass_Desc){
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
  filterstrStock_Type_Desc(h,{column,$index}){
    if(this.blnfilterstrStock_Type_Desc){
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
  filterstrAcct_Loc(h,{column,$index}){
    if(this.blnfilterstrAcct_Loc){
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
    if(this.blnfilterstrExp_Cod_Loc){
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
  filterdtmModified_Date(h,{column,$index}){
    if(this.blnfilterdtmModified_Date){
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
  filterstrModified_User(h,{column,$index}){
    if(this.blnfilterstrModified_User){
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
     
    if(val.property=="strMatClass_Cod"){
      this.blnfilterstrMatClass_Cod=true;
      this.blnfilterstrMatClass_Desc=false;
      this.blnfilterstrStock_Type_Desc=false;
      this.blnfilterstrAcct_Loc=false;
      this.blnfilterstrExp_Cod_Loc=false;
      this.blnfilterdtmModified_Date=false;
      this.blnfilterstrModified_User=false;
    }
    if(val.property=="strMatClass_Desc"){
      this.blnfilterstrMatClass_Cod=false;
      this.blnfilterstrMatClass_Desc=true;
      this.blnfilterstrStock_Type_Desc=false;
      this.blnfilterstrAcct_Loc=false;
      this.blnfilterstrExp_Cod_Loc=false;
      this.blnfilterdtmModified_Date=false;
      this.blnfilterstrModified_User=false;
    }
    if(val.property=="strStock_Type_Desc"){
      this.blnfilterstrMatClass_Cod=false;
      this.blnfilterstrMatClass_Desc=false;
      this.blnfilterstrStock_Type_Desc=true;
      this.blnfilterstrAcct_Loc=false;
      this.blnfilterstrExp_Cod_Loc=false;
      this.blnfilterdtmModified_Date=false;
      this.blnfilterstrModified_User=false;
    }
    
    if(val.property=="strAcct_Loc"){
      this.blnfilterstrMatClass_Cod=false;
      this.blnfilterstrMatClass_Desc=false;
      this.blnfilterstrStock_Type_Desc=false;
      this.blnfilterstrAcct_Loc=true;
      this.blnfilterstrExp_Cod_Loc=false;
      this.blnfilterdtmModified_Date=false;
      this.blnfilterstrModified_User=false;
    }
    if(val.property=="strExp_Cod_Loc"){
      this.blnfilterstrMatClass_Cod=false;
      this.blnfilterstrMatClass_Desc=false;
      this.blnfilterstrStock_Type_Desc=false;
      this.blnfilterstrAcct_Loc=false;
      this.blnfilterstrExp_Cod_Loc=true;
      this.blnfilterdtmModified_Date=false;
      this.blnfilterstrModified_User=false;
    }
    if(val.property=="dtmModified_Date"){
      this.blnfilterstrMatClass_Cod=false;
      this.blnfilterstrMatClass_Desc=false;
      this.blnfilterstrStock_Type_Desc=false;
      this.blnfilterstrAcct_Loc=false;
      this.blnfilterstrExp_Cod_Loc=false;
      this.blnfilterdtmModified_Date=true;
      this.blnfilterstrModified_User=false;
    }
    if(val.property=="strModified_User"){
      this.blnfilterstrMatClass_Cod=false;
      this.blnfilterstrMatClass_Desc=false;
      this.blnfilterstrStock_Type_Desc=false;
      this.blnfilterstrAcct_Loc=false;
      this.blnfilterstrExp_Cod_Loc=false;
      this.blnfilterdtmModified_Date=false;
      this.blnfilterstrModified_User=true;
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
    this.blnfilterstrMatClass_Cod=false;
      this.blnfilterstrMatClass_Desc=false;
      this.blnfilterstrStock_Type_Desc=false;
      this.blnfilterstrAcct_Loc=false;
      this.blnfilterstrExp_Cod_Loc=false;
      this.blnfilterdtmModified_Date=false;
      this.blnfilterstrModified_User=false;
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
