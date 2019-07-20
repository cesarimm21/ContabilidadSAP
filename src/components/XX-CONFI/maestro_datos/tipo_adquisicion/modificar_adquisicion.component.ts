import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import router from '@/router';
import {TipoAdquisicionModel} from '@/modelo/maestro/tipoadquisicion';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import tipoadquisicionService from '@/components/service/tipoaquisicion.service';
import { Loading } from 'element-ui';
@Component({
  name: 'modificar-adquisicion',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'buttons-accions': ButtonsAccionsComponent,
  }
})
export default class ModificarAdquisicionoComponent extends Vue {
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  value3:string;
  companyName:any;
  companyCod:any;
  public documento:TipoAdquisicionModel=new TipoAdquisicionModel();
  gridDocumento:TipoAdquisicionModel[];
  gridDocumento1:TipoAdquisicionModel[];
  gridDocumento2:TipoAdquisicionModel[];
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
  blnilterstrTypeAdq_PDB_Cod:boolean=false;
  blnilterstrTypeAdq_PDB_Desc:boolean=false;
  blnilterdtmCreation_Date:boolean=false;
  blnilterstrCreation_User:boolean=false;
  item:string='';
  dialogInactivar:boolean=false;
  dialogEliminar:boolean=false;

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
        tipoadquisicionService.busquedaTipoAquisicion()
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
    handleCurrentChange(val:TipoAdquisicionModel){
      this.documento=val;
     }
    btnBuscar(){
      var data=this.like(this.gridDocumento1,this.clickColumn,this.txtbuscar)
      this.gridDocumento=[];
      this.gridDocumento=data;
      this.dialogBusquedaFilter=false;
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
      this.blnilterstrTypeAdq_PDB_Cod=false;
      this.blnilterstrTypeAdq_PDB_Desc=false;
      this.blnilterdtmCreation_Date=false;
      this.blnilterstrCreation_User=false;
    }
    Print(){
      window.print();
    }
  async  EliminarItem(){
    if(this.documento!=undefined){
      this.dialogEliminar=true;
    }
    else{
      alert('Debe de seleccionar una fila!!!');
    }
  }
  async validad(){      
    var data=this.like(this.gridDocumento1,'strTypeAdq_PDB_Cod',this.documento.strTypeAdq_PDB_Cod)
    this.documento=data[0];
    if(this.documento.intTypeAdq_PDB_Cod!=undefined){
      await setTimeout(() => {
        debugger;
        if(this.documento.strTypeAdq_PDB_Cod!=undefined){
          router.push({ path: `/barmenu/XX-CONFI/maestro_datos/tipo_adquisicion/viewandedit_adquisicion`, query: { vista:'modificar' ,data:JSON.stringify(this.documento) }  })
        }
      }, 600)
    }
    else{
      this.textosave='No existe Tipo de Comprobante Pago. ';
      this.warningMessage('No existe Tipo de Comprobante Pago. ');
    }
  }
   async validarView(){
      if(this.documento.intTypeAdq_PDB_Cod!=undefined){
          await setTimeout(() => {
            debugger;
            if(this.documento.strTypeAdq_PDB_Cod!=undefined){
              router.push({ path: `/barmenu/XX-CONFI/maestro_datos/tipo_adquisicion/viewandedit_adquisicion`, query: { vista:'modificar' ,data:JSON.stringify(this.documento) }  })
            }
          }, 600)
        }
        else{
          this.textosave='Seleccione Tipo de Comprobante Pago. ';
          this.warningMessage('Seleccione Tipo de Comprobante Pago. ');
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
      if(val.property=="strTypeAdq_PDB_Cod"){
          this.clickColumn="strTypeAdq_PDB_Cod";
          this.blnilterstrTypeAdq_PDB_Cod=true;
      this.blnilterstrTypeAdq_PDB_Desc=false;
      this.blnilterdtmCreation_Date=false;
      this.blnilterstrCreation_User=false;
      }
      if(val.property=="strTypeAdq_PDB_Desc"){
          this.clickColumn="strTypeAdq_PDB_Desc";
          this.blnilterstrTypeAdq_PDB_Cod=false;
      this.blnilterstrTypeAdq_PDB_Desc=true;
      this.blnilterdtmCreation_Date=false;
      this.blnilterstrCreation_User=false;
      }
      if(val.property=="dtmCreation_Date"){
          this.clickColumn="dtmCreation_Date";
          this.blnilterstrTypeAdq_PDB_Cod=false;
      this.blnilterstrTypeAdq_PDB_Desc=false;
      this.blnilterdtmCreation_Date=true;
      this.blnilterstrCreation_User=false;
      }
      if(val.property=="strCreation_User"){
          this.clickColumn="strCreation_User";
          this.blnilterstrTypeAdq_PDB_Cod=false;
      this.blnilterstrTypeAdq_PDB_Desc=false;
      this.blnilterdtmCreation_Date=false;
      this.blnilterstrCreation_User=true;
      }        
  }
  filterstrTypeAdq_PDB_Cod(h,{column,$index}){
      if(this.blnilterstrTypeAdq_PDB_Cod){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrTypeAdq_PDB_Desc(h,{column,$index}){        
      if(this.blnilterstrTypeAdq_PDB_Desc){
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
  this.item=this.documento.strTypeAdq_PDB_Cod;
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
  this.documento.strModify_User=nameuser;
  if(this.documento.strTypeAdq_PDB_Cod!=""){
    
    let loadingInstance = Loading.service({
      fullscreen: true,
      text: 'Activando...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
    );   
    await tipoadquisicionService.activar(this.documento)
    .then(respo=>{
      loadingInstance.close();
      this.successMessage('Se Activo Tipo Adquisicion '+this.documento.strTypeAdq_PDB_Cod)
      this.load();
      this.issave=true;
      this.iserror=false;
      this.textosave='Se Activo Tipo Adquisicion '+this.documento.strTypeAdq_PDB_Cod;
      this.dialogInactivar=false;
    }).catch(ee=>{
      loadingInstance.close();
      this.issave=false;
      this.iserror=true;
      this.textosave='Error en Activar '+this.documento.strTypeAdq_PDB_Cod;
      this.errorMessage('Error en Activar '+this.documento.strTypeAdq_PDB_Cod)})
      this.dialogInactivar=false;
  }
  else{
    this.warningMessage('Debe de seleccionar una fila!!!');
  }
}


  async btnEliminar(){
    await tipoadquisicionService.eliminar(this.documento)
    .then(response=>{
      debugger;
      console.log('eliminar',response);
      if(response!=undefined){
         this.textosave='Se elimino correctamento.' + response;
         this.issave=true;
         this.iserror=false;
      }
      else{
        this.issave=false;
        this.iserror=true;
        this.textosave='Ocurrio un error al eliminar.';
      }
      this.load();
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
        message: 'No se pudo eliminar'
      });
    })
    
  }
    data(){
        return{     
            companyName:'',
            companyCod:'',
            gridDocumento:[],
            gridDocumento1:[],
            gridDocumento2:[],
        }
    }
  
}
