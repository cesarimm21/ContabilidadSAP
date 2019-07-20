import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import router from '@/router';
//***Modelos */
import {CategoriaCuentaModel} from '@/modelo/maestro/categoriacuenta';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import categoriacuentaService from '@/components/service/categoriacuenta.service';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
@Component({
  name: 'viewandedit-categoriacuenta',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'buttons-accions':ButtonsAccionsComponent,
  }
})
export default class ViewAndEditCategoriaCuentaComponent extends Vue {
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
    public categoriacuenta:CategoriaCuentaModel=new CategoriaCuentaModel();
    public tableData:Array<CategoriaCuentaModel>=[]; 
    public tableData1:Array<CategoriaCuentaModel>=[]; 
    namepage:string;
    impDisabled:boolean=false;
    cod_criticidad:string='';
    currentRow:any;
    dialogEliminar:boolean=false;
    strAcctCateg_Cod:string='';
    loading1:boolean=true;
    dialogBusquedaFilter:boolean=false;
    pagina: number =1;
    blnilterstrAcctCateg_Cod:boolean=false;
    blnilterstrAcctCateg_Desc:boolean=false;
    blnilterdtmModified_Date:boolean=false;
    blnilterstrModified_User:boolean=false;
  RegistersForPage: number = 100;
  totalRegistros: number = 100;
    clickColumn:string='';
    txtbuscar:string='';
    Column:string='';
    planDialog:boolean=false;
    nameuser:any;
    planActivarDialog:boolean=false;
  constructor(){    
        super();
        Global.nameComponent='viewandedit-categoriacuenta';
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
        this.categoriacuenta=val;
        this.currentRow = val;
        this.strAcctCateg_Cod=this.categoriacuenta.strAcctCateg_Cod;
        }
    }
    async cargarList(){
      await categoriacuentaService.GetAllCategoriaCuentaView()
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
    async validarView(){
        if(this.categoriacuenta.strAcctCateg_Cod!='' && this.categoriacuenta.intIdAcctCateg_ID!=-1 ){
            if(this.categoriacuenta.strAcctCateg_Cod!='' && this.categoriacuenta.intIdAcctCateg_ID!=-1){
                router.push({ path: `/barmenu/XX-CONFI/maestro_datos/categoria_cuenta/modif_categoria_cuenta`, query: { vista: 'modificar',data:JSON.stringify(this.categoriacuenta) }  })
            }
        }
        else{
            this.textosave='Seleccione algun item. ';
            this.warningMessage('Seleccione algun item. ')
        }
    }
    fnOcultar(){

    }
    handleChange(value) {
    }

    async validad(){      
      var data=Global.like(this.tableData1,'strAcctCateg_Cod',this.strAcctCateg_Cod)
      if(data.length>0){
        this.categoriacuenta=data[0];
        if(this.categoriacuenta.strAcctCateg_Cod==this.strAcctCateg_Cod){
          await setTimeout(() => {
            if(this.categoriacuenta.strAcctCateg_Cod!=''){
              router.push({ path: `/barmenu/XX-CONFI/maestro_datos/categoria_cuenta/modif_categoria_cuenta`, query: { vista:'modificar' ,data:JSON.stringify(this.categoriacuenta) }  })
            }
          }, 600)
        }
        else{
          if(this.strAcctCateg_Cod==''){
            this.textosave='Inserte Categoria Cuenta. ';
            this.warningMessage('Inserte Categoria Cuenta. ');
          }
          else{
            this.textosave='No existe Categoria Cuenta. ';
            this.warningMessage('No existe Categoria Cuenta. ');
          }        
        }
      }
      else{
        this.textosave='No existe Categoria Cuenta. ';
        this.warningMessage('No existe Categoria Cuenta. ');
      }
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
      this.blnilterstrAcctCateg_Cod=false;
      this.blnilterstrAcctCateg_Desc=false; 
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=false;   
    }
    Print(){
      window.print();
    }
    btnBuscar(){
      var data=Global.like(this.tableData1,this.clickColumn,this.txtbuscar)
      this.tableData=[];
      this.tableData=data;
      this.dialogBusquedaFilter=false;
    }
    async  EliminarItem(){
      if(this.categoriacuenta.intIdAcctCateg_ID!=-1&&this.categoriacuenta.strAcctCateg_Cod!=""&&this.categoriacuenta.strAcctCateg_Desc!=""){
        this.planDialog=true;
      }
      else{
        this.warningMessage("Selecciona un categoria cuenta")
      }    
    }
    inactivarPlan(){
      this.nameuser=localStorage.getItem('User_Usuario');
      this.categoriacuenta.strModified_User=this.nameuser;
      let loadingInstance = Loading.service({
        fullscreen: true,
        text: 'Inactivando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
        ); 
      categoriacuentaService.inactivarcategoriacuenta(this.categoriacuenta)
      .then(resp=>{
        loadingInstance.close();
        this.planDialog=false;
        this.$message({
            showClose: true,
            message: 'Se Inactivo correctamente '+resp,
            type: 'success'
          });
          this.categoriacuenta=new CategoriaCuentaModel();
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
      if(this.categoriacuenta.strAcctCateg_Cod!="" && this.categoriacuenta.strAcctCateg_Desc!=""){
        this.planActivarDialog=true;
      }
      else{
        this.warningMessage('Selecciones Categoria cuenta')
      }
    }
    activarPlan(){
      this.nameuser=localStorage.getItem('User_Usuario');
      this.categoriacuenta.strModified_User=this.nameuser;
      let loadingInstance = Loading.service({
        fullscreen: true,
        text: 'Activando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
        ); 
      categoriacuentaService.activarcategoriacuenta(this.categoriacuenta)
      .then(resp=>{
        loadingInstance.close();
        this.planActivarDialog=false;
        this.$message({
            showClose: true,
            message: 'Se Activo correctamente '+resp,
            type: 'success'
          });
          this.categoriacuenta=new CategoriaCuentaModel();
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
    //#region [CABECERA]
  headerclick(val){    
    this.Column=val.label;
    Global.setColumna(this.Column);     
    if(val.property=="strAcctCateg_Cod"){
        this.clickColumn="strAcctCateg_Cod";
        this.blnilterstrAcctCateg_Cod=true;
        this.blnilterstrAcctCateg_Desc=false; 
        this.blnilterdtmModified_Date=false;
        this.blnilterstrModified_User=false;
    }
    if(val.property=="strAcctCateg_Desc"){
        this.clickColumn="strAcctCateg_Desc";
        this.blnilterstrAcctCateg_Cod=false;
        this.blnilterstrAcctCateg_Desc=true; 
        this.blnilterdtmModified_Date=false;
        this.blnilterstrModified_User=false;
    }
    if(val.property=="dtmModified_Date"){
        this.clickColumn="dtmModified_Date";
        this.blnilterstrAcctCateg_Cod=false;
        this.blnilterstrAcctCateg_Desc=false; 
        this.blnilterdtmModified_Date=true;
        this.blnilterstrModified_User=false;
    }
    if(val.property=="strModified_User"){
        this.clickColumn="strModified_User";
        this.blnilterstrAcctCateg_Cod=false;
        this.blnilterstrAcctCateg_Desc=false; 
        this.blnilterdtmModified_Date=false;
        this.blnilterstrModified_User=true;
    }        
}
filterstrAcctCateg_Cod(h,{column,$index}){
    if(this.blnilterstrAcctCateg_Cod){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterstrAcctCateg_Desc(h,{column,$index}){        
    if(this.blnilterstrAcctCateg_Desc){
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
    getDateStringView(fecha:string){
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
            tableData:[],
            tableData1:[],
            namepage:'',
            loading1:true
        }
    }
  
}
