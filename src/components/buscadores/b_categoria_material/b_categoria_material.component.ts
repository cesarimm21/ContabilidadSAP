import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';


import {CategoriaMaterialModel} from '@/modelo/maestro/categoriamaterial';
import categoriamaterialService from '@/components/service/categoriamaterial.service';
import { Notification } from 'element-ui';
import router from '@/router';
@Component({
  name: 'bcategoriamaterial'
})

export default class  BCategoriaMaterialComponent extends Vue {

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
  public categoriamaterialModel:Array<CategoriaMaterialModel>=[];
  public categoriamaterialSelectModel:CategoriaMaterialModel=new CategoriaMaterialModel();


  constructor() {
    super();
    this.load();
  }
  load(){
    categoriamaterialService.GetAllCategoriaMaterial()
    .then(response=>{
      console.log('categoriamaterial',response);
      this.categoriamaterialModel=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar categoria material'
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
    this.$emit('clasematerialseleccionado',rows[index]);
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

  seleccionar(row,index){
    this.$emit('categoriamaterialseleccionado',row);
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
  handleCurrentChange(val:CategoriaMaterialModel){
    this.categoriamaterialSelectModel=val;
  }
  checkPopup(){
    debugger;
    this.$emit('categoriamaterialseleccionado',this.categoriamaterialSelectModel);
  }
  closePopup(){
    this.$emit('categoriamaterialClose');
  }
  data() {
    return {
      categoriamaterialModel:[],
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
      CODIGO :'CC',
      DESCRIPCION:'CENTRO DE COSTO',
    },
    {
      CODIGO :'PY',
      DESCRIPCION:'PROYECTO',
    },
    {
      CODIGO :'FA',
      DESCRIPCION:'ACTIVOS FIJO',
    },
    {
      CODIGO :'ST',
      DESCRIPCION:'ALMACEN',
    },
    {
      CODIGO :'CB',
      DESCRIPCION:'CUENTA DE BALANCE',
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
