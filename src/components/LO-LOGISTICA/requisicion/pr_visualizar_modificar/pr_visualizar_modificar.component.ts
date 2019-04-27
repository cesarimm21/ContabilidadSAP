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


//***Modelos */

import historialService from '@/components/service/historial.service';
import inicioService from '@/components/service/inicio.service';
import almacenService from '@/components/service/almacen.service';
import proveedorService from '@/components/service/proveedor.service';
import requisicionService from '@/components/service/requisicion.service';
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
import companiaService from '@/components/service/compania.service';
import productoService from '@/components/service/producto.service';
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
  name: 'pr-visualizar-modificar',
  components:{
    'buttons-accions':ButtonsAccionsComponent,
    'bcompania':BCompaniaProveedor,
    'quickaccessmenu':QuickAccessMenuComponent,
  } ,
 
})
export default class VisualizarModificarPRComponent extends Vue {
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
          router.push({ path: `/barmenu/LO-LOGISTICA/requisicion/pr_modificar`, query: { vista: 'modificar',data:JSON.stringify(this.selectrow) }  })
        }
      }, 600)
    }
    else{
      this.vifprogress=false;
      this.textosave='Seleccione la requisición. ';
      this.warningMessage('Seleccione la requisición. ');
    }
  }
  async cargar(){
    debugger;
    this.fechaDesde=""
    this.fechaHasta=""
    var data:any=this.formBusqueda;
    data.strRequis_NO='*'
    data.strDesc_Header='*'
    data.desde='*'
    data.hasta= '*'
    for(var i=0;i<50;i++){
      this.valuem++; 
    }
    await requisicionService.busquedaRequisicion(data)
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
  async BuscarRequisicion(){
    debugger;
    var data:any=this.formBusqueda;
    if(data.strRequis_NO==''){
      data.strRequis_NO='*'
    }
    if(data.strDesc_Header==''){
      data.strDesc_Header='*'
    }
    data.desde=await Global.getDateString(this.fechaDesde)
    data.hasta= await Global.getDateString(this.fechaHasta)
    for(var i=0;i<50;i++){
      this.valuem++; 
    }
    await requisicionService.busquedaRequisicion(data)
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
  
  headerclick(val){
    
    this.Column=val.label;
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
  Limpiar(){
    this.CompleteData=this.CompleteData1;
    this.tableData1 = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
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
  // #endregion

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
