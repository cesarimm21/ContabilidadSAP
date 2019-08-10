import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import router from '@/router';
import {CuentaContableModel} from '@/modelo/maestro/cuentacontable';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import cuentacontableontableService from '@/components/service/cuentacontable.service';
import { Loading } from 'element-ui';
@Component({
  name: 'visualizar-elemento-gasto',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'buttons-accions': ButtonsAccionsComponent,
  }
})
export default class VisualizarElementoGastoComponent extends Vue {
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  value3:string;
  companyName:any;
  companyCod:any;
  strAcc_Local_NO:string|null;
  public cuentacontable:CuentaContableModel=new CuentaContableModel();
  gridGrupoCuenta:CuentaContableModel[];
  gridGrupoCuenta1:CuentaContableModel[];
  gridGrupoCuenta2:CuentaContableModel[];
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
  blnilterstrAcc_Local_NO:boolean=false;
  blnilterstrAcc_Local_Name:boolean=false;
  blnilterstrAcc_Type:boolean=false;
  blnilterstrGrpAcctCont_Cod:boolean=false;
  blnilterstrExpGroup_Cod:boolean=false;
  blnilterdtmModified_Date:boolean=false;
  blnilterstrModified_User:boolean=false;
  loading1:boolean=true;
  nameuser:any;
  dialogCompania:boolean=false;

  constructor(){    
        super();
        Global.nameComponent='visualizar-elemento-gasto';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
        cuentacontableontableService.GetAllCuentaContableCat20(this.companyCod)
        .then(response=>{
          this.gridGrupoCuenta=[];
          this.gridGrupoCuenta1=[];
          this.gridGrupoCuenta2=[];
          this.gridGrupoCuenta=response;
          this.gridGrupoCuenta1=response;
          this.gridGrupoCuenta2=response;
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
    handleCurrentChange(val:CuentaContableModel){
      this.cuentacontable=val;
      this.strAcc_Local_NO=this.cuentacontable.strAcc_Local_NO;
     }
    btnBuscar(){
      var data=Global.like(this.gridGrupoCuenta1,this.clickColumn,this.txtbuscar)
      this.gridGrupoCuenta=[];
      this.gridGrupoCuenta=data;
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
      var data=await this.sortByKeyAsc(this.gridGrupoCuenta1,this.clickColumn) 
      this.gridGrupoCuenta2=[];
      this.gridGrupoCuenta2=data;
      this.gridGrupoCuenta = await this.gridGrupoCuenta2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      await loading.close();
    }
    DscItem(){
      var data=this.sortByKeyDesc(this.gridGrupoCuenta1,this.clickColumn) 
      this.gridGrupoCuenta2=[];
      this.gridGrupoCuenta2=data;
      this.gridGrupoCuenta = this.gridGrupoCuenta2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    
    }
    Limpiar(){
      this.gridGrupoCuenta = this.gridGrupoCuenta1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));    
      this.blnilterstrAcc_Local_NO=false;
      this.blnilterstrAcc_Local_Name=false; 
      this.blnilterstrAcc_Type=false; 
      this.blnilterstrGrpAcctCont_Cod=false; 
      this.blnilterstrExpGroup_Cod=false; 
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=false;  
    }
    Print(){
      window.print();
    }
  async EliminarItem(){
    this.warningMessage('Accion no permitida');
  }
  async ActivarDesactivar(){
    this.warningMessage('Accion no permitida');      
  }
  async validad(){      
    var data=Global.like(this.gridGrupoCuenta1,'strAcc_Local_NO',this.strAcc_Local_NO)
      if(data.length>0){
        this.cuentacontable=data[0];
        if(this.cuentacontable.strAcc_Local_NO==this.strAcc_Local_NO){
          await setTimeout(() => {
            if(this.cuentacontable.strAcc_Local_NO!=''){
              router.push({ path: `/barmenu/FI-FINANZAS/maestro-datos/contabilidad-general/elemento-gasto/modificar-elemento-gasto`, query: { vista:'visualizar' ,data:JSON.stringify(this.cuentacontable) }  })
            }
          }, 600)
        }
        else{
          if(this.strAcc_Local_NO==''){
            this.textosave='Inserte Cuenta Contable. ';
            this.warningMessage('Inserte Cuenta Contable. ');
          }
          else{
            this.textosave='No existe Cuenta Contable. ';
            this.warningMessage('No existe Cuenta Contable. ');
          }        
        }
      }
      else{
        this.textosave='No existe Cuenta Contable. ';
        this.warningMessage('No existe Cuenta Contable. ');
        // this.gridGrupoCuenta=[];
        // cuentacontableontableService.GetAllAlmacen(this.companyCod)
        // .then(resp=>{
        //   if(resp!=undefined){
        //     if(resp.length>0){
        //       this.gridGrupoCuenta=resp;
        //     }
        //   }
        // })
        // .catch(errorss=>{
        //   this.textosave='Error al buscar almacen. ';
        //   this.warningMessage('Error al buscar almacen. ');
        // })
      }
  }
   async validarView(){
      if(this.cuentacontable.intIdAcctCont_ID!=-1){
          await setTimeout(() => {
            if(this.cuentacontable.strAcc_Local_NO!=''){
              router.push({ path: `/barmenu/FI-FINANZAS/maestro-datos/contabilidad-general/elemento-gasto/modificar-elemento-gasto`, query: { vista:'visualizar' ,data:JSON.stringify(this.cuentacontable) }  })
            }
          }, 600)
        }
        else{
          this.textosave='Seleccione Cuenta Contable. ';
          this.warningMessage('Seleccione Cuenta Contable. ');
        }
      }
    siguiente(){
      if(this.pagina<(this.totalRegistros/this.RegistersForPage)){
        this.pagina++;
        this.gridGrupoCuenta = this.gridGrupoCuenta1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      }
    }
    anterior(){
      if(this.pagina>1){
      this.pagina--;
      this.gridGrupoCuenta = this.gridGrupoCuenta1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      }
    }
    warningMessage(newMsg : string) {
      this.$message({
        showClose: true,
        message: newMsg,
        type: 'warning'
      });
    }
    successMessage(newMsg : string) {
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
  //#region [CABECERA]
  headerclick(val){    
      this.Column=val.label;
      Global.setColumna(this.Column);     
      if(val.property=="strAcc_Local_NO"){
          this.clickColumn="strAcc_Local_NO";
          this.blnilterstrAcc_Local_NO=true;
          this.blnilterstrAcc_Local_Name=false; 
          this.blnilterstrAcc_Type=false; 
          this.blnilterstrGrpAcctCont_Cod=false; 
          this.blnilterstrExpGroup_Cod=false; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
      }
      if(val.property=="strAcc_Local_Name"){
          this.clickColumn="strAcc_Local_Name";
          this.blnilterstrAcc_Local_NO=false;
          this.blnilterstrAcc_Local_Name=true; 
          this.blnilterstrAcc_Type=false; 
          this.blnilterstrGrpAcctCont_Cod=false; 
          this.blnilterstrExpGroup_Cod=false; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
      }
      if(val.property=="strAcc_Type"){
          this.clickColumn="strAcc_Type";
          this.blnilterstrAcc_Local_NO=false;
          this.blnilterstrAcc_Local_Name=false; 
          this.blnilterstrAcc_Type=true; 
          this.blnilterstrGrpAcctCont_Cod=false; 
          this.blnilterstrExpGroup_Cod=false; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
      }
      
      if(val.property=="strGrpAcctCont_Cod"){
          this.clickColumn="strGrpAcctCont_Cod";
          this.blnilterstrAcc_Local_NO=false;
          this.blnilterstrAcc_Local_Name=false; 
          this.blnilterstrAcc_Type=false; 
          this.blnilterstrGrpAcctCont_Cod=true; 
          this.blnilterstrExpGroup_Cod=false; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
      }
      if(val.property=="strExpGroup_Cod"){
          this.clickColumn="strExpGroup_Cod";
          this.blnilterstrAcc_Local_NO=false;
          this.blnilterstrAcc_Local_Name=false; 
          this.blnilterstrAcc_Type=false; 
          this.blnilterstrGrpAcctCont_Cod=false; 
          this.blnilterstrExpGroup_Cod=true; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
      }
      if(val.property=="dtmModified_Date"){
          this.clickColumn="dtmModified_Date";
          this.blnilterstrAcc_Local_NO=false;
          this.blnilterstrAcc_Local_Name=false; 
          this.blnilterstrAcc_Type=false; 
          this.blnilterstrGrpAcctCont_Cod=false; 
          this.blnilterstrExpGroup_Cod=false; 
          this.blnilterdtmModified_Date=true;
          this.blnilterstrModified_User=false;
      }
      if(val.property=="strModified_User"){
          this.clickColumn="strModified_User";
          this.blnilterstrAcc_Local_NO=false;
          this.blnilterstrAcc_Local_Name=false; 
          this.blnilterstrAcc_Type=false; 
          this.blnilterstrGrpAcctCont_Cod=false; 
          this.blnilterstrExpGroup_Cod=false; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=true;
      }        
  }
  filterstrAcc_Local_NO(h,{column,$index}){
      if(this.blnilterstrAcc_Local_NO){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrAcc_Local_Name(h,{column,$index}){        
      if(this.blnilterstrAcc_Local_Name){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrAcc_Type(h,{column,$index}){        
      if(this.blnilterstrAcc_Type){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrGrpAcctCont_Cod(h,{column,$index}){        
      if(this.blnilterstrGrpAcctCont_Cod){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrExpGroup_Cod(h,{column,$index}){        
      if(this.blnilterstrExpGroup_Cod){
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
  loadCompania(){
    this.dialogCompania=true;
  }

  companiaSeleccionado(val){
    this.companyCod=val.strCompany_Cod;
    this.companyName=val.strCompany_Desc;
    this.dialogCompania=false;
  }
    data(){
        return{     
            companyName:'',
            companyCod:'',
            gridGrupoCuenta:[],
            gridGrupoCuenta1:[],
            gridGrupoCuenta2:[],
            loading1:true,
            strAcc_Local_NO:''
        }
    }
  
}
