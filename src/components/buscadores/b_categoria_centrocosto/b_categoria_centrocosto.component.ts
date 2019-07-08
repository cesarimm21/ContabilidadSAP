import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {CategoriaCentroCostoModel} from '@/modelo/maestro/categoriacentrocosto';
import categoriacentrocostoService from '@/components/service/categoriacentrocosto.service';
import { Notification } from 'element-ui';
import router from '@/router';
import Global from '@/Global';
@Component({
  name: 'bcategoriacentrocosto'
})

export default class  BCategoriaCentroCostoComponent extends Vue {

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

  public cuentacontableModel:Array<CategoriaCentroCostoModel>=[];
  public cuentacontableModel1:CategoriaCentroCostoModel[];
  inputAtributo:string='';
  clickColumn:string='';
  Column:string='';
  blnilterstrCCCategory_Cod:boolean=false;
  blnilterstrCCCategory_Desc:boolean=false;
  public cuentacontableSelectModel:CategoriaCentroCostoModel=new CategoriaCentroCostoModel();
//   articuloService:ArticuloService=new ArticuloService()
//   //Servicios
//   categoriaService:CategoriaService=new CategoriaService();

  constructor() {
    super();
    setTimeout(() => {
      this.load();
    }, 200)
  }
  load(){
    debugger
    categoriacentrocostoService.GetAllCategoria()
    .then(response=>{
      debugger
      console.log('grupogastos',response);
      this.cuentacontableModel=response;       
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
  buscarCentroCostos(){
    var data=Global.like(this.cuentacontableModel1,this.clickColumn,this.inputAtributo)
    this.cuentacontableModel=[];
    this.cuentacontableModel=data;
  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strCCCategory_Cod"){
      this.clickColumn=val.property;  
      this.inputAtributo='';  
      this.blnilterstrCCCategory_Cod=true;
      this.blnilterstrCCCategory_Desc=false;
    }
    if(val.property=="strCCCategory_Desc"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrCCCategory_Cod=false;
      this.blnilterstrCCCategory_Desc=true;
    }
  }
  filterstrCCCategory_Cod(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnilterstrCCCategory_Cod){
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
  filterstrCCCategory_Desc(h,{column,$index}){
    if(this.blnilterstrCCCategory_Desc){
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
    this.$emit('categoriacentrocostoseleccionado',row);
  }
  handleCurrentChange(val){
    this.cuentacontableSelectModel=val;
  }
  checkPopup(){
    debugger;
    this.$emit('categoriacentrocostoseleccionado',this.cuentacontableSelectModel);
  }
  closePopup(){
    this.$emit('closecategoriacentrocosto');
  }
  data() {
    return {
      cuentacontableModel:[],
      cuentacontableModel1:[],
      inputAtributo:''
    };
  }
}
