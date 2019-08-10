import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';
import {ControlPrecioModel} from '@/modelo/maestro/controlprecio';
import controlprecioService from '@/components/service/controlprecio.service';
import { Notification } from 'element-ui';
import router from '@/router';
import Global from '@/Global';
@Component({
  name: 'bcontrolprecio'
})

export default class  BControlPrecioComponent extends Vue {

   //PAGINATION
   pagina:number =1;
   RegistersForPage:number = 100;
   totalRegistros:number = this.RegistersForPage;
   CompleteData:any;
  //Busqueda
  formularioBusqueda:any={
    categoria:'CODIGO',
    descripcion:'',
    cambioPagina:55,};
  numeroPagina:number=20;
  //ComoboBox
  proveedorSupplier:Array<{id_categoria:string,nombre:string}>=[];
  valueCombo:string="";
  //Modelos
  articulos:any =[];
  public controlprecioModel:Array<ControlPrecioModel>=[];
  public controlprecioModel1:Array<ControlPrecioModel>=[];
  public controlprecioSelectModel:ControlPrecioModel=new ControlPrecioModel();
  blnilterstrCtlPrec_Cod:boolean=true;
  blnilterstrCtlPrec_Desc:boolean=false;
  clickColumn:string='';
  Column:string='';
  inputAtributo:any;
  loading1:boolean=true;
  constructor() {
    super();
    setTimeout(() => {
      this.load();
    }, 400)  
  }
  load(){
    controlprecioService.GetAllControlPrecio2()
    .then(response=>{
      this.controlprecioModel=response;       
      this.controlprecioModel1=response;  
      this.loading1=false;     
    }).catch(error=>{
      this.loading1=false;     
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar control precio'
      });
    })
  }
  redirectLogin(msg){
    Notification.warning(msg)
    window.sessionStorage.clear();
    router.push('/')
  }
  beforeMount(){
    this.getProveedorSupplier()
  }
  cambioPagina(){
    this.articulos = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
  }
  seleccionarProveedor(index, rows){
    this.$emit('controlprecioseleccionado',rows[index]);
  }
  CerrarVentana(){
    this.$emit('cerrarVentanaRoles', 'Close Dialog');
    this.cleanData();
  }
  cleanData(){
    this.formularioBusqueda.VALUE = '';
  }
  getProveedorSupplier(){ }
  cambioCategoria(value){
    this.formularioBusqueda.proveedorSupplier=value;
  }
  seleccionar(row,index){
    this.$emit('controlprecioselecionado',row);
  }
  getNumberFloat(number){
    var num = parseFloat(number).toFixed(2);
    return num;
  }
  openMessageError(strMessage:string){
    this.$message({
        showClose: true,
        type: 'error',
        message: strMessage
      });
  }
  handleCurrentChange(val:ControlPrecioModel){
    this.controlprecioSelectModel=val;
  }
  checkPopup(){
    debugger;
    this.$emit('controlprecioselecionado',this.controlprecioSelectModel);
  }
  closePopup(){
    this.$emit('controlprecioClose');
  }
  buscarControlPrecio(){
    if(this.inputAtributo!=''){
      var data=Global.like(this.controlprecioModel1,this.clickColumn,this.inputAtributo)
      this.controlprecioModel=[];
      this.controlprecioModel=data;
    }
    else{
      this.controlprecioModel=[];
      this.controlprecioModel=this.controlprecioModel1;
    }
  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strCtlPrec_Cod"){
      this.clickColumn=val.property;  
      this.inputAtributo='';  
      this.blnilterstrCtlPrec_Cod=true;
      this.blnilterstrCtlPrec_Desc=false;
    }
    if(val.property=="strCtlPrec_Desc"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrCtlPrec_Cod=false;
      this.blnilterstrCtlPrec_Desc=true;
    }
  }
  filterstrCtlPrec_Cod(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnilterstrCtlPrec_Cod){
      this.Column=column1;
      this.clickColumn=column.property;
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [  h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),
        h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label),
       ])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterstrCtlPrec_Desc(h,{column,$index}){
    if(this.blnilterstrCtlPrec_Desc){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [  h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),
        h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label),
       ])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  data() {
    return {
      controlprecioModel:[],
      controlprecioModel1:[],
      inputAtributo:'',
      loading1:true
  };
  }
}
