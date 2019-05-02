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
import cuentaContableService from '@/components/service/cuentaContable.service';

import BDocumentoComponent from '@/components/buscadores/b_tipoDocumento/b_tipoDocumento.vue';
import BBancoProveedor from '@/components/buscadores/b_banco/b_banco.vue';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import BMonedaComponent from '@/components/buscadores/b_moneda/b_moneda.vue';
import BImpuestoComponent from '@/components/buscadores/b_impuesto/b_impuesto.vue';

import Global from '@/Global';
import {CompaniaModel} from '@/modelo/maestro/compania';
import {CuentaContableModel} from '@/modelo/maestro/cuentacontable';
import {PaisModel} from '@/modelo/maestro/pais';
import {BancoModel} from '@/modelo/maestro/banco';
import {TipoDocIdentidadModel} from '@/modelo/maestro/tipodocidentidad';
import {DepartamentoModel} from '@/modelo/maestro/departamento';
import {MonedaModel} from '@/modelo/maestro/moneda';
import {CategoriaModel} from '@/modelo/maestro/categoria';
import {ImpuestoModel} from '@/modelo/maestro/impuesto';
import { FacturaModel } from '@/modelo/maestro/factura';
@Component({
  name: 'crear-proveedor',
  components:{
    'bdocumento':BDocumentoComponent,
    'bbanco':BBancoProveedor,
    'quickaccessmenu':QuickAccessMenuComponent,
    'bmoneda':BMonedaComponent,
    'bimpuesto':BImpuestoComponent,
  }
})
export default class CrearProveedorComponent extends Vue {
  nameComponent:string;
  flagCompania:string;
  dialogVisible:boolean=false;
  SendDocument:boolean=false;
  btnactivarproveedor:boolean=false;  
  public Proveedor:ProveedorModel =new ProveedorModel();
  nameTipoJoN:string='';
  VisibleForName:boolean=true;
  ApellidosShow:boolean=false;
  valuem:number=100;
  textosave='';
  issave:boolean=false;
  iserror:boolean=false;
  vifprogress:boolean=true;
  tipoDocDisabled:boolean=false;
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
  codigoCompania:any;
  descripcionCompania:any;
  dataCompania:any[];
  public companiaModel:CompaniaModel=new CompaniaModel();

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
  btnactivarbancoA:boolean=false;
  btnactivarbancoB:boolean=false;
  btnactivarbancoC:boolean=false;
  btnactivarbancoD:boolean=false;
  //**Proveedor */
  public gridProveedor: ProveedorModel =new ProveedorModel();
  gridSelectedProveedor:any;
  proDisabled:boolean=true;
  //***Tipo documento */
  tipodocVisible:boolean=false;
  public selectTipoDoc:TipoDocIdentidadModel=new TipoDocIdentidadModel();
  btnactivarTipoDocumento:boolean=false;
  TipoDoc:TipoDocIdentidadModel[];
  //**Departamento */
  public Departamento:DepartamentoModel=new DepartamentoModel();
  btnactivardepartamento:boolean=false;
  departVisible:Boolean=false;
  departEnabled:boolean=true;
  public selectDepartamento:DepartamentoModel=new DepartamentoModel();
  //**Moneda */
  public Moneda:MonedaModel=new MonedaModel();
  monedaVisible:boolean=false;
  btnactivarmonedaA:boolean=false;
  btnactivarmonedaB:boolean=false;
  btnactivarmonedaC:boolean=false;
  btnactivarmonedaD:boolean=false;
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
  btnactivarimpuesto:boolean=false;
  //**cuenta contable */
  cuenta:CuentaContableModel[];
  constructor(){
    super();
    Global.nameComponent='crear-proveedor';
    // this.GetAllProveedor();
    setTimeout(() => {
      this.load();
    }, 200)
  }
  load(){
    this.codigoCompania=localStorage.getItem('compania_cod');
    this.descripcionCompania=localStorage.getItem('compania_name');
    this.GetAllCategoria();
    this.GetAllCuentaContable();
    this.GetAllTipoDocumento();
    this.GetProveedoresCompany(this.codigoCompania);
  }
// [Cuenta contable]
  GetAllCuentaContable(){
    cuentaContableService.GetAllCuentaContable()
    .then(response=>{
      this.cuenta=response;
      this.Proveedor.intAcc_NO_Local=this.cuenta[0].intAcc_NO_Local;      
    }).catch(error=>{

    })
  }
  //#region [PAIS]
  //**Pais */
  loadPais(){
    paisService.GetAllPais()
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
  activar_Pais(){
    setTimeout(() => {
      this.btnactivarpais=true;
      this.btnactivarproveedor=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivardepartamento=false;
      this.btnactivarbancoA=false;
      this.btnactivarbancoB=false;
      this.btnactivarbancoC=false;
      this.btnactivarbancoD=false;
      this.btnactivarmonedaA=false;
      this.btnactivarmonedaB=false;
      this.btnactivarmonedaC=false;
      this.btnactivarmonedaD=false;
      this.btnactivarimpuesto=false;
    }, 120)
    
  }
  desactivar_Pais(){
    if(this.paisVisible){
      this.btnactivarpais=false;
    }
  }
  handleClosePais(){
    this.paisVisible=false;
    this.gridSelectPais=new PaisModel();
  }
  paisSelect(val:PaisModel){
    this.gridSelectPais=val;
    this.Proveedor.intIdCountry_ID=this.gridSelectPais.intIdCountry_ID;
    this.Proveedor.strCountry=this.gridSelectPais.strCountry_Cod;
    this.departEnabled=false;
  }
  paisChosseCheck(){
    this.paisVisible=false;

  }
  paisChosseClose(){
    this.paisVisible=false;
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
    this.loadBanco();
    this.FLAGBANCO=val;
  }
  handleCloseBanco(){ 
    this.bancoVisible=false;
  }
  activar_bancoA(){
    setTimeout(() => {
      this.btnactivarTipoDocumento=false;
      this.btnactivarproveedor=false;
      this.btnactivarpais=false;
      this.btnactivardepartamento=false;
      this.btnactivarbancoA=true;
      this.btnactivarbancoB=false;
      this.btnactivarbancoC=false;
      this.btnactivarbancoD=false;
      this.btnactivarmonedaA=false;
      this.btnactivarmonedaB=false;
      this.btnactivarmonedaC=false;
      this.btnactivarmonedaD=false;
      this.btnactivarimpuesto=false;
    }, 120)
  }
  desactivar_bancoA(){
    if(this.bancoVisible){
      this.btnactivarbancoA=false;
    }
  }
  activar_bancoB(){
    setTimeout(() => {
      this.btnactivarTipoDocumento=false;
      this.btnactivarproveedor=false;
      this.btnactivarpais=false;
      this.btnactivardepartamento=false;
      this.btnactivarbancoA=false;
      this.btnactivarbancoB=true;
      this.btnactivarbancoC=false;
      this.btnactivarbancoD=false;
      this.btnactivarmonedaA=false;
      this.btnactivarmonedaB=false;
      this.btnactivarmonedaC=false;
      this.btnactivarmonedaD=false;
      this.btnactivarimpuesto=false;
    }, 120)
  }
  desactivar_bancoB(){
    if(this.bancoVisible){
      this.btnactivarbancoB=false;
    }
  }
  activar_bancoC(){
    setTimeout(() => {
      this.btnactivarTipoDocumento=false;
      this.btnactivarproveedor=false;
      this.btnactivarpais=false;
      this.btnactivardepartamento=false;
      this.btnactivarbancoA=false;
      this.btnactivarbancoB=false;
      this.btnactivarbancoC=true;
      this.btnactivarbancoD=false;
      this.btnactivarmonedaA=false;
      this.btnactivarmonedaB=false;
      this.btnactivarmonedaC=false;
      this.btnactivarmonedaD=false;
      this.btnactivarimpuesto=false;
    }, 120)
  }
  desactivar_bancoC(){
    if(this.bancoVisible){
      this.btnactivarbancoC=false;
    }
  }
  activar_bancoD(){
    setTimeout(() => {
      this.btnactivarTipoDocumento=false;
      this.btnactivarproveedor=false;
      this.btnactivarpais=false;
      this.btnactivardepartamento=false;
      this.btnactivarbancoA=false;
      this.btnactivarbancoB=false;
      this.btnactivarbancoC=false;
      this.btnactivarbancoD=true;
      this.btnactivarmonedaA=false;
      this.btnactivarmonedaB=false;
      this.btnactivarmonedaC=false;
      this.btnactivarmonedaD=false;
      this.btnactivarimpuesto=false;
    }, 120)
  }
  desactivar_bancoD(){
    if(this.bancoVisible){
      this.btnactivarbancoD=false;
    }
  }
  bancoChosseClose(){
    this.bancoVisible=false;
  }
  bancoselecionado(val:BancoModel){
    if(this.FLAGBANCO==='A'){
      this.selectBancoA=val;
      this.Proveedor.strBank_Cod=this.selectBancoA.strBank_Cod;
    }
    if(this.FLAGBANCO==='B'){
      this.selectBancoB=val;
      this.Proveedor.strBank_Corp_Cod=this.selectBancoB.strBank_Cod;
    }
    if(this.FLAGBANCO==='C'){
      this.selectBancoC=val;
      this.Proveedor.strBank_Other_Cod=this.selectBancoC.strBank_Cod;
    }
    if(this.FLAGBANCO==='D'){
      this.selectBancoD=val;
      this.Proveedor.strFore_Branch_Cod=this.selectBancoD.strBank_Cod;
    }    
    this.bancoVisible=false;
  }
  //#endregion
  //#region [Proveedor]
  GetProveedoresCompany(strCompany_Cod){
    proveedorService.GetProveedoresCompany(strCompany_Cod)
    .then(response=>{
      this.gridProveedor=response;
      if(response.length>0){
        this.proDisabled=false;
      }          
      else{
        this.$message({
          showClose: true,
          type: 'info',
          message: 'No hay proveedores'
        })
        this.proDisabled=true;
      }
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar lista de proveedores'
      })
    })
  }
  activar_proveedor1(){
    setTimeout(() => {
      this.btnactivarTipoDocumento=false;
      this.btnactivarproveedor=true;
      this.btnactivarpais=false;
      this.btnactivardepartamento=false;
      this.btnactivarbancoA=false;
      this.btnactivarbancoB=false;
      this.btnactivarbancoC=false;
      this.btnactivarbancoD=false;
      this.btnactivarmonedaA=false;
      this.btnactivarmonedaB=false;
      this.btnactivarmonedaC=false;
      this.btnactivarmonedaD=false;
      this.btnactivarimpuesto=false;
    }, 120)
  }
  desactivar_proveedor1(){
    if(this.dialogVisible){
      this.btnactivarproveedor=false;
    }
  }
  loadProveedores(){
    this.dialogVisible=true;
  }
  proveedorSelect(val){
    this.gridSelectedProveedor=val;  
    console.log(this.gridSelectedProveedor);      
  }
  proveedorClose(){
    this.dialogVisible=false;
    this.gridSelectedProveedor='';
  }
  proveedorCheck(){
    this.dialogVisible=false;
    this.Proveedor.intIdCompany_ID=this.gridSelectedProveedor.intIdCompany_ID.intIdCompany_ID;
    this.Proveedor.intIdRegion_ID=this.gridSelectedProveedor.intIdRegion_ID;
    this.Proveedor.intIdDocIdent_ID=this.gridSelectedProveedor.intIdDocIdent_ID.intIdDocIdent_ID;
    this.Proveedor.intIdVenCateg_ID=this.gridSelectedProveedor.intIdVenCateg_ID.intIdVenCateg_ID;
    this.Proveedor.intIdCountry_ID=this.gridSelectedProveedor.intIdCountry_ID.intIdCountry_ID;
    this.Proveedor.strCompany_Cod=this.gridSelectedProveedor.strCompany_Cod;
    this.Proveedor.strVendor_NO=this.gridSelectedProveedor.strVendor_NO;
    this.Proveedor.strCountry=this.gridSelectedProveedor.strCountry;
    this.Proveedor.strCat_Person=this.gridSelectedProveedor.strCat_Person;
    this.Proveedor.strTax_ID=this.gridSelectedProveedor.strTax_ID;
    this.Proveedor.strVendor_Desc=this.gridSelectedProveedor.strVendor_Desc;
    this.Proveedor.strLastName=this.gridSelectedProveedor.strLastName;
    this.Proveedor.strSurName=this.gridSelectedProveedor.strSurName;
    this.Proveedor.strAddress=this.gridSelectedProveedor.strAddress;
    this.Proveedor.strProvince=this.gridSelectedProveedor.strProvince;
    this.Proveedor.strDistrict=this.gridSelectedProveedor.strDistrict;
    this.Proveedor.strPostal_Cod=this.gridSelectedProveedor.strPostal_Cod;
    this.Proveedor.strDocIdent_NO=this.gridSelectedProveedor.strDocIdent_NO;
    this.Proveedor.strCurrency_Cod=this.gridSelectedProveedor.strCurrency_Cod;
    this.Proveedor.strBank_Cod=this.gridSelectedProveedor.strBank_Cod;
    this.Proveedor.intDayToPay=this.gridSelectedProveedor.intDayToPay;
    this.Proveedor.strBankAcct_Local_NO=this.gridSelectedProveedor.strBankAcct_Local_NO;
    this.Proveedor.strCurrency_Corp=this.gridSelectedProveedor.strCurrency_Corp;
    this.Proveedor.strBank_Corp_Cod=this.gridSelectedProveedor.strBank_Corp_Cod;
    this.Proveedor.strBankAcct_Corp_NO=this.gridSelectedProveedor.strBankAcct_Corp_NO;
    this.Proveedor.strBank_Other_Cod=this.gridSelectedProveedor.strBank_Other_Cod;
    this.Proveedor.strBankAcct_Other_NO=this.gridSelectedProveedor.strBankAcct_Other_NO;
    this.Proveedor.strFore_Swift_Cod=this.gridSelectedProveedor.strFore_Swift_Cod;
    this.Proveedor.strFore_Branch_Cod=this.gridSelectedProveedor.strFore_Branch_Cod;
    this.Proveedor.strFore_Bank_Desc=this.gridSelectedProveedor.strFore_Bank_Desc;
    this.Proveedor.strFore_AccBank_NO=this.gridSelectedProveedor.strFore_AccBank_NO;
    this.Proveedor.strFore_Curr_Cod=this.gridSelectedProveedor.strFore_Curr_Cod;
    this.Proveedor.strRetention_Cod=this.gridSelectedProveedor.strRetention_Cod;
    this.Proveedor.fltRetention_Porcen=this.gridSelectedProveedor.fltRetention_Porcen;
    this.Proveedor.strDetraccion_Cod=this.gridSelectedProveedor.strDetraccion_Cod;
    this.Proveedor.fltDetraccion_Porcen=this.gridSelectedProveedor.fltDetraccion_Porcen;
    this.Proveedor.intAcc_NO_Local=this.gridSelectedProveedor.intAcc_NO_Local;
  }
  checkDoblePro(){
    this.dialogVisible=false;
    this.Proveedor.intIdCompany_ID=this.gridSelectedProveedor.intIdCompany_ID.intIdCompany_ID;
    this.Proveedor.intIdRegion_ID=this.gridSelectedProveedor.intIdRegion_ID;
    this.Proveedor.intIdDocIdent_ID=this.gridSelectedProveedor.intIdDocIdent_ID.intIdDocIdent_ID;
    this.Proveedor.intIdVenCateg_ID=this.gridSelectedProveedor.intIdVenCateg_ID.intIdVenCateg_ID;
    this.Proveedor.intIdCountry_ID=this.gridSelectedProveedor.intIdCountry_ID.intIdCountry_ID;
    this.Proveedor.strCompany_Cod=this.gridSelectedProveedor.strCompany_Cod;
    this.Proveedor.strVendor_NO=this.gridSelectedProveedor.strVendor_NO;
    this.Proveedor.strCountry=this.gridSelectedProveedor.strCountry;
    this.Proveedor.strCat_Person=this.gridSelectedProveedor.strCat_Person;
    this.Proveedor.strTax_ID=this.gridSelectedProveedor.strTax_ID;
    this.Proveedor.strVendor_Desc=this.gridSelectedProveedor.strVendor_Desc;
    this.Proveedor.strLastName=this.gridSelectedProveedor.strLastName;
    this.Proveedor.strSurName=this.gridSelectedProveedor.strSurName;
    this.Proveedor.strAddress=this.gridSelectedProveedor.strAddress;
    this.Proveedor.strProvince=this.gridSelectedProveedor.strProvince;
    this.Proveedor.strDistrict=this.gridSelectedProveedor.strDistrict;
    this.Proveedor.strPostal_Cod=this.gridSelectedProveedor.strPostal_Cod;
    this.Proveedor.strDocIdent_NO=this.gridSelectedProveedor.strDocIdent_NO;
    this.Proveedor.strCurrency_Cod=this.gridSelectedProveedor.strCurrency_Cod;
    this.Proveedor.strBank_Cod=this.gridSelectedProveedor.strBank_Cod;
    this.Proveedor.intDayToPay=this.gridSelectedProveedor.intDayToPay;
    this.Proveedor.strBankAcct_Local_NO=this.gridSelectedProveedor.strBankAcct_Local_NO;
    this.Proveedor.strCurrency_Corp=this.gridSelectedProveedor.strCurrency_Corp;
    this.Proveedor.strBank_Corp_Cod=this.gridSelectedProveedor.strBank_Corp_Cod;
    this.Proveedor.strBankAcct_Corp_NO=this.gridSelectedProveedor.strBankAcct_Corp_NO;
    this.Proveedor.strBank_Other_Cod=this.gridSelectedProveedor.strBank_Other_Cod;
    this.Proveedor.strBankAcct_Other_NO=this.gridSelectedProveedor.strBankAcct_Other_NO;
    this.Proveedor.strFore_Swift_Cod=this.gridSelectedProveedor.strFore_Swift_Cod;
    this.Proveedor.strFore_Branch_Cod=this.gridSelectedProveedor.strFore_Branch_Cod;
    this.Proveedor.strFore_Bank_Desc=this.gridSelectedProveedor.strFore_Bank_Desc;
    this.Proveedor.strFore_AccBank_NO=this.gridSelectedProveedor.strFore_AccBank_NO;
    this.Proveedor.strFore_Curr_Cod=this.gridSelectedProveedor.strFore_Curr_Cod;
    this.Proveedor.strRetention_Cod=this.gridSelectedProveedor.strRetention_Cod;
    this.Proveedor.fltRetention_Porcen=this.gridSelectedProveedor.fltRetention_Porcen;
    this.Proveedor.strDetraccion_Cod=this.gridSelectedProveedor.strDetraccion_Cod;
    this.Proveedor.fltDetraccion_Porcen=this.gridSelectedProveedor.fltDetraccion_Porcen;
    this.Proveedor.intAcc_NO_Local=this.gridSelectedProveedor.intAcc_NO_Local;
  }
  //#endregion
  //#region [Tipo Documento]
  tipoSeleccionado(val:TipoDocIdentidadModel){
    this.selectTipoDoc=val;
    this.Proveedor.intIdDocIdent_ID=this.selectTipoDoc.intIdDocIdent_ID;
    this.Proveedor.strDocIdent_NO=this.selectTipoDoc.strDocIdent_NO;
    this.tipodocVisible=false;
    
  }
  GetAllTipoDocumento(){      
    tipodocidentidadService.GetAllTipoDocumento()
    .then(response=>{        
      this.TipoDoc=response;
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se puede cargar lista de tipo de documento'
      });
    })
  } 
  activar_TipoDocumento(){
    setTimeout(() => {
      this.btnactivarTipoDocumento=true;
      this.btnactivarproveedor=false;
      this.btnactivarpais=false;
      this.btnactivardepartamento=false;
      this.btnactivarbancoA=false;
      this.btnactivarbancoB=false;
      this.btnactivarbancoC=false;
      this.btnactivarbancoD=false;
      this.btnactivarmonedaA=false;
      this.btnactivarmonedaB=false;
      this.btnactivarmonedaC=false;
      this.btnactivarmonedaD=false;
      this.btnactivarimpuesto=false;
    }, 120)
  }
  desactivar_TipoDocumento(){
    if(this.tipodocVisible){
      this.btnactivarTipoDocumento=false;
    }
  }
  closeTipo(){
    this.selectTipoDoc=new TipoDocIdentidadModel();
    this.tipodocVisible=false;
  }
  closeTipoDocumento(){
    this.tipodocVisible=false;
    this.btnactivarTipoDocumento=false;
  }
  loadTipoDoc(){
    this.tipodocVisible=true;
  }
  //#endregion

  //#region  [Departamento]
  GetAllDepartamento(val){
    departamentoService.GetAllDepartamentoByPais(val)
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
  activar_Departamento(){
    setTimeout(() => {
      this.btnactivardepartamento=true;
      this.btnactivarTipoDocumento=false;
      this.btnactivarpais=false;
      this.btnactivarTipoDocumento=false;
    }, 120)
  }
  desactivar_Departamento(){
    if(this.departVisible){
      this.btnactivardepartamento=false;
    }
  }
  handleCloseDepart(){
    this.departVisible=false;
    this.selectDepartamento=new DepartamentoModel();
  }
  departSelect(val:DepartamentoModel){
    this.selectDepartamento=val;
    this.Proveedor.intIdRegion_ID=this.selectDepartamento.intIdRegion_ID;
    this.Proveedor.strRegión_Cod=this.selectDepartamento.strRegión_Cod;
  }
  departChosseCheck(){
    this.departVisible=false;
  }
  departChosseClose(){
    this.departVisible=false;
    this.selectDepartamento=new DepartamentoModel();
  }
  departDialog(){
    this.GetAllDepartamento(this.gridSelectPais.intIdCountry_ID);
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
  }
  monedaSelect(val:MonedaModel){
    if(this.FLAGMONEDA==='A'){
      this.selectMonedaA=val;
      this.Proveedor.strCurrency_Cod=this.selectMonedaA.strCurrency_Cod;
    }   
    if(this.FLAGMONEDA==='B'){
      this.selectMonedaB=val;
      this.Proveedor.strCurrency_Corp=this.selectMonedaB.strCurrency_Cod;
    }   
    if(this.FLAGMONEDA==='C'){
      this.selectMonedaC=val;
      this.Proveedor.strFore_Swift_Cod=this.selectMonedaC.strCurrency_Cod;
    }   
    if(this.FLAGMONEDA==='D'){
      this.selectMonedaD=val;
      this.Proveedor.strFore_Curr_Cod=this.selectMonedaD.strCurrency_Cod;
    }   
    this.monedaVisible=false;
  }
  monedaChosseCheck(){
    this.monedaVisible=false;
  }

  activar_monedaA(){
    setTimeout(() => {
      this.btnactivarTipoDocumento=false;
      this.btnactivarproveedor=false;
      this.btnactivarpais=false;
      this.btnactivardepartamento=false;
      this.btnactivarbancoA=false;
      this.btnactivarbancoB=false;
      this.btnactivarbancoC=false;
      this.btnactivarbancoD=false;
      this.btnactivarmonedaA=true;
      this.btnactivarmonedaB=false;
      this.btnactivarmonedaC=false;
      this.btnactivarmonedaD=false;
      this.btnactivarimpuesto=false;
    }, 120)
  }
  desactivar_monedaA(){
    if(this.monedaVisible){
      this.btnactivarmonedaA=false;
    }
  }  
  activar_monedaB(){
    setTimeout(() => {
      this.btnactivarTipoDocumento=false;
      this.btnactivarproveedor=false;
      this.btnactivarpais=false;
      this.btnactivardepartamento=false;
      this.btnactivarbancoA=false;
      this.btnactivarbancoB=false;
      this.btnactivarbancoC=false;
      this.btnactivarbancoD=false;
      this.btnactivarmonedaA=false;
      this.btnactivarmonedaB=true;
      this.btnactivarmonedaC=false;
      this.btnactivarmonedaD=false;
      this.btnactivarimpuesto=false;
    }, 120)
  }
  desactivar_monedaB(){
    if(this.monedaVisible){
      this.btnactivarmonedaB=false;
    }
  }  
  activar_monedaC(){
    setTimeout(() => {
      this.btnactivarTipoDocumento=false;
      this.btnactivarproveedor=false;
      this.btnactivarpais=false;
      this.btnactivardepartamento=false;
      this.btnactivarbancoA=false;
      this.btnactivarbancoB=false;
      this.btnactivarbancoC=false;
      this.btnactivarbancoD=false;
      this.btnactivarmonedaA=false;
      this.btnactivarmonedaB=false;
      this.btnactivarmonedaC=true;
      this.btnactivarmonedaD=false;
      this.btnactivarimpuesto=false;
    }, 120)
  }
  desactivar_monedaC(){
    if(this.monedaVisible){
      this.btnactivarmonedaC=false;
    }
  }  
  activar_monedaD(){
    setTimeout(() => {
      this.btnactivarTipoDocumento=false;
      this.btnactivarproveedor=false;
      this.btnactivarpais=false;
      this.btnactivardepartamento=false;
      this.btnactivarbancoA=false;
      this.btnactivarbancoB=false;
      this.btnactivarbancoC=false;
      this.btnactivarbancoD=false;
      this.btnactivarmonedaA=false;
      this.btnactivarmonedaB=false;
      this.btnactivarmonedaC=false;
      this.btnactivarmonedaD=true;
      this.btnactivarimpuesto=false;
    }, 120)
  }
  desactivar_monedaD(){
    if(this.monedaVisible){
      this.btnactivarmonedaD=false;
    }
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
  activar_impuesto(){
    setTimeout(() => {
      this.btnactivarTipoDocumento=false;
      this.btnactivarproveedor=false;
      this.btnactivarpais=false;
      this.btnactivardepartamento=false;
      this.btnactivarbancoA=false;
      this.btnactivarbancoB=false;
      this.btnactivarbancoC=false;
      this.btnactivarbancoD=false;
      this.btnactivarmonedaA=false;
      this.btnactivarmonedaB=false;
      this.btnactivarmonedaC=false;
      this.btnactivarmonedaD=false;
      this.btnactivarimpuesto=true;
    }, 120)
  }
  desactivar_impuesto(){
    if(this.impuestoVisible){
      this.btnactivarimpuesto=false;
    }
  }  
  impuestoDialog(){
    this.GetAllImpuesto();
  }
  handleCloseImpuesto(){
    this.impuestoVisible=false;
  }
  impuestoSelect(val:ImpuestoModel){
    this.selectImpuesto=val;
    this.Proveedor.strDetraccion_Cod=this.selectImpuesto.strWH_Cod;
    this.Proveedor.fltDetraccion_Porcen=this.selectImpuesto.fltPorcent;
    this.Proveedor.strRetention_Cod=this.selectImpuesto.strWH_Cod;
    this.Proveedor.fltRetention_Porcen=this.selectImpuesto.fltPorcent;
    this.impuestoVisible=false;
  }
  //#endregion
  
  GetAllCategoria(){
    categoriaService.GetAllCategoria()
    .then(response=>{
      this.Categoria=response;
      this.value1=this.Categoria[0].strVenCateg_Desc;      
      this.selectCategoria(this.Categoria[0].intIdVenCateg_ID);
    })
  }
  selectCategoria(val){
      this.VisibleForName=true;
      if(val===1){
        this.nameTipoJoN='Nombres';
        this.RucOrDni='RUC';
        this.ApellidosShow=true;
        this.Proveedor.intIdVenCateg_ID=val;
        this.Proveedor.strCat_Person='Natural';
        for(var i=0;i<this.TipoDoc.length;i++){
          if(this.TipoDoc[i].strDocIdent_NO==='6'){
            this.selectTipoDoc=this.TipoDoc[i];
            this.Proveedor.intIdDocIdent_ID=this.selectTipoDoc.intIdDocIdent_ID;
            this.Proveedor.strDocIdent_NO=this.selectTipoDoc.strDocIdent_NO;
          }
        }
        this.tipoDocDisabled=true;
      }
      if(val===2){
        this.nameTipoJoN='Nombres';
        this.RucOrDni='RUC';
        this.ApellidosShow=false;
        this.Proveedor.intIdVenCateg_ID=val;
        this.Proveedor.strCat_Person='Jurídica';
        for(var i=0;i<this.TipoDoc.length;i++){
          if(this.TipoDoc[i].strDocIdent_NO==='6'){
            this.selectTipoDoc=this.TipoDoc[i];
            this.Proveedor.intIdDocIdent_ID=this.selectTipoDoc.intIdDocIdent_ID;
            this.Proveedor.strDocIdent_NO=this.selectTipoDoc.strDocIdent_NO;
          }
        }
        this.tipoDocDisabled=true;
      }
      if(val===3){
        this.nameTipoJoN='Nombres';
        this.RucOrDni='DNI';
        this.ApellidosShow=true;
        this.Proveedor.intIdVenCateg_ID=val;
        this.Proveedor.strCat_Person='Persona';
        this.tipoDocDisabled=false;
        this.selectTipoDoc=new TipoDocIdentidadModel();
        this.Proveedor.intIdDocIdent_ID=-1;
        this.Proveedor.strDocIdent_NO='';
      }
  }
  SaveProveedor(val){
    this.Proveedor.strCreation_User='egaona';
    console.log(this.Proveedor);
    
    let loadingInstance = Loading.service({
      fullscreen: true,
      text: 'Guargando...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
      );     
    proveedorService.putProveedor(this.Proveedor)
    .then(response=>{
      loadingInstance.close();
      this.openMessageSuccess('Se guardo correctamente'+response);
      this.textosave = 'Se guardo correctamente '+response;
      this.issave=true;
      this.iserror=false;
      this.Proveedor=new ProveedorModel();
      this.gridSelectPais=new PaisModel();
      this.selectDepartamento=new DepartamentoModel();
      this.selectTipoDoc=new TipoDocIdentidadModel();
      this.selectMonedaA=new MonedaModel();
      this.selectMonedaB=new MonedaModel();
      this.selectMonedaC=new MonedaModel();
      this.selectMonedaD=new MonedaModel();
      this.selectBancoA=new BancoModel();
      this.selectBancoB=new BancoModel();
      this.selectBancoC=new BancoModel();
      this.selectBancoD=new BancoModel();

    })
    .catch(e =>{      
      this.openMessageError('Error guardar proveedor');
      loadingInstance.close();
      this.textosave = 'Se guardo correctamente.';
      this.issave=false;
      this.iserror=true;
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
    this.dialogVisible=false;
  }
  ValidadProveedor(){
    this.$message({
      showClose: true,
      type: 'success',
      message: 'validar proveedor'
    });
  }
  backPage(){
    window.history.back();
  }
  reloadpage(){
    window.location.reload();
  }
  data(){
    return{
      nameComponent:'crear-proveedor',
      flagCompania:'',
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
      gridSelectedProveedor:'',
      FLAGBANCO:'',
      FLAGMONEDA:'',
      proDisabled:true,
      tipoDocDisabled:false,            
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
