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
import { Loading } from 'element-ui';
@Component({
  name: 'modificar-almacen',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'buttons-accions': ButtonsAccionsComponent,
  }
})
export default class VisualizarAlmacenComponent extends Vue {
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  value3:string;
  companyName:any;
  companyCod:any;
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
  blnilterstrCompany_Cod:boolean=false;
  blnilterstrPlant_Cod:boolean=false;
  blnilterstrSubsidiary_Cod:boolean=false;
  blnilterdtmCreation_Date:boolean=false;
  blnilterstrCreation_User:boolean=false;
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
        almacenService.GetAllAlmacen()
        .then(response=>{
          this.gridAlmacen=[];
          this.gridAlmacen1=[];
          this.gridAlmacen2=[];
          this.gridAlmacen=response;
          this.gridAlmacen1=response;
          this.gridAlmacen2=response;
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
     }
    btnBuscar(){
      var data=this.like(this.gridAlmacen1,this.clickColumn,this.txtbuscar)
      this.gridAlmacen=[];
      this.gridAlmacen=data;
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
      this.blnilterstrCompany_Cod=false; 
      this.blnilterstrPlant_Cod=false; 
      this.blnilterstrSubsidiary_Cod=false; 
      this.blnilterdtmCreation_Date=false;
      this.blnilterstrCreation_User=false;  
    }
    Print(){
      window.print();
    }
  async  EliminarItem(){
  }
  async validad(){      
    var data=this.like(this.gridAlmacen1,'strWHS_Cod',this.almacen.strWHS_Cod)
    this.almacen=data[0];
    if(this.almacen.intIdWHS_ID!=undefined){
      await setTimeout(() => {
        debugger;
        if(this.almacen.strWHS_Cod!=undefined){
          router.push({ path: `/barmenu/XX-CONFI/entidad/almacen/viewandedit_al`, query: { vista:'visualizar' ,data:JSON.stringify(this.almacen) }  })
        }
      }, 600)
    }
    else{
      this.textosave='No existe Almacen. ';
      this.warningMessage('No existe Almacen. ');
    }
  }
   async validarView(){
      if(this.almacen.intIdWHS_ID!=undefined){
          await setTimeout(() => {
            debugger;
            if(this.almacen.strWHS_Cod!=undefined){
              router.push({ path: `/barmenu/XX-CONFI/entidad/almacen/viewandedit_al`, query: { vista:'visualizar' ,data:JSON.stringify(this.almacen) }  })
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
  //#region [CABECERA]
  headerclick(val){    
      this.Column=val.label;
      Global.setColumna(this.Column);     
      if(val.property=="strWHS_Cod"){
          this.clickColumn="strWHS_Cod";
          this.blnilterstrWHS_Cod=true;
          this.blnilterstrWHS_Desc=false; 
          this.blnilterstrLocation=false; 
          this.blnilterstrCompany_Cod=false; 
          this.blnilterstrPlant_Cod=false; 
          this.blnilterstrSubsidiary_Cod=false; 
          this.blnilterdtmCreation_Date=false;
          this.blnilterstrCreation_User=false;
      }
      if(val.property=="strWHS_Desc"){
          this.clickColumn="strWHS_Desc";
          this.blnilterstrWHS_Cod=false;
          this.blnilterstrWHS_Desc=true; 
          this.blnilterstrLocation=false; 
          this.blnilterstrCompany_Cod=false; 
          this.blnilterstrPlant_Cod=false; 
          this.blnilterstrSubsidiary_Cod=false; 
          this.blnilterdtmCreation_Date=false;
          this.blnilterstrCreation_User=false;
      }
      if(val.property=="strLocation"){
          this.clickColumn="strLocation";
          this.blnilterstrWHS_Cod=false;
          this.blnilterstrWHS_Desc=false; 
          this.blnilterstrLocation=true; 
          this.blnilterstrCompany_Cod=false; 
          this.blnilterstrPlant_Cod=false; 
          this.blnilterstrSubsidiary_Cod=false; 
          this.blnilterdtmCreation_Date=false;
          this.blnilterstrCreation_User=false;
      }
      if(val.property=="strCompany_Cod"){
          this.clickColumn="strCompany_Cod";
          this.blnilterstrWHS_Cod=false;
          this.blnilterstrWHS_Desc=false; 
          this.blnilterstrLocation=false; 
          this.blnilterstrCompany_Cod=true; 
          this.blnilterstrPlant_Cod=false; 
          this.blnilterstrSubsidiary_Cod=false; 
          this.blnilterdtmCreation_Date=false;
          this.blnilterstrCreation_User=false;
      }
      if(val.property=="strPlant_Cod"){
          this.clickColumn="strPlant_Cod";
          this.blnilterstrWHS_Cod=false;
          this.blnilterstrWHS_Desc=false; 
          this.blnilterstrLocation=false; 
          this.blnilterstrCompany_Cod=false; 
          this.blnilterstrPlant_Cod=true; 
          this.blnilterstrSubsidiary_Cod=false; 
          this.blnilterdtmCreation_Date=false;
          this.blnilterstrCreation_User=false;
      }
      if(val.property=="strSubsidiary_Cod"){
          this.clickColumn="strSubsidiary_Cod";
          this.blnilterstrWHS_Cod=false;
          this.blnilterstrWHS_Desc=false; 
          this.blnilterstrLocation=false; 
          this.blnilterstrCompany_Cod=false; 
          this.blnilterstrPlant_Cod=false; 
          this.blnilterstrSubsidiary_Cod=true; 
          this.blnilterdtmCreation_Date=false;
          this.blnilterstrCreation_User=false;
      }
      if(val.property=="dtmCreation_Date"){
          this.clickColumn="dtmCreation_Date";
          this.blnilterstrWHS_Cod=false;
          this.blnilterstrWHS_Desc=false; 
          this.blnilterstrLocation=false; 
          this.blnilterstrCompany_Cod=false; 
          this.blnilterstrPlant_Cod=false; 
          this.blnilterstrSubsidiary_Cod=false; 
          this.blnilterdtmCreation_Date=true;
          this.blnilterstrCreation_User=false;
      }
      if(val.property=="strCreation_User"){
          this.clickColumn="strCreation_User";
          this.blnilterstrWHS_Cod=false;
          this.blnilterstrWHS_Desc=false; 
          this.blnilterstrLocation=false; 
          this.blnilterstrCompany_Cod=false; 
          this.blnilterstrPlant_Cod=false; 
          this.blnilterstrSubsidiary_Cod=false; 
          this.blnilterdtmCreation_Date=false;
          this.blnilterstrCreation_User=true;
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
    filterstrPlant_Cod(h,{column,$index}){        
      if(this.blnilterstrPlant_Cod){
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
            gridAlmacen:[],
            gridAlmacen1:[],
            gridAlmacen2:[],
        }
    }
  
}