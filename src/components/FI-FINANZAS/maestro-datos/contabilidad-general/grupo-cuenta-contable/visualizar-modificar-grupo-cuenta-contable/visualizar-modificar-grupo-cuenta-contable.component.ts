import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import router from '@/router';
import {GrupoCuentaContableModel} from '@/modelo/maestro/grupocuentacontable';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import grupocuentacontableService from '@/components/service/grupocuentacontable.service';
import { Loading } from 'element-ui';
@Component({
  name: 'modificar-grupo-cuenta-contable',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'buttons-accions': ButtonsAccionsComponent,
  }
})
export default class VisualizarModificarGrupoCuentaContableComponent extends Vue {
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  value3:string;
  companyName:any;
  companyCod:any;
  strGrpAcctCont_Cod:string;
  public grupocuentac:GrupoCuentaContableModel=new GrupoCuentaContableModel();
  gridGrupoCuenta:GrupoCuentaContableModel[];
  gridGrupoCuenta1:GrupoCuentaContableModel[];
  gridGrupoCuenta2:GrupoCuentaContableModel[];
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
  blnilterstrGrpAcctCont_Cod:boolean=false;
  blnilterstrGrpAcctCont_Desc:boolean=false;
  blnilterstrComp_Cod:boolean=false;
  blnilterstrComp_Desc:boolean=false;
  blnilterstrGrpAcct_Pos:boolean=false;
  blnilterdtmModified_Date:boolean=false;
  blnilterstrModified_User:boolean=false;
  loading1:boolean=true;
  dialogEliminar:boolean=false;
  dialogInactivar:boolean=false;
  nameuser:any;
  dialogCompania:boolean=false;

  constructor(){    
        super();
        Global.nameComponent='modificar-grupo-cuenta-contable';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
        grupocuentacontableService.GetAllGrupoCuentaContable(this.companyCod)
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
    handleCurrentChange(val:GrupoCuentaContableModel){
      this.grupocuentac=val;
      this.strGrpAcctCont_Cod=this.grupocuentac.strGrpAcctCont_Cod;
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
      this.blnilterstrGrpAcctCont_Cod=false;
      this.blnilterstrGrpAcctCont_Desc=false; 
      this.blnilterstrComp_Cod=false; 
      this.blnilterstrComp_Desc=false; 
      this.blnilterstrGrpAcct_Pos=false; 
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=false;  
    }
    Print(){
      window.print();
    }
  async EliminarItem(){
    if(this.grupocuentac.intIdGrpCta_ID!=-1 &&this.grupocuentac.strGrpAcctCont_Cod!=""){
      this.dialogEliminar=true;
    }
    else{
      this.warningMessage('Debe de seleccionar una fila!!!');
    }
  }
  async btnEliminar(){
    let loadingInstance = Loading.service({
      fullscreen: true,
      text: 'Inactivando...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
    );   
    await grupocuentacontableService.inactivarGrupoCuentaContable(this.grupocuentac)
    .then(response=>{
      loadingInstance.close();
      if(response!=undefined){
         this.textosave='Se Inactivo correctamento.'+this.grupocuentac.strGrpAcctCont_Cod;
         this.issave=true;
         this.iserror=false;
         this.$message({
          showClose: true,
          type: 'success',
          message: 'Se Inactivo correctamento '+this.grupocuentac.strGrpAcctCont_Cod
        });
      }
      else{
        this.issave=false;
        this.iserror=true;
        this.textosave='Ocurrio un error al Inactivar.';
      }
      this.load();
      this.dialogEliminar=false;
    }).catch(error=>{
      loadingInstance.close();
      this.dialogEliminar=false;
      this.issave=false;
      this.iserror=true;
      this.textosave='Ocurrio un error al Inactivar.';
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo Inactivar'
      });
    })
    
  }
  async ActivarDesactivar(){
    if(this.grupocuentac.intIdGrpCta_ID!=-1 &&this.grupocuentac.strGrpAcctCont_Cod!=""){
      this.dialogInactivar=true;  
    }
    else{
      this.warningMessage('Debe de seleccionar una fila!!!');
    }        
  }
  async btnActivar(){
    this.nameuser=localStorage.getItem('User_Usuario');
    this.grupocuentac.strModified_User=this.nameuser;
    if(this.grupocuentac.intIdGrpCta_ID!=-1&&this.grupocuentac.strGrpAcctCont_Cod!=""){
      let loadingInstance = Loading.service({
        fullscreen: true,
        text: 'Activando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
      );   
      await grupocuentacontableService.activarGrupoCuentaContable(this.grupocuentac)
      .then(respo=>{
        loadingInstance.close();
        this.successMessage('Se activo el Grupo Cuenta Contable '+this.grupocuentac.strGrpAcctCont_Cod)
        this.load();
        this.issave=true;
        this.iserror=false;
        this.textosave='Se Inactivo el Grupo Cuenta Contable '+this.grupocuentac.strGrpAcctCont_Cod;
        this.dialogInactivar=false;
      }).catch(ee=>{
        loadingInstance.close();
        this.issave=false;
        this.iserror=true;
        this.textosave='Error en Activar '+this.grupocuentac.strGrpAcctCont_Cod;
        this.errorMessage('Error en Activar '+this.grupocuentac.strGrpAcctCont_Cod)})
        this.dialogInactivar=false;
    }
    else{
      this.warningMessage('Debe de seleccionar una fila!!!');
    }
  }
  async validad(){      
    var data=Global.like(this.gridGrupoCuenta1,'strGrpAcctCont_Cod',this.strGrpAcctCont_Cod)
      if(data.length>0){
        this.grupocuentac=data[0];
        if(this.grupocuentac.strGrpAcctCont_Cod==this.strGrpAcctCont_Cod){
          await setTimeout(() => {
            if(this.grupocuentac.strGrpAcctCont_Cod!=''){
              router.push({ path: `/barmenu/FI-FINANZAS/maestro-datos/contabilidad-general/grupo-cuenta-contable/modificar-grupo-cuenta-contable`, query: { vista:'modificar' ,data:JSON.stringify(this.grupocuentac) }  })
            }
          }, 600)
        }
        else{
          if(this.strGrpAcctCont_Cod==''){
            this.textosave='Inserte Grupo Cuenta Contable. ';
            this.warningMessage('Inserte Grupo Cuenta Contable. ');
          }
          else{
            this.textosave='No existe Grupo Cuenta Contable. ';
            this.warningMessage('No existe Grupo Cuenta Contable. ');
          }        
        }
      }
      else{
        this.textosave='No existe Grupo Cuenta Contable. ';
        this.warningMessage('No existe Grupo Cuenta Contable. ');
        // this.gridGrupoCuenta=[];
        // grupocuentacontableService.GetAllAlmacen(this.companyCod)
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
      if(this.grupocuentac.intIdGrpCta_ID!=-1){
          await setTimeout(() => {
            if(this.grupocuentac.strGrpAcctCont_Cod!=''){
              router.push({ path: `/barmenu/FI-FINANZAS/maestro-datos/contabilidad-general/grupo-cuenta-contable/modificar-grupo-cuenta-contable`, query: { vista:'modificar' ,data:JSON.stringify(this.grupocuentac) }  })
            }
          }, 600)
        }
        else{
          this.textosave='Seleccione Grupo Cuenta Contable. ';
          this.warningMessage('Seleccione Grupo Cuenta Contable. ');
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
      if(val.property=="strGrpAcctCont_Cod"){
          this.clickColumn="strGrpAcctCont_Cod";
          this.blnilterstrGrpAcctCont_Cod=true;
          this.blnilterstrGrpAcctCont_Desc=false; 
          this.blnilterstrComp_Cod=false; 
          this.blnilterstrComp_Desc=false; 
          this.blnilterstrGrpAcct_Pos=false; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
      }
      if(val.property=="strGrpAcctCont_Desc"){
          this.clickColumn="strGrpAcctCont_Desc";
          this.blnilterstrGrpAcctCont_Cod=false;
          this.blnilterstrGrpAcctCont_Desc=true; 
          this.blnilterstrComp_Cod=false; 
          this.blnilterstrComp_Desc=false; 
          this.blnilterstrGrpAcct_Pos=false; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
      }
      if(val.property=="strComp_Cod"){
          this.clickColumn="strComp_Cod";
          this.blnilterstrGrpAcctCont_Cod=false;
          this.blnilterstrGrpAcctCont_Desc=false; 
          this.blnilterstrComp_Cod=true; 
          this.blnilterstrComp_Desc=false; 
          this.blnilterstrGrpAcct_Pos=false; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
      }
      
      if(val.property=="strComp_Desc"){
          this.clickColumn="strComp_Desc";
          this.blnilterstrGrpAcctCont_Cod=false;
          this.blnilterstrGrpAcctCont_Desc=false; 
          this.blnilterstrComp_Cod=false; 
          this.blnilterstrComp_Desc=true; 
          this.blnilterstrGrpAcct_Pos=false; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
      }
      if(val.property=="strGrpAcct_Pos"){
          this.clickColumn="strGrpAcct_Pos";
          this.blnilterstrGrpAcctCont_Cod=false;
          this.blnilterstrGrpAcctCont_Desc=false; 
          this.blnilterstrComp_Cod=false; 
          this.blnilterstrComp_Desc=false; 
          this.blnilterstrGrpAcct_Pos=true; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
      }
      if(val.property=="dtmModified_Date"){
          this.clickColumn="dtmModified_Date";
          this.blnilterstrGrpAcctCont_Cod=false;
          this.blnilterstrGrpAcctCont_Desc=false; 
          this.blnilterstrComp_Cod=false; 
          this.blnilterstrComp_Desc=false; 
          this.blnilterstrGrpAcct_Pos=false; 
          this.blnilterdtmModified_Date=true;
          this.blnilterstrModified_User=false;
      }
      if(val.property=="strModified_User"){
          this.clickColumn="strModified_User";
          this.blnilterstrGrpAcctCont_Cod=false;
          this.blnilterstrGrpAcctCont_Desc=false; 
          this.blnilterstrComp_Cod=false; 
          this.blnilterstrComp_Desc=false; 
          this.blnilterstrGrpAcct_Pos=false; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=true;
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
    filterstrGrpAcctCont_Desc(h,{column,$index}){        
      if(this.blnilterstrGrpAcctCont_Desc){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrComp_Cod(h,{column,$index}){        
      if(this.blnilterstrComp_Cod){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrComp_Desc(h,{column,$index}){        
      if(this.blnilterstrComp_Desc){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrGrpAcct_Pos(h,{column,$index}){        
      if(this.blnilterstrGrpAcct_Pos){
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
            strGrpAcctCont_Cod:''
        }
    }
  
}
