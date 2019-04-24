import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {PlanCuentaModel} from '@/modelo/maestro/plancuenta';
import plancontableService from '@/components/service/planCuentaContable.service';
import { Notification } from 'element-ui';
import router from '@/router';
@Component({
  name: 'bplancontablelocal'
})

export default class  BPlanContableLocalComponent extends Vue {

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

  public cuentacontableModel:Array<PlanCuentaModel>=[];
  public cuentacontableSelectModel:PlanCuentaModel=new PlanCuentaModel();
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
    plancontableService.GetAllPlanCuenta()
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
    this.$emit('plancuentacontableselecionado',row);
  }
  handleCurrentChange(val){
    this.cuentacontableSelectModel=val;
  }
  checkPopup(){
    debugger;
    this.$emit('plancuentacontableselecionado',this.cuentacontableSelectModel);
  }
  closePopup(){
    this.$emit('plancuentacontableselecionadoClose');
  }
  data() {
    return {
      cuentacontableModel:[],
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
      Acc_NO_Local :'101000',
      Acct_NO_Corp:'M1110100',
      Nombre:'Petty Cash & Imprest',
    },
    {
      Acc_NO_Local :'101000',
      Acct_NO_Corp:'M1110101',
      Nombre:'Petty Cash Tintaya',
    },
    {
      Acc_NO_Local :'101000',
      Acct_NO_Corp:'M1110102',
      Nombre:'Petty Cash Arequipa',
    },
    {
      Acc_NO_Local :'101000',
      Acct_NO_Corp:'M1110103',
      Nombre:'Petty Cash Matarani',
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
