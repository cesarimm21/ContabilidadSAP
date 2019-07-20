import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import router from '@/router';
import {ServicioPrestadoModel} from '@/modelo/maestro/servicioPrestado';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import servicioService from '@/components/service/servicioprestado.service';
import { Loading } from 'element-ui';
import documentsService from '@/components/service/documents.service';
import servicioprestadoService from '@/components/service/servicioprestado.service';
@Component({
  name: 'modificar-adquisicion',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'buttons-accions': ButtonsAccionsComponent,
  }
})
export default class ModificarServicioComponent extends Vue {
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  value3:string;
  companyName:any;
  companyCod:any;
  strNDServ_Cod:string='';
  public documento:ServicioPrestadoModel=new ServicioPrestadoModel();
  gridDocumento:ServicioPrestadoModel[];
  gridDocumento1:ServicioPrestadoModel[];
  gridDocumento2:ServicioPrestadoModel[];
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
  blnilterstrNDServ_Cod:boolean=false;
  blnilterstrNDServ_Desc:boolean=false;
  blnilterdtmCreation_Date:boolean=false;
  blnilterstrCreation_User:boolean=false;
  servicioDialog:boolean=false;

  dialogInactivar:boolean=false;
  item:string='';
  constructor(){    
        super();
        Global.nameComponent='modificar-adquisicion';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
        servicioService.GetAllServicioPrestado()
        .then(response=>{
          this.gridDocumento=[];
          this.gridDocumento1=[];
          this.gridDocumento2=[];
          this.gridDocumento=response;
          this.gridDocumento1=response;
          this.gridDocumento2=response;
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
    handleCurrentChange(val:ServicioPrestadoModel){
      this.documento=val;
      this.strNDServ_Cod=this.documento.strNDServ_Cod;
     }
    btnBuscar(){
      var data=Global.like(this.gridDocumento1,this.clickColumn,this.txtbuscar)
      this.gridDocumento=[];
      this.gridDocumento=data;
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
      var data=await this.sortByKeyAsc(this.gridDocumento1,this.clickColumn) 
      this.gridDocumento2=[];
      this.gridDocumento2=data;
      this.gridDocumento = await this.gridDocumento2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      await loading.close();
    }
    DscItem(){
      var data=this.sortByKeyDesc(this.gridDocumento1,this.clickColumn) 
      this.gridDocumento2=[];
      this.gridDocumento2=data;
      this.gridDocumento = this.gridDocumento2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    
    }
    Limpiar(){
      this.gridDocumento = this.gridDocumento1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));    
      this.blnilterstrNDServ_Cod=false;
      this.blnilterstrNDServ_Desc=false;
      this.blnilterdtmCreation_Date=false;
      this.blnilterstrCreation_User=false;
    }
    Print(){
      window.print();
    }
    async  EliminarItem(){
      this.servicioDialog=true;
    }
    deleteServicio(){
      if(this.documento.strNDServ_Cod!=''){
        let loadingInstance = Loading.service({
          fullscreen: true,
          text: 'Eliminando...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.8)'
          }
          ); 
        servicioService.DeleteServicioPrestado(this.documento)
        .then(resp=>{
          loadingInstance.close();
          this.servicioDialog=false;
          this.$message({
              showClose: true,
              message: 'Se Elimino correctamente '+resp,
              type: 'success'
            });
  
            this.documento=new ServicioPrestadoModel();
            this.load();
            this.issave = true;
            this.iserror = false;
            this.textosave = 'Se Elimino Correctamente '+resp;
        })
        .catch(error=>{
          loadingInstance.close();
          this.servicioDialog=false;
          this.$message({
              showClose: true,
              message: 'No se elimino',
              type: 'error'
            });
        })
        }
        else{
            this.warningMessage('Seleccione. ');
        }
    }
  async validad(){        
    
    var data=Global.like(this.gridDocumento1,'strNDServ_Cod',this.strNDServ_Cod)
    if(data.length>0){
      this.documento=data[0];
      if(this.documento.strNDServ_Cod==this.strNDServ_Cod){
        await setTimeout(() => {
          debugger;
          if(this.documento.strNDServ_Cod!=''){
            router.push({ path: `/barmenu/XX-CONFI/maestro_datos/servicio_prestado/viewandedit_servicio`, query: { vista:'modificar' ,data:JSON.stringify(this.documento) }  })
          }
        }, 600)
      }
      else{
        if(this.strNDServ_Cod==''){
          this.textosave='Inserte Serv. Prestado ND. ';
          this.warningMessage('Inserte Serv. Prestado ND. ');
        }
        else{
          this.textosave='No existe Serv. Prestado ND. ';
          this.warningMessage('No existe Serv. Prestado ND. ');
        }        
      }
    }
    else{
      this.textosave='No existe Serv. Prestado ND. ';
      this.warningMessage('No existe Serv. Prestado ND. ');
    }
  }
   async validarView(){
      if(this.documento.intIdNDServ_ID!=-1){
          await setTimeout(() => {
            debugger;
            if(this.documento.strNDServ_Cod!=''){
              router.push({ path: `/barmenu/XX-CONFI/maestro_datos/servicio_prestado/viewandedit_servicio`, query: { vista:'modificar' ,data:JSON.stringify(this.documento) }  })
            }
          }, 600)
        }
        else{
          this.textosave='Seleccione Serv. Prestado ND. ';
          this.warningMessage('Seleccione Serv. Prestado ND. ');
        }
      }
    siguiente(){
      if(this.pagina<(this.totalRegistros/this.RegistersForPage)){
        this.pagina++;
        this.gridDocumento = this.gridDocumento1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      }
    }
    anterior(){
      if(this.pagina>1){
      this.pagina--;
      this.gridDocumento = this.gridDocumento1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      }
    }
    warningMessage(newMsg : string) {
      this.$message({
        showClose: true,
        message: newMsg,
        type: 'warning'
      });
    }
  //#region [CABECERA]
  headerclick(val){    
      this.Column=val.label;
      Global.setColumna(this.Column);     
      if(val.property=="strNDServ_Cod"){
          this.clickColumn="strNDServ_Cod";
          this.blnilterstrNDServ_Cod=true;
      this.blnilterstrNDServ_Desc=false;
      this.blnilterdtmCreation_Date=false;
      this.blnilterstrCreation_User=false;
      }
      if(val.property=="strNDServ_Desc"){
          this.clickColumn="strNDServ_Desc";
          this.blnilterstrNDServ_Cod=false;
      this.blnilterstrNDServ_Desc=true;
      this.blnilterdtmCreation_Date=false;
      this.blnilterstrCreation_User=false;
      }
      if(val.property=="dtmCreation_Date"){
          this.clickColumn="dtmCreation_Date";
          this.blnilterstrNDServ_Cod=false;
      this.blnilterstrNDServ_Desc=false;
      this.blnilterdtmCreation_Date=true;
      this.blnilterstrCreation_User=false;
      }
      if(val.property=="strCreation_User"){
          this.clickColumn="strCreation_User";
          this.blnilterstrNDServ_Cod=false;
      this.blnilterstrNDServ_Desc=false;
      this.blnilterdtmCreation_Date=false;
      this.blnilterstrCreation_User=true;
      }        
  }
  filterstrNDServ_Cod(h,{column,$index}){
      if(this.blnilterstrNDServ_Cod){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrNDServ_Desc(h,{column,$index}){        
      if(this.blnilterstrNDServ_Desc){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }    
   
    filterdtmCreation_Date(h,{column,$index}){
      
      if(this.blnilterdtmCreation_Date){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrCreation_User(h,{column,$index}){
      if(this.blnilterstrCreation_User){
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

    
  ActivarDesactivar(){
    debugger;
    this.item=this.documento.strNDServ_Cod;
    this.dialogInactivar=true;      
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
  async btnInactivar(){
    var nameuser:any=localStorage.getItem('User_Usuario');
    this.documento.strModified_User=nameuser;
    if(this.documento.strNDServ_Cod!=""){
      
      let loadingInstance = Loading.service({
        fullscreen: true,
        text: 'Activando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
      );   
      await servicioprestadoService.activarServicioPrestado(this.documento)
      .then(respo=>{
        loadingInstance.close();
        this.successMessage('Se Activo Servicio Prestado '+this.documento.strNDServ_Cod)
        this.load();
        this.issave=true;
        this.iserror=false;
        this.textosave='Se Activo Servicio Prestado '+this.documento.strNDServ_Cod;
        this.dialogInactivar=false;
      }).catch(ee=>{
        loadingInstance.close();
        this.issave=false;
        this.iserror=true;
        this.textosave='Error en Activar '+this.documento.strNDServ_Cod;
        this.errorMessage('Error en Activar '+this.documento.strNDServ_Cod)})
        this.dialogInactivar=false;
    }
    else{
      this.warningMessage('Debe de seleccionar una fila!!!');
    }
  }


    data(){
        return{     
            companyName:'',
            companyCod:'',
            gridDocumento:[],
            gridDocumento1:[],
            gridDocumento2:[],
            strNDServ_Cod:''
        }
    }
  
}
