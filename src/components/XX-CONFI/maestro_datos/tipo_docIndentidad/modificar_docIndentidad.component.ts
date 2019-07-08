import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import router from '@/router';
import {TipoDocIdentidadModel} from '@/modelo/maestro/tipodocidentidad';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import tipodocService from '@/components/service/tipodocidentidad.service';
import { Loading } from 'element-ui';
import documentsService from '@/components/service/documents.service';
@Component({
  name: 'modificar-docidentidad',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'buttons-accions': ButtonsAccionsComponent,
  }
})
export default class ModificarDocIdentidadComponent extends Vue {
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  value3:string;
  companyName:any;
  companyCod:any;
  public documento:TipoDocIdentidadModel=new TipoDocIdentidadModel();
  strDocIdent_NO:string='';
  gridDocumento:TipoDocIdentidadModel[];
  gridDocumento1:TipoDocIdentidadModel[];
  gridDocumento2:TipoDocIdentidadModel[];
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
  blnilterstrDocIdent_NO:boolean=false;
  blnilterstrDocIdent_Name:boolean=false;
  blnilterdtmCreation_Date:boolean=false;
  blnilterstrCreation_User:boolean=false;
  tipodocDialog:boolean=false;
  constructor(){    
        super();
        Global.nameComponent='modificar-docidentidad';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
        tipodocService.GetAllTipoDocumento()
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
    handleCurrentChange(val:TipoDocIdentidadModel){
      this.documento=val;
      this.strDocIdent_NO=this.documento.strDocIdent_NO;      
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
      this.blnilterstrDocIdent_NO=false;
      this.blnilterstrDocIdent_Name=false; 
      this.blnilterdtmCreation_Date=false;
      this.blnilterstrCreation_User=false;  
    }
    Print(){
      window.print();
    }
  async  EliminarItem(){
     this.tipodocDialog=true;
  }
  deletetipodoc(){
    if(this.documento.strDocIdent_NO!=''){
      let loadingInstance = Loading.service({
        fullscreen: true,
        text: 'Eliminando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
        ); 
      tipodocService.deleteTipoDocumento(this.documento.intIdDocIdent_ID)
      .then(resp=>{
        loadingInstance.close();
        this.tipodocDialog=false;
        this.$message({
            showClose: true,
            message: 'Se Elimino correctamente '+resp,
            type: 'success'
          });

          this.documento=new TipoDocIdentidadModel();
          this.load();
          this.issave = true;
          this.iserror = false;
          this.textosave = 'Se Elimino Correctamente '+resp;
      })
      .catch(error=>{
        loadingInstance.close();
        this.tipodocDialog=false;
        this.$message({
            showClose: true,
            message: 'No se elimino',
            type: 'error'
          });
      })
      }
      else{
          this.warningMessage('Seleccione Tipo Doc. Identidad. ');
      }
  }
  async validad(){      
    var data=Global.like(this.gridDocumento1,'strDocIdent_NO',this.strDocIdent_NO)
    if(data.length>0){
      this.documento=data[0];
      if(this.documento.strDocIdent_NO==this.strDocIdent_NO){
        await setTimeout(() => {
          debugger;
          if(this.documento.strDocIdent_NO!=''){
            router.push({ path: `/barmenu/XX-CONFI/maestro_datos/tipo_docIndentidad/viewandedit_docIndentidad`, query: { vista:'modificar' ,data:JSON.stringify(this.documento) }  })
          }
        }, 600)
      }
      else{
        if(this.strDocIdent_NO==''){
          this.textosave='Inserte Tipo Doc. Identidad. ';
          this.warningMessage('Inserte Tipo Doc. Identidad. ');
        }
        else{
          this.textosave='No existe Tipo Doc. Identidad. ';
          this.warningMessage('No existe Tipo Doc. Identidad. ');
        }        
      }
    }
    else{
      this.textosave='No existe Tipo Doc. Identidad. ';
      this.warningMessage('No existe Tipo Doc. Identidad. ');
    }
    
  }
   async validarView(){
      if(this.documento.intIdDocIdent_ID!=-1){
          await setTimeout(() => {
            debugger;
            if(this.documento.strDocIdent_NO!=''){
              router.push({ path: `/barmenu/XX-CONFI/maestro_datos/tipo_docIndentidad/viewandedit_docIndentidad`, query: { vista:'modificar' ,data:JSON.stringify(this.documento) }  })
            }
          }, 600)
        }
        else{
          this.textosave='Seleccione Tipo Doc. Identidad. ';
          this.warningMessage('Seleccione Tipo Doc. Identidad. ');
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
      if(val.property=="strDocIdent_NO"){
          this.clickColumn="strDocIdent_NO";
          this.blnilterstrDocIdent_NO=true;
          this.blnilterstrDocIdent_Name=false; 
          this.blnilterdtmCreation_Date=false;
          this.blnilterstrCreation_User=false;  
      }
      if(val.property=="strDocIdent_Name"){
          this.clickColumn="strDocIdent_Name";
          this.blnilterstrDocIdent_NO=false;
          this.blnilterstrDocIdent_Name=true; 
          this.blnilterdtmCreation_Date=false;
          this.blnilterstrCreation_User=false; 
      }
      if(val.property=="dtmCreation_Date"){
          this.clickColumn="dtmCreation_Date";
          this.blnilterstrDocIdent_NO=false;
          this.blnilterstrDocIdent_Name=false; 
          this.blnilterdtmCreation_Date=true;
          this.blnilterstrCreation_User=false; 
      }
      if(val.property=="strCreation_User"){
          this.clickColumn="strCreation_User";
          this.blnilterstrDocIdent_NO=false;
          this.blnilterstrDocIdent_Name=false; 
          this.blnilterdtmCreation_Date=false;
          this.blnilterstrCreation_User=true; 
      }        
  }
  filterstrDocIdent_NO(h,{column,$index}){
      if(this.blnilterstrDocIdent_NO){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrDocIdent_Name(h,{column,$index}){        
      if(this.blnilterstrDocIdent_Name){
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
            strDocIdent_NO:'',
            gridDocumento:[],
            gridDocumento1:[],
            gridDocumento2:[],
        }
    }
  
}
