import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import router from '@/router';
import {PlanCuentaCorporativoModel} from '@/modelo/maestro/plancuentacorporativo';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import planService from '@/components/service/planCuentaCoorporativo.service';
import { Loading } from 'element-ui';
@Component({
  name: 'visualizar-planconcoorporativo',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'buttons-accions': ButtonsAccionsComponent,
  }
})
export default class VisualizarPlanCoorporativoComponent extends Vue {
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  value3:string;
  companyName:any;
  companyCod:any;
  strChartAcct_C_Cod:string='';
  public documento:PlanCuentaCorporativoModel=new PlanCuentaCorporativoModel();
  gridDocumento:PlanCuentaCorporativoModel[];
  gridDocumento1:PlanCuentaCorporativoModel[];
  gridDocumento2:PlanCuentaCorporativoModel[];
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
  blnilterstrChartAcct_C_Cod:boolean=false;
  blnilterstrChartAcct_C_Desc:boolean=false;
  blnilterdtmModified_Date:boolean=false;
  blnilterstrModified_User:boolean=false;
  loading1:boolean=true;
  constructor(){    
        super();
        Global.nameComponent='visualizar-planconcoorporativo';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
        planService.GetAllPlanConCoorporativoView(this.companyCod)
        .then(response=>{
          this.gridDocumento=[];
          this.gridDocumento1=[];
          this.gridDocumento2=[];
          this.gridDocumento=response;
          this.gridDocumento1=response;
          this.gridDocumento2=response;
          this.loading1=false;
        }).catch(res=>{
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
    handleCurrentChange(val:PlanCuentaCorporativoModel){
      this.documento=val;
      this.strChartAcct_C_Cod=this.documento.strChartAcct_C_Cod;
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
      this.blnilterstrChartAcct_C_Cod=false;
      this.blnilterstrChartAcct_C_Desc=false;
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=false;
    }
    Print(){
      window.print();
    }
  async  EliminarItem(){
      this.warningMessage('Accion No permitida');
  }
  async validad(){      
    var data=Global.like(this.gridDocumento1,'strChartAcct_C_Cod',this.strChartAcct_C_Cod)
    if(data.length>0){
      this.documento=data[0];
      if(this.documento.strChartAcct_C_Cod==this.strChartAcct_C_Cod){
        await setTimeout(() => {
          if(this.documento.strChartAcct_C_Cod!=""){
            router.push({ path: `/barmenu/XX-CONFI/maestro_datos/plan_con_coorp/viewandedit_plancoorp`, query: { vista:'visualizar' ,data:JSON.stringify(this.documento) }  })
          }
        }, 600)
      }
      else{
        if(this.strChartAcct_C_Cod==''){
          this.textosave='Inserte Plan Contable Coorporativo. ';
          this.warningMessage('Inserte Plan Contable Coorporativo. ');
        }
        else{
          this.textosave='No existe Plan Contable Coorporativo. ';
          this.warningMessage('No existe Plan Contable Coorporativo. ');
        }        
      }
    }
    else{
      this.textosave='No existe Plan Contable Coorporativo. ';
      this.warningMessage('No existe Plan Contable Coorporativo. ');
    }
  }
   async validarView(){
      if(this.documento.intIdChartAcct_C_ID!=-1){
          await setTimeout(() => {
            debugger;
            if(this.documento.strChartAcct_C_Cod!=""){
              router.push({ path: `/barmenu/XX-CONFI/maestro_datos/plan_con_coorp/viewandedit_plancoorp`, query: { vista:'visualizar' ,data:JSON.stringify(this.documento) }  })
            }
          }, 600)
        }
        else{
          this.textosave='Seleccione Plan Contable Coorporativo. ';
          this.warningMessage('Seleccione Plan Contable Coorporativo. ');
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
      if(val.property=="strChartAcct_C_Cod"){
          this.clickColumn="strChartAcct_C_Cod";
          this.blnilterstrChartAcct_C_Cod=true;
      this.blnilterstrChartAcct_C_Desc=false;
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=false;
      }
      if(val.property=="strChartAcct_C_Desc"){
          this.clickColumn="strChartAcct_C_Desc";
          this.blnilterstrChartAcct_C_Cod=false;
      this.blnilterstrChartAcct_C_Desc=true;
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=false;
      }
      if(val.property=="dtmModified_Date"){
          this.clickColumn="dtmModified_Date";
          this.blnilterstrChartAcct_C_Cod=false;
      this.blnilterstrChartAcct_C_Desc=false;
      this.blnilterdtmModified_Date=true;
      this.blnilterstrModified_User=false;
      }
      if(val.property=="strModified_User"){
          this.clickColumn="strModified_User";
          this.blnilterstrChartAcct_C_Cod=false;
      this.blnilterstrChartAcct_C_Desc=false;
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=true;
      }        
  }
  filterstrChartAcct_C_Cod(h,{column,$index}){
      if(this.blnilterstrChartAcct_C_Cod){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrChartAcct_C_Desc(h,{column,$index}){        
      if(this.blnilterstrChartAcct_C_Desc){
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
            strChartAcct_C_Cod:''
        }
    }
  
}
