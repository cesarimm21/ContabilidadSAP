import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';
import {ProveedorModel} from '@/modelo/maestro/proveedor';
import proveedorService from '@/components/service/proveedor.service';
import { Notification } from 'element-ui';
import router from '@/router';
import Global from '@/Global';
@Component({
  name: 'bproveedor'
})

export default class  BProveedorComponent extends Vue {

   //PAGINATION
   pagina:number =1;
   RegistersForPage:number = 5;
   totalRegistros:number = this.RegistersForPage;
   codigoCompania:any;
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
  public proveedorModel:Array<ProveedorModel>=[];
  public proveedorSelectModel:ProveedorModel=new ProveedorModel();

  constructor() {
    super();
    setTimeout(() => {
      this.load();
    }, 200)
  }
  load(){
    this.codigoCompania=localStorage.getItem('compania_cod');
    proveedorService.GetProveedoresCompany(this.codigoCompania)
    .then(response=>{
      this.proveedorModel=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar proveedor'
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
    this.proveedorSelectModel=row;
    this.$emit('proveedorselecionado',row);
    if(Global.nameComponent=='pagos-individual'){
      this.$emit('proveedorselecionado',this.proveedorSelectModel);
    }
  }

  handleCurrentChange(val:ProveedorModel){
    this.proveedorSelectModel=val;
  }
  checkPopup(){
    debugger;
    this.$emit('proveedorselecionado',this.proveedorSelectModel);
    if(Global.nameComponent=='pagos-individual'){
      this.$emit('proveedorselecionado',this.proveedorSelectModel);
    }
  }
  closePopup(){
    this.$emit('proveedorClose');
  }

  data() {
    return {
      codigoCompania:'',   
    };
  }
}
