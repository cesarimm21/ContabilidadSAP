import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import { Notification } from 'element-ui';
import router from '@/router';
import {CompaniaModel} from '@/modelo/maestro/compania';
import companiaService from '@/components/service/compania.service';

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

  public companiaModel:Array<CompaniaModel>[];
  public companiaSelectModel:CompaniaModel=new CompaniaModel();
  constructor() {
    super();
    this.loadCompania();
    
  }
  loadCompania(){
    companiaService.GetAllCompania()
    .then(response=>{
      this.companiaModel=response;    
      console.log(this.companiaModel);
      
      
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar proveedores'
      });
    })
  }

  handleCurrentChange(val:CompaniaModel){
    this.companiaSelectModel=val;
  }

  checkCompania(){
    this.$emit('companiaSeleccionado',this.companiaSelectModel);
  }
  closeCompania(){
    this.$emit('companiaClose');
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
    debugger;
    console.log("doble",row);
    this.$emit('companiaSeleccionado',row);
    this.$emit('proveedorSeleccionado',row);
  }
  data() {
    return {
      companiaModel:[],
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
