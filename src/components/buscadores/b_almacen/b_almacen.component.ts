import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {AlmacenModel} from '@/modelo/maestro/almacen';
import almacenService from '@/components/service/almacen.service';
import { Notification } from 'element-ui';
import router from '@/router';
import Global from '@/Global';
@Component({
  name: 'balmacen'
})

export default class  BAlmacenComponent extends Vue {

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
  almacenModel:AlmacenModel[];
  almacenModel1:AlmacenModel[];
  public almacenSelectModel:AlmacenModel=new AlmacenModel();
  blnilterstrWHS_Cod:boolean=true;
  blnilterstrWHS_Name:boolean=false;
  blnilterstrLocation:boolean=false;
  clickColumn:string='';
  Column:string='';
  inputAtributo:any;
  companyCod:any;
  loading1:boolean=true;
  constructor() {
    super();
    setTimeout(() => {
      this.loadAlmacen();
    }, 400)    
  }
  loadAlmacen(){
    this.companyCod=localStorage.getItem('compania_cod');
    almacenService.GetAllAlmacen(this.companyCod)
    .then(response=>{
      this.almacenModel=[];       
      this.almacenModel1=[];       
      this.almacenModel=response;       
      this.almacenModel1=response;   
      this.loading1=false;    
    }).catch(error=>{
      this.loading1=false; 
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
  getProveedorSupplier(){
  }
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
    this.$emit('almacenseleccionado',row);
  }
  checkCompania(){
    this.$emit('almacenseleccionado',this.almacenSelectModel);
  }
  closeAlmacen(){
    this.$emit('closeAlmacen');
  }  
  handleCurrentChange(val:AlmacenModel){
    this.almacenSelectModel=val;
  }
  buscarAlmacen(){
    var data=Global.like(this.almacenModel1,this.clickColumn,this.inputAtributo)
    this.almacenModel=[];
    this.almacenModel=data;
  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strWHS_Cod"){
      this.clickColumn=val.property;  
      this.inputAtributo='';  
      this.blnilterstrWHS_Cod=true;
      this.blnilterstrWHS_Name=false;
      this.blnilterstrLocation=false;
    }
    if(val.property=="strWHS_Name"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrWHS_Cod=false;
      this.blnilterstrWHS_Name=true;
      this.blnilterstrLocation=false;
    }
    if(val.property=="strLocation"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrWHS_Cod=false;
      this.blnilterstrWHS_Name=false;
      this.blnilterstrLocation=true;
    }
  }
  filterstrWHS_Cod(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnilterstrWHS_Cod){
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
  filterstrWHS_Name(h,{column,$index}){
    if(this.blnilterstrWHS_Name){
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
  filterstrLocation(h,{column,$index}){
    if(this.blnilterstrLocation){
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
      almacenModel:[],
      almacenModel1:[],
      inputAtributo:'',
      Column:'',
      companyCod:'',
      loading1:true

    };
  }
}
