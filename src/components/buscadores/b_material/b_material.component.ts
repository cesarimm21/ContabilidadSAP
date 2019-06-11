import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {ProductoModel} from '@/modelo/maestro/producto';
import productoService from '@/components/service/producto.service';

import { Notification } from 'element-ui';
import router from '@/router';
@Component({
  name: 'bmaterial',
  props: ['tipo']
})


export default class  BMaterialComponent extends Vue {

   //PAGINATION
   pagina:number =1;
   RegistersForPage:number = 5;
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

//   articuloService:ArticuloService=new ArticuloService()
//   //Servicios
//   categoriaService:CategoriaService=new CategoriaService();

  public productoModel:Array<ProductoModel>=[];
  public productoSelectModel:ProductoModel=new ProductoModel();

  constructor() {
    super();
    //this.load();
  }
  load(){
    productoService.GetAllProducto(this.tipo)
    .then(response=>{
      console.log('producto',response);
      this.productoModel=response;       
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
      //this.load();
    }
  }
  mounted (){
    //alert('mounted');
    this.load();
  }
}
