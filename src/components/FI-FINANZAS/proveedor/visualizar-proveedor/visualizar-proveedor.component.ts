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
import proveedorService from '@/components/service/proveedor.service';
import Global from '@/Global';
import paisService from '@/components/service/pais.service';
import bancoService from '@/components/service/banco.service';
import tipodocidentidadService from '@/components/service/tipodocidentidad.service';
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
  name: 'visualizar-proveedor',
  components:{
    'bdocumento':BDocumentoComponent,
    'bcompania':BCompaniaProveedor,
    'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class VisualizarProveedorComponent extends Vue {
  nameComponent:boolean=false;
  dialogVisible:boolean=false;
  btnactivarproveedor:boolean=false;
  gridTemp: ProveedorModel[];
  btnactivarcompania:boolean=false;
  dialogCompania:boolean=false;
  textosave='';
  value1:any;
  visibleCard:boolean=false;
  issave:boolean=false;
  iserror:boolean=false;
  vifprogress:boolean=true;
  proDisabled:boolean=true;
  VisibleForName:boolean=true;
  ApellidosShow:boolean=false;
  nameTipoJoN:string='';
  FLAGBANCO:String;
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
  //**Banco */
  public Banco:BancoModel=new BancoModel();
  public selectBancoA:BancoModel=new BancoModel();
  public selectBancoB:BancoModel=new BancoModel();
  public selectBancoC:BancoModel=new BancoModel();
  public selectBancoD:BancoModel=new BancoModel();
  //**Proveedor */
  gridProveedor: ProveedorModel[];
  gridSelectedProveedor:any;
  //***Tipo documento */
  tipodocVisible:boolean=false;
  public selectTipoDoc:TipoDocIdentidadModel=new TipoDocIdentidadModel();
  btnactivarTipoDocumento:boolean=false;
  //**Departamento */
  departVisible:Boolean=false;
  public selectDepartamento:DepartamentoModel=new DepartamentoModel();
  //**Moneda */
  public selectMonedaA:MonedaModel=new MonedaModel();
  public selectMonedaB:MonedaModel=new MonedaModel();
  public selectMonedaC:MonedaModel=new MonedaModel();
  public selectMonedaD:MonedaModel=new MonedaModel();
  FLAGMONEDA:String;
  //**Categoria */

  public Categoria: CategoriaModel=new CategoriaModel();

  //**Impuesto */
  public Impuesto:ImpuestoModel=new ImpuestoModel();
  public selectImpuesto:ImpuestoModel=new ImpuestoModel();
  //**cuenta contable */
  cuenta:CuentaContableModel[];
  // public gridSelectedProveedor:ProveedorModel=new ProveedorModel();
  constructor(){
    super();
    Global.nameComponent='visualizar-proveedor';
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
    this.gridProveedor=[];
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
    }, 120)
  }
  desactivar_compania(){
    if(this.dialogCompania){
      this.btnactivarcompania=false;
    }
  }
  closeCompania(){
    this.btnactivarcompania=false;
    this.dialogCompania=false;
    return false;
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
 //#endregion
  //#region [Proveedor]  
  loadTipoDocumento(v){    
    
    this.selectTipoDoc=new TipoDocIdentidadModel();
    tipodocidentidadService.GetOnlyOneTipoDocumento(v)
    .then(response=>{
      this.selectTipoDoc=response;
      console.log(this.selectTipoDoc);      
    }).catch(error=>{

    })
  }
  GetProveedoresCompany(strCompany_Cod){
    this.gridProveedor=[];
    proveedorService.GetProveedoresCompany(strCompany_Cod)
    .then(response=>{
      this.gridProveedor=response;
      ///////////////////////////////////////////////////////////////
      if(response.length>0){
        this.proDisabled=false;
        this.gridTemp=response; 
        for(var i=0;i<this.gridTemp.length;i++){
          if(this.gridTemp[i].strCat_Person==='Natural'){
            this.gridTemp[i].strVendor_Desc=this.gridTemp[i].strVendor_Desc+' '+this.gridTemp[i].strSurName+' '+this.gridTemp[i].strLastName;
          }          
        }
        this.gridProveedor=this.gridTemp;
        this.gridTemp=[];
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
  }
  proveedorCheck(){
    this.dialogVisible=false;
    this.visibleCard=true;
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
  okvisualizar(){
    this.visibleCard=false;
    this.Proveedor=new ProveedorModel();
    this.companiaModel=new CompaniaModel();
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
  }
  //#region  [Departamento]
  GetOnlyOneDepartamento(v){
    departamentoService.GetOnlyOneDepartamento(v)
    .then(response=>{
      this.selectDepartamento=response;
    })
  } 
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
      this.nameTipoJoN='Razon social';
      this.RucOrDni='RUC';
      this.ApellidosShow=false;
      this.Proveedor.intIdVenCateg_ID=val;
      this.Proveedor.strCat_Person='Jurídica';
    }
    if(val===2){
      this.nameTipoJoN='Nombres';
      this.RucOrDni='DNI';
      this.ApellidosShow=true;
      this.Proveedor.intIdVenCateg_ID=val;
      this.Proveedor.strCat_Person='Natural';
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

  data(){
    return{
      dialogTableVisible: false,
      proDisabled:true,
      VisibleForName:true,
      gridProveedor:[],
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
      visibleCard:false
    }
  }
  
}
