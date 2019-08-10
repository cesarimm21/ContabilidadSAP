import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import router from '@/router';
import {ProveedorModel} from '@/modelo/maestro/proveedor';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import proveedorService from '@/components/service/proveedor.service';
import BCompaniaProveedor from '@/components/buscadores/b_compania/b_compania.vue';
import { Loading } from 'element-ui';
@Component({
  name: 'modificar-proveedor',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'buttons-accions': ButtonsAccionsComponent,
  'bcompania':BCompaniaProveedor,
  }
})
export default class ModificarProveedorComponent extends Vue {
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  value3:string;
  companyName:any;
  companyCod:any;
  strVendor_NO:string;
  public proveedor:ProveedorModel=new ProveedorModel();
  gridProveedor:ProveedorModel[];
  gridProveedor1:ProveedorModel[];
  gridProveedor2:ProveedorModel[];
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
  blnilterstrVendor_NO:boolean=false;
  blnilterstrVendor_Desc:boolean=false;
  blnilterstrTax_ID:boolean=false;
  blnilterintIdCountry_ID:boolean=false;
  blnilterstrProvince:boolean=false;
  blnilterstrDistrict:boolean=false;
  blnilterstrAddress:boolean=false;
  blnilterdtmModified_Date:boolean=false;
  blnilterstrModified_User:boolean=false;
  loading1:boolean=true;
  dialogEliminar:boolean=false;
  dialogInactivar:boolean=false;
  nameuser:any;

  constructor(){    
        super();
        Global.nameComponent='modificar-proveedor';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
        proveedorService.GetProveedoresCompany(this.companyCod)
        .then(response=>{
          this.gridProveedor=[];
          this.gridProveedor1=[];
          this.gridProveedor2=[];
          this.gridProveedor=response;
          this.gridProveedor1=response;
          this.gridProveedor2=response;
          this.loading1=false;
          for(var j=0;j<this.gridProveedor.length;j++){
            if(this.gridProveedor[j].strLastName!=null){
              this.gridProveedor[j].strVendor_Desc=this.gridProveedor[j].strVendor_Desc+', '+this.gridProveedor[j].strLastName+' '+this.gridProveedor[j].strSurName              
            }        
          }
          this.gridProveedor1=this.gridProveedor;
          this.totalRegistros=this.gridProveedor1.length;
          this.gridProveedor=[];
          this.gridProveedor = this.gridProveedor1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
          if(response.length>0){
          }          
          else{
            this.$message({
              showClose: true,
              type: 'info',
              message: 'No hay proveedores'
            })          
        }
      }).catch(errro=>{
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
    handleCurrentChange(val:ProveedorModel){
      this.proveedor=val;
      this.strVendor_NO=this.proveedor.strVendor_NO;
     }
    btnBuscar(){
      var data=Global.like(this.gridProveedor1,this.clickColumn,this.txtbuscar)
      this.gridProveedor=[];
      this.gridProveedor=data;
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
      var data=await this.sortByKeyAsc(this.gridProveedor1,this.clickColumn) 
      this.gridProveedor2=[];
      this.gridProveedor2=data;
      this.gridProveedor = await this.gridProveedor2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      await loading.close();
    }
    DscItem(){
      var data=this.sortByKeyDesc(this.gridProveedor1,this.clickColumn) 
      this.gridProveedor2=[];
      this.gridProveedor2=data;
      this.gridProveedor = this.gridProveedor2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    
    }
    Limpiar(){
      this.gridProveedor = this.gridProveedor1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));    
      this.blnilterstrVendor_NO=false;
      this.blnilterstrVendor_Desc=false; 
      this.blnilterstrTax_ID=false; 
      this.blnilterintIdCountry_ID=false; 
      this.blnilterstrProvince=false; 
      this.blnilterstrDistrict=false; 
      this.blnilterstrAddress=false; 
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=false;  
    }
    Print(){
      window.print();
    }
  async EliminarItem(){
    if(this.proveedor.intIdVendor_ID!=-1 &&this.proveedor.strVendor_NO!=""){
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
    await proveedorService.inactivarProveedore(this.proveedor)
    .then(response=>{
      loadingInstance.close();
      if(response!=undefined){
         this.textosave='Se Inactivo correctamento.';
         this.issave=true;
         this.iserror=false;
         this.$message({
          showClose: true,
          type: 'success',
          message: 'Se Inactivo correctamento '
        });
      }
      else{
        this.issave=false;
        this.iserror=true;
        this.textosave='Ocurrio un error al inactivar.';
      }
      this.load();
      this.dialogEliminar=false;
    }).catch(error=>{
      loadingInstance.close();
      this.dialogEliminar=false;
      this.issave=false;
      this.iserror=true;
      this.textosave='Ocurrio un error al inactivar.';
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo inactivar'
      });
    })
    
  }
  async ActivarDesactivar(){
    if(this.proveedor.intIdVendor_ID!=-1 &&this.proveedor.strVendor_NO!=""){
      this.dialogInactivar=true;  
    }
    else{
      this.warningMessage('Debe de seleccionar una fila!!!');
    }        
  }
  async btnInactivar(){
    this.nameuser=localStorage.getItem('User_Usuario');
    this.proveedor.strModified_User=this.nameuser;
    if(this.proveedor.intIdVendor_ID!=-1&&this.proveedor.strVendor_NO!=""){
      let loadingInstance = Loading.service({
        fullscreen: true,
        text: 'Activando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
      );   
      await proveedorService.activarProveedore(this.proveedor)
      .then(respo=>{
        loadingInstance.close();
        this.successMessage('Se Activo el Proveedor '+this.proveedor.strVendor_NO)
        this.load();
        this.issave=true;
        this.iserror=false;
        this.textosave='Se Activo el Proveedor '+this.proveedor.strVendor_NO;
        this.dialogInactivar=false;
      }).catch(ee=>{
        loadingInstance.close();
        this.issave=false;
        this.iserror=true;
        this.textosave='Error en Activo '+this.proveedor.strVendor_NO;
        this.errorMessage('Error en Activo '+this.proveedor.strVendor_NO)})
        this.dialogInactivar=false;
    }
    else{
      this.warningMessage('Debe de seleccionar una fila!!!');
    }
  }
  async validad(){      
    var data=Global.like(this.gridProveedor1,'strVendor_NO',this.strVendor_NO)
      if(data.length>0){
        this.proveedor=data[0];
        if(this.proveedor.strVendor_NO==this.strVendor_NO){
          await setTimeout(() => {
            if(this.proveedor.strVendor_NO!=''){
              router.push({ path: `/barmenu/FI-FINANZAS/proveedor/ViewAndEdit-proveedor`, query: { vista:'modificar' ,data:JSON.stringify(this.proveedor) }  })
            }
          }, 600)
        }
        else{
          if(this.strVendor_NO==''){
            this.textosave='Inserte Proveedor. ';
            this.warningMessage('Inserte Proveedor. ');
          }
          else{
            this.textosave='No existe Proveedor. ';
            this.warningMessage('No existe Proveedor. ');
          }        
        }
      }
      else{
        this.textosave='No existe Proveedor. ';
        this.warningMessage('No existe Proveedor. ');
        // this.gridProveedor=[];
        // almacenService.GetAllAlmacen(this.companyCod)
        // .then(resp=>{
        //   if(resp!=undefined){
        //     if(resp.length>0){
        //       this.gridProveedor=resp;
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
      if(this.proveedor.intIdVendor_ID!=-1){
          await setTimeout(() => {
            if(this.proveedor.strVendor_NO!=''){
              router.push({ path: `/barmenu/FI-FINANZAS/proveedor/ViewAndEdit-proveedor`, query: { vista:'modificar' ,data:JSON.stringify(this.proveedor) }  })
            }
          }, 600)
        }
        else{
          this.textosave='Seleccione Proveedor. ';
          this.warningMessage('Seleccione Proveedor. ');
        }
      }
    siguiente(){
      if(this.pagina<(this.totalRegistros/this.RegistersForPage)){
        this.pagina++;
        this.gridProveedor = this.gridProveedor1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      }
    }
    anterior(){
      if(this.pagina>1){
      this.pagina--;
      this.gridProveedor = this.gridProveedor1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
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
      if(val.property=="strVendor_NO"){
          this.clickColumn="strVendor_NO";
          this.blnilterstrVendor_NO=true;
          this.blnilterstrVendor_Desc=false; 
          this.blnilterstrTax_ID=false; 
          this.blnilterintIdCountry_ID=false; 
          this.blnilterstrProvince=false; 
          this.blnilterstrDistrict=false; 
          this.blnilterstrAddress=false; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
      }
      if(val.property=="strVendor_Desc"){
          this.clickColumn="strVendor_Desc";
          this.blnilterstrVendor_NO=false;
          this.blnilterstrVendor_Desc=true; 
          this.blnilterstrTax_ID=false; 
          this.blnilterintIdCountry_ID=false; 
          this.blnilterstrProvince=false; 
          this.blnilterstrDistrict=false; 
          this.blnilterstrAddress=false; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
      }
      if(val.property=="strTax_ID"){
          this.clickColumn="strTax_ID";
          this.blnilterstrVendor_NO=false;
          this.blnilterstrVendor_Desc=false; 
          this.blnilterstrTax_ID=true; 
          this.blnilterintIdCountry_ID=false; 
          this.blnilterstrProvince=false; 
          this.blnilterstrDistrict=false; 
          this.blnilterstrAddress=false; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
      }
      
      if(val.property=="intIdCountry_ID"){
          this.clickColumn="intIdCountry_ID";
          this.blnilterstrVendor_NO=false;
          this.blnilterstrVendor_Desc=false; 
          this.blnilterstrTax_ID=false; 
          this.blnilterintIdCountry_ID=true; 
          this.blnilterstrProvince=false; 
          this.blnilterstrDistrict=false; 
          this.blnilterstrAddress=false; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
      }
      if(val.property=="strProvince"){
          this.clickColumn="strProvince";
          this.blnilterstrVendor_NO=false;
          this.blnilterstrVendor_Desc=false; 
          this.blnilterstrTax_ID=false; 
          this.blnilterintIdCountry_ID=false; 
          this.blnilterstrProvince=true; 
          this.blnilterstrDistrict=false; 
          this.blnilterstrAddress=false; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
      }
      if(val.property=="strDistrict"){
          this.clickColumn="strDistrict";
          this.blnilterstrVendor_NO=false;
          this.blnilterstrVendor_Desc=false; 
          this.blnilterstrTax_ID=false; 
          this.blnilterintIdCountry_ID=false; 
          this.blnilterstrProvince=false; 
          this.blnilterstrDistrict=true; 
          this.blnilterstrAddress=false; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
      }
      if(val.property=="strAddress"){
          this.clickColumn="strAddress";
          this.blnilterstrVendor_NO=false;
          this.blnilterstrVendor_Desc=false; 
          this.blnilterstrTax_ID=false; 
          this.blnilterintIdCountry_ID=false; 
          this.blnilterstrProvince=false; 
          this.blnilterstrDistrict=false; 
          this.blnilterstrAddress=true; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
      }
      if(val.property=="dtmModified_Date"){
          this.clickColumn="dtmModified_Date";
          this.blnilterstrVendor_NO=false;
          this.blnilterstrVendor_Desc=false; 
          this.blnilterstrTax_ID=false; 
          this.blnilterintIdCountry_ID=false; 
          this.blnilterstrProvince=false; 
          this.blnilterstrDistrict=false; 
          this.blnilterstrAddress=false; 
          this.blnilterdtmModified_Date=true;
          this.blnilterstrModified_User=false;
      }
      if(val.property=="strModified_User"){
          this.clickColumn="strModified_User";
          this.blnilterstrVendor_NO=false;
          this.blnilterstrVendor_Desc=false; 
          this.blnilterstrTax_ID=false; 
          this.blnilterintIdCountry_ID=false; 
          this.blnilterstrProvince=false; 
          this.blnilterstrDistrict=false; 
          this.blnilterstrAddress=false; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=true;
      }        
  }
  filterstrVendor_NO(h,{column,$index}){
      if(this.blnilterstrVendor_NO){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrVendor_Desc(h,{column,$index}){        
      if(this.blnilterstrVendor_Desc){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrTax_ID(h,{column,$index}){        
      if(this.blnilterstrTax_ID){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterintIdCountry_ID(h,{column,$index}){        
      if(this.blnilterintIdCountry_ID){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrProvince(h,{column,$index}){        
      if(this.blnilterstrProvince){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrDistrict(h,{column,$index}){        
      if(this.blnilterstrDistrict){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrAddress(h,{column,$index}){        
      if(this.blnilterstrAddress){
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
            gridProveedor:[],
            gridProveedor1:[],
            gridProveedor2:[],
            loading1:true,
            strVendor_NO:''
        }
    }
  
}
