import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import {ProveedorModel} from '../../../../modelo/maestro/proveedor';
import { Notification } from 'element-ui';
import proveedorService from '@/components/service/proveedor.service'
import companiaService from '@/components/service/compania.service';
import paisService from '@/components/service/pais.service';
import bancoService from '@/components/service/banco.service';
import tipodocidentidadService from '@/components/service/tipodocidentidad.service';
import departamentoService from '@/components/service/departamento.service';
import monedaService from '@/components/service/moneda.service';
import categoriaService from '@/components/service/categoria.service';

import {CompaniaModel} from '@/modelo/maestro/compania';
import {PaisModel} from '@/modelo/maestro/pais';
import {BancoModel} from '@/modelo/maestro/banco';
import {TipoDocIdentidadModel} from '@/modelo/maestro/tipodocidentidad';
import {DepartamentoModel} from '@/modelo/maestro/departamento';
import {MonedaModel} from '@/modelo/maestro/moneda';
import {CategoriaModel} from '@/modelo/maestro/categoria';
@Component({
  name: 'crear-proveedor'
})
export default class CrearProveedorComponent extends Vue {
 
  dialogVisible:boolean=false;
  SendDocument:boolean=false;
  btnactivarproveedor:boolean=false;  
  public Proveedor:ProveedorModel =new ProveedorModel();
  nameTipoJoN:string='';
  VisibleForName:boolean=true;
  ApellidosShow:boolean=false;
//   ****
  AddressCalle:string;
  AddressNumero:string;
  AddressDprto:string;
  AddressOf:string;
  AddressLote:string;
  RucOrDni:string;
  //** */
  value:any;
  value1:any;

  //**Compania */
  public Compania:CompaniaModel=new CompaniaModel();
  codigoCompania:string;
  descripcionCompania:string;
  //**Pais */
  public Pais:PaisModel=new PaisModel();
  public gridSelectPais:PaisModel=new PaisModel();
  paisVisible:boolean=false;
  btnactivarpais:boolean=false;
  //**Banco */
  public Banco:BancoModel=new BancoModel();
  public selectBanco:BancoModel=new BancoModel();

  bancoVisible:boolean=false;
  btnactivarbanco:boolean=false;
  //**Proveedor */
  public gridProveedor: ProveedorModel =new ProveedorModel();
  public gridSelectedProveedor:ProveedorModel=new ProveedorModel();
  //***Tipo documento */
  public tipoDocIdentidad:TipoDocIdentidadModel=new TipoDocIdentidadModel();
  tipodocVisible:boolean=false;
  public tipoDocSelectedIdentidad:TipoDocIdentidadModel=new TipoDocIdentidadModel();

  //**Departamento */
  public Departamento:DepartamentoModel=new DepartamentoModel();
  departVisible:Boolean=false;
  public selectDepartamento:DepartamentoModel=new DepartamentoModel();
  //**Moneda */
  public Moneda:MonedaModel=new MonedaModel();
  monedaVisible:boolean=false;
  public selectMoneda:MonedaModel=new MonedaModel();
  //**Categoria */
  public Categoria: CategoriaModel=new CategoriaModel();
  constructor(){
    super();
    this.loadPais();
    this.loadBanco();
    this.loadCompania();
    this.GetAllProveedor();
    this.GetAllTipoDocumento();
    this.GetAllDepartamento();
    this.GetAllMoneda();
    this.GetAllCategoria();
  }
  loadCompania(){
    companiaService.GetAllCompania()
    .then(response=>{
      this.Compania=response.data;  
      this.codigoCompania=this.Compania[0].strCompany_Cod;
      this.descripcionCompania=this.Compania[0].strCompany_Name;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar lista compania'
      });
    })
  }
  //#region [PAIS]
  //**Pais */
  loadPais(){
    paisService.GetAllCompania()
    .then(response=>{
      this.Pais=response.data;
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar lista de paises'
      });
    })
  }

  paisDialog(){
    debugger;
    this.paisVisible=true;
  }
  activar_pais(){
    this.btnactivarpais=true;
  }
  desactivar_pais(){
    debugger;
    this.btnactivarpais=false;
    this.paisVisible=true;
  }
  handleClosePais(){
    this.paisVisible=false;
    this.gridSelectPais=new PaisModel();
  }
  paisSelect(val:PaisModel){
    this.gridSelectPais=val;
  }
  paisChosseCheck(){
    this.paisVisible=false;
  }
  paisChosseClose(){
    this.paisVisible=false;
    this.gridSelectPais=new PaisModel();
  }
  //#endregion

  //#region [BANCO]
  loadBanco(){
    bancoService.GetAllBanco()
    .then(response=>{
      this.Banco=response.data;
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar lista de Banco'
      });
    })
  }
  bancoDialog(){
    this.bancoVisible=true;
  }
  handleCloseBanco(){
    this.bancoVisible=false;
    this.selectBanco=new BancoModel();
  }
  activar_banco(){
    this.btnactivarbanco=true;
  }
  desactivar_banco(){
    debugger;
    this.btnactivarbanco=false;
    this.bancoVisible=true;
  }
  bancoChosseCheck(){
    this.bancoVisible=false;
  }
  bancoChosseClose(){
    this.selectBanco=new BancoModel();
    this.bancoVisible=false;
  }
  bancoSelect(val:BancoModel){
    this.selectBanco=val;
    // debugger;
  }
  //#endregion
  //#region [Proveedor]
  GetAllProveedor(){
    proveedorService.GetAllProveedor()
    .then(response=>{
      this.gridProveedor=response;
      
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar lista de proveedores'
      })
    })
  }
  loadProveedores(){
    this.dialogVisible=true;
  }
  proveedorSelect(val:ProveedorModel){
    this.gridSelectedProveedor=val;
  }
  //#endregion

  //#region [Tipo Documento]
  GetAllTipoDocumento(){      
    tipodocidentidadService.GetAllTipoDocumento()
    .then(response=>{
      this.tipoDocIdentidad=response;
    })
  }  
  handleCloseTipoDoc(){
    this.tipodocVisible=false;
    this.tipoDocSelectedIdentidad=new TipoDocIdentidadModel();
  }
  tipodocSelect(val:TipoDocIdentidadModel){
    this.tipoDocSelectedIdentidad=val;
  }
  tipoDocChosseCheck(){
    this.tipodocVisible=false;
  }
  tipoDocChosseClose(){
    this.tipodocVisible=false;
    this.tipoDocSelectedIdentidad=new TipoDocIdentidadModel();
  }
  loadTipoDoc(){
    this.tipodocVisible=true;
  }
  //#endregion

  //#region  [Departamento]
  GetAllDepartamento(){
    departamentoService.GetAllDepartamento()
    .then(response=>{
      this.Departamento=response;
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se puede cargar lista de departamento'
      });
    })
  }
  handleCloseDepart(){
    this.departVisible=false;
    this.selectDepartamento=new DepartamentoModel();
  }
  departSelect(val:DepartamentoModel){
    this.selectDepartamento=val;
  }
  departChosseCheck(){
    this.departVisible=false;
  }
  departChosseClose(){
    this.departVisible=false;
    this.selectDepartamento=new DepartamentoModel();
  }
  departDialog(){
    this.departVisible=true;
  }
  //#endregion
  //#region [MONEDA]
  GetAllMoneda(){
    monedaService.GetAllMoneda()
    .then(response=>{
      this.Moneda=response;      
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se puede cargar lista de moneda'
      });
    })
  }
  monedaDialog(){
    this.monedaVisible=true;
    
  }
  handleCloseMoneda(){
    this.monedaVisible=false;
    this.selectMoneda=new MonedaModel();
  }
  monedaSelect(val:MonedaModel){
    this.selectMoneda=val;
    console.log(this.selectMoneda);
    
  }
  monedaChosseCheck(){
    this.monedaVisible=false;
  }
  monedaChosseClose(){
    this.monedaVisible=false;
    this.selectMoneda=new MonedaModel();
  }
  //#endregion
  GetAllCategoria(){
    categoriaService.GetAllCategoria()
    .then(response=>{
      this.Categoria=response;
      this.value1=this.Categoria[0].intIdVenCateg_ID;
      this.selectCategoria(this.value1);
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar lista categoria'
      });
    })
  }
  selectCategoria(val){
    debugger;
      this.VisibleForName=true;
      if(val===1){
        this.nameTipoJoN='Razon social';
        this.RucOrDni='RUC';
        this.ApellidosShow=false;
      }
      if(val===2){
        this.nameTipoJoN='Nombres';
        this.RucOrDni='DNI';
        this.ApellidosShow=true;
      }
  }
  SaveProveedor(){
    // if(this.value1)
    this.Proveedor.intIdCompany_ID=this.Compania[0].strCompany_Cod;
    let loadingInstance = Loading.service({
      fullscreen: true,
      text: 'Guargando...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
      );

    this.Proveedor.intIdCompany_ID=this.value;
    if(this.value1===1){
      this.Proveedor.strCat_Person='Jurídica'
    }
    if(this.value1===2){
      this.Proveedor.strCat_Person='Natural'
    }  
    this.Proveedor.strAddress=this.AddressCalle+' '+this.AddressNumero+' Dprto '+this.AddressDprto+' of. '+this.AddressOf+' Mza. '+this.AddressLote
    
    proveedorService.putProveedor(this.Proveedor)
    .then(response=>{
      loadingInstance.close();
      this.openMessageSuccess('Se guardo correctamente'+response);
      this.Proveedor=new ProveedorModel();
    })
    .catch(e =>{
      debugger;
      this.openMessageError('Error guardar proveedor');
      loadingInstance.close();
    })    
      
  }
  openMessageError(strMessage:string){
    this.$message({
        showClose: true,
        type: 'error',
        message: strMessage
      });
  }
  openMessageSuccess(strMessage:string){
    this.$message({
        showClose: true,
        type: 'success',
        message: strMessage
      });
  }
  handleClose(){
    // this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
    //     confirmButtonText: 'OK',
    //     cancelButtonText: 'Cancel',
    //     type: 'warning'
    //   }).then(() => {
    //     this.$message({
    //       type: 'success',
    //       message: 'Delete completed'
    //     });
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: 'Delete canceled'
    //     });          
    //   });
  }
  activar_proveedor(){
    debugger;
    this.btnactivarproveedor=true;
  }
  desactivar_proveedor(){
    debugger;
    this.btnactivarproveedor=false;
  }
  data(){
    return{
      dialogTableVisible: false,
      dialogVisible:false,
      AddressCalle:'',
      AddressNumero:'',
      AddressDprto:'',
      AddressOf:'',
      AddressLote:'',
      RucOrDni:'',
      VisibleForName:true,
      ApellidosShow:false,
      
      tableData: [{
        date: '0001',
        name: 'Ferreyros'
      }, {
        date: '0002',
        name: 'Yura SAC'
      }, {
        date: '0003',
        name: 'Signal company'
      }, {
        date: '0004',
        name: 'Cruz del Sur'
      }
      , {
        date: '0005',
        name: 'Tisur'
      }, {
        date: '0006',
        name: 'Seguro'
      }, {
        date: '0007',
        name: 'Cruz del Sur'
      }, {
        date: '0008',
        name: 'Cruz del Sur'
      }, {
        date: '0009',
        name: 'Cruz del Sur'
      }, {
        date: '0010',
        name: 'Linea'
      }, {
        date: '0011',
        name: 'Cruz del Sur'
      }],
      user: {
        authenticated: false
      },
      categoria: [{
        value: '1',
        label: 'Juridica'
      }, {
        value: '2',
        label: 'Natural'
      }],
      value: '',
      value1:'',
      data:{
        Usuario:localStorage.getItem('User_Nombre'),
      },
      accesosUser: [],
      hours: 0,
      minutos:0,
      seconds:0
    }
  }
  
}
