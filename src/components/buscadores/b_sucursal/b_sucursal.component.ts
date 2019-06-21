import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import {SucursalModel} from '@/modelo/maestro/sucursal';
import sucursalService from '@/components/service/sucursal.service';
import { Notification } from 'element-ui';
import router from '@/router';
@Component({
  name: 'bsucursal'
})

export default class  BSucursalComponent extends Vue {

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
//   articuloService:ArticuloService=new ArticuloService()
//   //Servicios
//   categoriaService:CategoriaService=new CategoriaService();
  public gridSucursal:Array<SucursalModel>=[];
  public sucursalSelect:SucursalModel=new SucursalModel();

  constructor() {
    super();
    this.load();
  }
  load(){
    sucursalService.GetAllsucursal()
    .then(response=>{
        this.gridSucursal=[];
      this.gridSucursal=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar planta'
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
    this.$emit('sucursalselecionado',row);
  }

  handleCurrentChange(val:SucursalModel){
    this.sucursalSelect=val;
  }
  checkPopup(){
    this.$emit('sucursalselecionado',this.sucursalSelect);
  }
  closePopup(){
    this.$emit('sucursalClose');
  }
  data() {
    return {
        gridSucursal:[],
      
    };
  }
}
