import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import { Notification } from 'element-ui';
import router from '@/router';
@Component({
  name: 'bcompania'
})

export default class  BCompaniaProveedor extends Vue {

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

  constructor() {
    super();
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
    debugger;
    console.log("doble",row);
    this.$emit('proveedorSeleccionado',row);
  }
  data() {
    return {
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
    ]
    ,
    dataTable:[{
        Code:'1001',
        Company_Name:'GADEL SOLUTIONS S.R.L.',
        Company_Desc:'GADEL SOLUTIONS S.R.L.',
        RUC:'20434853771',
      },
      {
        Code:'1002',
        Company_Name:'B&Y SOLUTIONS S.R.L.',
        Company_Desc:'B&Y SOLUTIONS S.R.L.',
        RUC:'50434853771',
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
