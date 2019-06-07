import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {ProductoModel} from '@/modelo/maestro/producto';
import productoService from '@/components/service/producto.service';

import { Notification } from 'element-ui';
import router from '@/router';
@Component({
  name: 'bmaterial'
})


export default class  BMaterialComponent extends Vue {

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

//   articuloService:ArticuloService=new ArticuloService()
//   //Servicios
//   categoriaService:CategoriaService=new CategoriaService();

  productoModel:ProductoModel[];
  productoModel1:ProductoModel[];
  public productoSelectModel:ProductoModel=new ProductoModel();

  blnilterstrStock_Cod:boolean=true;
  blnilterstrStock_Desc:boolean=false;
  clickColumn:string='';
  Column:string='';
  inputAtributo:any;
  constructor() {
    super();
    this.load();
  }
  load(){
    productoService.GetAllProducto()
    .then(response=>{
      this.productoModel=[];
      this.productoModel1=[];
      this.productoModel=response;       
      this.productoModel1=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar producto'
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

  buscarProveedor(){
    this.bind();
  }

  bind(){
    // var query=this.formularioBusqueda.categoria+"like '%"+this.formularioBusqueda.descripcion+"%'";
    // var order="CODIGO asc";

    // var query=this.formularioBusqueda.categoria+" like '%"+this.formularioBusqueda.descripcion+"%'";
    // var order= this.formularioBusqueda.categoria+" asc";
    // var form = {
    //   C_IN:this.numeroPagina,
    //   ID_Q:7,
    //   WHERE_Q:query,
    //   ORDER_BY_Q:order
    // };
    // let loadingInstancePdf = Loading.service({
    //   fullscreen: true ,
    //   spinner: 'el-icon-loading',
    //   text:'Cargando cartas...'
    // });

    // this.articuloService.getArticulosv2(form)
    // .then(response =>{
    //   this.CompleteData = response;
    //   this.totalRegistros = response.length;
    //   this.articulos = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    //   loadingInstancePdf.close();
    // })
    // .catch(e =>{
    //   console.log(e);
    //   if(e.response.status === 404){ // token no valido
    //     this.redirectLogin('Tiempo de session a expirado, Vuelva a Iniciar Sesion');
    //   }
    //   else{
    //     this.openMessageError('Error al buscar proveedor');
    //   }
    //   loadingInstancePdf.close();
    // })
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
  like(array, key,keyword) {
    
    var responsearr:any = []
    for(var i=0;i<array.length;i++) {
        if(array[i][key].toString().indexOf(keyword) > -1 ) {
          responsearr.push(array[i])
      }
    }
    return responsearr
  }
  buscarMaterial(){
    console.log(this.clickColumn+' y '+this.inputAtributo);
    
    var data=this.like(this.productoModel1,this.clickColumn,this.inputAtributo)
    console.log(data);
    
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
      categorias: [{
        id_categoria:0,
        nombre: 'CODIGO',
        label: 'CODIGO'
      }, {
        id_categoria:1,
        nombre: 'ID',
        label: 'ID'
      },
      {
        id_categoria:2,
        nombre: 'TITULO',
        label: 'TITULO'
      }
    ],
    
    dataTable:[{
      Stock_Cod :'60155170',
      Stock_Name :'',
      Stock_Desc:'TIRE,45/65R45,RADIAL,',
      Exp_Acct:''
    },
    {
      Stock_Cod :'60155177',
      Stock_Name :'',
      Stock_Desc:'TIRE,35/65R33,RADIAL,XLD D2A L-5 TREAD,1',
      Exp_Acct:''
    },
    ]

    };
  }
  created() {
    if(typeof window != 'undefined') {
      this.bind();
    }
  }
}
