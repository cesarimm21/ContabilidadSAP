import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import router from '@/router';
import {TipoComprobantePagoModel} from '@/modelo/maestro/tipocomprobantepago';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import tipocomService from '@/components/service/tipocomprobantepago.service';
import { Loading } from 'element-ui';
@Component({
  name: 'modificar-comprobpago',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'buttons-accions': ButtonsAccionsComponent,
  }
})
export default class ModificarComprobPagoComponent extends Vue {
  sizeScreen:string = (window.innerHeight - 420).toString();//'0';
  sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  value3:string;
  companyName:any;
  companyCod:any;
  public documento:TipoComprobantePagoModel=new TipoComprobantePagoModel();
  strDocType_Cod:string='';
  gridDocumento:TipoComprobantePagoModel[];
  gridDocumento1:TipoComprobantePagoModel[];
  gridDocumento2:TipoComprobantePagoModel[];
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
  blnilterstrDocType_Cod:boolean=false;
  blnilterstrDocType_Desc:boolean=false;
  blnilterdtmModified_Date:boolean=false;
  blnilterstrModified_User:boolean=false;
  comprobanteDialog:boolean=false;
  constructor(){    
        super();
        Global.nameComponent='modificar-comprobpago';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
        tipocomService.GetAllComprobante()
        .then(response=>{
          this.gridDocumento=[];
          this.gridDocumento1=[];
          this.gridDocumento2=[];
          this.gridDocumento=response;
          this.gridDocumento1=response;
          this.gridDocumento2=response;
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
    handleCurrentChange(val:TipoComprobantePagoModel){
      this.documento=val;
      this.strDocType_Cod=this.documento.strDocType_Cod;
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
      this.clickColumn='';
      this.Column='';
      this.txtbuscar='';
      this.blnilterstrDocType_Cod=false;
      this.blnilterstrDocType_Desc=false;
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=false;
      this.gridDocumento = this.gridDocumento1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));    
    }
    Print(){
      window.print();
    }
  async EliminarItem(){
    this.comprobanteDialog=true;    
  }
  deleteComprobante(){
    if(this.documento.strDocType_Cod!=''){
      let loadingInstance = Loading.service({
        fullscreen: true,
        text: 'Eliminando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
        ); 
        tipocomService.deleteComprobante(this.documento.intIdDocIdent_IDType_ID)
      .then(resp=>{
        loadingInstance.close();
        this.comprobanteDialog=false;
        this.$message({
            showClose: true,
            message: 'Se Elimino correctamente ',
            type: 'success'
          });

          this.documento=new TipoComprobantePagoModel();
          this.load();
          this.issave = true;
          this.iserror = false;
          this.textosave = 'Se Elimino Correctamente ';
      })
      .catch(error=>{
        loadingInstance.close();
        this.comprobanteDialog=false;
        this.$message({
            showClose: true,
            message: 'No se elimino',
            type: 'error'
          });
      })
      }
      else{
          this.warningMessage('Seleccione Tipo de Comprobante Pago. ');
      }
  }
  async validad(){      
    var data=Global.like(this.gridDocumento1,'strDocType_Cod',this.strDocType_Cod)
    if(data.length>0){
      this.documento=data[0];
      if(this.documento.strDocType_Cod==this.strDocType_Cod){
        await setTimeout(() => {
          debugger;
          if(this.documento.strDocType_Cod!=''){
            router.push({ path: `/barmenu/XX-CONFI/maestro_datos/tipo_comprobPago/viewandedit_comprobPago`, query: { vista:'modificar' ,data:JSON.stringify(this.documento) }  })
          }
        }, 600)
      }
      else{
        if(this.strDocType_Cod==''){
          this.textosave='Inserte Tipo de Comprobante Pago. ';
          this.warningMessage('Inserte TiTipo de Comprobante Pago. ');
        }
        else{
          this.textosave='No existe Tipo de Comprobante Pago. ';
          this.warningMessage('No existe Tipo de Comprobante Pago.. ');
        }   
      }
    }
    else{
      this.textosave='No existe Tipo de Comprobante Pago. ';
      this.warningMessage('No existe Tipo de Comprobante Pago. ');
    }
    
  }
   async validarView(){
      if(this.documento.intIdDocIdent_IDType_ID!=undefined){
          await setTimeout(() => {
            debugger;
            if(this.documento.strDocType_Cod!=undefined){
              router.push({ path: `/barmenu/XX-CONFI/maestro_datos/tipo_comprobPago/viewandedit_comprobPago`, query: { vista:'modificar' ,data:JSON.stringify(this.documento) }  })
            }
          }, 600)
        }
        else{
          this.textosave='Seleccione Tipo de Comprobante Pago. ';
          this.warningMessage('Seleccione Tipo de Comprobante Pago. ');
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
      if(val.property=="strDocType_Cod"){
          this.clickColumn="strDocType_Cod";
          this.blnilterstrDocType_Cod=true;
      this.blnilterstrDocType_Desc=false;
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=false;
      }
      if(val.property=="strDocType_Desc"){
          this.clickColumn="strDocType_Desc";
          this.blnilterstrDocType_Cod=false;
      this.blnilterstrDocType_Desc=true;
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=false;
      }
      if(val.property=="dtmModified_Date"){
          this.clickColumn="dtmModified_Date";
          this.blnilterstrDocType_Cod=false;
      this.blnilterstrDocType_Desc=false;
      this.blnilterdtmModified_Date=true;
      this.blnilterstrModified_User=false;
      }
      if(val.property=="strModified_User"){
          this.clickColumn="strModified_User";
          this.blnilterstrDocType_Cod=false;
      this.blnilterstrDocType_Desc=false;
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=true;
      }        
  }
  filterstrDocType_Cod(h,{column,$index}){
      if(this.blnilterstrDocType_Cod){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrDocType_Desc(h,{column,$index}){        
      if(this.blnilterstrDocType_Desc){
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
            strDocType_Cod:'',
            gridDocumento:[],
            gridDocumento1:[],
            gridDocumento2:[],
        }
    }
  
}
