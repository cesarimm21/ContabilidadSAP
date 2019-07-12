import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import router from '@/router';
//***Modelos */
import {SucursalModel} from '@/modelo/maestro/sucursal';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import impuestoService from '@/components/service/impuesto.service';
import sucursalService from '@/components/service/sucursal.service';


import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';

@Component({
  name: 'visualizar-sucursal',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'buttons-accions':ButtonsAccionsComponent,
  }
})
export default class VisuSucursalComponent extends Vue {
     nameComponent:string;
    fecha_actual:string;
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
 
    fecha_ejecucion:string;
    companyName:any;
    companyCod:any;
    issave:boolean=false;
    iserror:boolean=false;
    textosave:string='';
    public sucursal:SucursalModel=new SucursalModel();
    public tableData:Array<SucursalModel>=[]; 
    public tableData1:Array<SucursalModel>=[]; 
    namepage:string;
    impDisabled:boolean=false;
    cod_criticidad:string='';
    selectrow:any;
    currentRow:any;
    dialogEliminar:boolean=false;
    cod_sucursal:string='';
    loading1:boolean=true;
    pagina: number =1;
      RegistersForPage: number = 100;
    totalRegistros: number = 100;
    clickColumn:string='';
    txtbuscar:string='';
    Column:string='';
    dialogBusquedaFilter:boolean=false;
    blnilterstrSubsidiary_Cod:boolean=false;
    blnilterstrSubsidiary_Desc:boolean=false;
    blnilterstrSubsidiary_Address:boolean=false;
    blnilterdtmModified_Date:boolean=false;
    blnilterdstrModified_User:boolean=false;
  constructor(){    
        super();
        Global.nameComponent='visualizar-sucursal';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
        this.cargarList();
    }
    
    handleCurrentChange(val) {
        if(val!=null){
        this.selectrow=val;
        this.currentRow = val;
        this.cod_sucursal=val.strSubsidiary_Cod;
        }
    }
    async cargarList(){
        if(this.cod_sucursal!=''){
            await sucursalService.GetOnlyOnesucursal(this.cod_sucursal)
            .then(res=>{
                if(res!=undefined){
                    this.selectrow=res;
                    this.validarView();
                }
            })
            .catch(error=>{            
            })
        }
        else{
            await sucursalService.GetAllsucursal(this.companyCod)
            .then(res=>{
                this.tableData=res;
                this.tableData1=res;
                this.loading1=false;
            })
            .catch(error=>{
              this.loading1=false;
            })
        }
    }
    async validad(){      
      var data=Global.like(this.tableData1,'strSubsidiary_Cod',this.cod_sucursal)
      if(data.length>0){
        this.sucursal=data[0];
        if(this.sucursal.strSubsidiary_Cod==this.cod_sucursal){
          await setTimeout(() => {
            if(this.sucursal.strSubsidiary_Cod!=''){
              router.push({ path: `/barmenu/XX-CONFI/maestro_datos/sucursal/modif_sucursal`, query: { vista: 'visualizar',data:JSON.stringify(this.sucursal) }  })
            }
          }, 600)
        }
        else{
          if(this.cod_sucursal==''){
            this.textosave='Inserte Sucursal. ';
            this.warningMessage('Inserte Sucursal. ');
          }
          else{
            this.textosave='No existe Sucursal. ';
            this.warningMessage('No existe Sucursal. ');
          }        
        }
      }
      else{
        this.textosave='No existe Sucursal. ';
        this.warningMessage('No existe Sucursal. ');
      }
    }
    async validarView(){
        if(this.selectrow!=undefined && this.selectrow!=null ){
            debugger;
            if(this.selectrow!=undefined && this.selectrow!=null ){
              router.push({ path: `/barmenu/XX-CONFI/maestro_datos/sucursal/modif_sucursal`, query: { vista: 'visualizar',data:JSON.stringify(this.selectrow) }  })
            }
        }
        else{
            this.textosave='Seleccione algun item. ';
            this.warningMessage('Seleccione algun item. ');
        }
    }
    fnOcultar(){
    }
    handleChange(value) {
    }    
    warningMessage(newMsg : string) {
      this.$message({
        showClose: true,
        message: newMsg,
        type: 'warning'
      });
    }
  EliminarItem(){
    this.warningMessage('Accion no permitida')
  }
  Limpiar(){
    this.Column="";
    this.tableData=[];
    this.tableData = this.tableData1;
    this.blnilterstrSubsidiary_Cod=false;
        this.blnilterstrSubsidiary_Desc=false;
        this.blnilterstrSubsidiary_Address=false;
        this.blnilterdtmModified_Date=false;
        this.blnilterdstrModified_User=false;
  }
  headerclick(val){    
    this.Column=val.label;
    Global.setColumna(this.Column);     
    if(val.property=="strSubsidiary_Cod"){
        this.clickColumn="strSubsidiary_Cod";
        this.blnilterstrSubsidiary_Cod=true;
        this.blnilterstrSubsidiary_Desc=false;
        this.blnilterstrSubsidiary_Address=false;
        this.blnilterdtmModified_Date=false;
        this.blnilterdstrModified_User=false;
    }
    if(val.property=="strSubsidiary_Desc"){
        this.clickColumn="strSubsidiary_Desc";
        this.blnilterstrSubsidiary_Cod=false;
        this.blnilterstrSubsidiary_Desc=true;
        this.blnilterstrSubsidiary_Address=false;
        this.blnilterdtmModified_Date=false;
        this.blnilterdstrModified_User=false;
    }
    if(val.property=="strSubsidiary_Address"){
        this.clickColumn="strSubsidiary_Address";
        this.blnilterstrSubsidiary_Cod=false;
        this.blnilterstrSubsidiary_Desc=false;
        this.blnilterstrSubsidiary_Address=true;
        this.blnilterdtmModified_Date=false;
        this.blnilterdstrModified_User=false;
    }
    if(val.property=="dtmModified_Date"){
        this.clickColumn="dtmModified_Date";
        this.blnilterstrSubsidiary_Cod=false;
        this.blnilterstrSubsidiary_Desc=false;
        this.blnilterstrSubsidiary_Address=false;
        this.blnilterdtmModified_Date=true;
        this.blnilterdstrModified_User=false;
    }
    if(val.property=="strModified_User"){
        this.clickColumn="strModified_User";
        this.blnilterstrSubsidiary_Cod=false;
        this.blnilterstrSubsidiary_Desc=false;
        this.blnilterstrSubsidiary_Address=false;
        this.blnilterdtmModified_Date=false;
        this.blnilterdstrModified_User=true;
    }
    
  }
  filterstrSubsidiary_Cod(h,{column,$index}){
    if(this.blnilterstrSubsidiary_Cod){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterstrSubsidiary_Desc(h,{column,$index}){
    if(this.blnilterstrSubsidiary_Desc){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterstrSubsidiary_Address(h,{column,$index}){
    if(this.blnilterstrSubsidiary_Address){
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
    if(this.blnilterdstrModified_User){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
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
Buscar(){
  if(this.Column!=""){
    this.dialogBusquedaFilter=true;
    this.txtbuscar='';
  }
  else{
    this.$message('Seleccione columna')
  }
}
btnBuscar(){
  var data=Global.like(this.tableData1,this.clickColumn,this.txtbuscar)
  this.tableData=[];
  this.tableData=data;
  this.dialogBusquedaFilter=false;
}
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
            namepage:'',
            loading1:true,
            tableData:[],
            tableData1:[],
        }
    }
  
}
