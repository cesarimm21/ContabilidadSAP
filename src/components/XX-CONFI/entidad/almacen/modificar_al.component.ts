import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import router from '@/router';
import {AlmacenModel} from '@/modelo/maestro/almacen';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import almacenService from '@/components/service/almacen.service';
import BCompaniaProveedor from '@/components/buscadores/b_compania/b_compania.vue';
import { Loading } from 'element-ui';
@Component({
  name: 'modificar-almacen',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'buttons-accions': ButtonsAccionsComponent,
  'bcompania':BCompaniaProveedor,
  }
})
export default class ModificarAlmacenComponent extends Vue {
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  value3:string;
  companyName:any;
  companyCod:any;
  strWHS_Cod:string;
  public almacen:AlmacenModel=new AlmacenModel();
  gridAlmacen:AlmacenModel[];
  gridAlmacen1:AlmacenModel[];
  gridAlmacen2:AlmacenModel[];
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
  blnilterstrWHS_Cod:boolean=false;
  blnilterstrWHS_Desc:boolean=false;
  blnilterstrLocation:boolean=false;
  blnilterstrSubsidiary_Cod:boolean=false;
  blnilterstrSubsidiary_Desc:boolean=false;
  blnilterdtmModified_Date:boolean=false;
  blnilterstrModified_User:boolean=false;
  loading1:boolean=true;
  dialogEliminar:boolean=false;
  dialogInactivar:boolean=false;
  nameuser:any;
  btnactivarcompania:boolean=false;
  dialogCompania:boolean=false;

  constructor(){    
        super();
        Global.nameComponent='modificar-almacen';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
        almacenService.GetAllAlmacen2(this.companyCod)
        .then(response=>{
          this.gridAlmacen=[];
          this.gridAlmacen1=[];
          this.gridAlmacen2=[];
          this.gridAlmacen=response;
          this.gridAlmacen1=response;
          this.gridAlmacen2=response;
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
    handleCurrentChange(val:AlmacenModel){
      this.almacen=val;
      this.strWHS_Cod=this.almacen.strWHS_Cod;
     }
    btnBuscar(){
      var data=Global.like(this.gridAlmacen1,this.clickColumn,this.txtbuscar)
      this.gridAlmacen=[];
      this.gridAlmacen=data;
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
      let loading = Loading.service({
        fullscreen: true,
        text: 'Cargando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
      );
      var data=await this.sortByKeyAsc(this.gridAlmacen1,this.clickColumn) 
      this.gridAlmacen2=[];
      this.gridAlmacen2=data;
      this.gridAlmacen = await this.gridAlmacen2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      await loading.close();
    }
    DscItem(){
      var data=this.sortByKeyDesc(this.gridAlmacen1,this.clickColumn) 
      this.gridAlmacen2=[];
      this.gridAlmacen2=data;
      this.gridAlmacen = this.gridAlmacen2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    
    }
    Limpiar(){
      this.gridAlmacen = this.gridAlmacen1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));    
      this.blnilterstrWHS_Cod=false;
      this.blnilterstrWHS_Desc=false; 
      this.blnilterstrLocation=false; 
      this.blnilterstrSubsidiary_Cod=false; 
      this.blnilterstrSubsidiary_Desc=false; 
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=false;  
    }
    Print(){
      window.print();
    }
  async EliminarItem(){
    if(this.almacen.intIdWHS_ID!=-1 &&this.almacen.strWHS_Cod!=""){
      this.dialogEliminar=true;
    }
    else{
      this.warningMessage('Debe de seleccionar una fila!!!');
    }
  }
  async btnEliminar(){
    let loadingInstance = Loading.service({
      fullscreen: true,
      text: 'Eliminando...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
    );   
    await almacenService.deleteAlmacen(this.almacen)
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
      }
      else{
        this.issave=false;
        this.iserror=true;
        this.textosave='Ocurrio un error al eliminar.';
      }
      this.load();
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
    if(this.almacen.intIdWHS_ID!=-1 &&this.almacen.strWHS_Cod!=""){
      this.dialogInactivar=true;  
    }
    else{
      this.warningMessage('Debe de seleccionar una fila!!!');
    }        
  }
  async btnInactivar(){
    this.nameuser=localStorage.getItem('User_Usuario');
    this.almacen.strModified_User=this.nameuser;
    if(this.almacen.intIdWHS_ID!=-1&&this.almacen.strWHS_Cod!=""){
      let loadingInstance = Loading.service({
        fullscreen: true,
        text: 'Inactivando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
      );   
      await almacenService.DesactivarAlmacen(this.almacen)
      .then(respo=>{
        loadingInstance.close();
        this.successMessage('Se Inactivo el Almacen '+this.almacen.strWHS_Cod)
        this.load();
        this.issave=true;
        this.iserror=false;
        this.textosave='Se Inactivo el Almacen '+this.almacen.strWHS_Cod;
        this.dialogInactivar=false;
      }).catch(ee=>{
        loadingInstance.close();
        this.issave=false;
        this.iserror=true;
        this.textosave='Error en Inactivar '+this.almacen.strWHS_Cod;
        this.errorMessage('Error en Inactivar '+this.almacen.strWHS_Cod)})
        this.dialogInactivar=false;
    }
    else{
      this.warningMessage('Debe de seleccionar una fila!!!');
    }
  }
  async validad(){      
    debugger;
    var data=Global.like(this.gridAlmacen1,'strWHS_Cod',this.strWHS_Cod)
      if(data.length>0){
        this.almacen=data[0];
        if(this.almacen.strWHS_Cod==this.strWHS_Cod){
          await setTimeout(() => {
            if(this.almacen.strWHS_Cod!=''){
              router.push({ path: `/barmenu/XX-CONFI/entidad/almacen/viewandedit_al`, query: { vista:'modificar' ,data:JSON.stringify(this.almacen) }  })
            }
          }, 600)
        }
        else{
          if(this.strWHS_Cod==''){
            this.textosave='Inserte Almacen. ';
            this.warningMessage('Inserte Almacen. ');
          }
          else{
            this.textosave='No existe Almacen. ';
            this.warningMessage('No existe Almacen. ');
          }        
        }
      }
      else{
        // this.textosave='No existe Almacen. ';
        // this.warningMessage('No existe Almacen. ');
        this.gridAlmacen=[];
        almacenService.GetAllAlmacen(this.companyCod)
        .then(resp=>{
          if(resp!=undefined){
            if(resp.length>0){
              this.gridAlmacen=resp;
            }
          }
        })
        .catch(errorss=>{
          this.textosave='Error al buscar almacen. ';
          this.warningMessage('Error al buscar almacen. ');
        })
      }
  }
   async validarView(){
      if(this.almacen.intIdWHS_ID!=-1){
          await setTimeout(() => {
            if(this.almacen.strWHS_Cod!=''){
              router.push({ path: `/barmenu/XX-CONFI/entidad/almacen/viewandedit_al`, query: { vista:'modificar' ,data:JSON.stringify(this.almacen) }  })
            }
          }, 600)
        }
        else{
          this.textosave='Seleccione Almacen. ';
          this.warningMessage('Seleccione Almacen. ');
        }
      }
    siguiente(){
      if(this.pagina<(this.totalRegistros/this.RegistersForPage)){
        this.pagina++;
        this.gridAlmacen = this.gridAlmacen1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      }
    }
    anterior(){
      if(this.pagina>1){
      this.pagina--;
      this.gridAlmacen = this.gridAlmacen1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
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
      if(val.property=="strWHS_Cod"){
          this.clickColumn="strWHS_Cod";
          this.blnilterstrWHS_Cod=true;
          this.blnilterstrWHS_Desc=false; 
          this.blnilterstrLocation=false; 
          this.blnilterstrSubsidiary_Cod=false; 
          this.blnilterstrSubsidiary_Desc=false; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
      }
      if(val.property=="strWHS_Desc"){
          this.clickColumn="strWHS_Desc";
          this.blnilterstrWHS_Cod=false;
          this.blnilterstrWHS_Desc=true; 
          this.blnilterstrLocation=false; 
          this.blnilterstrSubsidiary_Cod=false; 
          this.blnilterstrSubsidiary_Desc=false; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
      }
      if(val.property=="strLocation"){
          this.clickColumn="strLocation";
          this.blnilterstrWHS_Cod=false;
          this.blnilterstrWHS_Desc=false; 
          this.blnilterstrLocation=true; 
          this.blnilterstrSubsidiary_Cod=false; 
          this.blnilterstrSubsidiary_Desc=false; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
      }
      
      if(val.property=="strSubsidiary_Cod"){
          this.clickColumn="strSubsidiary_Cod";
          this.blnilterstrWHS_Cod=false;
          this.blnilterstrWHS_Desc=false; 
          this.blnilterstrLocation=false; 
          this.blnilterstrSubsidiary_Cod=true; 
          this.blnilterstrSubsidiary_Desc=false; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
      }
      if(val.property=="strSubsidiary_Desc"){
          this.clickColumn="strSubsidiary_Desc";
          this.blnilterstrWHS_Cod=false;
          this.blnilterstrWHS_Desc=false; 
          this.blnilterstrLocation=false; 
          this.blnilterstrSubsidiary_Cod=false; 
          this.blnilterstrSubsidiary_Desc=true; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
      }
      if(val.property=="dtmModified_Date"){
          this.clickColumn="dtmModified_Date";
          this.blnilterstrWHS_Cod=false;
          this.blnilterstrWHS_Desc=false; 
          this.blnilterstrLocation=false; 
          this.blnilterstrSubsidiary_Cod=false; 
          this.blnilterstrSubsidiary_Desc=false; 
          this.blnilterdtmModified_Date=true;
          this.blnilterstrModified_User=false;
      }
      if(val.property=="strModified_User"){
          this.clickColumn="strModified_User";
          this.blnilterstrWHS_Cod=false;
          this.blnilterstrWHS_Desc=false; 
          this.blnilterstrLocation=false; 
          this.blnilterstrSubsidiary_Cod=false; 
          this.blnilterstrSubsidiary_Desc=false; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=true;
      }        
  }
  filterstrWHS_Cod(h,{column,$index}){
      if(this.blnilterstrWHS_Cod){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrWHS_Desc(h,{column,$index}){        
      if(this.blnilterstrWHS_Desc){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrLocation(h,{column,$index}){        
      if(this.blnilterstrLocation){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrSubsidiary_Cod(h,{column,$index}){        
      if(this.blnilterstrSubsidiary_Cod){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrSubsidiary_Desc(h,{column,$index}){        
      if(this.blnilterstrSubsidiary_Desc){
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
  loadCompania(){
    this.dialogCompania=true;
  }

  companiaSeleccionado(val){
    this.companyCod=val.strCompany_Cod;
    this.companyName=val.strCompany_Desc;
    this.dialogCompania=false;
  }

  closeCompania(){
    this.btnactivarcompania=false;
    return false;
  }
  desactivar_compania(){
    if(this.dialogCompania){
      this.btnactivarcompania=false;
    }
  }
  activar_compania(){
    setTimeout(() => {
      this.btnactivarcompania=true;
    }, 120)
  }
    data(){
        return{     
            companyName:'',
            companyCod:'',
            gridAlmacen:[],
            gridAlmacen1:[],
            gridAlmacen2:[],
            loading1:true,
            strWHS_Cod:''
        }
    }
  
}
