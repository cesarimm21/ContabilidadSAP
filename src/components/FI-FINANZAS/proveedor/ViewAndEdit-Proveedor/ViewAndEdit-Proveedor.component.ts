import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import {ProveedorModel} from '../../../../modelo/maestro/proveedor';
import { Notification } from 'element-ui';
import Global from '@/Global';
import paisService from '@/components/service/pais.service';
import bancoService from '@/components/service/banco.service';
import tipodocidentidadService from '@/components/service/tipodocidentidad.service';
import proveedorService from '@/components/service/proveedor.service'
import BDocumentoComponent from '@/components/buscadores/b_tipoDocumento/b_tipoDocumento.vue';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import BPaisComponent from '@/components/buscadores/b_pais/b_pais.vue';
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
import cuentaContableService from '@/components/service/cuentacontable.service';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import BBancoProveedor from '@/components/buscadores/b_banco/b_banco.vue';
import BMonedaComponent from '@/components/buscadores/b_moneda/b_moneda.vue';
import BImpuestoComponent from '@/components/buscadores/b_impuesto/b_impuesto.vue';

import { Loading } from 'element-ui';
@Component({
  name: 'modificar-proveedor',
  components:{
    'bdocumento':BDocumentoComponent,
    'bbanco':BBancoProveedor,
    'quickaccessmenu':QuickAccessMenuComponent,
    'buttons-accions':ButtonsAccionsComponent,
    'bmoneda':BMonedaComponent,
    'bimpuesto':BImpuestoComponent,
    'bpais':BPaisComponent,
  }
})
export default class ViewAndEditProveedorComponent extends Vue {
  sizeScreen:string = (window.innerHeight - 420).toString();//'0';
  sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  namepage:string;
  companiaCod:any;
  companiaDesc:any;
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
  btnactivardetraccion:boolean=false;
  detraccionVisible:boolean=false;
  //   ****
  AddressNumero:string;
  AddressDprto:string;
  AddressOf:string;
  AddressLote:string;
  RucOrDni:string;
  btnactivarproveedor:boolean=false;  
  // public Proveedor:ProveedorModel =new ProveedorModel();
  //** */
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
  FLAGDOC:string='A';
  //**Categoria */

  public Categoria: CategoriaModel[];

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
    setTimeout(() => {
      this.load();
    }, 200)
  }
  load(){    
    this.companiaCod=localStorage.getItem('compania_cod');
    this.companiaDesc=localStorage.getItem('compania_name');
    var codigPr = this.$route.query.data;
    var vista=this.$route.query.vista;
    if(vista=='modificar'){
      this.namepage='Modificar Proveedor';
      this.proDisabled=false;
    }
    if(vista=='visualizar'){
      this.namepage='Visualizar Proveedor';
      this.proDisabled=true;
    }
    proveedorService.getProveedorOne(codigPr)
    .then(response=>{
      this.gridSelectedProveedor=response; 
      if(this.gridSelectedProveedor.strVendor_NO!=''){        
        setTimeout(() => {
          this.proveedorCheck();
        }, 200)
      }
      else{
        this.$message('No existe proveedor')
      router.push({ path: `/barmenu/FI-FINANZAS/proveedor/modificar-proveedor`})
      }
      // this.proveedorCheck();
    }).catch(error=>{
      this.$message('No se cargaron los datos')
      router.push({ path: `/barmenu/FI-FINANZAS/proveedor/modificar-proveedor`})
    })
    this.GetAllCategoria();
    // this.GetAllCuentaContable();
    // this.GetProveedoresCompany(localStorage.getItem('compania_cod'));
  }
  // [Cuenta contable]
  GetAllCuentaContable(){
    cuentaContableService.GetAllCuentaContable()
    .then(response=>{
      this.cuenta=response;
      this.Proveedor.strAcc_Local_NO=this.cuenta[0].strAcc_Local_NO;      
    }).catch(error=>{
      this.openMessageError('No hay datos proveedor')
    })
  }
  //#region [PAIS]
  //**Pais */
  paisDialog(){
    this.paisVisible=true;
  }
  activar_Pais(){
    setTimeout(() => {
      this.btnactivarpais=true;
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
  }
  paisSelect(val:PaisModel){
    this.gridSelectPais=val;
    this.Proveedor.intIdCountry_ID=this.gridSelectPais.intIdCountry_ID;
    this.Proveedor.strCountry=this.gridSelectPais.strCountry_Cod;
    this.paisVisible=false;
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
  }
  activar_bancoA(){
    setTimeout(() => {
      this.btnactivarTipoDocumento=false;
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
      this.Proveedor.strFore_Bank_Cod=this.selectBancoD.strBank_Cod;
    }    
    this.bancoVisible=false;
  }
  //#endregion
  //#region [Proveedor]
  loadTipoDocumento(v){    
    
    this.selectTipoDoc=new TipoDocIdentidadModel();
    tipodocidentidadService.GetOnlyOneTipoDocumento(v)
    .then(response=>{
      this.selectTipoDoc=response;
    }).catch(error=>{

    })
  }
  proveedorCheck(){  
    this.Proveedor.intIdVendor_ID=this.gridSelectedProveedor.intIdVendor_ID;
    this.Proveedor.intIdCompany_ID=this.gridSelectedProveedor.intIdCompany_ID;
    this.Proveedor.intIdRegion_ID=this.gridSelectedProveedor.intIdRegion_ID;
    this.Proveedor.intIdDocIdent_ID=this.gridSelectedProveedor.intIdDocIdent_ID.intIdDocIdent_ID;
    this.Proveedor.intIdVenCateg_ID=this.gridSelectedProveedor.intIdVenCateg_ID.intIdVenCateg_ID;
    this.Proveedor.intIdCountry_ID=this.gridSelectedProveedor.intIdCountry_ID.intIdCountry_ID;
    this.Proveedor.strCompany_Cod=this.gridSelectedProveedor.strCompany_Cod;
    this.Proveedor.strVendor_NO=this.gridSelectedProveedor.strVendor_NO;
    this.Proveedor.strCountry=this.gridSelectedProveedor.strCountry;
    this.Proveedor.strCat_Person=this.gridSelectedProveedor.strCat_Person;
    this.FLAGDOC='B'
    this.selectCategoria(this.Proveedor.strCat_Person);
    this.value1=this.Proveedor.strCat_Person;
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
    this.Proveedor.strOther_Curr_Cod=this.gridSelectedProveedor.strOther_Curr_Cod;
    this.Proveedor.strFore_Swift_NO=this.gridSelectedProveedor.strFore_Swift_NO;
    this.Proveedor.strFore_Branch_NO=this.gridSelectedProveedor.strFore_Branch_NO;
    this.Proveedor.strFore_Bank_Cod=this.gridSelectedProveedor.strFore_Bank_Cod;
    // this.Proveedor.strFore_Bank_Desc=this.gridSelectedProveedor.strFore_Bank_Desc;
    this.Proveedor.strFore_AccBank_NO=this.gridSelectedProveedor.strFore_AccBank_NO;
    this.Proveedor.strFore_Curr_Cod=this.gridSelectedProveedor.strFore_Curr_Cod;
    this.Proveedor.strRetention_Cod=this.gridSelectedProveedor.strRetention_Cod;
    this.Proveedor.fltRetention_Porcen=this.gridSelectedProveedor.fltRetention_Porcen;
    this.Proveedor.strDetraccion_Cod=this.gridSelectedProveedor.strDetraccion_Cod;
    this.Proveedor.fltDetraccion_Porcen=this.gridSelectedProveedor.fltDetraccion_Porcen;
    this.Proveedor.strAcc_Local_NO=this.gridSelectedProveedor.strAcc_Local_NO;
    this.Proveedor.strRegion_Cod=this.gridSelectedProveedor.strRegion_Cod;
    this.loadTipoDocumento(this.Proveedor.strDocIdent_NO);
    this.GetOnlyOneDepartamento(this.Proveedor.strRegion_Cod);
    this.loadBancoByIDA(this.Proveedor.strBank_Cod);
    this.loadBancoByIDB(this.Proveedor.strBank_Corp_Cod);
    this.loadBancoByIDC(this.Proveedor.strBank_Other_Cod);
    this.loadBancoByIDD(this.Proveedor.strFore_Bank_Cod);
    this.GetOnlyOnePais(this.Proveedor.strCountry);
    this.GetOnlyOneMonedaA(this.Proveedor.strCurrency_Cod);
    this.GetOnlyOneMonedaB(this.Proveedor.strCurrency_Corp);
    this.GetOnlyOneMonedaC(this.Proveedor.strOther_Curr_Cod);
    this.GetOnlyOneMonedaD(this.Proveedor.strFore_Curr_Cod);
    // if(this.Proveedor.strCat_Person==='Natural'){
    //   this.nameTipoJoN='Nombres';
    //   this.RucOrDni='DNI';
    //   this.ApellidosShow=true;
    //   this.value1=this.Proveedor.strCat_Person;
    // }
    // if(this.Proveedor.strCat_Person==='Persona'){
    //   this.nameTipoJoN='Nombres';
    //   this.RucOrDni='DNI';
    //   this.ApellidosShow=true;
    //   this.value1=this.Proveedor.strCat_Person;
    // }
    // if(this.Proveedor.strCat_Person==='Jurídica'){
    //   this.nameTipoJoN='Razon social';
    //   this.RucOrDni='RUC';
    //   this.ApellidosShow=false;
    //   this.value1=this.Proveedor.strCat_Person;
    // }
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
    // this.selectDepartamento=new DepartamentoModel();
  }
  departSelect(val:DepartamentoModel){
    this.selectDepartamento=val;
    this.Proveedor.intIdRegion_ID=this.selectDepartamento.intIdRegion_ID;
    this.Proveedor.strRegion_Cod=this.selectDepartamento.strRegion_Cod;
  }
  departChosseCheck(){
    this.departVisible=false;
  }
  departChosseClose(){
    this.departVisible=false;
    // this.selectDepartamento=new DepartamentoModel();
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
    // if(this.FLAGMONEDA==='A'){
    //   this.selectMonedaA=new MonedaModel();
    // }   
    // if(this.FLAGMONEDA==='B'){
    //   this.selectMonedaB=new MonedaModel();
    // }   
    // if(this.FLAGMONEDA==='C'){
    //   this.selectMonedaC=new MonedaModel();
    // }   
    // if(this.FLAGMONEDA==='D'){
    //   this.selectMonedaD=new MonedaModel();
    // }   
    
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
      this.Proveedor.strOther_Curr_Cod=this.selectMonedaC.strCurrency_Cod;
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
  GetAllDetraccion(){
    impuestoService.GetAllImpuesto()
    .then(response=>{
      this.Impuesto=response;
      this.detraccionVisible=true;
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar lista Impuestos'
      });
      this.detraccionVisible=false;
    })
  }
  activar_detraccion(){
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
      this.btnactivarimpuesto=false;
      this.btnactivardetraccion=true;
    }, 120)
  }
  desactivar_detraccion(){
    if(this.detraccionVisible){
      this.btnactivarimpuesto=false;
    }
  }  
  handleCloseImpuesto(){
    this.impuestoVisible=false;
    // this.selectImpuesto=new ImpuestoModel();
  }
  detraccionDialog(){
    this.GetAllDetraccion();
  }
  handleCloseImp(){
    this.detraccionVisible=false;
  }
  detraccionSelect(val:ImpuestoModel){
    this.selectImpuesto=val;
    this.Proveedor.strDetraccion_Cod=this.selectImpuesto.strWH_Cod;
    this.Proveedor.fltDetraccion_Porcen=this.selectImpuesto.fltPorcent;
    this.detraccionVisible=false;
  }
  impuestoSelect(val:ImpuestoModel){
    this.selectImpuesto=val;
    this.Proveedor.strDetraccion_Cod=this.selectImpuesto.strWH_Cod;
    this.Proveedor.fltDetraccion_Porcen=this.selectImpuesto.fltPorcent;
    this.Proveedor.strRetention_Cod=this.selectImpuesto.strWH_Cod;
    this.Proveedor.fltRetention_Porcen=this.selectImpuesto.fltPorcent; 
    this.impuestoVisible=false;
  }
  impuestoChosseCheck(){
    this.impuestoVisible=false;
  }
  //#endregion
  
  GetAllCategoria(){
    categoriaService.GetAllCategoria()
    .then(response=>{
      this.Categoria=[];
      this.Categoria=response;
      // this.value1=this.Categoria[0].strVenCateg_Desc;      
      // this.selectCategoria(this.Categoria[0].intIdVenCateg_ID);
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar lista categoria'
      });
    })
  }
  btnBuscar(valor){    
    var data=this.like(this.Categoria,'strVenCateg_Desc',valor)
    this.Proveedor.intIdVenCateg_ID=data[0].intIdVenCateg_ID;
  }
  like(array, key,keyword) {    
    var responsearr:any = []
    for(var i=0;i<array.length;i++) {
      if(array[i][key]!=undefined){
        if(array[i][key].toString().indexOf(keyword) > -1 ) {
          responsearr.push(array[i])
        }
      }
    }
    return responsearr

  }

  selectCategoria(val){    
    this.btnBuscar(val);
      this.VisibleForName=true;
      if(val=='Natural'){
        this.nameTipoJoN='Nombres';
        this.RucOrDni='RUC';
        this.ApellidosShow=true;
        this.Proveedor.strCat_Person=val;
        for(var i=0;i<this.TipoDoc.length;i++){
          if(this.TipoDoc[i].strDocIdent_NO==='6'){
            this.selectTipoDoc=this.TipoDoc[i];
            this.Proveedor.intIdDocIdent_ID=this.selectTipoDoc.intIdDocIdent_ID;
            this.Proveedor.strDocIdent_NO=this.selectTipoDoc.strDocIdent_NO;
          }
        }
        this.tipoDocDisabled=true;
      }
      if(val=='Jurídica'){
        this.nameTipoJoN='Nombres';
        this.RucOrDni='RUC';
        this.ApellidosShow=false;
        this.Proveedor.strCat_Person=val;
        for(var i=0;i<this.TipoDoc.length;i++){
          if(this.TipoDoc[i].strDocIdent_NO==='6'){
            this.selectTipoDoc=this.TipoDoc[i];
            this.Proveedor.intIdDocIdent_ID=this.selectTipoDoc.intIdDocIdent_ID;
            this.Proveedor.strDocIdent_NO=this.selectTipoDoc.strDocIdent_NO;
          }
        }
        this.tipoDocDisabled=true;
      }
      if(val=='Persona'){        
        this.nameTipoJoN='Nombres';
        this.RucOrDni='DNI';
        this.ApellidosShow=true;   
        this.Proveedor.strCat_Person=val;
        this.tipoDocDisabled=false;
        if(this.FLAGDOC=='A'){
          this.selectTipoDoc=new TipoDocIdentidadModel();
          this.Proveedor.intIdDocIdent_ID=-1;
          this.Proveedor.strDocIdent_NO='';
        }
        if(this.FLAGDOC=='B')
          {

       }
      }
  }
  SaveProveedor(val){
    var vista=this.$route.query.vista;
    if(vista=='modificar'){
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
        text: 'Guardando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
        );     
        proveedorService.UpdateProveedor(this.Proveedor)
        .then(response=>{
          loadingInstance.close();
          this.openMessageSuccess('Se edito correctamente '+response);
          this.textosave = 'Se edito correctamente '+response;
          this.issave=true;
          this.iserror=false;
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
    if(vista=='visualizar'){
      this.$message({
        showClose: true,
        type: 'warning',
        message: 'Accion no permitida'
      });
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
  validarView(){
    this.$message({
      showClose: true,
      type: 'warning',
      message: 'Accion no permitida'
    });
  }
  data(){
    return{
      dialogTableVisible: false,
      companiaCod:'',
      companiaDesc:'',
      Categoria:[],
      proDisabled:false,
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
      namepage:''
    }
  }
  
}