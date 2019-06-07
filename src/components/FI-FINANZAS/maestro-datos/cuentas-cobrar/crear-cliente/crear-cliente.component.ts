import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import {ClienteModel} from '../../../../../modelo/maestro/cliente';
import clienteService from '@/components/service/cliente.service'
import bancoService from '@/components/service/banco.service';
import tipodocidentidadService from '@/components/service/tipodocidentidad.service';
import departamentoService from '@/components/service/departamento.service';
import monedaService from '@/components/service/moneda.service';
import categoriaService from '@/components/service/categoria.service';
import impuestoService from '@/components/service/impuesto.service';
import cuentaContableService from '@/components/service/cuentacontable.service';

import BDocumentoComponent from '@/components/buscadores/b_tipoDocumento/b_tipoDocumento.vue';
import BBancoProveedor from '@/components/buscadores/b_banco/b_banco.vue';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import BMonedaComponent from '@/components/buscadores/b_moneda/b_moneda.vue';
import BImpuestoComponent from '@/components/buscadores/b_impuesto/b_impuesto.vue';
import BPaisComponent from '@/components/buscadores/b_pais/b_pais.vue';

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
@Component({
  name: 'crear-cliente',
  components:{
    'bdocumento':BDocumentoComponent,
    'bbanco':BBancoProveedor,
    'quickaccessmenu':QuickAccessMenuComponent,
    'bmoneda':BMonedaComponent,
    'bimpuesto':BImpuestoComponent,
    'bpais':BPaisComponent,
  }
})
export default class CrearClienteComponent extends Vue {
  nameComponent:string;
  flagCompania:string;
  dialogVisible:boolean=false;
  SendDocument:boolean=false;
  btnactivarcliente:boolean=false;  
  public Cliente:ClienteModel =new ClienteModel();
  nameTipoJoN:string='';
  VisibleForName:boolean=true;
  ApellidosShow:boolean=false;
  valuem:number=100;
  textosave='';
  issave:boolean=false;
  iserror:boolean=false;
  vifprogress:boolean=true;
  tipoDocDisabled:boolean=false;

  cardView:boolean=true;
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
  //**Cliente */
  public gridCliente: ClienteModel =new ClienteModel();
  gridSelectedCliente:any;
  proDisabled:boolean=true;
  //***Tipo documento */
  tipodocVisible:boolean=false;
  public selectTipoDoc:TipoDocIdentidadModel=new TipoDocIdentidadModel();
  btnactivarTipoDocumento:boolean=false;
  TipoDoc:TipoDocIdentidadModel[];
  //**Departamento */
  public DepartamentoGrid:Array<DepartamentoModel>[];
  btnactivardepartamento:boolean=false;
  departVisible:Boolean=false;
  departEnabled:boolean=true;
  public selectDepartamento:DepartamentoModel=new DepartamentoModel();
  public searchDepartamento:DepartamentoModel=new DepartamentoModel();
  clickColumn:string='';
  Column:string='';
  inputAtributo:any;
  blnilterstrRegión_Cod:boolean=true;
  blnilterstrRegión_Desc:boolean=false;
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
  btnactivardetraccion:boolean=false;
  detraccionVisible:boolean=false;

  //**cuenta contable */
  cuenta:CuentaContableModel[];
  constructor(){
    super();
    Global.nameComponent='crear-cliente';
    // this.GetAllCliente();
    setTimeout(() => {
      this.load();
    }, 200)
  }
  load(){
    this.codigoCompania=localStorage.getItem('compania_cod');
    this.descripcionCompania=localStorage.getItem('compania_name');
    this.Cliente.strCompany_Cod=this.codigoCompania;
    this.GetAllCategoria();
    this.GetAllCuentaContable();
    this.GetAllTipoDocumento();
    this.GetClientesCompany(this.codigoCompania);
  }
  handleClick(tab, event) {
    console.log(tab.label); 
    if(tab.label=='Datos generales'){ this.cardView=true;}   
    if(tab.label=='Dirección'){ this.cardView=false;}   
    if(tab.label=='Cuentas Bancarias'){ this.cardView=false;}   
    
  }
// [Cuenta contable]
  GetAllCuentaContable(){
    cuentaContableService.GetAllCuentaContable()
    .then(response=>{
      this.cuenta=response;
      this.Cliente.strAcc_Local_NO=this.cuenta[0].strAcc_Local_NO;  
      debugger;    
    }).catch(error=>{

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
      this.btnactivarcliente=false;
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
    this.departEnabled=false;
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
      this.btnactivarcliente=false;
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
      this.btnactivarcliente=false;
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
      this.btnactivarcliente=false;
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
      this.btnactivarcliente=false;
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
    this.bancoVisible=false;
  }
  //#endregion
  //#region [Cliente]
  GetClientesCompany(strCompany_Cod){
    clienteService.GetClientesCompany(strCompany_Cod)
    .then(response=>{
      this.gridCliente=response;
      if(response.length>0){
        this.proDisabled=false;
      }          
      else{
        this.$message({
          showClose: true,
          type: 'info',
          message: 'No hay Cliente'
        })
        this.proDisabled=true;
      }
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar lista de cliente'
      })
    })
  }
  activar_cliente1(){
    setTimeout(() => {
      this.btnactivarTipoDocumento=false;
      this.btnactivarcliente=true;
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
  desactivar_cliente1(){
    if(this.dialogVisible){
      this.btnactivarcliente=false;
    }
  }
  loadClientes(){
    this.dialogVisible=true;
  }
  clienteSelect(val){
    this.gridSelectedCliente=val;     
  }
  clienteClose(){
    this.dialogVisible=false;
  }
  clienteCheck(){
    this.dialogVisible=false;
    this.Cliente.intIdCompany_ID=this.gridSelectedCliente.intIdCompany_ID.intIdCompany_ID;
    this.Cliente.intIdRegion_ID=this.gridSelectedCliente.intIdRegion_ID;
    this.Cliente.intIdDocIdent_ID=this.gridSelectedCliente.intIdDocIdent_ID.intIdDocIdent_ID;
    this.Cliente.intIdVenCateg_ID=this.gridSelectedCliente.intIdVenCateg_ID.intIdVenCateg_ID;
    this.Cliente.intIdCountry_ID=this.gridSelectedCliente.intIdCountry_ID.intIdCountry_ID;
    this.gridSelectPais.strCountry_Name=this.gridSelectedCliente.intIdCountry_ID.strCountry_Name;
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
    this.departEnabled=false;
  }
  checkDoblePro(){
    this.dialogVisible=false;
    this.Cliente.intIdCompany_ID=this.gridSelectedCliente.intIdCompany_ID.intIdCompany_ID;
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
    this.departEnabled=false;
  }
  //#endregion
  //#region [Tipo Documento]
  tipoSeleccionado(val:TipoDocIdentidadModel){
    this.selectTipoDoc=val;
    this.Cliente.intIdDocIdent_ID=this.selectTipoDoc.intIdDocIdent_ID;
    this.Cliente.strDocIdent_NO=this.selectTipoDoc.strDocIdent_NO;
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
      this.btnactivarcliente=false;
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
      this.DepartamentoGrid=[];
      this.DepartamentoGrid=response;
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
    this.GetAllDepartamento(this.gridSelectPais.intIdCountry_ID);
  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strRegión_Cod"){
      this.clickColumn=val.property;  
      this.searchDepartamento=new DepartamentoModel();  
      this.inputAtributo='';  
      this.blnilterstrRegión_Cod=true;
      this.blnilterstrRegión_Desc=false;
    }
    if(val.property=="strRegión_Desc"){
      this.clickColumn=val.property;
      this.searchDepartamento=new DepartamentoModel();
      this.inputAtributo='';
      this.blnilterstrRegión_Cod=false;
      this.blnilterstrRegión_Desc=true;
    }
  }
  filterstrRegión_Cod(h,{column,$index}){
    debugger;
    var column1 = column.label; 
    if(this.blnilterstrRegión_Cod){
      this.Column=column1;
      this.clickColumn=column.property;
      this.searchDepartamento=new DepartamentoModel();
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [  h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),
        h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label),
       ])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterstrRegión_Desc(h,{column,$index}){
    debugger;
    
    if(this.blnilterstrRegión_Desc){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [  h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),
        h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label),
       ])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  searchDepa(){
    this.searchDepartamento.intIdCountry_ID=this.gridSelectPais.intIdCountry_ID;
    if(this.clickColumn=="strRegión_Cod"){  this.searchDepartamento.strRegión_Cod=this.inputAtributo; }
    if(this.clickColumn=="strRegión_Desc"){ this.searchDepartamento.strRegión_Desc=this.inputAtributo; }
        
    departamentoService.searchDepartamento(this.searchDepartamento)
    .then(resp=>{
      this.DepartamentoGrid=[];
      this.DepartamentoGrid=resp; 
    })

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
    this.monedaVisible=false;
  }
  monedaChosseCheck(){
    this.monedaVisible=false;
  }

  activar_monedaA(){
    setTimeout(() => {
      this.btnactivarTipoDocumento=false;
      this.btnactivarcliente=false;
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
      this.btnactivarcliente=false;
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
      this.btnactivarcliente=false;
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
      this.btnactivarcliente=false;
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
      this.btnactivarcliente=false;
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
    this.Cliente.strRetention_Cod=this.selectImpuesto.strWH_Cod;
    this.Cliente.fltRetention_Porcen=this.selectImpuesto.fltPorcent;
    this.impuestoVisible=false;
  }
  //#region [Retencion]
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
      this.btnactivarcliente=false;
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
  detraccionDialog(){
    this.GetAllDetraccion();
  }
  handleCloseImp(){
    this.detraccionVisible=false;
  }
  detraccionSelect(val:ImpuestoModel){
    this.selectImpuesto=val;
    this.Cliente.strDetraccion_Cod=this.selectImpuesto.strWH_Cod;
    this.Cliente.fltDetraccion_Porcen=this.selectImpuesto.fltPorcent;
    this.detraccionVisible=false;
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
        this.nameTipoJoN='Nombres';
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
    if(this.Cliente.strTax_ID!=''&&this.Cliente.strCliente_Desc!=''&&this.Cliente.strCountry!=''){
      var idCompany:any=localStorage.getItem('compania_ID');
      var USERLOGIN:any=localStorage.getItem('User_Usuario');
      this.Cliente.intIdCompany_ID=parseInt(idCompany);
      this.Cliente.strCreation_User=USERLOGIN;    
      let loadingInstance = Loading.service({
        fullscreen: true,
        text: 'Guardando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
        );     
      clienteService.putCliente(this.Cliente)
      .then(response=>{
        loadingInstance.close();
        this.openMessageSuccess('Se guardo correctamente '+response);
        this.textosave = 'Se guardo correctamente '+response;
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
        this.openMessageError('Error guardar cliente');
        loadingInstance.close();
        this.textosave = 'No se guardo cliente.';
        this.issave=false;
        this.iserror=true;
      })    
    }   
    else{
      this.$message({
        showClose: true,
        type: 'info',
        message: 'Ingrese datos obligatorios'
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
  handleClose(){
    this.dialogVisible=false;
  }
  ValidadCliente(){
    this.$message({
      showClose: true,
      type: 'success',
      message: 'validar cliente'
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
      nameComponent:'crear-cliente',
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
      gridSelectedCliente:'',
      FLAGBANCO:'',
      FLAGMONEDA:'',
      proDisabled:true,
      tipoDocDisabled:false,            
      value: '',
      value1:'',
      inputAtributo:'',
      data:{
        Usuario:localStorage.getItem('User_Nombre'),
      },
      accesosUser: [],
      DepartamentoGrid:[],
      hours: 0,
      minutos:0,
      seconds:0
    }
  }
  
}
