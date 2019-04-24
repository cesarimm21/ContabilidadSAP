import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import {ProveedorModel} from '../../../../modelo/maestro/proveedor';
import {CompaniaModel} from '@/modelo/maestro/compania';
import { Notification } from 'element-ui';
import Global from '@/Global';
import {bus} from '../../../../main';
import paisService from '@/components/service/pais.service';
import bancoService from '@/components/service/banco.service';
import tipodocidentidadService from '@/components/service/tipodocidentidad.service';
import proveedorService from '@/components/service/proveedor.service'
import BDocumentoComponent from '@/components/buscadores/b_tipoDocumento/b_tipoDocumento.vue';
import BCompaniaProveedor from '@/components/buscadores/b_compania/b_compania.vue';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import {CuentaContableModel} from '@/modelo/maestro/cuentacontable';
import {PaisModel} from '@/modelo/maestro/pais';
import {BancoModel} from '@/modelo/maestro/banco';
import {TipoDocIdentidadModel} from '@/modelo/maestro/tipodocidentidad';
import {DepartamentoModel} from '@/modelo/maestro/departamento';
import {MonedaModel} from '@/modelo/maestro/moneda';
import {CategoriaModel} from '@/modelo/maestro/categoria';
import {ImpuestoModel} from '@/modelo/maestro/impuesto';

import departamentoService from '@/components/service/departamento.service';
import monedaService from '@/components/service/moneda.service';
import categoriaService from '@/components/service/categoria.service';
import impuestoService from '@/components/service/impuesto.service';
import cuentaContableService from '@/components/service/cuentaContable.service';
import { Loading } from 'element-ui';
@Component({
  name: 'modificar-proveedor',
  components:{
    'bdocumento':BDocumentoComponent,
    'bcompania':BCompaniaProveedor,
    'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class ModificarProveedorComponent extends Vue {
  nameComponent:string;
  dialogVisible:boolean=false;
  btnactivarproveedor:boolean=false;
  btnactivarcompania:boolean=false;
  dialogCompania:boolean=false;
  textosave='';
  value1:any;
  issave:boolean=false;
  iserror:boolean=false;
  vifprogress:boolean=true;
  proDisabled:boolean=true;
  VisibleForName:boolean=true;
  ApellidosShow:boolean=false;
  nameTipoJoN:string='';
  FLAGBANCO:String;
  tipoDocDisabled:boolean=false;
  //   ****
  AddressNumero:string;
  AddressDprto:string;
  AddressOf:string;
  AddressLote:string;
  RucOrDni:string;
  //** */
  public companiaModel:CompaniaModel=new CompaniaModel();
  public Proveedor:ProveedorModel =new ProveedorModel();
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
  bancoVisible:boolean=false;
  btnactivarbancoA:boolean=false;
  btnactivarbancoB:boolean=false;
  btnactivarbancoC:boolean=false;
  btnactivarbancoD:boolean=false;
  //**Proveedor */
  public gridProveedor: ProveedorModel =new ProveedorModel();
  gridSelectedProveedor:any;
  //***Tipo documento */
  tipodocVisible:boolean=false;
  public selectTipoDoc:TipoDocIdentidadModel=new TipoDocIdentidadModel();
  btnactivarTipoDocumento:boolean=false;
  TipoDoc:TipoDocIdentidadModel[];
  //**Departamento */
  public Departamento:DepartamentoModel=new DepartamentoModel();
  btnactivardepartamento:boolean=false;
  departVisible:Boolean=false;
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
    Global.nameComponent='modificar-proveedor';
    this.GetAllCategoria();
    this.GetAllCuentaContable();
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
  //#region [COMPAÑIA]
  loadCompania(){
    this.dialogCompania=true;
    this.textosave='';
    this.gridProveedor=new ProveedorModel();
  }
  companiaSeleccionado(val:CompaniaModel){
    this.companiaModel=val;
    this.GetProveedoresCompany(this.companiaModel.strCompany_Cod);     
    this.dialogCompania=false;    
  }
  companiaClose(){
    this.companiaModel=new CompaniaModel();
    this.dialogCompania=false;
    this.proDisabled=true;    
  }
  dialogCompaniaClose(){
    this.dialogCompania=false;
    this.btnactivarcompania=false;
  }
  activar_compania(){
    setTimeout(() => {
      this.btnactivarcompania=true;
      this.btnactivarproveedor=false;
      this.btnactivarTipoDocumento=false;
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
  desactivar_compania(){
    if(this.dialogCompania){
      this.btnactivarcompania=false;
    }
  }
  activar_companiaB(){
    setTimeout(() => {
      this.btnactivarcompania=false;
      this.btnactivarproveedor=false;
      this.btnactivarTipoDocumento=false;
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
  closeCompania(){
    this.btnactivarcompania=false;
    this.dialogCompania=false;
    return false;
  }
  //#endregion
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
      this.btnactivarcompania=false;
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
   loadBancoByIDA(v){
     bancoService.GetOnlyOneBanco(v)
     .then(response=>{
      this.selectBancoA=response;
     }).catch(error=>{

     })
   }
   loadBancoByIDB(v){
     bancoService.GetOnlyOneBanco(v)
     .then(response=>{
      this.selectBancoB=response;
     }).catch(error=>{

     })
   }
   loadBancoByIDC(v){
     bancoService.GetOnlyOneBanco(v)
     .then(response=>{
      this.selectBancoC=response;
     }).catch(error=>{

     })
   }
   loadBancoByIDD(v){
     bancoService.GetOnlyOneBanco(v)
     .then(response=>{
      this.selectBancoD=response;
     }).catch(error=>{

     })
   }
   GetOnlyOnePais(v){
     paisService.GetOnlyOnePais(v)
     .then(response=>{
       this.gridSelectPais=response;       
     })
   }
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
  activar_bancoA(){
    setTimeout(() => {
      this.btnactivarTipoDocumento=false;
      this.btnactivarcompania=false;
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
      this.btnactivarcompania=false;
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
      this.btnactivarcompania=false;
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
      this.btnactivarcompania=false;
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
  loadTipoDocumento(v){    
    
    this.selectTipoDoc=new TipoDocIdentidadModel();
    tipodocidentidadService.GetOnlyOneTipoDocumento(v)
    .then(response=>{
      this.selectTipoDoc=response;
    }).catch(error=>{

    })
  }
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
      this.btnactivarcompania=false;
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
  }
  proveedorClose(){
    this.dialogVisible=false;
    this.gridSelectedProveedor='';
  }
  proveedorCheck(){
    this.dialogVisible=false;
    this.Proveedor.intIdVendor_ID=this.gridSelectedProveedor.intIdVendor_ID;
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
    this.Proveedor.strRegión_Cod=this.gridSelectedProveedor.strRegión_Cod;
    this.loadTipoDocumento(this.Proveedor.strDocIdent_NO);
    this.GetOnlyOneDepartamento(this.Proveedor.strRegión_Cod);
    this.loadBancoByIDA(this.Proveedor.strBank_Cod);
    this.loadBancoByIDB(this.Proveedor.strBank_Corp_Cod);
    this.loadBancoByIDC(this.Proveedor.strBank_Other_Cod);
    this.loadBancoByIDD(this.Proveedor.strFore_Branch_Cod);
    this.GetOnlyOnePais(this.Proveedor.strCountry);
    this.GetOnlyOneMonedaA(this.Proveedor.strCurrency_Cod);
    this.GetOnlyOneMonedaB(this.Proveedor.strCurrency_Corp);
    this.GetOnlyOneMonedaC(this.Proveedor.strFore_Swift_Cod);
    this.GetOnlyOneMonedaD(this.Proveedor.strFore_Curr_Cod);
    if(this.Proveedor.strCat_Person==='Natural'){
      this.nameTipoJoN='Nombres';
      this.RucOrDni='DNI';
      this.ApellidosShow=true;
      this.value1=this.Proveedor.strCat_Person;
    }
    if(this.Proveedor.strCat_Person==='Jurídica'){
      this.nameTipoJoN='Razon social';
      this.RucOrDni='RUC';
      this.ApellidosShow=false;
      this.value1=this.Proveedor.strCat_Person;
    }    
  }
  //#endregion
  
  //#region [Tipo Documento]
  tipoSeleccionado(val:TipoDocIdentidadModel){
    this.selectTipoDoc=val;
    this.Proveedor.intIdDocIdent_ID=this.selectTipoDoc.intIdDocIdent_ID;
    this.Proveedor.strDocIdent_NO=this.selectTipoDoc.strDocIdent_NO;
    this.tipodocVisible=false;
    
  }
  activar_TipoDocumento(){
    setTimeout(() => {
      this.btnactivarTipoDocumento=true;
      this.btnactivarcompania=false;
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
  GetOnlyOneDepartamento(v){
    departamentoService.GetOnlyOneDepartamento(v)
    .then(response=>{
      this.selectDepartamento=response;
    })
  }
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
  activar_Departamento(){
    setTimeout(() => {
      this.btnactivardepartamento=true;
      this.btnactivarTipoDocumento=false;
      this.btnactivarcompania=false;
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
    this.GetAllDepartamento();
  }
  //#endregion
  //#region [MONEDA]
  GetOnlyOneMonedaA(v){
    monedaService.GetOnlyOneMoneda(v)
    .then(response=>{
      this.selectMonedaA=response;
    })
  }
  GetOnlyOneMonedaB(v){
    monedaService.GetOnlyOneMoneda(v)
    .then(response=>{
      this.selectMonedaB=response;
    })
  }
  GetOnlyOneMonedaC(v){
    monedaService.GetOnlyOneMoneda(v)
    .then(response=>{
      this.selectMonedaC=response;
    })
  }
  GetOnlyOneMonedaD(v){
    monedaService.GetOnlyOneMoneda(v)
    .then(response=>{
      this.selectMonedaD=response;
    })
  }
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
  }
  monedaChosseCheck(){
    this.monedaVisible=false;
  }

  activar_monedaA(){
    setTimeout(() => {
      this.btnactivarTipoDocumento=false;
      this.btnactivarcompania=false;
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
      this.btnactivarcompania=false;
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
      this.btnactivarcompania=false;
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
      this.btnactivarcompania=false;
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
      this.btnactivarcompania=false;
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
    this.selectImpuesto=new ImpuestoModel();
  }
  impuestoSelect(val:ImpuestoModel){
    this.selectImpuesto=val;
    this.Proveedor.strDetraccion_Cod=this.selectImpuesto.strWH_Cod;
    this.Proveedor.fltDetraccion_Porcen=this.selectImpuesto.fltPorcent;
    this.Proveedor.strRetention_Cod=this.selectImpuesto.strWH_Cod;
    this.Proveedor.fltRetention_Porcen=this.selectImpuesto.fltPorcent; 
  }
  impuestoChosseCheck(){
    this.impuestoVisible=false;
  }
  //#endregion
  
  GetAllCategoria(){
    categoriaService.GetAllCategoria()
    .then(response=>{
      this.Categoria=response;
      this.value1=this.Categoria[0].strVenCateg_Desc;
      
      this.selectCategoria(this.Categoria[0].intIdVenCateg_ID);
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar lista categoria'
      });
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
        this.nameTipoJoN='Razon social';
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
  activar_proveedor(){
    debugger;
    this.btnactivarproveedor=true;
  }
  desactivar_proveedor(){
    debugger;
    this.btnactivarproveedor=false;
  }  
  handleCloseProo(){
    this.dialogVisible=false;
  }
  ValEditProveedor(){
    this.$message({
      showClose: true,
      type: 'info',
      message: 'validar proveedor'
    });
  }
  SaveProveedor(val){
    if(this.Proveedor.strVendor_NO===''){
      this.$message({
        showClose: true,
        type: 'warning',
        message: 'Por favor seleccione proveedor a editar'
      });
    }
    else{
      this.Proveedor.strModified_User='egaona';
      let loadingInstance = Loading.service({
      fullscreen: true,
      text: 'Guargando...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
      );     
      proveedorService.UpdateProveedor(this.Proveedor)
      .then(response=>{
        loadingInstance.close();
        this.openMessageSuccess('Se editó correctamente '+response);
        this.textosave = 'Se editó correctamente '+response;
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
        this.openMessageError('Error editar proveedor');
        loadingInstance.close();
        this.textosave = 'Error editar proveedor.';
        this.issave=false;
        this.iserror=true;
      })    
    }
    
    
    
      
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
  backPage(){
    window.history.back();
  }
  reloadpage(){
    window.location.reload();
  }
  data(){
    return{
      dialogTableVisible: false,
      proDisabled:true,
      VisibleForName:true,
      value1:'',
      nameComponent:'modificar-proveedor',
      gridSelectedProveedor:'',
      dialogVisible:false,
      AddressNumero:'',
      AddressDprto:'',
      AddressOf:'',
      AddressLote:'',
      RucOrDni:'',
      ApellidosShow:false,
      descripcionCompania:'',
      codigoCompania:'',
      codigoCompaniaB:'',
      FLAGBANCO:'',
      FLAGMONEDA:'',
      tipoDocDisabled:false,  
    }
  }
  
}
