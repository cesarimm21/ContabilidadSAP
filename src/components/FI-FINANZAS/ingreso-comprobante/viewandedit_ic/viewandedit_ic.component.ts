import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import BProveedorComponent from '@/components/buscadores/b_proveedor/b_proveedor.vue';
import BComprobantepagoComponent from '@/components/buscadores/b_comprobante_pago/b_comprobante_pago.vue';
import BMonedaComponent from '@/components/buscadores/b_moneda/b_moneda.vue';
import BImpuestoComponent from '@/components/buscadores/b_impuesto/b_impuesto.vue';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
///**Servicios */
import ordencompraService from '@/components/service/ordencompra.service';
import diarioService from '@/components/service/diario.service'; 
import diariogeneralService from '@/components/service/diariogeneral.service'; 
import movimientoService from '@/components/service/movinventario.service'; 
import tipocambioService from '@/components/service/tipocambio.service';
import facturaService from '@/components/service/factura.service';
import prooveedorService from '@/components/service/proveedor.service';
import periodoService from '@/components/service/periodo.service';
//***Modelos */
import {TipoDocIdentidadModel} from '@/modelo/maestro/tipodocidentidad';
import {TipoComprobantePagoModel} from '@/modelo/maestro/tipocomprobantepago';
import {AlmacenModel} from '@/modelo/maestro/almacen';
import {OrdenCompraModel} from '@/modelo/maestro/ordencompra';
import {OrdenCompraDetalleModel} from '@/modelo/maestro/ordencompradetalle';
import {CategoriaLineaModel} from '@/modelo/maestro/categorialinea';
import {CategoriaCuentaModel} from '@/modelo/maestro/categoriacuenta';
import {PrioridadModel} from '@/modelo/maestro/prioridad';
import {MonedaModel} from '@/modelo/maestro/moneda';
import {PeriodoModel} from '@/modelo/maestro/periodo';
import {ProveedorModel} from '@/modelo/maestro/proveedor';
import {FacturaModel} from '@/modelo/maestro/factura';
import {FacturaDetalleModel} from '@/modelo/maestro/facturadetalle';
import {DiarioModel} from '@/modelo/maestro/diario';
import {DiarioGeneralModel} from '@/modelo/maestro/diariogeneral';
import {TipoCambioModel} from '@/modelo/maestro/tipocambio';
import {ImpuestoModel} from '@/modelo/maestro/impuesto';
import {MovimientoInventarioModel} from '@/modelo/maestro/movimientoinventario';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import impuestoService from '@/components/service/impuesto.service';
import { Alert } from '@/types';
@Component({
  name: 'viewandedit-ingreso-comprobante',
  components:{
  'buttons-accions':ButtonsAccionsComponent,
  'bproveedor':BProveedorComponent,
  'quickaccessmenu':QuickAccessMenuComponent,
  'bcomprobantepago':BComprobantepagoComponent,
  'bmoneda':BMonedaComponent,
  'bimpuesto':BImpuestoComponent
  }
})
export default class ViewAndEditICComponent extends Vue {
  nameComponent:string;
  habilitar:boolean=false;
  habilitarPane:boolean=true;
  timer=0;
  cell_ocultar:string='transparent';
  editing:any= {
    row:'',
    column:''
};
  CodigoGeneral:string;
  rowSelect:number;
  codigoCompania:any;
  descripcionCompania:any;
  sizeScreen:string = (window.innerHeight - 420).toString();
  TableIngreso:any[];  
  totalDolars:string;
  TotalPagarD:string;
  voucher:string;
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  Flag:string='';
  vifprogress:boolean=true;
  valuem:number=0;
  public periodo:PeriodoModel=new PeriodoModel();
  public tipocambio:TipoCambioModel=new TipoCambioModel();
  //Movimiento Invetario []
  movimientoInven:MovimientoInventarioModel[];
  //#region [BOTONES]
  bln_tbl_cantidad:boolean=false;
  bln_tbl_centro_costo:boolean=false;
  multipleSelection: any[];
  arrayTemp:any[];
  //**Compania */
  btnactivarcompania:boolean=false;
  dataCompania:any[];
  //**Orden compra */
  dialogOrdenCompra:boolean=false;
  btnactivarOrdenCompra:boolean=false;
  dataOrdenCompra:any[];
  selectData:string;
  public ordencompraDetalle:OrdenCompraDetalleModel[];
  ordencompra:OrdenCompraModel[];
  public ordencompraSelect:OrdenCompraModel=new OrdenCompraModel();
  //**Proveedor */
  public proveedor:ProveedorModel=new ProveedorModel();
  proveedores1:any;
  //**Tipo Documento */
  dialogTipoDocumento:boolean=false;
  btnactivarTipoDocumento:boolean=false;
  public selectTipoDoc:TipoDocIdentidadModel=new TipoDocIdentidadModel();
  public comprobantePago:TipoComprobantePagoModel=new TipoComprobantePagoModel();
  //**Moneda */
  dialogMoneda:boolean=false;
  btnactivarMoneda:boolean=false;
  dataMoneda:any[];
  public moneda:MonedaModel=new MonedaModel();
  //**Factura */
  public factura:FacturaModel=new FacturaModel();
  facturadetalle:FacturaDetalleModel[];
  //**Diario */
  public diarioModel:DiarioModel=new DiarioModel();
  dialogDiario:boolean=false;
  btnactivarDiario:boolean=false;
  public diarioSelect:DiarioModel=new DiarioModel();
  fecha_actual:string;
  fecha_ejecucion:string;
  fecha_ejecucion1:string;
  fecha_vencida:string='';
  public DiarioGeneral:DiarioGeneralModel=new DiarioGeneralModel();
  diarioInput:DiarioGeneralModel[];
  //**impuesto */
  public Impuesto:ImpuestoModel=new ImpuestoModel();
  public ImpuestoB:ImpuestoModel=new ImpuestoModel();
  public ImpuestoC:ImpuestoModel=new ImpuestoModel();
  dialogImpuesto:boolean=false;
  btnactivarImpuesto:boolean=false;
  columnView:boolean=false;
  ImpuestoDisabled:boolean=true;
  nameFuncion:string;
  impDisabled:boolean=false;
  constructor(){    
    super();
    this.cell_ocultar='#e4e2e2';  
    Global.nameComponent='factura';      
   
    setTimeout(() => {
        this.load();
      }, 200)
  }
  
  load(){
        this.factura= JSON.parse(this.$route.query.data);    
        var vista=this.$route.query.vista;       
        if(vista=='Modificar'){
            this.nameFuncion='Modificar Ingreso Comprobante';
            this.impDisabled=false;
        }
        if(vista=='Visualizar'){
            this.nameFuncion='Visualizar Ingreso Comprobante';
            this.impDisabled=true;
        }           

    this.codigoCompania=localStorage.getItem('compania_cod');
    this.descripcionCompania=localStorage.getItem('compania_name'); 
    this. loadImpuesot();  
    this.fecha_ejecucion=Global.getParseDate(this.factura.dtmDoc_Acc_Date);  
    this.fecha_ejecucion1=Global.getParseDate(this.factura.dtmDoc_Date);  
    this.fecha_actual=Global.getDate(this.factura.dtmPeriod);  
    this.fecha_vencida=Global.getDateVencidaForView(this.factura.dtmDue_Date);
    facturaService.GetFacturaDetalle(this.factura.strVoucher_NO)
    .then(response=>{
      this.facturadetalle=response;
    }).catch(eer=>{})
    
    
  }
  loadImpuesot(){
    impuestoService.GetOnlyOneImpuesto(this.factura.strTax_Cod)
    .then(respo=>{
      this.Impuesto=respo;
    })
  }
  DateforGetChanceDolar(){    
    tipocambioService.GetAllTipoCambio(this.factura.dtmDoc_Date)
    .then(response=>{
      this.tipocambio=response;  
      this.factura.fltExchange_Rate=this.tipocambio.fltExchRate_Sale;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'no se pudo cargar tipocambio '+error
      });
    })
    prooveedorService.getProveedorID(this.factura.strVendor_NO)
    .then(response=>{
      this.proveedor=response;  
      var date1=Global.getDateVencida(this.factura.dtmDoc_Date,this.proveedor.intDayToPay);
      this.fecha_vencida=Global.getDateVencidaForView(date1);
      this.factura.dtmDue_Date=new Date(this.fecha_vencida);    
      this.factura.strWH_Reten_Cod=this.proveedor.strRetention_Cod;
      this.factura.fltValue_WH_Retention=this.proveedor.fltRetention_Porcen;
      this.factura.strDetrac_Cod=this.proveedor.strDetraccion_Cod;
      this.factura.fltDetraccion_Porcen=this.proveedor.fltDetraccion_Porcen;
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'no se pudo cargar proveedor '+error
      });
    })    
  }
  DateVencida(){this.factura.dtmDue_Date=new Date(this.fecha_vencida);}
  fnOcultar(){
    
  }
  clickCheck(event,edit,column){
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
    this.factura.fltOperation_NoTax_Local=0;
    this.factura.fltOperation_NoTax_Corp=0;
    for(var i=0;i< this.facturadetalle.length;i++){
      if(this.facturadetalle[i].blnCheck==false){
        this.factura.fltOperation_NoTax_Local+=Number(this.facturadetalle[i].intUnit_Price);
      }
    }
    var corp=(Number(this.factura.fltOperation_NoTax_Local)/Number(this.factura.fltExchange_Rate)).toFixed(2);
    this.factura.fltOperation_NoTax_Corp=parseFloat(corp);    
        
  }
  //#region [ACCIONES DE TABLA]
  handleBlurImporte(event) {
    debugger;
    var inttotal=0;       
  }
  handleBlur(){

  }
  clickcantidad(event,edit,column){
    this.bln_tbl_cantidad=true;
    this.btnactivarOrdenCompra=false;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  clickcentrocosto(event,edit,column){
    this.bln_tbl_centro_costo=true;
    this.bln_tbl_cantidad=false;
    this.btnactivarOrdenCompra=false;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  // handleSelectionChange(val) {
  //   this.multipleSelection = val;
  //   this.arrayTemp=[];
  //   this.factura.fltValue_Local=0;
  //   this.factura.fltValue_Corp=0;
  //   this.factura.fltValue_Tax_Local=0;
  //   this.factura.fltValue_Tax_Corp=0;
  //   this.factura.fltNetValue_Doc_Local=0;
  //   this.factura.fltNetValue_Doc_Corp=0;
  //   debugger;
  //   for (let i = 0; i < this.multipleSelection.length; i++) {
  //     this.factura.fltValue_Local+=Number(this.multipleSelection[i].fltValue_Local);
  //   }
  //   var dat1=(Number(this.factura.fltValue_Local)/Number(this.factura.fltExchange_Rate)).toFixed(2);
  //   this.factura.fltValue_Corp=parseFloat(dat1); 
  //   var valorIgv=Number(this.factura.fltValue_Local)*Number(this.Impuesto.fltPorcent/100);
  //   this.factura.fltValue_Tax_Local=Number(this.factura.fltValue_Local)*Number(this.Impuesto.fltPorcent/100);
  //   var dat2=(Number(this.factura.fltValue_Tax_Local)/Number(this.factura.fltExchange_Rate)).toFixed(2);
  //   this.factura.fltValue_Tax_Corp=parseFloat(dat2);
  //   this.factura.fltNetValue_Doc_Local=Number(this.factura.fltValue_Local)+ Number(valorIgv)+Number(this.factura.fltOperation_NoTax_Local);
  //   var dat1=(Number(this.factura.fltNetValue_Doc_Local)/Number(this.factura.fltExchange_Rate)).toFixed(2);
  //   this.factura.fltNetValue_Doc_Corp=parseFloat(dat1);  
  // }
  handleCurrentChange(val){
    debugger;
    this.rowSelect=val.intIdPOD_ID;         
}
handleChangeCantidad(val){
  this.factura.fltValue_Local=0;
    this.factura.fltValue_Corp=0;
    this.factura.fltValue_Tax_Local=0;
    this.factura.fltValue_Tax_Corp=0;
    this.factura.fltNetValue_Doc_Local=0;
    this.factura.fltNetValue_Doc_Corp=0;
  for (let i = 0; i < this.facturadetalle.length; i++) {
    if(this.facturadetalle[i].intIdPOD_ID == this.rowSelect){
        this.facturadetalle[i].fltValue_Local=val*this.facturadetalle[i].intUnit_Price;
        this.arrayTemp=this.facturadetalle; 
        this.facturadetalle=[];              
        this.facturadetalle=this.arrayTemp;  
        this.arrayTemp=[];
    }
  }
  // for (let i = 0; i < this.facturadetalle.length; i++) {
  //   if(this.facturadetalle[i].intIdPOD_ID == this.rowSelect){
  //       this.facturadetalle[i].fltValue_Local=val*this.facturadetalle[i].intUnit_Price;
  //   }
  // }
  for (let i = 0; i < this.facturadetalle.length; i++) {
    this.factura.fltValue_Local+=Number(this.facturadetalle[i].fltValue_Local);
  }
  var dat1=(Number(this.factura.fltValue_Local)/Number(this.factura.fltExchange_Rate)).toFixed(2);
  this.factura.fltValue_Corp=parseFloat(dat1); 
  var valorIgv=Number(this.factura.fltValue_Local)*Number(this.Impuesto.fltPorcent/100);
  this.factura.fltValue_Tax_Local=Number(this.factura.fltValue_Local)*Number(this.Impuesto.fltPorcent/100);
  var dat2=(Number(this.factura.fltValue_Tax_Local)/Number(this.factura.fltExchange_Rate)).toFixed(2);
  this.factura.fltValue_Tax_Corp=parseFloat(dat2);
  this.factura.fltNetValue_Doc_Local=Number(this.factura.fltValue_Local)+ Number(valorIgv)+Number(this.factura.fltOperation_NoTax_Local);
  var dat1=(Number(this.factura.fltNetValue_Doc_Local)/Number(this.factura.fltExchange_Rate)).toFixed(2);
  this.factura.fltNetValue_Doc_Corp=parseFloat(dat1);  

}
//#endregion
  //#region [ORDEN COMPRA]
  loadOrdenCompra(){
    ordencompraService.GetAllOrdenCompra()
    .then(respose=>{
      this.ordencompra=[];
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
  loadOrdenCompraDetalle(val){
    ordencompraService.GetAllOrdenDetalle(val)
    .then(response=>{
      this.ordencompraDetalle=response;
      this.factura.intQuantity_Doc=0;
      this.factura.fltValue_Doc=0;
      this.facturadetalle=[];
      for(var i=0;i<this.ordencompraDetalle.length;i++){
        var item:FacturaDetalleModel=new FacturaDetalleModel();
        item.intIdPOD_ID=this.ordencompraDetalle[i].intIdPOD_ID;
        item.strCompany_Cod=this.factura.strCompany_Cod;
        item.strPO_NO=this.ordencompraDetalle[i].strPO_NO;
        item.intPO_Item_NO=this.ordencompraDetalle[i].intPO_Item_NO;
        item.strUM=this.ordencompraDetalle[i].strUnit_Of_Purch;
        item.intQuantity=this.ordencompraDetalle[i].fltPO_QTY_I;
        item.intUnit_Price=this.ordencompraDetalle[i].fltPO_Net_PR_I;
        item.strDesc_Item=this.ordencompraDetalle[i].strPO_Item_Desc;
        item.strAccount_Cod=this.ordencompraDetalle[i].strAccount_Cod;//aqui esta la cuenta contable
        item.strCostCenter_NO=this.ordencompraDetalle[i].strCostCenter_NO;
        item.fltValue_Doc=this.ordencompraDetalle[i].fltCurr_Net_PR_P;
        item.fltValue_Local=this.ordencompraDetalle[i].fltCurr_Net_PR_P;
        item.fltValue_Corp=this.ordencompraDetalle[i].fltCurr_Net_PR_P;
        item.strTax_Cod=this.factura.strTax_Cod;
        item.fltValue_Tax=this.factura.fltValue_Tax_Local;
        item.blnCheck=true;
        item.strCreation_User='egaona';
        item.dtmCreation_Date=new Date();
        item.chrStatus='A';
        this.facturadetalle.push(item);
        this.factura.fltValue_Doc+=Number(this.ordencompraDetalle[i].fltCurr_Net_PR_P);
        this.factura.intQuantity_Doc+=Number(this.ordencompraDetalle[i].fltPO_QTY_I);
      }     
    })    
  }
  closeOrdenCompra(){
    this.btnactivarOrdenCompra=false;
    this.dialogOrdenCompra=false;
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
    this.factura.strVendor_NO=this.ordencompraSelect.strVendor_NO;
    this.factura.strVendor_Desc=this.ordencompraSelect.strVendor_Desc;
    this.factura.strDesc_Doc=this.ordencompraSelect.strPO_Desc;
    this.dialogOrdenCompra=false;    
    this.loadOrdenCompraDetalle(this.ordencompraSelect.intIdPOH_ID);
    this.factura.strTax_Cod=this.ordencompraSelect.strWH_Cod;
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
  ComprobantePagoSeleccionado(val:TipoComprobantePagoModel){
    this.comprobantePago=val
    this.factura.strType_Doc=this.comprobantePago.strDocType_Cod;
    this.dialogTipoDocumento=false;
  }

  closeTipo(){
    this.dialogTipoDocumento=false;
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
    this.dialogDiario=false;
    this.factura.strDaily_Cod=this.diarioSelect.strDaily_Cod;
    this.factura.strDaily_Desc=this.diarioSelect.strDaily_Desc;
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
  loadImpuesto(val){
    this.Flag=val;
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
    if(this.Flag=='A'){
      this.Impuesto=val
      // this.factura.strTax_Cod=this.Impuesto.strWH_Cod;
      this.dialogImpuesto=false;  
      for(var i=0;i<this.facturadetalle.length;i++){
        this.facturadetalle[i].strTax_Cod=this.factura.strTax_Cod;
        this.facturadetalle[i].fltValue_Tax=this.Impuesto.fltPorcent;
      }
      this.columnView=true;
      var temp=this.facturadetalle;
      this.facturadetalle=[];
      this.facturadetalle=temp;
    }
    if(this.Flag=='B'){
      this.ImpuestoB=val;
      this.factura.strWH_Reten_Cod=this.ImpuestoB.strWH_Cod;
      this.factura.fltValue_WH_Retention=this.ImpuestoB.fltPorcent;
    }
    if(this.Flag=='C'){
      this.ImpuestoC=val;
      this.factura.strDetrac_Cod=this.ImpuestoC.strWH_Cod
      this.factura.fltDetraccion_Porcen=this.ImpuestoC.fltPorcent;
    }    
    else{
      this.Impuesto=val;
      for (let i = 0; i < this.facturadetalle.length; i++) {
        if(this.facturadetalle[i].intIdPOD_ID == this.rowSelect){
            this.facturadetalle[i].strTax_Cod=this.Impuesto.strWH_Cod;
            this.arrayTemp=this.facturadetalle; 
            this.facturadetalle=[];              
            this.facturadetalle=this.arrayTemp;  
            this.arrayTemp=[];
        }
      }
      this.dialogImpuesto=false;
        this.factura.fltValue_Local=0;
        this.factura.fltValue_Corp=0;
        this.factura.fltValue_Tax_Local=0;
        this.factura.fltValue_Tax_Corp=0;
        this.factura.fltNetValue_Doc_Local=0;
        this.factura.fltNetValue_Doc_Corp=0;

        for (let i = 0; i < this.facturadetalle.length; i++) {
          if(this.facturadetalle[i].strTax_Cod==this.factura.strTax_Cod){
            this.factura.fltValue_Local+=Number(this.facturadetalle[i].fltValue_Local);
          }
          else{
            this.factura.fltOperation_NoTax_Local+=Number(this.facturadetalle[i].fltValue_Local);
          }          
        }
        var dat1=(Number(this.factura.fltValue_Local)/Number(this.factura.fltExchange_Rate)).toFixed(2);
        this.factura.fltValue_Corp=parseFloat(dat1); 
        var valorIgv=Number(this.factura.fltValue_Local)*Number(this.Impuesto.fltPorcent/100);
        this.factura.fltValue_Tax_Local=Number(this.factura.fltValue_Local)*Number(this.Impuesto.fltPorcent/100);
        var dat2=(Number(this.factura.fltValue_Tax_Local)/Number(this.factura.fltExchange_Rate)).toFixed(2);
        this.factura.fltValue_Tax_Corp=parseFloat(dat2);
        this.factura.fltNetValue_Doc_Local=Number(this.factura.fltValue_Local)+ Number(valorIgv)+Number(this.factura.fltOperation_NoTax_Local);
        var dat1=(Number(this.factura.fltNetValue_Doc_Local)/Number(this.factura.fltExchange_Rate)).toFixed(2);
        this.factura.fltNetValue_Doc_Corp=parseFloat(dat1);  
        var datcorp=(Number(this.factura.fltOperation_NoTax_Local)/Number(this.factura.fltExchange_Rate)).toFixed(2);
        this.factura.fltOperation_NoTax_Corp=parseFloat(datcorp);  
    }    
  }
  closeImpuesto(){
    this.dialogImpuesto=false;
  }
  //#endregion
  //#region [Factura] 
  guardarTodo(event){  
    if(this.$route.query.vista=='Modificar'){
      if(this.factura.strPO_NO===''){
        this.$message({
          showClose: true,
          type: 'warning',
          message: 'debe seleccionar una orden de compra'
        });
      }
      else
      {
        let loadingInstance = Loading.service({
          fullscreen: true,
          text: 'Guargando...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.8)'
          }
          );  
        this.factura.dtmDoc_Acc_Date=new Date(this.fecha_ejecucion);
          this.factura.dtmDoc_Date=new Date(this.fecha_ejecucion1);
          this.factura.strModified_User='egaona'; 
          this.factura.listaDetalle=this.facturadetalle;
          facturaService.UpdateFactura(this.factura)
          .then(response=>{
            loadingInstance.close();
            this.openMessageSuccess('Se actualizo correctamente '+response);
            this.issave = true;
            this.iserror = false;
            this.textosave = 'Se actualizo correctamente. Voucher Nro. '+response;
          }).catch(error=>{
            this.issave = false;
            this.iserror = true;
            this.openMessageError('Error actualizo factura ');
            this.textosave = 'Error actualizo factura. ';
            loadingInstance.close();
          })
      }
    } 
    else{
      this.$message({
        showClose: true,
        type: 'info',
        message: 'Accion no permitida'
      });
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
  changeIcon(event){
    this.ImpuestoDisabled=false;
    this.bln_tbl_centro_costo=false;
  }
  backPage(){
    window.history.back();
  }
  reloadpage(){
    window.location.reload();
  }
  //#endregion
  data(){
    return{
      nameComponent:'factura',
      fecha_actual:'',
      fecha_vencida:'',
      dialogTableVisible: false,
      selectData:'',
      selectType:'',
      dataProveedor:[],
      ordencompra:[],
      ordencompraDetalle:[],
      facturadetalle:[],
      codigoCompania:'',
      descripcionCompania:'',
      totalDinero:0,
      totalUnidad:0,
      salidaUnidad:'',
      totalDolars:'',
      TotalPagarD:'',
      voucher:'',
      habilitar:false,
      habilitarPane:true,
      multipleSelection:[],
      CodigoGeneral:'',
      nameFuncion:''
    }
  }
  
}
