import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import router from '@/router';
import {PaisModel} from '@/modelo/maestro/pais';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import paisService from '@/components/service/pais.service';
import { Loading } from 'element-ui';
@Component({
  name: 'modificar-pais',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'buttons-accions': ButtonsAccionsComponent,
  }
})
export default class ModificarPaisComponent extends Vue {
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  value3:string;
  companyName:any;
  companyCod:any;
  strCountry_Cod:string='';
  public pais:PaisModel=new PaisModel();
  gridPais:PaisModel[];
  gridPais1:PaisModel[];
  gridPais2:PaisModel[];
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
  blnilterstrCountry_Name:boolean=false;
  blnilterstrCountry_Cod:boolean=false;
  blnilterstrLanguage:boolean=false;
  blnilterstrCountry_Curr:boolean=false;
  blnilterdtmCreation_Date:boolean=false;
  blnilterstrCreation_User:boolean=false;
  paisDialog:boolean=false;
  loading1:boolean=true;
  planDialog:boolean=false;
  nameuser:any;
  planActivarDialog:boolean=false;
  constructor(){    
        super();
        Global.nameComponent='modificar-pais';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
        paisService.GetAllPais()
        .then(response=>{
          this.gridPais=[];
          this.gridPais1=[];
          this.gridPais2=[];
          this.gridPais=response;
          this.gridPais1=response;
          this.gridPais2=response;
          this.loading1=false;
        }).catch(rr=>{
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
    handleCurrentChange(val:PaisModel){
      this.pais=val;
      this.strCountry_Cod=this.pais.strCountry_Cod;
     }
    btnBuscar(){
      var data=Global.like(this.gridPais1,this.clickColumn,this.txtbuscar)
      this.gridPais=[];
      this.gridPais=data;
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
      var data=await this.sortByKeyAsc(this.gridPais1,this.clickColumn) 
      this.gridPais2=[];
      this.gridPais2=data;
      this.gridPais = await this.gridPais2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      await loading.close();
    }
    DscItem(){
      var data=this.sortByKeyDesc(this.gridPais1,this.clickColumn) 
      this.gridPais2=[];
      this.gridPais2=data;
      this.gridPais = this.gridPais2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    
    }
    Limpiar(){
      this.gridPais = this.gridPais1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));    
            this.blnilterstrCountry_Cod=false;
          this.blnilterstrCountry_Name=false; 
          this.blnilterstrLanguage=false; 
          this.blnilterstrCountry_Curr=false; 
          this.blnilterdtmCreation_Date=false;
          this.blnilterstrCreation_User=false;    
    }
    Print(){
      window.print();
    }
    async  EliminarItem(){
      if(this.pais.intIdCountry_ID!=-1&&this.pais.strCountry_Cod!=""&&this.pais.strCountry_Name!=""){
        this.planDialog=true;
      }
      else{
        this.warningMessage("Selecciona un pais")
      }    
    }
    inactivarPlan(){
      this.nameuser=localStorage.getItem('User_Usuario');
      this.pais.strModified_User=this.nameuser;
      let loadingInstance = Loading.service({
        fullscreen: true,
        text: 'Inactivando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
        ); 
      paisService.inactivarPais(this.pais)
      .then(resp=>{
        loadingInstance.close();
        this.planDialog=false;
        this.$message({
            showClose: true,
            message: 'Se Inactivo correctamente '+resp,
            type: 'success'
          });
          this.pais=new PaisModel();
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
      if(this.pais.strCountry_Cod!="" && this.pais.strCountry_Name!=""){
        this.planActivarDialog=true;
      }
      else{
        this.warningMessage('Selecciones Pais')
      }
    }
    activarPlan(){
      this.nameuser=localStorage.getItem('User_Usuario');
      this.pais.strModified_User=this.nameuser;
      let loadingInstance = Loading.service({
        fullscreen: true,
        text: 'Activando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
        ); 
      paisService.activarPais(this.pais)
      .then(resp=>{
        loadingInstance.close();
        this.planActivarDialog=false;
        this.$message({
            showClose: true,
            message: 'Se Activo correctamente '+resp,
            type: 'success'
          });
          this.pais=new PaisModel();
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
    var data=Global.like(this.gridPais1,'strCountry_Cod',this.strCountry_Cod)
    if(data.length>0){
      this.pais=data[0];
      if(this.pais.strCountry_Cod==this.strCountry_Cod){
        await setTimeout(() => {
          debugger;
          if(this.pais.strCountry_Cod!=''){
            router.push({ path: `/barmenu/XX-CONFI/entidad/XA03-Pais/viewandedit_pais`, query: { vista:'modificar' ,data:JSON.stringify(this.pais) }  })
          }
        }, 600)
      }
      else{
        if(this.strCountry_Cod==''){
          this.textosave='Inserte Pais. ';
          this.warningMessage('Inserte Pais. ');
        }
        else{
          this.textosave='No existe Pais. ';
          this.warningMessage('No existe Pais. ');
        }        
      }
    }
    else{
      this.textosave='No existe Pais. ';
      this.warningMessage('No existe Pais. ');
    }
  }
   async validarView(){
      if(this.pais.intIdCountry_ID!=-1){
          await setTimeout(() => {
            debugger;
            if(this.pais.strCountry_Cod!=''){
              router.push({ path: `/barmenu/XX-CONFI/entidad/XA03-Pais/viewandedit_pais`, query: { vista:'modificar' ,data:JSON.stringify(this.pais) }  })
            }
          }, 600)
        }
        else{
          this.textosave='Seleccione Pais. ';
          this.warningMessage('Seleccione Pais. ');
        }
      }
    siguiente(){
      if(this.pagina<(this.totalRegistros/this.RegistersForPage)){
        this.pagina++;
        this.gridPais = this.gridPais1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      }
    }
    anterior(){
      if(this.pagina>1){
      this.pagina--;
      this.gridPais = this.gridPais1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
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
      if(val.property=="strCountry_Cod"){
          this.clickColumn="strCountry_Cod";
          this.blnilterstrCountry_Cod=true;
          this.blnilterstrCountry_Name=false; 
          this.blnilterstrLanguage=false; 
          this.blnilterstrCountry_Curr=false; 
          this.blnilterdtmCreation_Date=false;
          this.blnilterstrCreation_User=false;
      }
      if(val.property=="strCountry_Name"){
          this.clickColumn="strCountry_Name";
          this.blnilterstrCountry_Cod=false;
          this.blnilterstrCountry_Name=true; 
          this.blnilterstrLanguage=false; 
          this.blnilterstrCountry_Curr=false; 
          this.blnilterdtmCreation_Date=false;
          this.blnilterstrCreation_User=false;
      }
      if(val.property=="strLanguage"){
          this.clickColumn="strLanguage";
          this.blnilterstrCountry_Cod=false;
          this.blnilterstrCountry_Name=false; 
          this.blnilterstrLanguage=true; 
          this.blnilterstrCountry_Curr=false; 
          this.blnilterdtmCreation_Date=false;
          this.blnilterstrCreation_User=false;
      }
      if(val.property=="strCountry_Curr"){
          this.clickColumn="strCountry_Curr";
          this.blnilterstrCountry_Cod=false;
          this.blnilterstrCountry_Name=false; 
          this.blnilterstrLanguage=false; 
          this.blnilterstrCountry_Curr=true; 
          this.blnilterdtmCreation_Date=false;
          this.blnilterstrCreation_User=false;
      }
      if(val.property=="dtmCreation_Date"){
          this.clickColumn="dtmCreation_Date";
          this.blnilterstrCountry_Cod=false;
          this.blnilterstrCountry_Name=false; 
          this.blnilterstrLanguage=false; 
          this.blnilterstrCountry_Curr=false; 
          this.blnilterdtmCreation_Date=true;
          this.blnilterstrCreation_User=false;
      }
      if(val.property=="strCreation_User"){
          this.clickColumn="strCreation_User";
          this.blnilterstrCountry_Cod=false;
          this.blnilterstrCountry_Name=false; 
          this.blnilterstrLanguage=false; 
          this.blnilterstrCountry_Curr=false; 
          this.blnilterdtmCreation_Date=false;
          this.blnilterstrCreation_User=true;
      }        
  }
  filterstrCountry_Cod(h,{column,$index}){
      if(this.blnilterstrCountry_Cod){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrCountry_Name(h,{column,$index}){        
      if(this.blnilterstrCountry_Name){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrLanguage(h,{column,$index}){        
      if(this.blnilterstrLanguage){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrCountry_Curr(h,{column,$index}){        
      if(this.blnilterstrCountry_Curr){
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
    data(){
        return{     
            companyName:'',
            companyCod:'',
            gridPais:[],
            gridPais1:[],
            gridPais2:[],
            strCountry_Cod:'',
            loading1:true
        }
    }
  
}
