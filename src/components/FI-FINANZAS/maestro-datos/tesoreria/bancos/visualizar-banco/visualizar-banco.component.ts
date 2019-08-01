import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import router from '@/router';
import {BancoModel} from '@/modelo/maestro/banco';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import bancoService from '@/components/service/banco.service';
import { Loading } from 'element-ui';
@Component({
  name: 'visualizar-banco',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'buttons-accions': ButtonsAccionsComponent,
  }
})
export default class VisualizarBancoComponent extends Vue {
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  value3:string;
  companyName:any;
  companyCod:any;
  strBank_Cod:string='';
  public documento:BancoModel=new BancoModel();
  gridDocumento:BancoModel[];
  gridDocumento1:BancoModel[];
  gridDocumento2:BancoModel[];
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
  blnilterstrBank_Cod:boolean=false;
  blnilterstrBank_Name:boolean=false;
  blnilterstrCountry:boolean=false;
  blnilterstrBank_Curr:boolean=false;
  blnilterstrBank_Type:boolean=false;
  blnilterstrBank_Account:boolean=false;
  blnilterdtmModified_Date:boolean=false;
  blnilterstrModified_User:boolean=false;
  planDialog:boolean=false;
  planActivarDialog:boolean=false;
  nameuser:any;
  loading1:boolean=true;
  constructor(){    
        super();
        Global.nameComponent='visualizar-banco';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
        bancoService.GetAllBancoView(this.companyCod)
        .then(response=>{
          this.gridDocumento=[];
          this.gridDocumento1=[];
          this.gridDocumento2=[];
          this.gridDocumento=response;
          this.gridDocumento1=response;
          this.gridDocumento2=response;
          this.loading1=false;
        }).catch(err=>{
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
    handleCurrentChange(val:BancoModel){
      this.documento=val;
      this.strBank_Cod=this.documento.strBank_Cod;
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
      this.blnilterstrBank_Cod=false;
      this.blnilterstrBank_Name=false;
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=false;
      this.blnilterstrCountry=false;
      this.blnilterstrBank_Curr=false;
      this.blnilterstrBank_Type=false;
      this.blnilterstrBank_Account=false;
    }
    Print(){
      window.print();
    }
  async  EliminarItem(){
    if(this.documento.intBank_ID!=-1&&this.documento.strBank_Cod!=""&&this.documento.strBank_Name!=""){
      this.planDialog=true;
    }
    else{
      this.warningMessage("Selecciona un Banco")
    }    
  }
  inactivarPlan(){
    this.nameuser=localStorage.getItem('User_Usuario');
    this.documento.strModified_User=this.nameuser;
    let loadingInstance = Loading.service({
      fullscreen: true,
      text: 'Inactivando...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
      ); 
    bancoService.inactivarBanco(this.documento)
    .then(resp=>{
      loadingInstance.close();
      this.planDialog=false;
      this.$message({
          showClose: true,
          message: 'Se Inactivo correctamente '+resp,
          type: 'success'
        });
        this.documento=new BancoModel();
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
    if(this.documento.strBank_Cod!="" && this.documento.strBank_Name!=""){
      this.planActivarDialog=true;
    }
    else{
      this.warningMessage('Selecciones Banco')
    }
  }
  activarPlan(){
    this.nameuser=localStorage.getItem('User_Usuario');
    this.documento.strModified_User=this.nameuser;
    let loadingInstance = Loading.service({
      fullscreen: true,
      text: 'Activando...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
      ); 
    bancoService.activarBanco(this.documento)
    .then(resp=>{
      loadingInstance.close();
      this.planActivarDialog=false;
      this.$message({
          showClose: true,
          message: 'Se Activo correctamente '+resp,
          type: 'success'
        });
        this.documento=new BancoModel();
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
    var data=Global.like(this.gridDocumento1,'strBank_Cod',this.strBank_Cod)
    if(data.length>0){
      this.documento=data[0];
      if(this.documento.strBank_Cod==this.strBank_Cod){
        await setTimeout(() => {
          if(this.documento.strBank_Cod!=''){
            router.push({ path: `/barmenu/FI-FINANZAS/maestro-datos/tesoreria/bancos/modificar-banco/modificar-banco`, query: { vista:'visualizar' ,data:JSON.stringify(this.documento) }  })
          }
        }, 600)
      }
      else{
        if(this.strBank_Cod==''){
          this.textosave='Inserte Banco. ';
          this.warningMessage('Inserte Banco. ');
        }
        else{
          this.textosave='No existe Banco. ';
          this.warningMessage('No existe Banco. ');
        }        
      }
    }
    else{
      this.textosave='No existe Banco. ';
      this.warningMessage('No existe Banco. ');
    }
  }
   async validarView(){
      if(this.documento.intBank_ID!=-1){
          await setTimeout(() => {
            debugger;
            if(this.documento.strBank_Cod!=''){
              router.push({ path: `/barmenu/FI-FINANZAS/maestro-datos/tesoreria/bancos/modificar-banco/modificar-banco`, query: { vista:'visualizar' ,data:JSON.stringify(this.documento) }  })
            }
          }, 600)
        }
        else{
          this.textosave='Seleccione Banco. ';
          this.warningMessage('Seleccione Banco. ');
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
      if(val.property=="strBank_Cod"){
          this.clickColumn="strBank_Cod";
          this.blnilterstrBank_Cod=true;
          this.blnilterstrBank_Name=false;
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
          this.blnilterstrCountry=false;
          this.blnilterstrBank_Curr=false;
          this.blnilterstrBank_Type=false;
          this.blnilterstrBank_Account=false;
      }
      if(val.property=="strBank_Name"){
          this.clickColumn="strBank_Name";
          this.blnilterstrBank_Cod=false;
          this.blnilterstrBank_Name=true;
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
          this.blnilterstrCountry=false;
          this.blnilterstrBank_Curr=false;
          this.blnilterstrBank_Type=false;
          this.blnilterstrBank_Account=false;
      }
      if(val.property=="strCountry"){
          this.clickColumn="strCountry";
          this.blnilterstrBank_Cod=false;
          this.blnilterstrBank_Name=false;
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
          this.blnilterstrCountry=true;
          this.blnilterstrBank_Curr=false;
          this.blnilterstrBank_Type=false;
          this.blnilterstrBank_Account=false;
      }
      if(val.property=="strBank_Curr"){
          this.clickColumn="strBank_Curr";
          this.blnilterstrBank_Cod=false;
          this.blnilterstrBank_Name=false;
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
          this.blnilterstrCountry=false;
          this.blnilterstrBank_Curr=true;
          this.blnilterstrBank_Type=false;
          this.blnilterstrBank_Account=false;
      }
      if(val.property=="strBank_Type"){
          this.clickColumn="strBank_Type";
          this.blnilterstrBank_Cod=false;
          this.blnilterstrBank_Name=false;
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
          this.blnilterstrCountry=false;
          this.blnilterstrBank_Curr=false;
          this.blnilterstrBank_Type=true;
          this.blnilterstrBank_Account=false;
      }
      if(val.property=="strBank_Account"){
          this.clickColumn="strBank_Account";
          this.blnilterstrBank_Cod=false;
          this.blnilterstrBank_Name=false;
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
          this.blnilterstrCountry=false;
          this.blnilterstrBank_Curr=false;
          this.blnilterstrBank_Type=true;
          this.blnilterstrBank_Account=false;
      }
      if(val.property=="dtmModified_Date"){
          this.clickColumn="dtmModified_Date";
          this.blnilterstrBank_Cod=false;
          this.blnilterstrBank_Name=false;
          this.blnilterdtmModified_Date=true;
          this.blnilterstrModified_User=false;
          this.blnilterstrCountry=false;
          this.blnilterstrBank_Curr=false;
          this.blnilterstrBank_Type=false;
          this.blnilterstrBank_Account=false;
      }
      if(val.property=="strModified_User"){
          this.clickColumn="strModified_User";
          this.blnilterstrBank_Cod=false;
          this.blnilterstrBank_Name=false;
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=true;
          this.blnilterstrCountry=false;
          this.blnilterstrBank_Curr=false;
          this.blnilterstrBank_Type=false;
          this.blnilterstrBank_Account=false;
      }        
  }
  filterstrBank_Cod(h,{column,$index}){
      if(this.blnilterstrBank_Cod){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrBank_Name(h,{column,$index}){        
      if(this.blnilterstrBank_Name){
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
    filterstrBank_Curr(h,{column,$index}){        
      if(this.blnilterstrBank_Curr){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }    
    filterstrBank_Type(h,{column,$index}){        
      if(this.blnilterstrBank_Type){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }    
    filterstrBank_Account(h,{column,$index}){        
      if(this.blnilterstrBank_Account){
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
            gridDocumento:[],
            gridDocumento1:[],
            gridDocumento2:[],
            strBank_Cod:''
        }
    }
  
}
