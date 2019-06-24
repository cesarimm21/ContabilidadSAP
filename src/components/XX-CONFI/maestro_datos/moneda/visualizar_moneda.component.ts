import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import router from '@/router';
import {MonedaModel} from '@/modelo/maestro/moneda';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import monedaService from '@/components/service/moneda.service';
import { Loading } from 'element-ui';
@Component({
  name: 'visualizar-moneda',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'buttons-accions': ButtonsAccionsComponent,
  }
})
export default class VisualizarMonedaComponent extends Vue {
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  value3:string;
  companyName:any;
  companyCod:any;
  public moneda:MonedaModel=new MonedaModel();
  gridMoneda:MonedaModel[];
  gridMoneda1:MonedaModel[];
  gridMoneda2:MonedaModel[];
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
  blnilterstrCurrency_Cod:boolean=false;
  blnilterstrCurrency_Desc:boolean=false;
  blnilterstrReference:boolean=false;
  blnilterstrCountry:boolean=false;
  blnilterdtmCreation_Date:boolean=false;
  blnilterstrCreation_User:boolean=false;
  constructor(){    
        super();
        Global.nameComponent='visualizar-almacen';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
        monedaService.GetAllMoneda()
        .then(response=>{
          this.gridMoneda=[];
          this.gridMoneda1=[];
          this.gridMoneda2=[];
          this.gridMoneda=response;
          this.gridMoneda1=response;
          this.gridMoneda2=response;
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
    handleCurrentChange(val:MonedaModel){
      this.moneda=val;
     }
    btnBuscar(){
      var data=this.like(this.gridMoneda1,this.clickColumn,this.txtbuscar)
      this.gridMoneda=[];
      this.gridMoneda=data;
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
      var data=await this.sortByKeyAsc(this.gridMoneda1,this.clickColumn) 
      this.gridMoneda2=[];
      this.gridMoneda2=data;
      this.gridMoneda = await this.gridMoneda2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      await loading.close();
    }
    DscItem(){
      var data=this.sortByKeyDesc(this.gridMoneda1,this.clickColumn) 
      this.gridMoneda2=[];
      this.gridMoneda2=data;
      this.gridMoneda = this.gridMoneda2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    
    }
    Limpiar(){
      this.gridMoneda = this.gridMoneda1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));    
      this.blnilterstrCurrency_Cod=false;
      this.blnilterstrCurrency_Desc=false; 
      this.blnilterstrReference=false; 
      this.blnilterstrCountry=false; 
      this.blnilterdtmCreation_Date=false;
      this.blnilterstrCreation_User=false; 
    }
    Print(){
      window.print();
    }
  async  EliminarItem(){
      // if(this.Impuesto.strWH_Cod!=''){
      //     this.vifprogress=true;
      //     this.valuem=0;
      //     await setTimeout(() => {
      //       for(var i=0;i<100;i++){
      //         this.valuem++; 
      //       }
      //     }, 200)
      //     await setTimeout(() => {
      //         debugger;
      //         if(this.Impuesto.strWH_Cod!=''&& this.Impuesto.intIdWH_ID!=-1){
      //           impuestoService.DeleteImpuesto(this.Impuesto.intIdWH_ID,'egaona')
      //           .then(resp=>{
      //             this.$message({
      //                 showClose: true,
      //                 message: 'Se elimino correctamente',
      //                 type: 'success'
      //               });
      //               this.Impuesto=new ImpuestoModel();
      //               this.loadImpuesto();
      //           })
      //           .catch(error=>{
      //             this.$message({
      //                 showClose: true,
      //                 message: 'No se eliminó',
      //                 type: 'error'
      //               });
      //           })
      //         }
      //       }, 600)
      // }
      // else{
      //     this.vifprogress=false;
      //     this.textosave='Error eliminar impuesto. ';
      //     this.warningMessage('Error eliminar impuesto. ');
      // }
  }
  async validad(){      
    var data=this.like(this.gridMoneda1,'strCurrency_Cod',this.moneda.strCurrency_Cod)
    this.moneda=data[0];
    if(this.moneda.intIdCurrency_ID!=undefined){
      await setTimeout(() => {
        debugger;
        if(this.moneda.strCurrency_Cod!=undefined){
          router.push({ path: `/barmenu/XX-CONFI/maestro_datos/moneda/viewandedit_moneda`, query: { vista:'visualizar' ,data:JSON.stringify(this.moneda) }  })
        }
      }, 600)
    }
    else{
      this.textosave='No existe Moneda. ';
      this.warningMessage('No existe Moneda. ');
    }
  }
   async validarView(){
      if(this.moneda.intIdCurrency_ID!=undefined){
          await setTimeout(() => {
            debugger;
            if(this.moneda.strCurrency_Cod!=undefined){
              router.push({ path: `/barmenu/XX-CONFI/maestro_datos/moneda/viewandedit_moneda`, query: { vista:'visualizar' ,data:JSON.stringify(this.moneda) }  })
            }
          }, 600)
        }
        else{
          this.textosave='Seleccione Moneda. ';
          this.warningMessage('Seleccione Moneda. ');
        }
      }
    siguiente(){
      if(this.pagina<(this.totalRegistros/this.RegistersForPage)){
        this.pagina++;
        this.gridMoneda = this.gridMoneda1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      }
    }
    anterior(){
      if(this.pagina>1){
      this.pagina--;
      this.gridMoneda = this.gridMoneda1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
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
      if(val.property=="strCurrency_Cod"){
          this.clickColumn="strCurrency_Cod";
          this.blnilterstrCurrency_Cod=true;
          this.blnilterstrCurrency_Desc=false; 
          this.blnilterstrReference=false; 
          this.blnilterstrCountry=false; 
          this.blnilterdtmCreation_Date=false;
          this.blnilterstrCreation_User=false;
      }
      if(val.property=="strCurrency_Desc"){
          this.clickColumn="strCurrency_Desc";
          this.blnilterstrCurrency_Cod=false;
          this.blnilterstrCurrency_Desc=true; 
          this.blnilterstrReference=false; 
          this.blnilterstrCountry=false; 
          this.blnilterdtmCreation_Date=false;
          this.blnilterstrCreation_User=false;
      }
      if(val.property=="strReference"){
          this.clickColumn="strReference";
          this.blnilterstrCurrency_Cod=false;
          this.blnilterstrCurrency_Desc=false; 
          this.blnilterstrReference=true; 
          this.blnilterstrCountry=false; 
          this.blnilterdtmCreation_Date=false;
          this.blnilterstrCreation_User=false;
      }
      if(val.property=="strCountry"){
          this.clickColumn="strCountry";
          this.blnilterstrCurrency_Cod=false;
          this.blnilterstrCurrency_Desc=false; 
          this.blnilterstrReference=false; 
          this.blnilterstrCountry=true; 
          this.blnilterdtmCreation_Date=false;
          this.blnilterstrCreation_User=false;
      }
      
      if(val.property=="dtmCreation_Date"){
          this.clickColumn="dtmCreation_Date";
          this.blnilterstrCurrency_Cod=false;
          this.blnilterstrCurrency_Desc=false; 
          this.blnilterstrReference=false; 
          this.blnilterstrCountry=false; 
          this.blnilterdtmCreation_Date=true;
          this.blnilterstrCreation_User=false;
      }
      if(val.property=="strCreation_User"){
          this.clickColumn="strCreation_User";
          this.blnilterstrCurrency_Cod=false;
          this.blnilterstrCurrency_Desc=false; 
          this.blnilterstrReference=false; 
          this.blnilterstrCountry=false; 
          this.blnilterdtmCreation_Date=false;
          this.blnilterstrCreation_User=true;
      }        
  }
  filterstrCurrency_Cod(h,{column,$index}){
      if(this.blnilterstrCurrency_Cod){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrCurrency_Desc(h,{column,$index}){        
      if(this.blnilterstrCurrency_Desc){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrReference(h,{column,$index}){        
      if(this.blnilterstrReference){
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
            gridMoneda:[],
            gridMoneda1:[],
            gridMoneda2:[],
        }
    }
  
}
