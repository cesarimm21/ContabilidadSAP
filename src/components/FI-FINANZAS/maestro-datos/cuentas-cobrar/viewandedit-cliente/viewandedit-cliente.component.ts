import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import {ClienteModel} from '../../../../../modelo/maestro/cliente';
import { Notification } from 'element-ui';
import Global from '@/Global';
import paisService from '@/components/service/pais.service';
import bancoService from '@/components/service/banco.service';
import tipodocidentidadService from '@/components/service/tipodocidentidad.service';
import clienteService from '@/components/service/cliente.service'
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
import { Loading } from 'element-ui';
@Component({
  name: 'viewandedit-cliente',
  components:{
    'bdocumento':BDocumentoComponent,
    'quickaccessmenu':QuickAccessMenuComponent,
    'buttons-accions':ButtonsAccionsComponent,
    'bpais':BPaisComponent,
  }
})
export default class ViewAndEditClienteComponent extends Vue {
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
  //   ****
  AddressNumero:string;
  AddressDprto:string;
  AddressOf:string;
  AddressLote:string;
  RucOrDni:string;
  //** */
  public Cliente:ClienteModel =new ClienteModel();
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
  //**Cliente */
  gridSelectedCliente:any;
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
    Global.nameComponent='modificar-provclienteeedor';
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
      this.namepage='Modificar Cliente';
      this.proDisabled=false;
    }
    if(vista=='visualizar'){
      this.namepage='Visualizar Cliente';
      this.proDisabled=true;
      alert(vista)
    }
    clienteService.GetOnlyOneCliente(codigPr)
    .then(response=>{
      this.gridSelectedCliente=response;
      this.clienteCheck();
    }).catch(error=>{
      this.$message('No se cargaron los datos')
    })
    this.GetAllCategoria();
    // this.GetAllCuentaContable();
    // this.GetClienteCompany(localStorage.getItem('compania_cod'));
  }
  // [Cuenta contable]
  GetAllCuentaContable(){
    cuentaContableService.GetAllCuentaContable()
    .then(response=>{
      this.cuenta=response;
      this.Cliente.strAcc_Local_NO=this.cuenta[0].strAcc_Local_NO;      
    }).catch(error=>{
      this.openMessageError('No hay datos cliente')
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
    this.Cliente.intIdCountry_ID=this.gridSelectPais.intIdCountry_ID;
    this.Cliente.strCountry=this.gridSelectPais.strCountry_Cod;
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
  bancoSelect(val:BancoModel){
    if(this.FLAGBANCO==='A'){
      this.selectBancoA=val;
      this.Cliente.strBank_Cod=this.selectBancoA.strBank_Cod;
    }
    if(this.FLAGBANCO==='B'){
      this.selectBancoB=val;
      this.Cliente.strBank_Corp_Cod=this.selectBancoB.strBank_Cod;
    }
    if(this.FLAGBANCO==='C'){
      this.selectBancoC=val;
      this.Cliente.strBank_Other_Cod=this.selectBancoC.strBank_Cod;
    }
    if(this.FLAGBANCO==='D'){
      this.selectBancoD=val;
      this.Cliente.strFore_Branch_Cod=this.selectBancoD.strBank_Cod;
    }    
  }
  //#endregion
  //#region [Cliente]
  loadTipoDocumento(v){    
    
    this.selectTipoDoc=new TipoDocIdentidadModel();
    tipodocidentidadService.GetOnlyOneTipoDocumento(v)
    .then(response=>{
      this.selectTipoDoc=response;
    }).catch(error=>{

    })
  }
  clienteCheck(){
    this.Cliente.intIdCliente_ID=this.gridSelectedCliente.intIdCliente_ID;
    this.Cliente.intIdCompany_ID=this.gridSelectedCliente.intIdCompany_ID;
    this.Cliente.intIdRegion_ID=this.gridSelectedCliente.intIdRegion_ID;
    this.Cliente.intIdDocIdent_ID=this.gridSelectedCliente.intIdDocIdent_ID.intIdDocIdent_ID;
    this.Cliente.intIdVenCateg_ID=this.gridSelectedCliente.intIdVenCateg_ID.intIdVenCateg_ID;
    this.Cliente.intIdCountry_ID=this.gridSelectedCliente.intIdCountry_ID.intIdCountry_ID;
    this.Cliente.strCompany_Cod=this.gridSelectedCliente.strCompany_Cod;
    this.Cliente.strCliente_NO=this.gridSelectedCliente.strCliente_NO;
    this.Cliente.strCountry=this.gridSelectedCliente.strCountry;
    this.Cliente.strCat_Person=this.gridSelectedCliente.strCat_Person;
    this.Cliente.strTax_ID=this.gridSelectedCliente.strTax_ID;
    this.Cliente.strCliente_Desc=this.gridSelectedCliente.strCliente_Desc;
    this.Cliente.strLastName=this.gridSelectedCliente.strLastName;
    this.Cliente.strSurName=this.gridSelectedCliente.strSurName;
    this.Cliente.strAddress=this.gridSelectedCliente.strAddress;
    this.Cliente.strProvince=this.gridSelectedCliente.strProvince;
    this.Cliente.strDistrict=this.gridSelectedCliente.strDistrict;
    this.Cliente.strPostal_Cod=this.gridSelectedCliente.strPostal_Cod;
    this.Cliente.strDocIdent_NO=this.gridSelectedCliente.strDocIdent_NO;
    this.Cliente.strCurrency_Cod=this.gridSelectedCliente.strCurrency_Cod;
    this.Cliente.strBank_Cod=this.gridSelectedCliente.strBank_Cod;
    this.Cliente.intDayToPay=this.gridSelectedCliente.intDayToPay;
    this.Cliente.strBankAcct_Local_NO=this.gridSelectedCliente.strBankAcct_Local_NO;
    this.Cliente.strCurrency_Corp=this.gridSelectedCliente.strCurrency_Corp;
    this.Cliente.strBank_Corp_Cod=this.gridSelectedCliente.strBank_Corp_Cod;
    this.Cliente.strBankAcct_Corp_NO=this.gridSelectedCliente.strBankAcct_Corp_NO;
    this.Cliente.strBank_Other_Cod=this.gridSelectedCliente.strBank_Other_Cod;
    this.Cliente.strBankAcct_Other_NO=this.gridSelectedCliente.strBankAcct_Other_NO;
    this.Cliente.strFore_Swift_Cod=this.gridSelectedCliente.strFore_Swift_Cod;
    this.Cliente.strFore_Branch_Cod=this.gridSelectedCliente.strFore_Branch_Cod;
    this.Cliente.strFore_Bank_Desc=this.gridSelectedCliente.strFore_Bank_Desc;
    this.Cliente.strFore_AccBank_NO=this.gridSelectedCliente.strFore_AccBank_NO;
    this.Cliente.strFore_Curr_Cod=this.gridSelectedCliente.strFore_Curr_Cod;
    this.Cliente.strRetention_Cod=this.gridSelectedCliente.strRetention_Cod;
    this.Cliente.fltRetention_Porcen=this.gridSelectedCliente.fltRetention_Porcen;
    this.Cliente.strDetraccion_Cod=this.gridSelectedCliente.strDetraccion_Cod;
    this.Cliente.fltDetraccion_Porcen=this.gridSelectedCliente.fltDetraccion_Porcen;
    this.Cliente.strAcc_Local_NO=this.gridSelectedCliente.strAcc_Local_NO;
    this.Cliente.strRegión_Cod=this.gridSelectedCliente.strRegión_Cod;
    this.loadTipoDocumento(this.Cliente.strDocIdent_NO);
    this.GetOnlyOneDepartamento(this.Cliente.strRegión_Cod);
    this.loadBancoByIDA(this.Cliente.strBank_Cod);
    this.loadBancoByIDB(this.Cliente.strBank_Corp_Cod);
    this.loadBancoByIDC(this.Cliente.strBank_Other_Cod);
    this.loadBancoByIDD(this.Cliente.strFore_Branch_Cod);
    this.GetOnlyOnePais(this.Cliente.strCountry);
    this.GetOnlyOneMonedaA(this.Cliente.strCurrency_Cod);
    this.GetOnlyOneMonedaB(this.Cliente.strCurrency_Corp);
    this.GetOnlyOneMonedaC(this.Cliente.strFore_Swift_Cod);
    this.GetOnlyOneMonedaD(this.Cliente.strFore_Curr_Cod);
    if(this.Cliente.strCat_Person==='Natural'){
      this.nameTipoJoN='Nombres';
      this.RucOrDni='DNI';
      this.ApellidosShow=true;
      this.value1=this.Cliente.strCat_Person;
    }
    if(this.Cliente.strCat_Person==='Persona'){
      this.nameTipoJoN='Nombres';
      this.RucOrDni='DNI';
      this.ApellidosShow=true;
      this.value1=this.Cliente.strCat_Person;
    }
    if(this.Cliente.strCat_Person==='Jurídica'){
      this.nameTipoJoN='Razon social';
      this.RucOrDni='RUC';
      this.ApellidosShow=false;
      this.value1=this.Cliente.strCat_Person;
    }
  }
  //#endregion
  
  //#region [Tipo Documento]
  tipoSeleccionado(val:TipoDocIdentidadModel){
    this.selectTipoDoc=val;
    this.Cliente.intIdDocIdent_ID=this.selectTipoDoc.intIdDocIdent_ID;
    this.Cliente.strDocIdent_NO=this.selectTipoDoc.strDocIdent_NO;
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
    this.selectDepartamento=new DepartamentoModel();
  }
  departSelect(val:DepartamentoModel){
    this.selectDepartamento=val;
    this.Cliente.intIdRegion_ID=this.selectDepartamento.intIdRegion_ID;
    this.Cliente.strRegión_Cod=this.selectDepartamento.strRegión_Cod;
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
      this.Cliente.strCurrency_Cod=this.selectMonedaA.strCurrency_Cod;
    }   
    if(this.FLAGMONEDA==='B'){
      this.selectMonedaB=val;
      this.Cliente.strCurrency_Corp=this.selectMonedaB.strCurrency_Cod;
    }   
    if(this.FLAGMONEDA==='C'){
      this.selectMonedaC=val;
      this.Cliente.strFore_Swift_Cod=this.selectMonedaC.strCurrency_Cod;
    }   
    if(this.FLAGMONEDA==='D'){
      this.selectMonedaD=val;
      this.Cliente.strFore_Curr_Cod=this.selectMonedaD.strCurrency_Cod;
    }   
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
  handleCloseImpuesto(){
    this.impuestoVisible=false;
    this.selectImpuesto=new ImpuestoModel();
  }
  impuestoSelect(val:ImpuestoModel){
    this.selectImpuesto=val;
    this.Cliente.strDetraccion_Cod=this.selectImpuesto.strWH_Cod;
    this.Cliente.fltDetraccion_Porcen=this.selectImpuesto.fltPorcent;
    this.Cliente.strRetention_Cod=this.selectImpuesto.strWH_Cod;
    this.Cliente.fltRetention_Porcen=this.selectImpuesto.fltPorcent; 
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
      console.log(this.Categoria);      
      this.value1=this.Categoria[0].strVenCateg_Desc;      
      // this.selectCategoria(this.Categoria[0].intIdVenCateg_ID);
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
        this.Cliente.intIdVenCateg_ID=val;
        this.Cliente.strCat_Person='Natural';
        for(var i=0;i<this.TipoDoc.length;i++){
          if(this.TipoDoc[i].strDocIdent_NO==='6'){
            this.selectTipoDoc=this.TipoDoc[i];
            this.Cliente.intIdDocIdent_ID=this.selectTipoDoc.intIdDocIdent_ID;
            this.Cliente.strDocIdent_NO=this.selectTipoDoc.strDocIdent_NO;
          }
        }
        this.tipoDocDisabled=true;
      }
      if(val===2){
        this.nameTipoJoN='Razon social';
        this.RucOrDni='RUC';
        this.ApellidosShow=false;
        this.Cliente.intIdVenCateg_ID=val;
        this.Cliente.strCat_Person='Jurídica';
        for(var i=0;i<this.TipoDoc.length;i++){
          if(this.TipoDoc[i].strDocIdent_NO==='6'){
            this.selectTipoDoc=this.TipoDoc[i];
            this.Cliente.intIdDocIdent_ID=this.selectTipoDoc.intIdDocIdent_ID;
            this.Cliente.strDocIdent_NO=this.selectTipoDoc.strDocIdent_NO;
          }
        }
        this.tipoDocDisabled=true;
      }
      if(val===3){
        this.nameTipoJoN='Nombres';
        this.RucOrDni='DNI';
        this.ApellidosShow=true;
        this.Cliente.intIdVenCateg_ID=val;
        this.Cliente.strCat_Person='Persona';
        this.tipoDocDisabled=false;
        this.selectTipoDoc=new TipoDocIdentidadModel();
        this.Cliente.intIdDocIdent_ID=-1;
        this.Cliente.strDocIdent_NO='';
      }
  }
  SaveCliente(val){
    if(this.Cliente.strCliente_NO===''){
      this.$message({
        showClose: true,
        type: 'warning',
        message: 'Por favor seleccione cliente a editar'
      });
    }
    else{
      this.Cliente.strModified_User='egaona';
      let loadingInstance = Loading.service({
      fullscreen: true,
      text: 'Guardando...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
      );     
      clienteService.UpdateCliente(this.Cliente)
      .then(response=>{
        loadingInstance.close();
        this.openMessageSuccess('Se editó correctamente '+response);
        this.textosave = 'Se editó correctamente '+response;
        this.issave=true;
        this.iserror=false;
        this.Cliente=new ClienteModel();
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
        this.openMessageError('Error editar cliente');
        loadingInstance.close();
        this.textosave = 'Error editar cliente.';
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
      companiaCod:'',
      companiaDesc:'',
      Categoria:[],
      proDisabled:false,
      VisibleForName:true,
      value1:'',
      nameComponent:'modificar-cliente',
      gridSelectedCliente:'',
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