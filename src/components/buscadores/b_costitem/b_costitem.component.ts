import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {CostItemModel} from '@/modelo/maestro/costitem';
import costitemService from '@/components/service/costitem.service';
import { Notification } from 'element-ui';
import router from '@/router';
import Global from '@/Global';
@Component({
  name: 'bcostitem'
})

export default class  BCostItemComponent extends Vue {

   //PAGINATION
   pagina:number =1;
   RegistersForPage:number = 5;
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

  public tabla:Array<CostItemModel>=[];
  public tabla1:Array<CostItemModel>=[];
  public costitemSelectModel:CostItemModel=new CostItemModel();
//   articuloService:ArticuloService=new ArticuloService()
//   //Servicios
//   categoriaService:CategoriaService=new CategoriaService();

  blnfilterstrCost_Item_Cod:boolean=true;
  blnfilterstrCost_Item_Pos1:boolean=false;
  blnfilterstrCost_Item_Desc1:boolean=false;
  clickColumn:string='';
  Column:string='';

  public search:CostItemModel=new CostItemModel();
  inputAtributo:any;
  constructor() {
    super();
    setTimeout(() => {
      this.load();
    }, 200)
  }
  load(){
    costitemService.GetAllCostItem()
    .then(response=>{ 
      this.tabla=response; 
      this.tabla1=response;       
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
  getProveedorSupplier(){ }
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
    this.$emit('costitemselecionado',row);
  }
  handleCurrentChange(val){
    this.costitemSelectModel=val;
  }
  checkPopup(){
    debugger;
    this.$emit('costitemselecionado',this.costitemSelectModel);
  }
  closePopup(){
    this.$emit('close');
  }
  
  filterstrCost_Item_Cod(h,{column,$index}){
    debugger;
    var column1 = column.label; 
    if(this.blnfilterstrCost_Item_Cod){
      this.Column=column1;
      this.clickColumn=column.property;
      this.search=new CostItemModel();
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
  filterstrCost_Item_Pos1(h,{column,$index}){
    debugger;
    var column1 = column.label; 
    if(this.blnfilterstrCost_Item_Pos1){
      this.Column=column1;
      this.clickColumn=column.property;
      this.search=new CostItemModel();
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
  filterstrCost_Item_Desc1(h,{column,$index}){
    debugger;
    var column1 = column.label; 
    if(this.blnfilterstrCost_Item_Desc1){
      this.Column=column1;
      this.clickColumn=column.property;
      this.search=new CostItemModel();
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
    if(val.property=="strCost_Item_Cod"){
      this.clickColumn=val.property;  
      this.search=new CostItemModel();  
      this.inputAtributo='';  
      this.blnfilterstrCost_Item_Cod=true;
      this.blnfilterstrCost_Item_Pos1=false;
      this.blnfilterstrCost_Item_Desc1=false;
    }
    if(val.property=="strCost_Item_Pos1"){
      this.clickColumn=val.property;
      this.search=new CostItemModel();
      this.inputAtributo='';
      this.blnfilterstrCost_Item_Cod=false;
      this.blnfilterstrCost_Item_Pos1=true;
      this.blnfilterstrCost_Item_Desc1=false;
    }
    if(val.property=="strCost_Item_Desc1"){
      this.clickColumn=val.property;
      this.search=new CostItemModel();
      this.inputAtributo='';
      this.blnfilterstrCost_Item_Cod=false;
      this.blnfilterstrCost_Item_Pos1=false;
      this.blnfilterstrCost_Item_Desc1=true;
    }
  }
  buscarfilterCuenta(){
    var data=Global.like(this.tabla1,this.clickColumn,this.inputAtributo)   
    this.tabla=[];
    this.tabla=data;
  }
  data() {
    return {
      cuentacontableModel:[],
      tabla:[],
      tabla1:[],
      inputAtributo:''
    };
  }
}
