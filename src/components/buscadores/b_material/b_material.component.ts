import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {ProductoModel} from '@/modelo/maestro/producto';
import productoService from '@/components/service/producto.service';
import { Notification } from 'element-ui';
import router from '@/router';
import Global from '@/Global';
@Component({
  name: 'bmaterial',
  props: ['tipo']
})
export default class  BMaterialComponent extends Vue {
   //PAGINATION
   pagina:number =1;
   RegistersForPage:number = 100;
   totalRegistros:number = this.RegistersForPage;
   tipo:any;
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
  productoModel:ProductoModel[];
  productoModel1:ProductoModel[];
  public productoSelectModel:ProductoModel=new ProductoModel();
  blnilterstrStock_Cod:boolean=true;
  blnilterstrStock_Desc:boolean=false;
  clickColumn:string='';
  Column:string='';
  inputAtributo:any;
  company_cod:any='';
  loading1:boolean=true;
  constructor() {
    super();
    setTimeout(() => {
      this.load();
    }, 400)   
    //this.load();
  }
  load(){
    this.company_cod=localStorage.getItem('compania_cod');
    productoService.GetAllProducto(this.tipo,this.company_cod)
    .then(response=>{
      this.productoModel=[];
      this.productoModel1=[];
      this.productoModel=response;       
      this.productoModel1=response;
      this.loading1=false;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar producto'
      });
      this.loading1=false;
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
    this.$emit('materialselecionado',row);
  }
  

  handleCurrentChange(val:ProductoModel){
    this.productoSelectModel=val;
  }
  buscarMaterial(){
    var data=Global.like(this.productoModel1,this.clickColumn,this.inputAtributo)    
    this.productoModel=[];
    this.productoModel=data;
  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strStock_Cod"){
      this.clickColumn=val.property;  
      this.inputAtributo='';  
      this.blnilterstrStock_Cod=true;
      this.blnilterstrStock_Desc=false;
    }
    if(val.property=="strStock_Desc"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrStock_Cod=false;
      this.blnilterstrStock_Desc=true;
    }
  }
  filterstrStock_Cod(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnilterstrStock_Cod){
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
  filterstrStock_Desc(h,{column,$index}){
    if(this.blnilterstrStock_Desc){
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
  checkPopup(){
    debugger;
    this.$emit('materialselecionado',this.productoSelectModel);
  }
  closePopup(){
    this.$emit('materialClose');
  }
  data() {
    return {
      productoModel:[],
      productoModel1:[],
      inputAtributo:'',
      loading1:true
    };
  }
  mounted (){
    //alert('mounted');
    this.load();
  }
}
