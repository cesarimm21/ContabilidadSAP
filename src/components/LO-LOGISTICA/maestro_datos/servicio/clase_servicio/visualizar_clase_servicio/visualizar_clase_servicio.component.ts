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
import {ClaseMaterialModel} from '@/modelo/maestro/clasematerial';
import { Notification } from 'element-ui';
import Global from '@/Global';
import clasematerialService from '@/components/service/clasematerial.service';
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
  name: 'visualizar-clase-servicio',
  components:{
    'buttons-accions':ButtonsAccionsComponent,
    'bcompania':BCompaniaProveedor,
    'quickaccessmenu':QuickAccessMenuComponent,
  } ,
 
})
export default class VisualizarClaseServicioComponent extends Vue {
  sizeScreen:string = (window.innerHeight - 420).toString();//'0';
  sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  
  nameuser:any;
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
  public tableData:ClaseMaterialModel[]; 
  valuem:number=50;
  striped=true;
  per:number=3;
  strStock_Cod:string='';
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
  planDialog:boolean=false;
  planActivarDialog:boolean=false;
  public CompleteData:ClaseMaterialModel[]; 
  public CompleteData1:ClaseMaterialModel[]; 
  clickColumn:string='';
  txtbuscar:string='';
  Column:string='';
  pagina: number =1;
  RegistersForPage: number = 100;
  totalRegistros: number = 1000;
  claseDialog:boolean=false;
  strMatClass_Cod:string='';
  loading1:boolean=true;
  //#endregion
  constructor(){
    super();
    this.fecha_actual=Global.getParseDate(new Date().toDateString());
    this.tiporequisicion="A";
    Global.nameComponent='visualizar-clase-servicio'
    setTimeout(() => {
      this.cargarList();
    }, 200)
  }

  async cargarList(){
    this.company_desc=localStorage.getItem('compania_name');;
    this.company_cod=localStorage.getItem('compania_cod');
    this.tableData=[];
    clasematerialService.getClassProductoServicio(this.company_cod)
    .then(res=>{
      this.CompleteData=res;
      this.CompleteData1=res;
      this.loading1=false;
    })
    .catch(error=>{ 
      this.loading1=false;
       this.openMessageError('No hay conexión');
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
  handleCurrentChange(val) {
    this.clasematerialmodel=val;    
    this.strMatClass_Cod=this.clasematerialmodel.strMatClass_Cod;    
  }
  /*Compania imput*/
  getParseDate(fecha){
    return Global.getParseDate(fecha);
  }
  created() {
    if(typeof window != 'undefined') {
      debugger;
      this.vmaterial=Global.vmmaterial;
    }
  }
  async EliminarItem(){
    if(this.clasematerialmodel.intIdMatClass_ID!=-1&&this.clasematerialmodel.strMatClass_Cod!=""&&this.clasematerialmodel.strMatClass_Desc!=""){
      this.planDialog=true;
    }
    else{
      this.warningMessage("Selecciona Clase Servicio")
    }    
  }
  inactivarPlan(){
    this.nameuser=localStorage.getItem('User_Usuario');
    this.clasematerialmodel.strModified_User=this.nameuser;
    let loadingInstance = Loading.service({
      fullscreen: true,
      text: 'Inactivando...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
      ); 
      clasematerialService.inactivarClaseServicio(this.clasematerialmodel)
    .then(resp=>{
      loadingInstance.close();
      this.planDialog=false;
      this.$message({
          showClose: true,
          message: 'Se Inactivo correctamente '+resp,
          type: 'success'
        });
        this.clasematerialmodel=new ClaseMaterialModel();
        this.cargarList();
        this.issave = true;
        this.iserror = false;
        this.textosave = 'Se Inactivo Correctamente '+resp;
    })
    .catch(error=>{
      loadingInstance.close();
      this.planDialog=false;
      this.$message({
          showClose: true,
          message: 'No se Inactivo',
          type: 'error'
        });
        this.issave = false;
        this.iserror = true;
    })
  }
  async Activar(){
    if(this.clasematerialmodel.strMatClass_Cod!="" && this.clasematerialmodel.strMatClass_Desc!=""){
      this.planActivarDialog=true;
    }
    else{
      this.warningMessage('Selecciones Clase Servicio')
    }
  }
  activarPlan(){
    this.nameuser=localStorage.getItem('User_Usuario');
    this.clasematerialmodel.strModified_User=this.nameuser;
    let loadingInstance = Loading.service({
      fullscreen: true,
      text: 'Activando...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
      ); 
    clasematerialService.activarClaseServicio(this.clasematerialmodel)
    .then(resp=>{
      loadingInstance.close();
      this.planActivarDialog=false;
      this.$message({
          showClose: true,
          message: 'Se Activo correctamente '+resp,
          type: 'success'
        });
        this.clasematerialmodel=new ClaseMaterialModel();
        this.strMatClass_Cod=''
        this.cargarList();
        this.issave = true;
        this.iserror = false;
        this.textosave = 'Se Activo Correctamente '+resp;
    })
    .catch(error=>{
      loadingInstance.close();
      this.planActivarDialog=false;
      this.$message({
          showClose: true,
          message: 'No se Activo',
          type: 'error'
        });
        this.issave = false;
        this.iserror = true;
    })
  }
   async BuscarProducto(){
    var data=Global.like(this.CompleteData1,'strMatClass_Cod',this.strMatClass_Cod)
    if(data.length>0){
      this.clasematerialmodel=data[0];
      if(this.clasematerialmodel.strMatClass_Cod==this.strMatClass_Cod){
        await setTimeout(() => {
          if(this.clasematerialmodel.strMatClass_Cod!=''){
            router.push({ path: `/barmenu/LO-LOGISTICA/maestro_datos/servicio/clase_servicio/modificar_clase_servicio`, query: { vista:'visualizar' ,data:JSON.stringify(this.clasematerialmodel) }  })
          }
        }, 600)
      }
      else{
        if(this.strMatClass_Cod==''){
          this.textosave='Inserte Clase Material. ';
          this.warningMessage('Inserte Clase Material. ');
        }
        else{
          this.textosave='No existe Clase Material. ';
          this.warningMessage('No existe Clase Material. ');
        }        
      }
    }
    else{
      this.textosave='No existe Clase Material. ';
      this.warningMessage('No existe Clase Material. ');
    }
  }

  async validarView(){
    if(this.clasematerialmodel.strMatClass_Cod!=''){
      await setTimeout(() => {
        if(this.clasematerialmodel.strMatClass_Cod!=''){
          router.push({ path: `/barmenu/LO-LOGISTICA/maestro_datos/servicio/clase_servicio/modificar_clase_servicio`, query: { vista: 'visualizar',data:JSON.stringify(this.clasematerialmodel) }  })
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
    this.btnactivarproveedor=false;
    return false;
  }
  SeleccionadoProveedor(val){
    this.strVendor_NO=val.strVendor_NO;
    this.strVendor_Desc=val.strVendor_Desc;
    this.dialogProveedor=false;
  }
  backPage(){
    window.history.back();
  }
  reloadpage(){
    window.location.reload();
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
      dialogTableVisible: false,
      dialogVisible:false,
      tableDataServicio:[{}],
      CompleteData:[],
      CompleteData1:[],
      tableData:[],
      user: {
        authenticated: false
      },
      strMatClass_Cod:'',
      loading1:true
    }
  }
  
  
}
