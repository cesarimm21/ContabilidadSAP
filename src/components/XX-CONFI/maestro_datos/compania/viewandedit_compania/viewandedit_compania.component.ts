import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import router from '@/router';
//***Modelos */
import {CompaniaModel} from '@/modelo/maestro/compania';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import impuestoService from '@/components/service/impuesto.service';
import companiaService from '@/components/service/compania.service';


import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
@Component({
  name: 'modificar-compania',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'buttons-accions':ButtonsAccionsComponent,
  }
})
export default class ViewAndEditCompaniaComponent extends Vue {
     nameComponent:string;
    fecha_actual:string;
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
 
    fecha_ejecucion:string;
    companyName:any;
    companyCod:any;
    issave:boolean=false;
    iserror:boolean=false;
    textosave:string='';
    public compania:CompaniaModel=new CompaniaModel();
    public tableData:Array<CompaniaModel>=[]; 
    public tableData1:Array<CompaniaModel>=[]; 
    namepage:string;
    impDisabled:boolean=false;
    cod_criticidad:string='';
    selectrow:any;
    currentRow:any;
    dialogEliminar:boolean=false;
    cod_modulo:string='';
    pagina: number =1;
      RegistersForPage: number = 100;
    totalRegistros: number = 100;
    clickColumn:string='';
    txtbuscar:string='';
    Column:string='';
    dialogBusquedaFilter:boolean=false;
    blnilterstrCompany_Cod:boolean=false;
    blnilterstrCompany_Desc:boolean=false;
    blnilterstrRUC:boolean=false;
    blnilterstrCountry:boolean=false;
    blnilterstrAddress:boolean=false;
    blnilterdtmModified_Date:boolean=false;
    blnilterstrModified_User:boolean=false;
    diarioDialog:boolean=false;
    nameuser:any;
    loading1:boolean=false;
    dialogActivar:boolean=false;
  constructor(){    
        super();
        Global.nameComponent='modificar-compania';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        // this.companyName=localStorage.getItem('compania_name');
        // this.companyCod=localStorage.getItem('compania_cod');
        this.nameuser=localStorage.getItem('User_Usuario');
        this.cargarList();
    }
    
    handleCurrentChange(val) {
        if(val!=null){
          this.compania=val;
        this.selectrow=val;
        this.currentRow = val;
        this.companyCod=val.strCompany_Cod;
        }
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
    async cargarList(){
      this.loading1=true;
        if(this.cod_modulo!=''){
            await companiaService.GetOnlyOneCompania(this.cod_modulo)
            .then(res=>{
                if(res!=undefined){
                    this.selectrow=res;
                    this.validarView();
                }
            })
            .catch(error=>{
            
            })
        }
        else{
            await companiaService.GetAllCompania()
            .then(res=>{
                this.tableData=res;
                this.tableData1=res;
                this.loading1=false;
            })
            .catch(error=>{
              this.loading1=false;
            })
        }
    }
    btnBuscar(){
      var data=Global.like(this.tableData1,this.clickColumn,this.txtbuscar)
      this.tableData=[];
      this.tableData=data;
      this.dialogBusquedaFilter=false;
    }
    async validad(){      
      var data=Global.like(this.tableData1,'strCompany_Cod',this.companyCod)
      if(data.length>0){
        this.compania=data[0];
        if(this.compania.strCompany_Cod==this.companyCod){
          await setTimeout(() => {
            debugger;
            if(this.compania.strCompany_Cod!=''){
              router.push({ path: `/barmenu/XX-CONFI/maestro_datos/compania/modif_compania`, query: { vista: 'modificar',data:JSON.stringify(this.compania) }  })
            }
          }, 600)
        }
        else{
          if(this.companyCod==''){
            this.textosave='Inserte Compañia. ';
            this.warningMessage('Inserte Compañia. ');
          }
          else{
            this.textosave='No existe Compañia. ';
            this.warningMessage('No existe Compañia. ');
          }        
        }
      }
      else{
        this.textosave='No existe Compañia. ';
        this.warningMessage('No existe Compañia. ');
      }
    }
    
    async validarView(){
        if(this.selectrow!=undefined && this.selectrow!=null ){
            debugger;
            if(this.selectrow!=undefined && this.selectrow!=null ){
                router.push({ path: `/barmenu/XX-CONFI/maestro_datos/compania/modif_compania`, query: { vista: 'modificar',data:JSON.stringify(this.selectrow) }  })
            }
        }
        else{
            this.textosave='Seleccione alguna salida. ';
            this.warningMessage('Seleccione alguna salida. ')
        }
    }
    fnOcultar(){

    }
    handleChange(value) {
        console.log(value);
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
      var data=await this.sortByKeyAsc(this.tableData1,this.clickColumn) 
      // this.gridDocumento2=[];
      // this.gridDocumento2=data;
      // this.gridDocumento = await this.gridDocumento2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      // await loading.close();
    }
    DscItem(){
      var data=this.sortByKeyDesc(this.tableData1,this.clickColumn) 
      // this.gridDocumento2=[];
      // this.gridDocumento2=data;
      // this.gridDocumento = this.gridDocumento2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    
    }
    Limpiar(){
      this.tableData = this.tableData1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));    
      this.blnilterstrCompany_Cod=false;
        this.blnilterstrCompany_Desc=false;
        this.blnilterstrRUC=false;
        this.blnilterstrCountry=false;
        this.blnilterstrAddress=false;
        this.blnilterdtmModified_Date=false;
        this.blnilterstrModified_User=false;
    }
    Print(){
      window.print();
    }
  async  EliminarItem(){
    if(this.compania.strCompany_Cod!="" && this.compania.strCompany_Desc!=""){
      this.dialogEliminar=true; 
    }
    else{
      this.warningMessage('Selecciones una compania')
    }    
  }    
  async Activar(){
    if(this.compania.strCompany_Cod!="" && this.compania.strCompany_Desc!=""){
      this.dialogActivar=true;
    }
    else{
      this.warningMessage('Selecciones una compania')
    }
  }
  async tbnActivar(){   
      this.compania.strModified_User=this.nameuser;
      await companiaService.ActivarCompania(this.compania)
      .then(response=>{
        if(response!=undefined){
           this.textosave='Se activo correctamento.' + response;
           this.issave=true;
           this.iserror=false;
           this.succesMessage('Se activo correctamento. ' + response)
           this.compania=new CompaniaModel();
           this.dialogActivar=false;
        }
        else{
          this.issave=false;
          this.iserror=true;
          this.textosave='Ocurrio un error al activar.';
          this.errorMessage('Ocurrio un error al activar.');
          this.dialogActivar=false;
        }
        this.cargarList();
        //this.unidadmedidaModel=response;       
      }).catch(error=>{
        this.issave=false;
        this.iserror=true;
        this.textosave='Ocurrio un error al activar.';
        this.errorMessage('No se pudo activar');
        this.dialogActivar=false;
      })
  }
  async btnEliminar(){
    this.compania.strModified_User=this.nameuser;
      await companiaService.InactivarCompania(this.compania)
      .then(response=>{
        if(response!=undefined){
           this.textosave='Se Inactivo correctamento.' + response;
           this.issave=true;
           this.iserror=false;
           this.succesMessage('Se Inactivo correctamento. ' + response)
           this.compania=new CompaniaModel();
           this.dialogEliminar=false; 
        }
        else{
          this.issave=false;
          this.iserror=true;
          this.textosave='Ocurrio un error al Inactivo.';
          this.errorMessage('Ocurrio un error al Inactivo.');
          this.dialogEliminar=false; 
        }
        this.cargarList();
        //this.unidadmedidaModel=response;       
      }).catch(error=>{
        this.issave=false;
        this.iserror=true;
        this.textosave='Ocurrio un error al Inactivo.';
        this.errorMessage('No se pudo Inactivo');
        this.dialogEliminar=false; 
      })
  }
  //#region [CABECERA]
  headerclick(val){    
    this.Column=val.label;
    Global.setColumna(this.Column);     
    if(val.property=="strCompany_Cod"){
        this.clickColumn="strCompany_Cod";
        this.blnilterstrCompany_Cod=true;
        this.blnilterstrCompany_Desc=false;
        this.blnilterstrRUC=false;
        this.blnilterstrCountry=false;
        this.blnilterstrAddress=false;
        this.blnilterdtmModified_Date=false;
        this.blnilterstrModified_User=false;
    }
    if(val.property=="strCompany_Desc"){
        this.clickColumn="strCompany_Desc";
        this.blnilterstrCompany_Cod=false;
        this.blnilterstrCompany_Desc=true;
        this.blnilterstrRUC=false;
        this.blnilterstrCountry=false;
        this.blnilterstrAddress=false;
        this.blnilterdtmModified_Date=false;
        this.blnilterstrModified_User=false;
    }
    if(val.property=="strRUC"){
        this.clickColumn="strRUC";
        this.blnilterstrCompany_Cod=false;
        this.blnilterstrCompany_Desc=false;
        this.blnilterstrRUC=true;
        this.blnilterstrCountry=false;
        this.blnilterstrAddress=false;
        this.blnilterdtmModified_Date=false;
        this.blnilterstrModified_User=false;
    }
    if(val.property=="strCountry"){
        this.clickColumn="strCountry";
        this.blnilterstrCompany_Cod=false;
        this.blnilterstrCompany_Desc=false;
        this.blnilterstrRUC=false;
        this.blnilterstrCountry=true;
        this.blnilterstrAddress=false;
        this.blnilterdtmModified_Date=false;
        this.blnilterstrModified_User=false;
    }
    if(val.property=="strAddress"){
        this.clickColumn="strAddress";
        this.blnilterstrCompany_Cod=false;
        this.blnilterstrCompany_Desc=false;
        this.blnilterstrRUC=false;
        this.blnilterstrCountry=false;
        this.blnilterstrAddress=true;
        this.blnilterdtmModified_Date=false;
        this.blnilterstrModified_User=false;
    }
    if(val.property=="dtmModified_Date"){
        this.clickColumn="dtmModified_Date";
        this.blnilterstrCompany_Cod=false;
        this.blnilterstrCompany_Desc=false;
        this.blnilterstrRUC=false;
        this.blnilterstrCountry=false;
        this.blnilterstrAddress=false;
        this.blnilterdtmModified_Date=true;
        this.blnilterstrModified_User=false;
    }
    if(val.property=="strModified_User"){
        this.clickColumn="strModified_User";
        this.blnilterstrCompany_Cod=false;
        this.blnilterstrCompany_Desc=false;
        this.blnilterstrRUC=false;
        this.blnilterstrCountry=false;
        this.blnilterstrAddress=false;
        this.blnilterdtmModified_Date=false;
        this.blnilterstrModified_User=true;
    }        
}
filterstrCompany_Cod(h,{column,$index}){
    if(this.blnilterstrCompany_Cod){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterstrCompany_Desc(h,{column,$index}){
    if(this.blnilterstrCompany_Desc){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterstrRUC(h,{column,$index}){        
    if(this.blnilterstrRUC){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }    
 
  filterstrCountry(h,{column,$index}){        
    if(this.blnilterstrCountry){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }    
 
  filterstrAddress(h,{column,$index}){        
    if(this.blnilterstrAddress){
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
  warningMessage(newMsg : string) {
    this.$message({
      showClose: true,
      message: newMsg,
      type: 'warning'
    });
  }
  succesMessage(newMsg : string) {
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
    data(){
        return{     
            companyName:'',
            companyCod:'',
            namepage:'',
            tableData:[],
            tableData1:[],
        }
    }
  
}
