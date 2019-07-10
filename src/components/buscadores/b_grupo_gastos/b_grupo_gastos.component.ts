import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {GrupoGastosModel} from '@/modelo/maestro/grupogastos';
import grupogastosService from '@/components/service/grupogastos.service';
import { Notification } from 'element-ui';
import router from '@/router';
import Global from '@/Global';
@Component({
  name: 'bgrupogastos'
})

export default class  BGrupoCuentaGastosComponent extends Vue {

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
  public cuentacontableModel:Array<GrupoGastosModel>=[];
  public cuentacontableModel1:Array<GrupoGastosModel>=[];
  public cuentacontableSelectModel:GrupoGastosModel=new GrupoGastosModel();
  blnfilterstrExpGroup_Cod:boolean=true;
  blnfilterstrExpGroup_Name:boolean=false;
  blnfilterstrExpGroup_Desc:boolean=false;
  clickColumn:string='';
  Column:string='';
  public search:GrupoGastosModel=new GrupoGastosModel();
  inputAtributo:any;
  constructor() {
    super();
    setTimeout(() => {
      this.load();
    }, 200)
  }
  load(){
    grupogastosService.GetAllGrupoGastos()
    .then(response=>{
      this.cuentacontableModel=response;   
      this.cuentacontableModel1=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar los almacenes'
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
    this.$emit('cartaSelecionado',rows[index]);
  }
  CerrarVentana(){
    this.$emit('cerrarVentanaRoles', 'Close Dialog');
    this.cleanData();
  }
  cleanData(){
    this.formularioBusqueda.VALUE = '';
  }
  getProveedorSupplier(){  }

  cambioCategoria(value){
    this.formularioBusqueda.proveedorSupplier=value;
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
  seleccionar(row,index){
    this.$emit('grupogastosselecionado',row);
  }
  handleCurrentChange(val:GrupoGastosModel){
    this.cuentacontableSelectModel=val;
  }
  checkPopup(){
    debugger;
    this.$emit('grupogastosselecionado',this.cuentacontableSelectModel);
  }
  closePopup(){
    this.$emit('close');
  }  
  
  filterstrExpGroup_Cod(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnfilterstrExpGroup_Cod){
      this.Column=column1;
      this.clickColumn=column.property;
      this.search=new GrupoGastosModel();
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
  filterstrExpGroup_Name(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnfilterstrExpGroup_Name){
      this.Column=column1;
      this.clickColumn=column.property;
      this.search=new GrupoGastosModel();
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
  filterstrExpGroup_Desc(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnfilterstrExpGroup_Desc){
      this.Column=column1;
      this.clickColumn=column.property;
      this.search=new GrupoGastosModel();
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
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strExpGroup_Cod"){
      this.clickColumn=val.property;  
      this.search=new GrupoGastosModel();  
      this.inputAtributo='';  
      this.blnfilterstrExpGroup_Cod=true;
      this.blnfilterstrExpGroup_Name=false;
      this.blnfilterstrExpGroup_Desc=false;
    }
    if(val.property=="strExpGroup_Name"){
      this.clickColumn=val.property;
      this.search=new GrupoGastosModel();
      this.inputAtributo='';
      
      this.blnfilterstrExpGroup_Cod=false;
      this.blnfilterstrExpGroup_Name=true;
      this.blnfilterstrExpGroup_Desc=false;
    }
    if(val.property=="strExpGroup_Desc"){
      this.clickColumn=val.property;
      this.search=new GrupoGastosModel();
      this.inputAtributo='';
      
      this.blnfilterstrExpGroup_Cod=false;
      this.blnfilterstrExpGroup_Name=false;
      this.blnfilterstrExpGroup_Desc=true;
    }
  }
  buscarfilter(){
    var data=Global.like(this.cuentacontableModel1,this.clickColumn,this.inputAtributo)
    this.cuentacontableModel=[];
    this.cuentacontableModel=data;
  }

  data() {
    return {
      cuentacontableModel:[],
      cuentacontableModel1:[],
      inputAtributo:''
    };
  }
}
