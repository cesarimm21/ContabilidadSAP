import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import router from '@/router';
import {DiarioModel} from '@/modelo/maestro/diario';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import diarioService from '@/components/service/diario.service';
import { Loading } from 'element-ui';
@Component({
  name: 'modificar-diario',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'buttons-accions': ButtonsAccionsComponent,
  }
})
export default class ModificarCodigoDiarioComponent extends Vue {
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  value3:string;
  companyName:any;
  companyCod:any;
  public documento:DiarioModel=new DiarioModel();
  gridDocumento:DiarioModel[];
  gridDocumento1:DiarioModel[];
  gridDocumento2:DiarioModel[];
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
  blnilterstrDaily_Cod:boolean=false;
  blnilterstrDaily_Type:boolean=false;
  blnilterstrDaily_Desc:boolean=false;
  blnilterstrDaily_AccLocal:boolean=false;
  blnilterstrDaily_AccForen:boolean=false;
  blnilterdmModified_Date:boolean=false;
  blnilterstrModify_User:boolean=false;
  diarioDialog:boolean=false;
  constructor(){    
        super();
        Global.nameComponent='modificar-codigodiario';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
        diarioService.GetAllDiarios()
        .then(response=>{
          this.gridDocumento=[];   
          this.gridDocumento1=[];
          this.gridDocumento2=[];
          this.gridDocumento=response;
          this.gridDocumento1=response;
          this.gridDocumento2=response;
          console.log(this.gridDocumento);
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
    handleCurrentChange(val:DiarioModel){
      this.documento=val;
     }
    btnBuscar(){
      var data=Global.like(this.gridDocumento1,this.clickColumn,this.txtbuscar)
      this.gridDocumento=[];
      this.gridDocumento=data;
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
      this.blnilterstrDaily_Cod=false;
      this.blnilterstrDaily_Type=false;
      this.blnilterstrDaily_Desc=false;
      this.blnilterstrDaily_AccLocal=false;
      this.blnilterstrDaily_AccForen=false;
      this.blnilterdmModified_Date=false;
      this.blnilterstrModify_User=false;
    }
    Print(){
      window.print();
    }
    async EliminarItem(){
      this.diarioDialog=true;    
    }
    deleteDiario(){
      if(this.documento.strDaily_Cod!=''){
        let loadingInstance = Loading.service({
          fullscreen: true,
          text: 'Eliminando...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.8)'
          }
          ); 
        diarioService.deleteDiarios(this.documento.intDaily_ID)
        .then(resp=>{
          loadingInstance.close();
          this.diarioDialog=false;
          this.$message({
              showClose: true,
              message: 'Se Elimino correctamente ',
              type: 'success'
            });
  
            this.documento=new DiarioModel();
            this.load();
            this.issave = true;
            this.iserror = false;
            this.textosave = 'Se Elimino Correctamente ';
        })
        .catch(error=>{
          loadingInstance.close();
          this.diarioDialog=false;
          this.$message({
              showClose: true,
              message: 'No se elimino',
              type: 'error'
            });
        })
        }
        else{
            this.warningMessage('Seleccione Codigo Diario. ');
        }
    }
  async validad(){      
    var data=this.like(this.gridDocumento1,'strDaily_Cod',this.documento.strDaily_Cod)
    this.documento=data[0];
    if(this.documento.intDaily_ID!=-1){
      await setTimeout(() => {
        if(this.documento.strDaily_Cod!=''){
          router.push({ path: `/barmenu/XX-CONFI/maestro_datos/codigo_diario/viewandedit_codigodiario`, query: { vista:'modificar' ,data:JSON.stringify(this.documento) }  })
        }
      }, 600)
    }
    else{
      this.textosave='No existe Codigo Diario. ';
      this.warningMessage('No existe Codigo Diario. ');
    }
  }
   async validarView(){
      if(this.documento.intDaily_ID!=-1){
          await setTimeout(() => {
            if(this.documento.strDaily_Cod!=''){
              router.push({ path: `/barmenu/XX-CONFI/maestro_datos/codigo_diario/viewandedit_codigodiario`, query: { vista:'modificar' ,data:JSON.stringify(this.documento) }  })
            }
          }, 600)
        }
        else{
          this.textosave='Seleccione Codigo Diario. ';
          this.warningMessage('Seleccione Codigo Diario. ');
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
      if(val.property=="strDaily_Cod"){
          this.clickColumn="strDaily_Cod";
          this.blnilterstrDaily_Cod=true;
          this.blnilterstrDaily_Type=false;
      this.blnilterstrDaily_Desc=false;
      this.blnilterstrDaily_AccForen=false;
      this.blnilterstrDaily_AccLocal=false;
      this.blnilterdmModified_Date=false;
      this.blnilterstrModify_User=false;
      }
      if(val.property=="strDaily_Type"){
          this.clickColumn="strDaily_Type";
          this.blnilterstrDaily_Cod=false;
          this.blnilterstrDaily_Type=true;
      this.blnilterstrDaily_Desc=false;
      this.blnilterstrDaily_AccForen=false;
      this.blnilterstrDaily_AccLocal=false;
      this.blnilterdmModified_Date=false;
      this.blnilterstrModify_User=false;
      }
      if(val.property=="strDaily_Desc"){
          this.clickColumn="strDaily_Desc";
          this.blnilterstrDaily_Cod=false;
          this.blnilterstrDaily_Type=false;
      this.blnilterstrDaily_Desc=true;
      this.blnilterstrDaily_AccForen=false;
      this.blnilterstrDaily_AccLocal=false;
      this.blnilterdmModified_Date=false;
      this.blnilterstrModify_User=false;
      }
      if(val.property=="strDaily_AccLocal"){
          this.clickColumn="strDaily_AccLocal";
          this.blnilterstrDaily_Cod=false;
          this.blnilterstrDaily_Type=false;
      this.blnilterstrDaily_Desc=false;
      this.blnilterstrDaily_AccForen=false;
      this.blnilterstrDaily_AccLocal=true;
      this.blnilterdmModified_Date=false;
      this.blnilterstrModify_User=false;
      }
      if(val.property=="strDaily_AccForen"){
          this.clickColumn="strDaily_AccForen";
          this.blnilterstrDaily_Cod=false;
          this.blnilterstrDaily_Type=false;
      this.blnilterstrDaily_Desc=false;
      this.blnilterstrDaily_AccForen=true;
      this.blnilterstrDaily_AccLocal=false;
      this.blnilterdmModified_Date=false;
      this.blnilterstrModify_User=false;
      }
      if(val.property=="dmModified_Date"){
          this.clickColumn="dmModified_Date";
          this.blnilterstrDaily_Cod=false;
          this.blnilterstrDaily_Type=false;
      this.blnilterstrDaily_Desc=false;
      this.blnilterstrDaily_AccForen=false;
      this.blnilterstrDaily_AccLocal=false;
      this.blnilterdmModified_Date=true;
      this.blnilterstrModify_User=false;
      }
      if(val.property=="strModify_User"){
          this.clickColumn="strModify_User";
          this.blnilterstrDaily_Cod=false;
          this.blnilterstrDaily_Type=false;
      this.blnilterstrDaily_Desc=false;
      this.blnilterstrDaily_AccForen=false;
      this.blnilterstrDaily_AccLocal=false;
      this.blnilterdmModified_Date=false;
      this.blnilterstrModify_User=true;
      }        
  }
  filterstrDaily_Cod(h,{column,$index}){
      if(this.blnilterstrDaily_Cod){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrDaily_Type(h,{column,$index}){
      if(this.blnilterstrDaily_Type){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrDaily_Desc(h,{column,$index}){        
      if(this.blnilterstrDaily_Desc){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }    
   
    filterstrDaily_AccLocal(h,{column,$index}){        
      if(this.blnilterstrDaily_AccLocal){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }    
   
    filterstrDaily_AccForen(h,{column,$index}){        
      if(this.blnilterstrDaily_AccForen){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }    
   
    filterdmModified_Date(h,{column,$index}){
      
      if(this.blnilterdmModified_Date){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrModified_User(h,{column,$index}){
      if(this.blnilterstrModify_User){
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
        }
    }
  
}
