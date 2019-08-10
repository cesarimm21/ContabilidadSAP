import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import router from '@/router';
import {CentroCostosModel} from '@/modelo/maestro/centrocostos';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import centrocostosService from '@/components/service/centrocostos.service';
import { Loading } from 'element-ui';
@Component({
  name: 'visualizar-centrocostos',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'buttons-accions': ButtonsAccionsComponent,
  }
})
export default class VisualizarCentroCostosComponent extends Vue {
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  value3:string;
  companyName:any;
  companyCod:any;
  strCostCenter_NO:string='';
  public documento:CentroCostosModel=new CentroCostosModel();
  gridDocumento:CentroCostosModel[];
  gridDocumento1:CentroCostosModel[];
  gridDocumento2:CentroCostosModel[];
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  pagina: number =1;
  RegistersForPage: number = 100;
  totalRegistros: number = 100;
  clickColumn:string='';
  txtbuscar:string='';
  Column:string='';
  fechaHasta:any=new Date();
  fechaDesde:any=new Date();
  dialogBusquedaFilter:boolean=false;
  blnilterstrCostCenter_NO:boolean=false;
  blnilterstrCostCenter_Desc:boolean=false;
  blnilterstrlevel:boolean=false;
  blnilterstrCostCen_Father_NO:boolean=false;
  blnilterstrCostCen_Father_Desc:boolean=false;
  blnilterstrCCCategory_Desc:boolean=false;
  blnilterstrCCGrpArea_Desc:boolean=false;
  blnilterstrCCGrpProc_Desc:boolean=false;
  blnilterdtmModified_Date:boolean=false;
  blnilterstrModified_User:boolean=false;
  nameuser:any;
  loading1:boolean=true;
  constructor(){    
        super();
        Global.nameComponent='visualizar-centrocostos';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
        centrocostosService.GetAllCentroCostos(this.companyCod)
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
    handleCurrentChange(val:CentroCostosModel){
      this.documento=val;
      this.strCostCenter_NO=this.documento.strCostCenter_NO;
     }
    btnBuscar(){
      if(this.txtbuscar!=''){
        var data=Global.like(this.gridDocumento1,this.clickColumn,this.txtbuscar)
        this.gridDocumento=[];
        this.gridDocumento=data;
        this.dialogBusquedaFilter=false;
      }
      else{
        this.gridDocumento=[];
        this.gridDocumento=this.gridDocumento1;
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
      this.blnilterstrCostCenter_NO=false;
      this.blnilterstrCostCenter_Desc=false;
      this.blnilterstrlevel=false;
      this.blnilterstrCostCen_Father_NO=false;
      this.blnilterstrCostCen_Father_Desc=false;
      this.blnilterstrCCCategory_Desc=false;
      this.blnilterstrCCGrpArea_Desc=false;
      this.blnilterstrCCGrpProc_Desc=false;
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=false;
    }
    Print(){
      window.print();
    }
  async  EliminarItem(){
    this.warningMessage("Accion no permitida")   
  }
  async Activar(){
    this.warningMessage("Accion no permitida")  
  }
  async validad(){      
    var data=Global.like(this.gridDocumento1,'strCostCenter_NO',this.strCostCenter_NO)
    if(data.length>0){
      this.documento=data[0];
      if(this.documento.strCostCenter_NO==this.strCostCenter_NO){
        await setTimeout(() => {
          if(this.documento.strCostCenter_NO!=''){
            router.push({ path: `/barmenu/FI-FINANZAS/maestro-datos/centro-costos/modificar_centro_costos`, query: { vista:'visualizar' ,data:JSON.stringify(this.documento) }  })
          }
        }, 600)
      }
      else{
        if(this.strCostCenter_NO==''){
          this.textosave='Inserte Centro Costos. ';
          this.warningMessage('Inserte Centro Costos. ');
        }
        else{
          this.textosave='No existe Centro Costos. ';
          this.warningMessage('No existe Centro Costos. ');
        }        
      }
    }
    else{
      this.textosave='No existe Centro Costos. ';
      this.warningMessage('No existe Centro Costos. ');
    }
  }
   async validarView(){
      if(this.documento.intIdCostCenter_ID!=-1){
          await setTimeout(() => {
            debugger;
            if(this.documento.strCostCenter_NO!=''){
              router.push({ path: `/barmenu/FI-FINANZAS/maestro-datos/centro-costos/modificar_centro_costos`, query: { vista:'visualizar' ,data:JSON.stringify(this.documento) }  })
            }
          }, 600)
        }
        else{
          this.textosave='Seleccione Centro Costos. ';
          this.warningMessage('Seleccione Centro Costos. ');
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
      if(val.property=="strCostCenter_NO"){
          this.clickColumn="strCostCenter_NO";
          this.blnilterstrCostCenter_NO=true;
      this.blnilterstrCostCenter_Desc=false;
      this.blnilterstrlevel=false;
      this.blnilterstrCostCen_Father_NO=false;
      this.blnilterstrCostCen_Father_Desc=false;
      this.blnilterstrCCCategory_Desc=false;
      this.blnilterstrCCGrpArea_Desc=false;
      this.blnilterstrCCGrpProc_Desc=false;
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=false;
      }
      if(val.property=="strCostCenter_Desc"){
          this.clickColumn="strCostCenter_Desc";
          this.blnilterstrCostCenter_NO=false;
      this.blnilterstrCostCenter_Desc=true;
      this.blnilterstrlevel=false;
      this.blnilterstrCostCen_Father_NO=false;
      this.blnilterstrCostCen_Father_Desc=false;
      this.blnilterstrCCCategory_Desc=false;
      this.blnilterstrCCGrpArea_Desc=false;
      this.blnilterstrCCGrpProc_Desc=false;
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=false;
      }
      if(val.property=="strlevel"){
          this.clickColumn="strlevel";
          this.blnilterstrCostCenter_NO=false;
      this.blnilterstrCostCenter_Desc=false;
      this.blnilterstrlevel=true;
      this.blnilterstrCostCen_Father_NO=false;
      this.blnilterstrCostCen_Father_Desc=false;
      this.blnilterstrCCCategory_Desc=false;
      this.blnilterstrCCGrpArea_Desc=false;
      this.blnilterstrCCGrpProc_Desc=false;
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=false;
      }
      if(val.property=="strCostCen_Father_NO"){
          this.clickColumn="strCostCen_Father_NO";
          this.blnilterstrCostCenter_NO=false;
      this.blnilterstrCostCenter_Desc=false;
      this.blnilterstrlevel=false;
      this.blnilterstrCostCen_Father_NO=true;
      this.blnilterstrCostCen_Father_Desc=false;
      this.blnilterstrCCCategory_Desc=false;
      this.blnilterstrCCGrpArea_Desc=false;
      this.blnilterstrCCGrpProc_Desc=false;
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=false;
      }
      if(val.property=="strCostCen_Father_Desc"){
          this.clickColumn="strCostCen_Father_Desc";
          this.blnilterstrCostCenter_NO=false;
      this.blnilterstrCostCenter_Desc=false;
      this.blnilterstrlevel=false;
      this.blnilterstrCostCen_Father_NO=false;
      this.blnilterstrCostCen_Father_Desc=true;
      this.blnilterstrCCCategory_Desc=false;
      this.blnilterstrCCGrpArea_Desc=false;
      this.blnilterstrCCGrpProc_Desc=false;
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=false;
      }
      if(val.property=="strCCCategory_Desc"){
          this.clickColumn="strCCCategory_Desc";
          this.blnilterstrCostCenter_NO=false;
      this.blnilterstrCostCenter_Desc=false;
      this.blnilterstrlevel=false;
      this.blnilterstrCostCen_Father_NO=false;
      this.blnilterstrCostCen_Father_Desc=false;
      this.blnilterstrCCCategory_Desc=true;
      this.blnilterstrCCGrpArea_Desc=false;
      this.blnilterstrCCGrpProc_Desc=false;
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=false;
      }
      if(val.property=="strCCGrpArea_Desc"){
          this.clickColumn="strCCGrpArea_Desc";
          this.blnilterstrCostCenter_NO=false;
      this.blnilterstrCostCenter_Desc=false;
      this.blnilterstrlevel=false;
      this.blnilterstrCostCen_Father_NO=false;
      this.blnilterstrCostCen_Father_Desc=false;
      this.blnilterstrCCCategory_Desc=false;
      this.blnilterstrCCGrpArea_Desc=true;
      this.blnilterstrCCGrpProc_Desc=false;
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=false;
      }
      if(val.property=="trCCGrpProc_Desc"){
          this.clickColumn="trCCGrpProc_Desc";
          this.blnilterstrCostCenter_NO=false;
      this.blnilterstrCostCenter_Desc=false;
      this.blnilterstrlevel=false;
      this.blnilterstrCostCen_Father_NO=false;
      this.blnilterstrCostCen_Father_Desc=false;
      this.blnilterstrCCCategory_Desc=false;
      this.blnilterstrCCGrpArea_Desc=false;
      this.blnilterstrCCGrpProc_Desc=true;
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=false;
      }
      if(val.property=="dtmModified_Date"){
          this.clickColumn="dtmModified_Date";
          this.blnilterstrCostCenter_NO=false;
      this.blnilterstrCostCenter_Desc=false;
      this.blnilterstrlevel=false;
      this.blnilterstrCostCen_Father_NO=false;
      this.blnilterstrCostCen_Father_Desc=false;
      this.blnilterstrCCCategory_Desc=false;
      this.blnilterstrCCGrpArea_Desc=false;
      this.blnilterstrCCGrpProc_Desc=false;
      this.blnilterdtmModified_Date=true;
      this.blnilterstrModified_User=false;
      }
      if(val.property=="strModified_User"){
          this.clickColumn="strModified_User";
          this.blnilterstrCostCenter_NO=false;
      this.blnilterstrCostCenter_Desc=false;
      this.blnilterstrlevel=false;
      this.blnilterstrCostCen_Father_NO=false;
      this.blnilterstrCostCen_Father_Desc=false;
      this.blnilterstrCCCategory_Desc=false;
      this.blnilterstrCCGrpArea_Desc=false;
      this.blnilterstrCCGrpProc_Desc=false;
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=true;
      }        
  }
  filterstrCostCenter_NO(h,{column,$index}){
      if(this.blnilterstrCostCenter_NO){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrCostCenter_Desc(h,{column,$index}){        
      if(this.blnilterstrCostCenter_Desc){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }    
    filterstrlevel(h,{column,$index}){        
      if(this.blnilterstrlevel){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }    
    filterstrCostCen_Father_NO(h,{column,$index}){        
      if(this.blnilterstrCostCen_Father_NO){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }    
    filterstrCostCen_Father_Desc(h,{column,$index}){        
      if(this.blnilterstrCostCen_Father_Desc){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }    
    filterstrCCCategory_Desc(h,{column,$index}){        
      if(this.blnilterstrCCCategory_Desc){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }    
    filterstrCCGrpArea_Desc(h,{column,$index}){        
      if(this.blnilterstrCCGrpArea_Desc){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }    
    filterstrCCGrpProc_Desc(h,{column,$index}){        
      if(this.blnilterstrCCGrpProc_Desc){
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
            strCostCenter_NO:''
        }
    }
  
}
