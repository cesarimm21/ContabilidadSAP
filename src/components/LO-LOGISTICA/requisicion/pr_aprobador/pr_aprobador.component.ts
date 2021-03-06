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

import companiaService from '@/components/service/compania.service';

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
  name: 'aproador-pr',
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
export default class AprobadorPRComponent extends Vue {
  sizeScreen:string = (window.innerHeight - 420).toString();//'0';
  sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  
  nameuser:string;
  namecomplete:string;
  SendDocument:boolean=false;
  vmaterial:string='';
  /*dialog*/
  dialogCompania:boolean=false;
  checkFecha:boolean=true;
  /*input*/
  btnactivarcompania:boolean=false;
   
  percentage:number;
  /*Model*/

  descompania:string='';
  code_compania:string='';

  fecha_actual:string;
  selectcolumn:any;
  blntiporequisicion:boolean=true;
  tiporequisicion:string='';
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  formBusqueda:any={
    'strRequis_NO':'',
    'desde':new Date(),
    'hasta':new Date(),
    'strDesc_Header':''
  }
  
  public tableData1:Array<RequisicionDetalleModel>=[]; 
  public tableData:Array<RequisicionModel>=[]; 
  public requisicionModel:RequisicionModel=new RequisicionModel();
  public almacenModel:AlmacenModel=new AlmacenModel();
  public productoModel:ProductoModel=new ProductoModel();
  public selectrow:RequisicionModel=new RequisicionModel();
  public proveedorModel:ProveedorModel=new ProveedorModel();
  public categoriaCuentaModel:CategoriaCuentaModel=new CategoriaCuentaModel();
  public tipoRequisicionModel:TipoRequisicionModel=new TipoRequisicionModel();
  public tabletipoRequisicion:Array<TipoRequisicionModel>=[]; 
  fechaHasta:any=new Date();
  fechaDesde:any=new Date();
  getTotals:number=0;
  txtnroline:string='';
  intlineaselect:number=-1;
  currentRow:any;
  cell_ocultar:string='transparent';
  vifprogress:boolean=true;
  valuem:number=0;

  //#region button accion
  dialogEliminar:boolean=false;
  pagina: number =1;
  RegistersForPage: number = 10;
  totalRegistros: number = 100;
  public CompleteData:Array<RequisicionModel>=[]; 
  public CompleteData1:Array<RequisicionModel>=[]; 
  clickColumn:string='';
  txtbuscar:string='';
  Column:string='';
  dialogBusquedaFilter:boolean=false;

  blnfilterstrRequis_NO:boolean=false;
  blnfilterstrTipReq_Desc:boolean=false;
  blnfilterstrWHS_Desc:boolean=false;
  blnfilterstrDesc_Header:boolean=false;
  blnfilterdtmRequested_Date:boolean=false;
  blnfilterstrWHS_Cod:boolean=false;
  //#endregion

  constructor(){
    super();
    this.fecha_actual=Global.getParseDate(new Date().toDateString());
    debugger;
    this.tiporequisicion="A";
    setTimeout(() => {
      this.cargar();
    }, 200)
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
      this.txtnroline="["+val.intRequis_Item_NO+"] "+val.strDescription;
      if(val.intRequis_Item_NO==0){
        this.intlineaselect=0;  
      }
      else{
        this.intlineaselect=val.intRequis_Item_NO-1;
      }
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
  limpiarBotones(){
      this.btnactivarcompania=false;     
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
  //   Global.codematerial=this.productoModel.strStock_Cod;
  //   router.push({ path: `/barmenu/LO-LOGISTICA/almacen/al_salida_modificar`, query: { vista: 'visualizar' }  })
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
    if(this.selectrow!=undefined && this.selectrow!=null && this.selectrow.intIdPurReqH_ID!=-1){
      this.vifprogress=true;
      this.valuem=0;
      await setTimeout(() => {
        for(var i=0;i<100;i++){
          this.valuem++; 
        }
      }, 200)
      await setTimeout(() => {
        debugger;
        if(this.selectrow!=undefined && this.selectrow!=null && this.selectrow.intIdPurReqH_ID!=-1){
          router.push({ path: `/barmenu/LO-LOGISTICA/requisicion/pr_modificar`, query: { vista: 'aprobar',data:JSON.stringify(this.selectrow) }  })
        }
      }, 600)
    }
    else{
      this.vifprogress=false;
      this.textosave='Seleccione la requisicion. ';
      this.warningMessage('Seleccione la requisicion. ');
    }
  }
  async cargar(){
    debugger;
    var desc:any=localStorage.getItem('compania_name');
    var cod:any=localStorage.getItem('compania_cod');
    this.requisicionModel.strCompany_Cod=cod;
    this.requisicionModel.strCompany_Desc=desc;
    
    this.fechaDesde=""
    this.fechaHasta=""
    var data:any=this.formBusqueda;
    data.strRequis_NO='*'
    data.strDesc_Header='*'
    data.desde='*'
    data.hasta= '*'
    this.vifprogress=true;
    this.percentage=0;
    // for(var i=0;i<50;i++){
    //   this.valuem++; 
    //   this.percentage++;
    // }
    let loading = Loading.service({
      fullscreen: true,
      text: 'Cargando...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
    );
    await requisicionService.busquedaRequisicionp(data)
    .then(res=>{
      debugger;
      // for(var i=0;i<50;i++){
      //   setTimeout(
      //     () => {this.percentage++;},1  
      //   )
      // }
      loading.close();
      setTimeout(() => {    
        this.CompleteData=res;
        this.CompleteData1=this.CompleteData;
        this.totalRegistros=this.CompleteData1.length;
        this.tableData = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
        this.vifprogress=false;}, 6)

    })
    .catch(error=>{
      loading.close();
    })
  }
  async BuscarRequisicion(){
    debugger;
    var data:any=this.formBusqueda;
    if(data.strRequis_NO==''){
      data.strRequis_NO='*'
    }
    if(data.strDesc_Header==''){
      data.strDesc_Header='*'
    }
    if(this.fechaDesde!=undefined){
      data.desde=await Global.getDateString(this.fechaDesde)
    }
    else{
      data.desde='*';
    }
    if( this.fechaHasta!=undefined){
      data.hasta= await Global.getDateString(this.fechaHasta)
    }
    else{
      data.hasta='*';
    }
    this.vifprogress=true;
    this.percentage=0;
    // for(var i=0;i<50;i++){
    //   this.valuem++; 
    //   this.percentage++;
    // }
    let loading = Loading.service({
      fullscreen: true,
      text: 'Cargando...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
    );
    await requisicionService.busquedaRequisicion(data)
    .then(res=>{
      debugger;
      // for(var i=0;i<50;i++){
      //   setTimeout(
      //     () => {this.percentage++;},1  
      //   )
      // }
      loading.close();
      console.log(res);
      
      setTimeout(() => {    
        this.CompleteData=res;
        this.CompleteData1=this.CompleteData;
        this.totalRegistros=this.CompleteData1.length;
        this.tableData = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
        this.vifprogress=false;}, 6)
    })
    .catch(error=>{
      loading.close();
    })
  }
  warningMessage(newMsg : string) {
    this.$message({
      showClose: true,
      message: newMsg,
      type: 'warning'
    });
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
    else{
      this.fechaDesde=new Date()
      this.fechaHasta=new Date()
    }
  }

  // #region Button Accion 
  
  filterstrRequis_NO(h,{column,$index}){
    debugger;
    
    if(this.blnfilterstrRequis_NO){
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
  filterstrTipReq_Desc(h,{column,$index}){
    debugger;
    
    if(this.blnfilterstrTipReq_Desc){
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
  filterstrDesc_Header(h,{column,$index}){
    debugger;
    
    if(this.blnfilterstrDesc_Header){
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
  filterdtmRequested_Date(h,{column,$index}){
    debugger;
    
    if(this.blnfilterdtmRequested_Date){
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

  headerclick(val){
    
    this.Column=val.label;
    this.clickColumn=val.property;
    if(val.property=="strRequis_NO"){
      this.blnfilterstrRequis_NO=true;
      this.blnfilterstrTipReq_Desc=false;
      this.blnfilterstrWHS_Desc=false;
      this.blnfilterstrDesc_Header=false;
      this.blnfilterdtmRequested_Date=false;
      this.blnfilterstrWHS_Cod=false;
    }
    if(val.property=="strTipReq_Desc"){
      this.blnfilterstrRequis_NO=false;
      this.blnfilterstrTipReq_Desc=true;
      this.blnfilterstrWHS_Desc=false;
      this.blnfilterstrDesc_Header=false;
      this.blnfilterdtmRequested_Date=false;
      this.blnfilterstrWHS_Cod=false;
    }
    if(val.property=="strWHS_Desc"){
      this.blnfilterstrRequis_NO=false;
      this.blnfilterstrTipReq_Desc=false;
      this.blnfilterstrWHS_Desc=true;
      this.blnfilterstrDesc_Header=false;
      this.blnfilterdtmRequested_Date=false;
      this.blnfilterstrWHS_Cod=false;
    }
    
    if(val.property=="strDesc_Header"){
      this.blnfilterstrRequis_NO=false;
      this.blnfilterstrTipReq_Desc=false;
      this.blnfilterstrWHS_Desc=false;
      this.blnfilterstrDesc_Header=true;
      this.blnfilterdtmRequested_Date=false;
      this.blnfilterstrWHS_Cod=false;
    }
    if(val.property=="dtmRequested_Date"){
      this.blnfilterstrRequis_NO=false;
      this.blnfilterstrTipReq_Desc=false;
      this.blnfilterstrWHS_Desc=false;
      this.blnfilterstrDesc_Header=false;
      this.blnfilterdtmRequested_Date=true;
      this.blnfilterstrWHS_Cod=false;
    }
    
    if(val.property=="strWHS_Cod"){
      this.blnfilterstrRequis_NO=false;
      this.blnfilterstrTipReq_Desc=false;
      this.blnfilterstrWHS_Desc=false;
      this.blnfilterstrDesc_Header=false;
      this.blnfilterdtmRequested_Date=false;
      this.blnfilterstrWHS_Cod=true;
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
    debugger;
    var data=this.like(this.CompleteData,this.clickColumn,this.txtbuscar)
    this.tableData=data;
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
    if(this.pagina>1){
    this.pagina--;
    this.tableData = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    }
  }
  Limpiar(){

    this.blnfilterstrRequis_NO=false;
    this.blnfilterstrTipReq_Desc=false;
    this.blnfilterstrWHS_Desc=false;
    this.blnfilterstrDesc_Header=false;
    this.blnfilterdtmRequested_Date=false;
    this.blnfilterstrWHS_Cod=false;
    this.CompleteData=this.CompleteData1;
    this.tableData = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    var document:any = this.$refs.missionTable;

  }
  Print(){
    window.print();
  }
  // EliminarItem(){
  //   console.log(this.currentRow.intRequis_Item_NO);
  //   this.CompleteData.splice(this.currentRow.intRequis_Item_NO-1, 1);
  //   for(var i=this.currentRow.intRequis_Item_NO;i<this.CompleteData.length;i++){
  //     this.CompleteData[i].intRequis_Item_NO=i+1;
  //   }
  //   this.CompleteData1=this.CompleteData;
  //   console.log(this.CompleteData);
  // }
  
  EliminarItem(){
    debugger;
    if(this.selectrow!=undefined){
      this.dialogEliminar=true;
    }
    else{
      alert('Debe de seleccionar una fila!!!');
    }
    
  }
  siguiente(){
    if(this.pagina<(this.totalRegistros/this.RegistersForPage)){
      this.pagina++;
      this.tableData = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    }
  }
  
  async btnEliminar(){
    await requisicionService.eliminarRequisicion(this.currentRow)
    .then(response=>{
      debugger;
      console.log('eliminar',response);
      if(response!=undefined){
         this.textosave='Se elimino correctamento.' + response.strRequis_NO;
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
    await this.BuscarRequisicion();
  }
  // #endregion
  getDateString(fecha:string){
    var dateString = new Date(fecha);
    var dia = dateString.getDate();
    var mes = (dateString.getMonth()<12) ? dateString.getMonth()+1 : mes = dateString.getMonth();
    var yyyy = dateString.getFullYear();
    var dd = (dia<10) ? '0'+dia : dd=dia;
    var mm = (mes<10) ? '0'+mes : mm=mes;
    return dd+'.'+mm+'.'+yyyy;
  }
  getEstado(estado){
    debugger;
    estado=estado.trim();
    if(estado=== '50'){
      return 'Aprobado'
    }
    if(estado=== '70'){
      return 'Rechazado'
    }
    else{
      return 'Pendiente'
    }
  }
  data(){
    return{
      dialogTableVisible: false,
      dialogVisible:false,
      tableDataServicio:[{}],
      user: {
        authenticated: false
      },
      percentage: '0',
    }
  }
  
}
