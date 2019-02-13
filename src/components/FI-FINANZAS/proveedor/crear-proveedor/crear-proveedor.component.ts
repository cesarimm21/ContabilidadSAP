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
import impuestoService from '@/components/service/impuesto.service';

import {CompaniaModel} from '@/modelo/maestro/compania';
import {PaisModel} from '@/modelo/maestro/pais';
import {BancoModel} from '@/modelo/maestro/banco';
import {TipoDocIdentidadModel} from '@/modelo/maestro/tipodocidentidad';
import {DepartamentoModel} from '@/modelo/maestro/departamento';
import {MonedaModel} from '@/modelo/maestro/moneda';
import {CategoriaModel} from '@/modelo/maestro/categoria';
import {ImpuestoModel} from '@/modelo/maestro/impuesto';
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
  public selectBancoA:BancoModel=new BancoModel();
  public selectBancoB:BancoModel=new BancoModel();
  public selectBancoC:BancoModel=new BancoModel();
  public selectBancoD:BancoModel=new BancoModel();
  FLAGBANCO:String;

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
  public selectMonedaA:MonedaModel=new MonedaModel();
  public selectMonedaB:MonedaModel=new MonedaModel();
  public selectMonedaC:MonedaModel=new MonedaModel();
  public selectMonedaD:MonedaModel=new MonedaModel();
  FLAGMONEDA:String;
  //**Categoria */
  public Categoria: CategoriaModel=new CategoriaModel();

  //**Impuesto */
  public Impuesto:ImpuestoModel=new ImpuestoModel();
  impuestoVisible:boolean=false;
  public selectImpuesto:ImpuestoModel=new ImpuestoModel();

  constructor(){
    super();
    // this.loadPais();    
    this.loadCompania();
    this.GetAllProveedor();
    // this.GetAllTipoDocumento();
    // this.GetAllDepartamento();
    // this.GetAllMoneda();
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
      this.paisVisible=true;
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar lista de paises'
      });
      this.paisVisible=false;
    })
  }

  paisDialog(){
    this.loadPais();
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
      this.bancoVisible=true;
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar lista de Banco'
      });
      this.bancoVisible=false;
    })
  }
  bancoDialog(val:string){
    debugger;
    this.loadBanco();
    this.FLAGBANCO=val;
  }
  handleCloseBanco(){ 
    this.bancoVisible=false;
    if(this.FLAGBANCO==='A'){
      this.selectBancoA=new BancoModel();
    }
    if(this.FLAGBANCO==='B'){
      this.selectBancoB=new BancoModel();
    }
    if(this.FLAGBANCO==='C'){
      this.selectBancoC=new BancoModel();
    }
    if(this.FLAGBANCO==='D'){
      this.selectBancoD=new BancoModel();
    }   
    
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
    this.selectBancoA=new BancoModel();
    this.bancoVisible=false;
  }
  bancoSelect(val:BancoModel){
    if(this.FLAGBANCO==='A'){
      this.selectBancoA=val;
    }
    if(this.FLAGBANCO==='B'){
      this.selectBancoB=val;
    }
    if(this.FLAGBANCO==='C'){
      this.selectBancoC=val;
    }
    if(this.FLAGBANCO==='D'){
      this.selectBancoD=val;
    }    
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
      this.tipodocVisible=true;
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se puede cargar lista de tipo de documento'
      });
      this.tipodocVisible=false;
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
    this.GetAllTipoDocumento();
  }
  //#endregion

  //#region  [Departamento]
  GetAllDepartamento(){
    departamentoService.GetAllDepartamento()
    .then(response=>{
      this.Departamento=response;
      this.departVisible=true;
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se puede cargar lista de departamento'
      });
      this.departVisible=false;
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
    this.GetAllDepartamento();
  }
  //#endregion
  //#region [MONEDA]
  GetAllMoneda(){
    monedaService.GetAllMoneda()
    .then(response=>{
      this.Moneda=response;
      this.monedaVisible=true;      
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se puede cargar lista de moneda'
      });
      this.monedaVisible=false;
    })
  }
  monedaDialog(val:string){
    this.GetAllMoneda();    
    this.FLAGMONEDA=val;
  }
  handleCloseMoneda(){
    this.monedaVisible=false;
    if(this.FLAGMONEDA==='A'){
      this.selectMonedaA=new MonedaModel();
    }   
    if(this.FLAGMONEDA==='B'){
      this.selectMonedaB=new MonedaModel();
    }   
    if(this.FLAGMONEDA==='C'){
      this.selectMonedaC=new MonedaModel();
    }   
    if(this.FLAGMONEDA==='D'){
      this.selectMonedaD=new MonedaModel();
    }   
    
  }
  monedaSelect(val:MonedaModel){
    if(this.FLAGMONEDA==='A'){
      this.selectMonedaA=val;
    }   
    if(this.FLAGMONEDA==='B'){
      this.selectMonedaB=val;
    }   
    if(this.FLAGMONEDA==='C'){
      this.selectMonedaC=val;
    }   
    if(this.FLAGMONEDA==='D'){
      this.selectMonedaD=val;
    }   
  }
  monedaChosseCheck(){
    this.monedaVisible=false;
  }
  //#endregion
  //#region [Impuesto]
  GetAllImpuesto(){
    impuestoService.GetAllImpuesto()
    .then(response=>{
      this.Impuesto=response;
      this.impuestoVisible=true;
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar lista Impuestos'
      });
      this.impuestoVisible=false;
    })
  }
  impuestoDialog(){
    this.GetAllImpuesto();
  }
  handleCloseImpuesto(){
    this.impuestoVisible=false;
    this.selectImpuesto=new ImpuestoModel();
  }
  impuestoSelect(val:ImpuestoModel){
    this.selectImpuesto=val;
  }
  impuestoChosseCheck(){
    this.impuestoVisible=false;
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
    this.Proveedor.intIdCompany_ID=this.Compania[0].strCompany_Cod;
    // let loadingInstance = Loading.service({
    //   fullscreen: true,
    //   text: 'Guargando...',
    //   spinner: 'el-icon-loading',
    //   background: 'rgba(0, 0, 0, 0.8)'
    //   }
    //   ); 
    this.Proveedor.intIdVenCateg_ID=this.value1;
    // this.Proveedor.intIdDocIdent_ID=this.tipoDocSelectedIdentidad.intIdDocIdent_ID;
    // this.Proveedor.intIdCountry_ID=this.gridSelectPais.intIdCountry_ID;     
    this.Proveedor.strCountry=this.gridSelectPais.strCountry_Cod;
    this.Proveedor.intIdRegion_ID=this.selectDepartamento.intIdRegion_ID;
    this.Proveedor.strBank_Cod=this.selectBancoA.strBank_Cod;
    this.Proveedor.strCurrency_Cod=this.selectMonedaA.strCurrency_Cod;
    this.Proveedor.strBank_Corp_Cod=this.selectBancoB.strBank_Cod;
    this.Proveedor.strCurrency_Corp=this.selectMonedaB.strCurrency_Cod;
    this.Proveedor.strBank_Other_Cod=this.selectBancoC.strBank_Cod;
    this.Proveedor.strDetraccion_Cod=this.selectMonedaC.strCurrency_Cod;
    this.Proveedor.strFore_Branch_Cod=this.selectBancoD.strBank_Cod;
    this.Proveedor.strFore_Curr_Cod=this.selectMonedaD.strCurrency_Cod;
    this.Proveedor.strRetention_Cod=this.selectImpuesto.strWH_Cod;
    this.Proveedor.fltRetention_Porcen=this.selectImpuesto.fltPorcent;
    this.Proveedor.strDetraccion_Cod=this.selectImpuesto.strWH_Cod;
    this.Proveedor.strDocIdent_NO=String(this.selectImpuesto.fltPorcent);
    console.log(this.Proveedor);
    
    // proveedorService.putProveedor(this.Proveedor)
    // .then(response=>{
    //   loadingInstance.close();
    //   this.openMessageSuccess('Se guardo correctamente'+response);
    //   this.Proveedor=new ProveedorModel();
    // })
    // .catch(e =>{
    //   debugger;
    //   this.openMessageError('Error guardar proveedor');
    //   loadingInstance.close();
    // })    
      
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
    this.dialogVisible=false;
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
      AddressNumero:'',
      AddressDprto:'',
      AddressOf:'',
      AddressLote:'',
      RucOrDni:'',
      VisibleForName:true,
      ApellidosShow:false,
      descripcionCompania:'',
      codigoCompania:'',
      FLAGBANCO:'',
      FLAGMONEDA:'',
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
