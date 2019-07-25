import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import router from '@/router';
import {MedioPagoModel} from '@/modelo/maestro/medioPago';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import mediopagoService from '@/components/service/mediopago.service';
import { Loading } from 'element-ui';
@Component({
  name: 'modificar-mediopago',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'buttons-accions': ButtonsAccionsComponent,
  }
})
export default class ModificarMedioPagoComponent extends Vue {
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  value3:string;
  companyName:any;
  companyCod:any;
  strPayWay_Cod:string='';
  public documento:MedioPagoModel=new MedioPagoModel();
  gridDocumento:MedioPagoModel[];
  gridDocumento1:MedioPagoModel[];
  gridDocumento2:MedioPagoModel[];
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
  blnilterstrPayWay_Cod:boolean=false;
  blnilterstrPayWay_Desc:boolean=false;
  blnilterdtmModified_Date:boolean=false;
  blnilterstrModified_User:boolean=false;
  planDialog:boolean=false;
  planActivarDialog:boolean=false;
  nameuser:any;
  loading1:boolean=true;
  constructor(){    
        super();
        Global.nameComponent='modificar-mediopago';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
        mediopagoService.GetMedioPagoView()
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
    handleCurrentChange(val:MedioPagoModel){
      this.documento=val;
      this.strPayWay_Cod=this.documento.strPayWay_Cod;
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
      this.blnilterstrPayWay_Cod=false;
      this.blnilterstrPayWay_Desc=false;
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=false;
    }
    Print(){
      window.print();
    }
  async  EliminarItem(){
    if(this.documento.intIdPayWay_ID!=-1&&this.documento.strPayWay_Cod!=""&&this.documento.strPayWay_Desc!=""){
      this.planDialog=true;
    }
    else{
      this.warningMessage("Selecciona un Medio de Pago")
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
    mediopagoService.inactivarMedioPago(this.documento)
    .then(resp=>{
      loadingInstance.close();
      this.planDialog=false;
      this.$message({
          showClose: true,
          message: 'Se Inactivo correctamente '+resp,
          type: 'success'
        });
        this.documento=new MedioPagoModel();
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
    if(this.documento.strPayWay_Cod!="" && this.documento.strPayWay_Desc!=""){
      this.planActivarDialog=true;
    }
    else{
      this.warningMessage('Selecciones Medio de Pago')
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
      mediopagoService.activarMedioPago(this.documento)
    .then(resp=>{
      loadingInstance.close();
      this.planActivarDialog=false;
      this.$message({
          showClose: true,
          message: 'Se Activo correctamente '+resp,
          type: 'success'
        });
        this.documento=new MedioPagoModel();
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
    var data=Global.like(this.gridDocumento1,'strPayWay_Cod',this.strPayWay_Cod)
    if(data.length>0){
      this.documento=data[0];
      if(this.documento.strPayWay_Cod==this.strPayWay_Cod){
        await setTimeout(() => {
          if(this.documento.strPayWay_Cod!=''){
            router.push({ path: `/barmenu/XX-CONFI/maestro_datos/medio_pago/viewandedit_mediopago`, query: { vista:'modificar' ,data:JSON.stringify(this.documento) }  })
          }
        }, 600)
      }
      else{
        if(this.strPayWay_Cod==''){
          this.textosave='Inserte Medio de Pago. ';
          this.warningMessage('Inserte Medio de Pago. ');
        }
        else{
          this.textosave='No existe Medio de Pago. ';
          this.warningMessage('No existe Medio de Pago. ');
        }        
      }
    }
    else{
      this.textosave='No existe Medio de Pago. ';
      this.warningMessage('No existe Medio de Pago. ');
    }
  }
   async validarView(){
      if(this.documento.intIdPayWay_ID!=-1){
          await setTimeout(() => {
            debugger;
            if(this.documento.strPayWay_Cod!=''){
              router.push({ path: `/barmenu/XX-CONFI/maestro_datos/medio_pago/viewandedit_mediopago`, query: { vista:'modificar' ,data:JSON.stringify(this.documento) }  })
            }
          }, 600)
        }
        else{
          this.textosave='Seleccione Medio de Pago. ';
          this.warningMessage('Seleccione Medio de Pago. ');
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
      if(val.property=="strPayWay_Cod"){
          this.clickColumn="strPayWay_Cod";
          this.blnilterstrPayWay_Cod=true;
      this.blnilterstrPayWay_Desc=false;
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=false;
      }
      if(val.property=="strPayWay_Desc"){
          this.clickColumn="strPayWay_Desc";
          this.blnilterstrPayWay_Cod=false;
      this.blnilterstrPayWay_Desc=true;
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=false;
      }
      if(val.property=="dtmModified_Date"){
          this.clickColumn="dtmModified_Date";
          this.blnilterstrPayWay_Cod=false;
      this.blnilterstrPayWay_Desc=false;
      this.blnilterdtmModified_Date=true;
      this.blnilterstrModified_User=false;
      }
      if(val.property=="strModified_User"){
          this.clickColumn="strModified_User";
          this.blnilterstrPayWay_Cod=false;
      this.blnilterstrPayWay_Desc=false;
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=true;
      }        
  }
  filterstrPayWay_Cod(h,{column,$index}){
      if(this.blnilterstrPayWay_Cod){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrPayWay_Desc(h,{column,$index}){        
      if(this.blnilterstrPayWay_Desc){
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
            strPayWay_Cod:''
        }
    }
  
}
