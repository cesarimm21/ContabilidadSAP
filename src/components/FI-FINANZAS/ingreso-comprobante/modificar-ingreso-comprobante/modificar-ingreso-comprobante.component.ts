import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';


import Login from '@/components/login/login.vue';
import Roles from '@/components/roles/roles.vue';
import UsuarioService from '@/components/service/usuario.service';
import LoginService from '@/components/service/login.service';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import {FacturaModel} from '@/modelo/maestro/factura';
import {DiarioModel} from '@/modelo/maestro/diario';
import {ImpuestoModel} from '@/modelo/maestro/impuesto';
import {MonedaModel} from '@/modelo/maestro/moneda';
import facturaService from '@/components/service/factura.service';
import diarioService from '@/components/service/diario.service'; 
import {CompaniaModel} from '@/modelo/maestro/compania';
import {TipoDocIdentidadModel} from '@/modelo/maestro/tipodocidentidad';
import companiaService from '@/components/service/compania.service';
import BDocumentoComponent from '@/components/buscadores/b_tipoDocumento/b_tipoDocumento.vue';
import BMonedaComponent from '@/components/buscadores/b_moneda/b_moneda.vue';
import BImpuestoComponent from '@/components/buscadores/b_impuesto/b_impuesto.vue';
import Global from '@/Global';
import { Notification } from 'element-ui';
@Component({
  name: 'modificar-ingreso-comprobante',
  components:{
    'bdocumento':BDocumentoComponent,
    'bmoneda':BMonedaComponent,
    'bimpuesto':BImpuestoComponent
  }
})
export default class ModificarIngresoComprobanteComponent extends Vue {
  VerAll:boolean=false;
  codigoInput:any;
  btnactivaringreso:boolean=false;
  dialogingreso:boolean=false;
  ingresoData:Array<FacturaModel>[];
  public factura:FacturaModel=new FacturaModel();
  public ingresoSelect:FacturaModel=new FacturaModel();
  public companiaModel:CompaniaModel=new CompaniaModel();
  //**Tipo Documento */
  dialogTipoDocumento:boolean=false;
  btnactivarTipoDocumento:boolean=false;
  public selectTipoDoc:TipoDocIdentidadModel=new TipoDocIdentidadModel();

  //**Diario */
  public diarioModel:DiarioModel=new DiarioModel();
  dialogDiario:boolean=false;
  btnactivarDiario:boolean=false;
  public diarioSelect:DiarioModel=new DiarioModel();
  fecha_actual:string;
  fecha_ejecucion:string;
  //**impuesto */
  public Impuesto:ImpuestoModel=new ImpuestoModel();
  dialogImpuesto:boolean=false;
  btnactivarImpuesto:boolean=false;

  //**Moneda */
  dialogMoneda:boolean=false;
  btnactivarMoneda:boolean=false;
  dataMoneda:any[];
  public moneda:MonedaModel=new MonedaModel();

  constructor(){
    super();
    Global.nameComponent='modificar-ingreso-comprobante';
    this.ingresoSelect.strVoucher_NO='';
  }
  desactivar_ingreso(){
    if(this.dialogingreso){
      this.btnactivaringreso=false;      
    }
  }
  activar_ingreso(){
    setTimeout(() => {
      this.btnactivarMoneda=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=false;
      this.btnactivarImpuesto=false;
      this.btnactivaringreso=true;
    }, 120)
  }
  loadIngreso(){
    this.dialogingreso=true;
  }
  selectOrdenCompra(val:FacturaModel){
    this.ingresoSelect=val;
    
  }
  checkIngreso(){
    this.dialogingreso=false;
    this.factura=this.ingresoSelect; 
    this.loadCompania(this.factura.strCompany_Cod)
  }
  loadCompania(v){
    companiaService.GetCompaniaBystrCod(v)
    .then(response=>{
      this.companiaModel=response;            
    })
  }
  closeIngreso(){
    this.dialogingreso=false;
    this.codigoInput='';
    this.ingresoSelect=new FacturaModel();
    this.ingresoData=[];
  }
  loadIngresoByCod(){
    if(this.codigoInput===''||this.codigoInput.length!=8){
      this.$message({
        showClose: true,
        type: 'warning',
        message: 'Ingrese codigo/ tamaño 8 cifras'
      });
    }
    else{
      facturaService.GetFacturaId(this.codigoInput)
      .then(response=>{
        this.ingresoData=response;
      }).catch(error=>{

      })
    }
    
  }
//#region [TIPO DOCUMENTO]
desactivar_TipoDocumento(){
  if(this.dialogTipoDocumento){
    this.btnactivarTipoDocumento=false;
  }
}
loadTipoDocumento(){
  this.dialogTipoDocumento=true;
}
closeTipoDocumento(){
  this.dialogTipoDocumento=false;
  this.btnactivarTipoDocumento=false;
}
activar_TipoDocumento(){
  setTimeout(() => {
    this.btnactivarMoneda=false;
    this.btnactivarTipoDocumento=true;
    this.btnactivarDiario=false;
    this.btnactivarImpuesto=false;
    this.btnactivaringreso=false;
  }, 120)
}
tipoSeleccionado(val:TipoDocIdentidadModel){
  this.selectTipoDoc=val
  this.factura.strType_Doc=this.selectTipoDoc.strDocIdent_NO;
  this.dialogTipoDocumento=false;
}

closeTipo(){
  this.selectTipoDoc=new TipoDocIdentidadModel();
  // this.factura.strType_Doc=this.selectTipoDoc.strDocIdent_NO;
  this.dialogTipoDocumento=false;
}
//#endregion
//#region [Diario]
loadDiario(){
  diarioService.GetAllDiarios()
  .then(response=>{
    this.diarioModel=response;
    this.dialogDiario=true;
  }).catch(error=>{
    this.$message({
      showClose: true,
      type: 'error',
      message: 'no se pudo cargar diarios'
    });
    this.dialogDiario=false;
  })
}
desactivar_Diario(){
  if(this.dialogDiario){
    this.btnactivarDiario=false;
  }
}
activar_Diario(){
  setTimeout(() => {
    this.btnactivarMoneda=false;
    this.btnactivarTipoDocumento=false;
    this.btnactivarDiario=true;
    this.btnactivarImpuesto=false;
    this.btnactivaringreso=false;
  }, 120)
}
checkSelectdbDiario(val:DiarioModel){  
  this.factura.strDaily_Cod=this.diarioSelect.strDaily_Cod;
  this.dialogDiario=false;
}
checkSelectDiario(val:DiarioModel){
  this.diarioSelect=val;
}
closeDiario(){
  this.diarioSelect=new DiarioModel();
  this.dialogDiario=false;
}
closeDialogDiario(){
  this.dialogDiario=false;
}
//#endregion
//#region [IMPUESTO]
loadImpuesto(){
  this.dialogImpuesto=true;
}
closeDialogImpuesto(){
  this.btnactivarImpuesto=false;
  this.dialogImpuesto=false;
}
activar_Impuesto(){
  setTimeout(() => {
    this.btnactivarMoneda=false;
    this.btnactivarTipoDocumento=false;
    this.btnactivarDiario=false;
    this.btnactivarImpuesto=true;
    this.btnactivaringreso=false;
  }, 120)
}
desactivar_Impuesto(){
  if(this.dialogImpuesto){
    this.btnactivarImpuesto=false;
  }
}  
ImpuestoSeleccionado(val:ImpuestoModel){
  this.Impuesto=val
  this.factura.strTax_Cod=this.Impuesto.strWH_Cod;
  this.factura.fltValue_Tax=this.Impuesto.fltPorcent;  
  this.dialogImpuesto=false;
  // this.factura.intNetValue_Doc=this.totalDinero+ this.totalDinero*(this.Impuesto.fltPorcent/100);
  // this.TotalPagarS='S/. '+(this.totalDinero+ this.totalDinero*(this.Impuesto.fltPorcent/100)).toFixed(2);
  // this.TotalPagarD='$. '+((this.totalDinero+ this.totalDinero*(this.Impuesto.fltPorcent/100))/this.tipocambio.fltExchRate_Buy).toFixed(2);
}
closeImpuesto(){
  this.Impuesto=new ImpuestoModel();
  // this.factura.strTax_Cod=this.Impuesto.strWH_Cod;
  this.dialogImpuesto=false;
}
//#endregion
//#region [MONEDA]
loadMoneda(){
  this.dialogMoneda=true;
}

closeDialogMoneda(){
  this.btnactivarMoneda=false;
  this.dialogMoneda=false;
}
activar_Moneda(){
  setTimeout(() => {
    this.btnactivarMoneda=true;
    this.btnactivarTipoDocumento=false;
    this.btnactivarDiario=false;
    this.btnactivarImpuesto=false;
    this.btnactivaringreso=false;
  }, 120)
}
desactivar_Moneda(){
  if(this.dialogMoneda){
    this.btnactivarMoneda=false;
  }
}

checkSelectMoneda(val){
  this.moneda.strCurrency_Cod=val.codigo
}
MonedaSeleccionado(val:MonedaModel){
  this.moneda=val
  this.factura.strCurrency_Doc=this.moneda.strCurrency_Cod;
  this.dialogMoneda=false;
}

closeMoneda(){
  this.moneda=new MonedaModel();
  this.factura.strPaid_Bank=this.moneda.strCurrency_Cod;
  this.dialogMoneda=false;
}
//#endregion
  data(){
    return{
      dialogTableVisible: false,
      VerAll:false,
      ingresoData:[],
      codigoInput:''
    }
  }
  
}
