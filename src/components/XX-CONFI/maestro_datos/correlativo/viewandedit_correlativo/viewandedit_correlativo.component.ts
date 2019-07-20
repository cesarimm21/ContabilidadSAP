import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import router from '@/router';
//***Modelos */
import {CorrelativoModel} from '@/modelo/maestro/correlativo';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import impuestoService from '@/components/service/impuesto.service';
import correlativoService from '@/components/service/correlativo.service';


import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
@Component({
  name: 'viewandedit-correlativo',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'buttons-accions':ButtonsAccionsComponent,
  }
})
export default class ViewAndEditCorrelativoComponent extends Vue {
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
    public correlativo:CorrelativoModel=new CorrelativoModel();
    public tableData:Array<CorrelativoModel>=[]; 
    public tableData1:Array<CorrelativoModel>=[]; 
    namepage:string;
    impDisabled:boolean=false;
    cod_criticidad:string='';
    currentRow:any;
    dialogEliminar:boolean=false;
    strCorrel_Cod:string='';
    loading1:boolean=true;
    pagina: number =1;
    RegistersForPage: number = 100;
    totalRegistros: number = 100;
    clickColumn:string='';
    txtbuscar:string='';
    Column:string='';
    dialogBusquedaFilter:boolean=false;
    blnilterstrCorrel_Cod:boolean=false;
    blnilterstrProccess_Name:boolean=false;
    blnilterstrTransaction_Name:boolean=false;
    blnilterfltOrigenDocum_NO:boolean=false;
    blnilterdtmModified_Date:boolean=false;
    blnilterstrModified_User:boolean=false;
    paisDialog:boolean=false;
    planDialog:boolean=false;
    nameuser:any;
    planActivarDialog:boolean=false;
  constructor(){    
        super();
        Global.nameComponent='viewandedit-correlativo';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
        this.cargarList();
    }
    
    handleCurrentChange(val) {
        if(val!=null){
        this.correlativo=val;
        this.currentRow = val;
        }
    }
    async cargarList(){
        await correlativoService.GetCorrelativoAll(this.companyCod)
        .then(res=>{
            this.tableData=[];
            this.tableData1=[];
            this.tableData=res;
            this.tableData1=res;
            this.loading1=false;         
        })
        .catch(error=>{
          this.loading1=false;
        })
    }
    btnBuscar(){
      var data=Global.like(this.tableData1,this.clickColumn,this.txtbuscar)
      this.tableData=[];
      this.tableData=data;
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
      var data=await this.sortByKeyAsc(this.tableData1,this.clickColumn) 
      this.tableData=[];
      this.tableData=data;
      this.tableData = await this.tableData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      await loading.close();
    }
    DscItem(){
      var data=this.sortByKeyDesc(this.tableData1,this.clickColumn) 
      this.tableData=[];
      this.tableData=data;
      this.tableData = this.tableData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    
    }
    Limpiar(){
      this.tableData = this.tableData1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));    
          this.blnilterstrCorrel_Cod=false;
          this.blnilterstrProccess_Name=false; 
          this.blnilterstrTransaction_Name=false; 
          this.blnilterfltOrigenDocum_NO=false; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;  
    }
    Print(){
      window.print();
    }
    async  EliminarItem(){
      if(this.correlativo.intIdCorrelativo_ID!=-1&&this.correlativo.strCorrel_Cod!=""&&this.correlativo.strProccess_Name!=""){
        this.planDialog=true;
      }
      else{
        this.warningMessage("Selecciona un correlativo")
      }    
    }
    inactivarPlan(){
      this.nameuser=localStorage.getItem('User_Usuario');
      this.correlativo.strModified_User=this.nameuser;
      let loadingInstance = Loading.service({
        fullscreen: true,
        text: 'Inactivando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
        ); 
      correlativoService.inactivarCorrelativo(this.correlativo)
      .then(resp=>{
        loadingInstance.close();
        this.planDialog=false;
        this.$message({
            showClose: true,
            message: 'Se Inactivo correctamente '+resp,
            type: 'success'
          });
          this.correlativo=new CorrelativoModel();
          this.load();
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
      if(this.correlativo.strCorrel_Cod!="" && this.correlativo.strProccess_Name!=""&& this.correlativo.strTransaction_Name){
        this.planActivarDialog=true;
      }
      else{
        this.warningMessage('Selecciones Correlativo')
      }
    }
    activarPlan(){
      this.nameuser=localStorage.getItem('User_Usuario');
      this.correlativo.strModified_User=this.nameuser;
      let loadingInstance = Loading.service({
        fullscreen: true,
        text: 'Activando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
        ); 
      correlativoService.activarCorrelativo(this.correlativo)
      .then(resp=>{
        loadingInstance.close();
        this.planActivarDialog=false;
        this.$message({
            showClose: true,
            message: 'Se Activo correctamente '+resp,
            type: 'success'
          });
          this.correlativo=new CorrelativoModel();
          this.load();
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
  async validad(){      
    var data=Global.like(this.tableData1,'strCorrel_Cod',this.strCorrel_Cod)
    if(data.length>0){
      this.correlativo=data[0];
      if(this.correlativo.strCorrel_Cod==this.strCorrel_Cod){
        await setTimeout(() => {
          debugger;
          if(this.correlativo.strCorrel_Cod!=''){
            router.push({ path: `/barmenu/XX-CONFI/maestro_datos/correlativo/modif_correlativo`, query: { vista:'modificar' ,data:JSON.stringify(this.correlativo) }  })
          }
        }, 600)
      }
      else{
        if(this.strCorrel_Cod==''){
          this.textosave='Inserte Correlativo. ';
          this.warningMessage('Inserte Correlativo. ');
        }
        else{
          this.textosave='No existe Correlativo. ';
          this.warningMessage('No existe Correlativo. ');
        }        
      }
    }
    else{
      this.textosave='No existe Correlativo. ';
      this.warningMessage('No existe Correlativo. ');
    }
  }
   async validarView(){
      if(this.correlativo.intIdCorrelativo_ID!=-1&&this.correlativo.strCorrel_Cod!=''){
          await setTimeout(() => {
            debugger;
            if(this.correlativo.strCorrel_Cod!=''){
              router.push({ path: `/barmenu/XX-CONFI/maestro_datos/correlativo/modif_correlativo`, query: { vista:'modificar' ,data:JSON.stringify(this.correlativo) }  })
            }
          }, 600)
        }
        else{
          this.textosave='Seleccione Correlativo. ';
          this.warningMessage('Seleccione Correlativo. ');
        }
      }
    siguiente(){
      if(this.pagina<(this.totalRegistros/this.RegistersForPage)){
        this.pagina++;
        this.tableData = this.tableData1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      }
    }
    anterior(){
      if(this.pagina>1){
      this.pagina--;
      this.tableData = this.tableData1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      }
    }
    fnOcultar(){

    }
    handleChange(value) {
    }
  async btnEliminar(){
    await correlativoService.EliminarCorrelativo(this.currentRow)
    .then(response=>{
      if(response!=undefined){
         this.textosave='Se elimino correctamento.' + response.strCorrel_Cod;
         this.issave=true;
         this.iserror=false;
      }
      else{
        this.issave=false;
        this.iserror=true;
        this.textosave='Ocurrio un error al eliminar.';
      }
      this.cargarList();
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
  getDateStringView(fecha:string){
    var dateString = new Date(fecha);
    var dia = dateString.getDate();
    var mes = (dateString.getMonth()<12) ? dateString.getMonth()+1 : mes = dateString.getMonth();
    var yyyy = dateString.getFullYear();
    var dd = (dia<10) ? '0'+dia : dd=dia;
    var mm = (mes<10) ? '0'+mes : mm=mes;
    return dd+'.'+mm+'.'+yyyy;
}
  //#region [CABECERA]
  headerclick(val){    
    this.Column=val.label;
    Global.setColumna(this.Column);     
    if(val.property=="strCorrel_Cod"){
        this.clickColumn="strCorrel_Cod";
        this.blnilterstrCorrel_Cod=true;
        this.blnilterstrProccess_Name=false; 
        this.blnilterstrTransaction_Name=false; 
        this.blnilterfltOrigenDocum_NO=false; 
        this.blnilterdtmModified_Date=false;
        this.blnilterstrModified_User=false;
    }
    if(val.property=="strProccess_Name"){
        this.clickColumn="strProccess_Name";
        this.blnilterstrCorrel_Cod=false;
        this.blnilterstrProccess_Name=true; 
        this.blnilterstrTransaction_Name=false; 
        this.blnilterfltOrigenDocum_NO=false; 
        this.blnilterdtmModified_Date=false;
        this.blnilterstrModified_User=false;
    }
    if(val.property=="strTransaction_Name"){
        this.clickColumn="strTransaction_Name";
        this.blnilterstrCorrel_Cod=false;
        this.blnilterstrProccess_Name=false; 
        this.blnilterstrTransaction_Name=true; 
        this.blnilterfltOrigenDocum_NO=false; 
        this.blnilterdtmModified_Date=false;
        this.blnilterstrModified_User=false;
    }
    if(val.property=="fltOrigenDocum_NO"){
        this.clickColumn="fltOrigenDocum_NO";
        this.blnilterstrCorrel_Cod=false;
        this.blnilterstrProccess_Name=false; 
        this.blnilterstrTransaction_Name=false; 
        this.blnilterfltOrigenDocum_NO=true; 
        this.blnilterdtmModified_Date=false;
        this.blnilterstrModified_User=false;
    }
    if(val.property=="dtmModified_Date"){
        this.clickColumn="dtmModified_Date";
        this.blnilterstrCorrel_Cod=false;
        this.blnilterstrProccess_Name=false; 
        this.blnilterstrTransaction_Name=false; 
        this.blnilterfltOrigenDocum_NO=false; 
        this.blnilterdtmModified_Date=true;
        this.blnilterstrModified_User=false;
    }
    if(val.property=="strModified_User"){
        this.clickColumn="strModified_User";
        this.blnilterstrCorrel_Cod=false;
        this.blnilterstrProccess_Name=false; 
        this.blnilterstrTransaction_Name=false; 
        this.blnilterfltOrigenDocum_NO=false; 
        this.blnilterdtmModified_Date=false;
        this.blnilterstrModified_User=true;
    }        
}
filterstrCorrel_Cod(h,{column,$index}){
    if(this.blnilterstrCorrel_Cod){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterstrProccess_Name(h,{column,$index}){        
    if(this.blnilterstrProccess_Name){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterstrTransaction_Name(h,{column,$index}){        
    if(this.blnilterstrTransaction_Name){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterfltOrigenDocum_NO(h,{column,$index}){        
    if(this.blnilterfltOrigenDocum_NO){
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
  getDateString(fecha:string){
    var dateString = new Date(fecha);
    var dia = dateString.getDate();
    var mes = (dateString.getMonth()<12) ? dateString.getMonth()+1 : mes = dateString.getMonth();
    var yyyy = dateString.getFullYear();
    var dd = (dia<10) ? '0'+dia : dd=dia;
    var mm = (mes<10) ? '0'+mes : mm=mes;
    return dd+'.'+mm+'.'+yyyy;
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
    data(){
        return{     
            companyName:'',
            companyCod:'',
            namepage:'',
            tableData:[],
            tableData1:[],
            loading1:true
        }
    }
  
}
