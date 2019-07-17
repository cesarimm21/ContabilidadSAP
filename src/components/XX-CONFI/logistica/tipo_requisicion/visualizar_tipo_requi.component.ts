import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import router from '@/router';
import {TipoRequisicionModel} from '@/modelo/maestro/tipoRequisicion';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import tiporeService from '@/components/service/tipoRequisicion.service';
import { Loading } from 'element-ui';
@Component({
  name: 'modificar-tipo-requisicion',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'buttons-accions': ButtonsAccionsComponent,
  }
})
export default class VisualizarTipoRequisicionComponent extends Vue {
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  value3:string;
  companyName:any;
  companyCod:any;
  strTypeReq_Cod:string;
  public tipoRequi:TipoRequisicionModel=new TipoRequisicionModel();
  gridTipo:TipoRequisicionModel[];
  gridTipo1:TipoRequisicionModel[];
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  pagina: number =1;
  RegistersForPage: number = 100;
  totalRegistros: number = 100;
  clickColumn:string='';
  txtbuscar:string='';
  Column:string='';
  dialogBusquedaFilter:boolean=false;
  blnilterstrTypeReq_Cod:boolean=false;
  blnilterstrTipReq_Desc:boolean=false;
  blnilterdtmModified_Date:boolean=false;
  blnilterstrModified_User:boolean=false;
  loading1:boolean=true;
  dialogEliminar:boolean=false;
  dialogInactivar:boolean=false;
  nameuser:any;
  constructor(){    
        super();
        Global.nameComponent='modificar-almacen';
        setTimeout(() => {
            this.load();
          }, 400)
    }  
    load(){
          
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
        tiporeService.GetAllTipoRequisicion()
        .then(response=>{
          this.gridTipo=[];
          this.gridTipo1=[];
          this.gridTipo=response;
          this.gridTipo1=response;
          this.loading1=false;
        })
    }
    getDateStringView(fecha:string){
        var dateString = new Date(fecha);
        var dia = dateString.getDate();
        var mes = (dateString.getMonth()<12) ? dateString.getMonth()+1 : mes = dateString.getMonth();
        var yyyy = dateString.getFullYear();
        var dd = (dia<10) ? '0'+dia : dd=dia;
        var mm = (mes<10) ? '0'+mes : mm=mes;
        return dd+'.'+mm+'.'+yyyy;
    }
    handleCurrentChange(val:TipoRequisicionModel){
      this.tipoRequi=val;
      this.strTypeReq_Cod=this.tipoRequi.strTypeReq_Cod;
     }
    btnBuscar(){
      var data=Global.like(this.gridTipo1,this.clickColumn,this.txtbuscar)
      this.gridTipo=[];
      this.gridTipo=data;
      this.dialogBusquedaFilter=false;
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
    Buscar(){
      if(this.Column!=""){
        this.dialogBusquedaFilter=true;
        this.txtbuscar='';
      }
      else{
        this.$message('Seleccione columna')
      }
    }
    async AscItem(){
      // let loading = Loading.service({
      //   fullscreen: true,
      //   text: 'Cargando...',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.8)'
      //   }
      // );
      // var data=await this.sortByKeyAsc(this.gridTipo1,this.clickColumn) 
      // this.gridAlmacen2=[];
      // this.gridAlmacen2=data;
      // this.gridAlmacen = await this.gridAlmacen2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      // await loading.close();
    }
    DscItem(){
      // var data=this.sortByKeyDesc(this.gridTipo1,this.clickColumn) 
      // this.gridAlmacen2=[];
      // this.gridAlmacen2=data;
      // this.gridAlmacen = this.gridAlmacen2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    
    }
    Limpiar(){
      this.gridTipo = this.gridTipo1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));    
      this.blnilterstrTypeReq_Cod=false;
      this.blnilterstrTipReq_Desc=false; 
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=false;  
    }
    Print(){
      window.print();
    }
  async EliminarItem(){
    this.warningMessage('Accion no permitida');
  }
  async btnEliminar(){
    let loadingInstance = Loading.service({
      fullscreen: true,
      text: 'Eliminando...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
    );   
    await tiporeService.EliminarTipoRequisicion(this.tipoRequi.intIdTypeReq_ID)
    .then(response=>{
      loadingInstance.close();
      if(response!=undefined){
         this.textosave='Se elimino correctamento.';
         this.issave=true;
         this.iserror=false;
         this.$message({
          showClose: true,
          type: 'success',
          message: 'Se elimino correctamento '
        });
        setTimeout(() => {
          this.load();
        }, 200)
      }
      else{
        this.issave=false;
        this.iserror=true;
        this.textosave='Ocurrio un error al eliminar.';
      }
      this.dialogEliminar=false;
    }).catch(error=>{
      loadingInstance.close();
      this.dialogEliminar=false;
      this.issave=false;
      this.iserror=true;
      this.textosave='Ocurrio un error al eliminar.';
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo eliminar'
      });
    })
    
  }
  async ActivarDesactivar(){
    this.warningMessage('Accion no permitida');      
  }
  async btnInactivar(){
    this.nameuser=localStorage.getItem('User_Usuario');
    this.tipoRequi.strModified_User=this.nameuser;
    if(this.tipoRequi.intIdTypeReq_ID!=-1&&this.tipoRequi.strTypeReq_Cod!=""){
      let loadingInstance = Loading.service({
        fullscreen: true,
        text: 'Inactivando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
      );   
      await tiporeService.DesactivarTipoRequisicion(this.tipoRequi)
      .then(respo=>{
        loadingInstance.close();
        this.successMessage('Se Inactivo el Tipo Requisicion '+this.tipoRequi.strTypeReq_Cod)
        setTimeout(() => {
          this.load();
        }, 200)
        this.issave=true;
        this.iserror=false;
        this.textosave='Se Inactivo el Tipo Requisicion '+this.tipoRequi.strTypeReq_Cod;
        this.dialogInactivar=false;
      }).catch(ee=>{
        loadingInstance.close();
        this.issave=false;
        this.iserror=true;
        this.textosave='Error en Inactivar '+this.tipoRequi.strTypeReq_Cod;
        this.errorMessage('Error en Inactivar '+this.tipoRequi.strTypeReq_Cod)})
        this.dialogInactivar=false;
    }
    else{
      this.warningMessage('Debe de seleccionar una fila!!!');
    }
  }
   async validarView(){
      if(this.tipoRequi.intIdTypeReq_ID!=-1){
          await setTimeout(() => {
            if(this.tipoRequi.strTypeReq_Cod!=''){
              router.push({ path: `/barmenu/XX-CONFI/logistica/tipo_requisicion/viewandedit_tipo_requi`, query: { vista:'visualizar' ,data:JSON.stringify(this.tipoRequi) }  })
            }
          }, 600)
        }
        else{
          this.textosave='Seleccione Tipo Requisicion. ';
          this.warningMessage('Seleccione Tipo Requisicion. ');
        }
      }
    siguiente(){
      if(this.pagina<(this.totalRegistros/this.RegistersForPage)){
        this.pagina++;
        this.gridTipo = this.gridTipo1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      }
    }
    anterior(){
      if(this.pagina>1){
      this.pagina--;
      this.gridTipo = this.gridTipo1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      }
    }
    warningMessage(newMsg : string) {
      this.$message({
        showClose: true,
        message: newMsg,
        type: 'warning'
      });
    }
    successMessage(newMsg : string) {
      this.$message({
        showClose: true,
        message: newMsg,
        type: 'success'
      });
    }
    errorMessage(newMsg : string) {
      this.$message({
        showClose: true,
        message: newMsg,
        type: 'error'
      });
    }
  //#region [CABECERA]
  headerclick(val){    
      this.Column=val.label;
      Global.setColumna(this.Column);     
      if(val.property=="strTypeReq_Cod"){
          this.clickColumn="strTypeReq_Cod";
          this.blnilterstrTypeReq_Cod=true;
          this.blnilterstrTipReq_Desc=false; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
      }
      if(val.property=="strTipReq_Desc"){
          this.clickColumn="strTipReq_Desc";
          this.blnilterstrTypeReq_Cod=false;
          this.blnilterstrTipReq_Desc=true; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
      } 
      if(val.property=="dtmModified_Date"){
          this.clickColumn="dtmModified_Date";
          this.blnilterstrTypeReq_Cod=false;
          this.blnilterstrTipReq_Desc=false; 
          this.blnilterdtmModified_Date=true;
          this.blnilterstrModified_User=false;
      }
      if(val.property=="strModified_User"){
          this.clickColumn="strModified_User";
          this.blnilterstrTypeReq_Cod=false;
          this.blnilterstrTipReq_Desc=false; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=true;
      }        
  }
  filterstrTypeReq_Cod(h,{column,$index}){
      if(this.blnilterstrTypeReq_Cod){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrTipReq_Desc(h,{column,$index}){        
      if(this.blnilterstrTipReq_Desc){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }   
    filterdtmModified_Date(h,{column,$index}){      
      if(this.blnilterdtmModified_Date){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrModified_User(h,{column,$index}){
      if(this.blnilterstrModified_User){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
 

    //#endregion
  backPage(){
      window.history.back();
    }
    reloadpage(){
      window.location.reload();
    }
    data(){
        return{     
            companyName:'',
            companyCod:'',
            gridTipo:[],
            gridTipo1:[],
            loading1:true,
            strTypeReq_Cod:''
        }
    }
  
}
