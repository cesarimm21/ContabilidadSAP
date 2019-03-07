import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import BCompaniaProveedor from '@/components/buscadores/b_compania/b_compania.vue';
import BProveedorComponent from '@/components/buscadores/b_proveedor/b_proveedor.vue';
import BDocumentoComponent from '@/components/buscadores/b_tipoDocumento/b_tipoDocumento.vue';
import BMonedaComponent from '@/components/buscadores/b_moneda/b_moneda.vue';
import BImpuestoComponent from '@/components/buscadores/b_impuesto/b_impuesto.vue';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
//**BUS */
import {bus} from '../../../../main';

///**Servicios */
import ordencompraService from '@/components/service/ordencompra.service';
import diarioService from '@/components/service/diario.service'; 
import tipocambioService from '@/components/service/tipocambio.service';
import facturaService from '@/components/service/factura.service';
import prooveedorService from '@/components/service/proveedor.service';
//***Modelos */
import {TipoDocIdentidadModel} from '@/modelo/maestro/tipodocidentidad';
import {AlmacenModel} from '@/modelo/maestro/almacen';
import {CompaniaModel} from '@/modelo/maestro/compania';
import {OrdenCompraModel} from '@/modelo/maestro/ordencompra';
import {OrdenCompraDetalleModel} from '@/modelo/maestro/ordencompradetalle';
import {CategoriaLineaModel} from '@/modelo/maestro/categorialinea';
import {CategoriaCuentaModel} from '@/modelo/maestro/categoriacuenta';
import {PrioridadModel} from '@/modelo/maestro/prioridad';
import {MonedaModel} from '@/modelo/maestro/moneda';
import {ProveedorModel} from '@/modelo/maestro/proveedor';
import {FacturaModel} from '@/modelo/maestro/factura';
import {FacturaDetalleModel} from '@/modelo/maestro/facturadetalle';
import {DiarioModel} from '@/modelo/maestro/diario';
import {TipoCambioModel} from '@/modelo/maestro/tipocambio';
import {ImpuestoModel} from '@/modelo/maestro/impuesto';

import { Notification } from 'element-ui';
@Component({
  name: 'crear-ingreso-comprobante',
  components:{
  'buttons-accions':ButtonsAccionsComponent,
  'bproveedor':BProveedorComponent,
  'bcompania':BCompaniaProveedor,
  'bdocumento':BDocumentoComponent,
  'bmoneda':BMonedaComponent,
  'bimpuesto':BImpuestoComponent
  }
})
export default class CrearIngresoComprobanteComponent extends Vue {
  nameComponent:string;
  habilitar:boolean=false;
  habilitarPane:boolean=true;
  timer=0;
  codigoCompania:string;
  descripcionCompania:string;
  sizeScreen:string = (window.innerHeight - 420).toString();
  TableIngreso:any[];
  periodoData:Date;
  totalUnidad:number;
  totalDinero:number;
  salidaUnidad:string;
  salidaDinero:string;
  totalDolars:string;
  TotalPagarS:string;
  TotalPagarD:string;
  voucher:string;
  fechavencida:string;
  public tipocambio:TipoCambioModel=new TipoCambioModel();
  //**Compania */
  btnactivarcompania:boolean=false;
  dialogCompania:boolean=false;
  dataCompania:any[];
  public companiaModel:CompaniaModel=new CompaniaModel();
  //**Orden compra */
  dialogOrdenCompra:boolean=false;
  btnactivarOrdenCompra:boolean=false;
  dataOrdenCompra:any[];
  selectData:string;
  // public ordencompraDetalle:Array<OrdenCompraDetalleModel>[];
  public ordencompraDetalle:OrdenCompraDetalleModel[];
  public ordencompra:OrdenCompraModel=new OrdenCompraModel();
  public ordencompraSelect:OrdenCompraModel=new OrdenCompraModel();
  //**Proveedor */
  public proveedor:ProveedorModel=new ProveedorModel();
  //**Tipo Documento */
  dialogTipoDocumento:boolean=false;
  btnactivarTipoDocumento:boolean=false;
  public selectTipoDoc:TipoDocIdentidadModel=new TipoDocIdentidadModel();

  //**Documento */

  //**Moneda */
  dialogMoneda:boolean=false;
  btnactivarMoneda:boolean=false;
  dataMoneda:any[];
  public moneda:MonedaModel=new MonedaModel();
  //**Factura */
  public factura:FacturaModel=new FacturaModel();

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
  constructor(){    
    super();
    Global.nameComponent='crear-ingreso-comprobante';
    this.fecha_actual=Global.getDate(new Date().toDateString());   
    this.fecha_ejecucion=Global.getParseDate(new Date().toDateString());  
    this.loadTipocambio();
  }
  loadTipocambio(){
    tipocambioService.GetAllTipoCambio()
    .then(response=>{
      this.tipocambio=response;  
    }).catch(error=>{})
  }
  DateContabilizacionClick(){ 
    var date1=Global.getDateVencida(this.factura.dtmDoc_Acc_Date,this.proveedor.intDayToPay);
    this.factura.dtmDue_Date=date1;
    this.fechavencida=Global.getDateString(date1);   
    
}

  //#region [COMPANIA]
  loadCompania(){
    this.dialogCompania=true;
  }
  companiaSeleccionado(val:CompaniaModel,dialog:boolean){
    this.companiaModel=val;
    this.factura.strCompany_Cod=this.companiaModel.strCompany_Cod;
    this.dialogCompania=false;    
  }
  companiaClose(){
    this.companiaModel=new CompaniaModel();
    this.dialogCompania=false;
  }
  dialogCompaniaClose(){
    this.dialogCompania=false;
    this.btnactivarcompania=false;
  }
  activar_compania(){
    setTimeout(() => {
      this.btnactivarcompania=true;
      this.btnactivarMoneda=false;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=false;
      this.btnactivarImpuesto=false;
    }, 120)
  }
  desactivar_compania(){
    debugger;
    if(this.dialogCompania){
      this.btnactivarcompania=false;      
    }
    if(this.factura.strCompany_Cod===undefined){
      // alert('aaaaa');
    }
  }
  closeCompania(){
    this.btnactivarcompania=false;
    this.dialogCompania=false;
    return false;
  }
  //#endregion
  //#region [ORDEN COMPRA]
  loadOrdenCompra(){
    ordencompraService.GetAllOrdenCompra()
    .then(respose=>{
      this.ordencompra=respose;
      this.dialogOrdenCompra=true;      
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'no se pudo cargar orden compra'
      });
      this.dialogOrdenCompra=false;
    })
  }
  loadProveedor(){
    prooveedorService.getProveedorID(this.ordencompraSelect.strVendor_NO)
    .then(response=>{
      this.proveedor=response;      
    })
  }
  loadOrdenCompraDetalle(val){
    ordencompraService.GetAllOrdenDetalle(val)
    .then(respose=>{
      this.factura.listaDetalle=[];
      this.ordencompraDetalle=respose;    
      for(var i=0;i<this.ordencompraDetalle.length;i++){
        this.factura.listaDetalle.push({
          intAPDocD_ID:0,
          intAPDocH_ID:0,
          strCompany_Cod:this.companiaModel.strCompany_Cod,
          strPO_NO:this.factura.strPO_NO,
          strPO_Item_NO:this.ordencompraDetalle[i].intPO_Item_NO,
          strUM:this.ordencompraDetalle[i].strPO_Item_Desc,
          intQuantity:this.ordencompraDetalle[i].fltPO_QTY_I,
          intUnit_Price:this.ordencompraDetalle[i].fltPO_Net_PR_I,
          strDesc_Item:this.ordencompraDetalle[i].strUnit_Of_Purch,
          strAccount_Cod:this.ordencompraDetalle[i].strAccount_Cod,
          strCostCenter_NO:'',
          strValue_Doc:this.ordencompraDetalle[i].fltCurr_Net_PR_P,
          strValue_Local:this.ordencompraDetalle[i].fltCurr_Net_PR_P,
          strValue_Corp:this.ordencompraDetalle[i].fltCurr_Net_PR_P,
          strTax_Porcent:this.tipocambio.fltExchRate_Buy,
          strWH_Detrac_Cod:this.proveedor.strDetraccion_Cod,
          strValue_WH_Detrac:this.proveedor.fltDetraccion_Porcen,
          strWH_Reten_Cod:this.proveedor.strRetention_Cod,
          strValue_WH_Retention:this.proveedor.fltRetention_Porcen,
          strCreation_User:'egaona',//localStorage.getItem('User_Usuario'),
          dtmCreation_Date:new Date(),
          strModified_User:'egaona',//localStorage.getItem('User_Usuario'),
          dtmModified_Date:new Date(),
          chrStatus:'A'

        });
        var a=this.ordencompraDetalle[i].fltPO_QTY_I;
        var c=this.ordencompraDetalle[i].fltCurr_Net_PR_P;
        var b=a;
        var d=c;
        this.totalUnidad=this.totalUnidad+b;
        this.totalDinero=this.totalDinero+d;
      }
    this.factura.intQuantity_Doc=this.totalUnidad;
    this.factura.intValue_Doc=this.totalDinero;
    this.salidaUnidad=this.factura.intQuantity_Doc+' Unid.';
    this.salidaDinero='S/. '+this.factura.intValue_Doc+'.00';

    this.totalDolars='$. '+(this.totalDinero/this.tipocambio.fltExchRate_Buy).toFixed(2);
    this.factura.strValue_Local=this.factura.intValue_Doc.toString();
    this.factura.strValue_Corp=(this.totalDinero/this.tipocambio.fltExchRate_Buy).toFixed(2);
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'no se pudo cargar orden compra detalle '+error
      });
    })
  }
  closeOrdenCompra(){
    this.btnactivarOrdenCompra=false;
    this.dialogOrdenCompra=false;
    this.ordencompraSelect=new OrdenCompraModel();
    return false;
  }
  activar_OrdenCompra(){
    setTimeout(() => {
      this.btnactivarcompania=false;
      this.btnactivarMoneda=false;
      this.btnactivarOrdenCompra=true;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=false;
      this.btnactivarImpuesto=false;
    }, 120)
  }
  desactivar_OrdenCompra(){
    if(this.dialogOrdenCompra){
      this.btnactivarOrdenCompra=false;
    }
  }
  selectOrdenCompra(val:OrdenCompraModel){
    this.ordencompraSelect=val;
  }
  checkOrdenCompra(){    
    this.factura.strPO_NO=this.ordencompraSelect.strPO_NO;
    // this.factura.strVendor_NO=this.ordencompraSelect.strVendor_NO;
    this.factura.strVendor_NO=this.ordencompraSelect.strVendor_NO;
    this.factura.strDesc_Doc=this.ordencompraSelect.strPO_Desc;
    this.dialogOrdenCompra=false;
    this.loadProveedor();
    this.loadOrdenCompraDetalle(this.ordencompraSelect.intIdPOH_ID);
  }
  //#endregion
 
  //#region [TIPO DOCUMENTO]
  loadTipoDocumento(){
    this.dialogTipoDocumento=true;
  }
  closeTipoDocumento(){
    this.dialogTipoDocumento=false;
    this.btnactivarTipoDocumento=false;
  }
  activar_TipoDocumento(){
    setTimeout(() => {
      this.btnactivarcompania=false;
      this.btnactivarMoneda=false;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=true;
      this.btnactivarDiario=false;
      this.btnactivarImpuesto=false;
    }, 120)
  }
  desactivar_TipoDocumento(){
    if(this.dialogTipoDocumento){
      this.btnactivarTipoDocumento=false;
    }
  }
  tipoSeleccionado(val:TipoDocIdentidadModel){
    this.selectTipoDoc=val
    this.factura.strType_Doc=this.selectTipoDoc.strDocIdent_NO;
    this.dialogTipoDocumento=false;
  }

  closeTipo(){
    this.selectTipoDoc=new TipoDocIdentidadModel();
    this.factura.strType_Doc=this.selectTipoDoc.strDocIdent_NO;
    this.dialogTipoDocumento=false;
  }
  //#endregion
  //#region [DOCUMENTO]
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
      this.btnactivarcompania=false;
      this.btnactivarMoneda=true;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=false;
      this.btnactivarImpuesto=false;
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
      this.btnactivarcompania=false;
      this.btnactivarMoneda=false;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=true;
      this.btnactivarImpuesto=false;
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
      this.btnactivarcompania=false;
      this.btnactivarMoneda=false;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=false;
      this.btnactivarImpuesto=true;
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
    this.factura.intNetValue_Doc=this.totalDinero+ this.totalDinero*(this.Impuesto.fltPorcent/100);
    this.TotalPagarS='S/. '+(this.totalDinero+ this.totalDinero*(this.Impuesto.fltPorcent/100)).toFixed(2);
    this.TotalPagarD='$. '+((this.totalDinero+ this.totalDinero*(this.Impuesto.fltPorcent/100))/this.tipocambio.fltExchRate_Buy).toFixed(2);
  }
  closeImpuesto(){
    this.Impuesto=new ImpuestoModel();
    this.factura.strTax_Cod=this.Impuesto.strWH_Cod;
    this.dialogImpuesto=false;
  }
  //#endregion
  //#region [Factura] 
  created(){
    bus.$on('SaveFactura',(data)=>{
      if(data===this.nameComponent){
        this.saveFactura();
      }
    })
    bus.$on('ValidadProveedor',(data)=>{
      if(data===this.nameComponent){
          this.$message({
              showClose:true,
              type:'info',
              message:'Validate Proveedor'
          })
      }
  })
  }
  saveFactura(){
    if(this.factura.strPO_NO===undefined){
      this.$message({
        showClose: true,
        type: 'warning',
        message: 'debe seleccionar una orden de compra'
      });
    }
    else
    {
      var today = new Date();
      var dateWithoutTime = new Date(today.getFullYear() , today.getMonth(), today.getDate());
      this.factura.strPeriod_NO=this.fecha_actual;
      this.factura.strExchange_Rate=this.tipocambio.fltExchRate_Buy.toString();
      this.factura.dtmDoc_Date=dateWithoutTime;
      this.factura.strDoc_Status="egaona";//localStorage.getItem('User_Usuario');
      this.factura.strCreation_User=this.factura.strDoc_Status;    
      let loadingInstance = Loading.service({
        fullscreen: true,
        text: 'Guargando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
        );     
        facturaService.CreateFactura(this.factura)
        .then(response=>{
          this.voucher=response;
          this.habilitarPane=false;
          loadingInstance.close();
          this.openMessageSuccess('Se guardo correctamente '+response);
          this.factura=new FacturaModel();
    
        })
        .catch(e =>{
          debugger;
          console.log(e);
          
          this.openMessageError('Error guardar factura ');
          loadingInstance.close();
        })   
    }
     
    
  }
  openMessageSuccess(strMessage:string){
    this.$message({
        showClose: true,
        type: 'success',
        message: strMessage
      });
  }
  openMessageError(strMessage:string){
    this.$message({
        showClose: true,
        type: 'error',
        message: strMessage
      });
  }
  //#endregion
  data(){
    return{
      nameComponent:'crear-ingreso-comprobante',
      fechavencida:'',
      dialogTableVisible: false,
      periodoData:'',
      selectData:'',
      selectType:'',
      dataProveedor:[],
      ordencompraDetalle:[],
      codigoCompania:'001',
      totalDinero:0,
      totalUnidad:0,
      salidaUnidad:'',
      salidaDinero:'',
      totalDolars:'',
      TotalPagarS:'',
      TotalPagarD:'',
      voucher:'',
      habilitar:false,
      habilitarPane:true
     
    }
  }
  
}
