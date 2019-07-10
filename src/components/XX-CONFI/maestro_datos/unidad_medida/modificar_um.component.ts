import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import router from '@/router';
import {UnidadMedidaModel} from '@/modelo/maestro/unidadmedida';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import umService from '@/components/service/unidadmedida.service';
import { Loading } from 'element-ui';
import unidadmedidaService from '@/components/service/unidadmedida.service';
@Component({
  name: 'modificar-um',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'buttons-accions': ButtonsAccionsComponent,
  }
})
export default class ModificarUMComponent extends Vue {
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  value3:string;
  companyName:any;
  companyCod:any;
  strUM_Cod:string='';
  unidadDialog:boolean=false;
  public unidad:UnidadMedidaModel=new UnidadMedidaModel();
  gridUnidad:UnidadMedidaModel[];
  gridUnidad1:UnidadMedidaModel[];
  gridUnidad2:UnidadMedidaModel[];
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
  blnilterstrUM_Desc:boolean=false;
  blnilterstrUM_Cod:boolean=false;
  blnilterdtmModified_Date:boolean=false;
  blnilterstrModified_User:boolean=false;


  constructor(){    
        super();
        Global.nameComponent='modificar-um';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
        umService.GetAllUnidadMedida()
        .then(response=>{
          this.gridUnidad=[];
          this.gridUnidad1=[];
          this.gridUnidad2=[];
          this.gridUnidad=response;
          this.gridUnidad1=response;
          this.gridUnidad2=response;
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
    handleCurrentChange(val:UnidadMedidaModel){
      this.unidad=val;
      this.strUM_Cod=this.unidad.strUM_Cod;
     }
    btnBuscar(){
      var data=Global.like(this.gridUnidad1,this.clickColumn,this.txtbuscar)
      this.gridUnidad=[];
      this.gridUnidad=data;
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
      var data=await this.sortByKeyAsc(this.gridUnidad1,this.clickColumn) 
      this.gridUnidad2=[];
      this.gridUnidad2=data;
      this.gridUnidad = await this.gridUnidad2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      await loading.close();
    }
    DscItem(){
      var data=this.sortByKeyDesc(this.gridUnidad1,this.clickColumn) 
      this.gridUnidad2=[];
      this.gridUnidad2=data;
      this.gridUnidad = this.gridUnidad2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    
    }
    Limpiar(){
      this.gridUnidad = this.gridUnidad1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));    
      this.blnilterstrUM_Cod=false;
      this.blnilterstrUM_Desc=false;
      this.blnilterdtmModified_Date=false;
      this.blnilterstrModified_User=false;       
    }
    Print(){
      window.print();
    }
    async EliminarItem(){
      this.unidadDialog=true;    
    }
    deleteUnidad(){
      if(this.unidad.strUM_Cod!=''&&this.unidad.intUnit_Measure_ID!=-1){
        let loadingInstance = Loading.service({
          fullscreen: true,
          text: 'Eliminando...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.8)'
          }
          ); 
        unidadmedidaService.deleteUnidadMedida(this.unidad.intUnit_Measure_ID)
        .then(resp=>{
          loadingInstance.close();
          this.unidadDialog=false;
          this.$message({
              showClose: true,
              message: 'Se Elimino correctamente ',
              type: 'success'
            });
  
            this.unidad=new UnidadMedidaModel();
            this.load();
            this.issave = true;
            this.iserror = false;
            this.textosave = 'Se Elimino Correctamente ';
        })
        .catch(error=>{
          loadingInstance.close();
          this.unidadDialog=false;
          this.$message({
              showClose: true,
              message: 'No se elimino',
              type: 'error'
            });
        })
        }
        else{
            this.warningMessage('Seleccione Unidad Medida. ');
        }
    }
  async validad(){    
     var data=Global.like(this.gridUnidad1,'strUM_Cod',this.strUM_Cod)
    if(data.length>0){
      this.unidad=data[0];
      if(this.unidad.strUM_Cod==this.strUM_Cod){
        await setTimeout(() => {
          debugger;
          if(this.unidad.strUM_Cod!=''){
            router.push({ path: `/barmenu/XX-CONFI/maestro_datos/unidad_medida/viewandedit_um`, query: { vista:'modificar' ,data:JSON.stringify(this.unidad) }  })
          }
        }, 600)
      }
      else{
        if(this.strUM_Cod==''){
          this.textosave='Inserte Unidad Medida. ';
          this.warningMessage('Inserte Unidad Medida. ');
        }
        else{
          this.textosave='No existe Unidad Medida. ';
          this.warningMessage('No existe Unidad Medida. ');
        }        
      }
    }
    else{
      this.textosave='No existe Unidad Medida. ';
      this.warningMessage('No existe Unidad Medida. ');
    }
  }
   async validarView(){
      if(this.unidad.intUnit_Measure_ID!=-1){
          await setTimeout(() => {
            debugger;
            if(this.unidad.strUM_Cod!=''){
              router.push({ path: `/barmenu/XX-CONFI/maestro_datos/unidad_medida/viewandedit_um`, query: { vista:'modificar' ,data:JSON.stringify(this.unidad) }  })
            }
          }, 600)
        }
        else{
          this.textosave='Seleccione unidad de medida. ';
          this.warningMessage('Seleccione unidad de medida. ');
        }
      }
    siguiente(){
      if(this.pagina<(this.totalRegistros/this.RegistersForPage)){
        this.pagina++;
        this.gridUnidad = this.gridUnidad1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      }
    }
    anterior(){
      if(this.pagina>1){
      this.pagina--;
      this.gridUnidad = this.gridUnidad1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
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
      if(val.property=="strUM_Cod"){
          this.clickColumn="strUM_Cod";
          this.blnilterstrUM_Cod=true;
          this.blnilterstrUM_Desc=false; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
      }
      if(val.property=="strUM_Desc"){
          this.clickColumn="strUM_Desc";
          this.blnilterstrUM_Cod=false;
          this.blnilterstrUM_Desc=true; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=false;
      }
      if(val.property=="dtmModified_Date"){
          this.clickColumn="dtmModified_Date";
          this.blnilterstrUM_Cod=false;
          this.blnilterstrUM_Desc=false; 
          this.blnilterdtmModified_Date=true;
          this.blnilterstrModified_User=false;
      }
      if(val.property=="strModified_User"){
          this.clickColumn="strModified_User";
          this.blnilterstrUM_Cod=false;
          this.blnilterstrUM_Desc=false; 
          this.blnilterdtmModified_Date=false;
          this.blnilterstrModified_User=true;
      }        
  }
  filterstrUM_Cod(h,{column,$index}){
      if(this.blnilterstrUM_Cod){
        return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
        [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
          , column.label)])
      }
      else{
        return h('span',{style: 'padding-left: 5px;'}, column.label);
      } 
    }
    filterstrUM_Desc(h,{column,$index}){        
      if(this.blnilterstrUM_Desc){
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
            gridUnidad:[],
            gridUnidad1:[],
            gridUnidad2:[],
            strUM_Cod:''
        }
    }
  
}
