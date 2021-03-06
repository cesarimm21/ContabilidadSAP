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
import balanceCuentaService from '@/components/service/balancecuenta.service'; 
import movimientoService from '@/components/service/movinventario.service'; 
import tipocambioService from '@/components/service/tipocambio.service';
import facturaService from '@/components/service/factura.service';
import prooveedorService from '@/components/service/proveedor.service';
import periodoService from '@/components/service/periodo.service';
//***Modelos */
import {TipoDocIdentidadModel} from '@/modelo/maestro/tipodocidentidad';
import {TipoComprobantePagoModel} from '@/modelo/maestro/tipocomprobantepago';
import {OrdenCompraModel} from '@/modelo/maestro/ordencompra';
import {OrdenCompraDetalleModel} from '@/modelo/maestro/ordencompradetalle';
import {MonedaModel} from '@/modelo/maestro/moneda';
import {PeriodoModel} from '@/modelo/maestro/periodo';
import {ProveedorModel} from '@/modelo/maestro/proveedor';
import {FacturaModel} from '@/modelo/maestro/factura';
import {FacturaDetalleModel} from '@/modelo/maestro/facturadetalle';
import {DiarioModel} from '@/modelo/maestro/diario';
import {DiarioGeneralModel} from '@/modelo/maestro/diariogeneral';
import {BalanceCuentaModel} from '@/modelo/maestro/balancecuentas';
import {TipoCambioModel} from '@/modelo/maestro/tipocambio';
import {ImpuestoModel} from '@/modelo/maestro/impuesto';
import {HESModel} from '@/modelo/maestro/hes';
import {HesDetalleModel} from '@/modelo/maestro/hesDetalle';
import {MovimientoInventarioModel} from '@/modelo/maestro/movimientoinventario';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import impuestoService from '@/components/service/impuesto.service';
import hesService from '@/components/service/hes.service';
@Component({
  name: 'crear-ingreso-comprobante',
  components:{
  'buttons-accions':ButtonsAccionsComponent,
  'bproveedor':BProveedorComponent,
  'quickaccessmenu':QuickAccessMenuComponent,
  'bcomprobantepago':BComprobantepagoComponent,
  'bmoneda':BMonedaComponent,
  'bimpuesto':BImpuestoComponent
  }
})
export default class CrearIngresoComprobanteComponent extends Vue {
  nameComponent:string;
  tipoRequiDisabled:boolean=true;
  cell_ocultar:string='#349025';
  border_width:string='0px';
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
  public periodo:PeriodoModel=new PeriodoModel();
  public tipocambio:TipoCambioModel=new TipoCambioModel();
  //Movimiento Invetario []
  movimientoInven:MovimientoInventarioModel[];
  //#region [BOTONES]
  bln_tbl_cantidad:boolean=false;
  bln_tbl_Precio:boolean=false;
  bln_tbl_centro_costo:boolean=false;
  multipleSelection: any[];
  arrayTemp:any[];
  //#region [HES]
  btnactivarHes:boolean=false;
  dialogHes:boolean=false;
  gridHes:HESModel[];
  gridHes1:HESModel[];
  public hesSelect:HESModel=new HESModel();
  gridHesDetalle:HesDetalleModel[];
  clickColumnHes:string='';
  ColumnHes:string='';
  inputAtributoHes:any;
  blnilterstrHES_NO:boolean=false;
  blnilterstrDesc_Header:boolean=false;
  blnilterstrPO_Item_Desc:boolean=false;
  blnilterstrCategItem_Cod:boolean=false;
  //#endregion

  //**Orden compra */
  dialogOrdenCompra:boolean=false;
  btnactivarOrdenCompra:boolean=false;
  dataOrdenCompra:any[];
  selectData:string;
  public ordencompraDetalle:OrdenCompraDetalleModel[];
  ordencompra:OrdenCompraModel[];
  ordencompra1:OrdenCompraModel[];
  public ordencompraSelect:OrdenCompraModel=new OrdenCompraModel();

    blnilterstrPO_NO:boolean=true;
    blnilterstrPO_Desc:boolean=false;
    blnilterstrVendor_NO:boolean=false;
    blnilterstrVendor_Desc:boolean=false;
    clickColumn:string='';
    Column:string='';
    inputAtributo:any;

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
  balanceclist:BalanceCuentaModel[];
  //**impuesto */
  public Impuesto:ImpuestoModel=new ImpuestoModel();
  public ImpuestoB:ImpuestoModel=new ImpuestoModel();
  public ImpuestoC:ImpuestoModel=new ImpuestoModel();
  dialogImpuesto:boolean=false;
  btnactivarImpuesto:boolean=false;
  columnView:boolean=true;
  ImpuestoDisabled:boolean=true;
  PeriodoAC:string;
  loading1:boolean=false;
  loadingOrden:boolean=false;
  constructor(){    
    super();
    this.cell_ocultar='#349025'; 
    this.border_width='1px';   
    Global.nameComponent='factura';     
    
    setTimeout(() => {
      this.load();
    }, 200)
  }
  
  load(){
    this.fecha_ejecucion=(new Date()).toString(); 
    this.fecha_ejecucion1=(new Date()).toString();  
    this.codigoCompania=localStorage.getItem('compania_cod');
    this.descripcionCompania=localStorage.getItem('compania_name');        
    this.factura.dtmDoc_Date=new Date();
    this.factura.fltExchange_Rate=0;    
  }
  DatePeriodo(){
    this.periodo.dtmModified_Date=new Date(this.fecha_ejecucion)
    periodoService.GetAllPeriodoLast(this.periodo)
    .then(response=>{
      this.periodo=response;
      this.factura.strPeriod_NO=this.periodo.strPeriod_NO;
      this.factura.dtmPeriod=new Date(this.periodo.strPeriod);
      this.fecha_actual=this.periodo.strPeriod; 
      this.PeriodoAC=this.periodo.chrStatus;
      if(this.periodo.chrStatus!='A'){
        this.$message({
          showClose: true,
          type: 'error',
          message: 'Periodo Cerrado '
        });
      }
    })
  }

  DateforGetChanceDolar(){
    this.factura.dtmDoc_Date=new Date(this.fecha_ejecucion1);    
    tipocambioService.GetAllTipoCambio(this.factura.dtmDoc_Date)
    .then(response=>{
      this.tipocambio=response;
      this.factura.fltExchange_Rate=this.tipocambio.fltExchRate_Sale; 
      if(this.factura.fltExchange_Rate==undefined){
        this.factura.fltExchange_Rate=0;
      } 
      this.loadSecond();
    }).catch(error=>{this.openMessageError('no se pudo cargar tipocambio');})    
  }
    loadSecond(){      
      if(this.multipleSelection.length>0){
        this.factura.fltValue_Local=0;
        this.factura.fltValue_Corp=0;
        this.factura.fltValue_Tax_Local=0;
        this.factura.fltValue_Tax_Corp=0;
        this.factura.fltNetValue_Doc_Local=0;
        this.factura.fltNetValue_Doc_Corp=0;
        for (let i = 0; i < this.multipleSelection.length; i++) {          
          this.factura.fltValue_Local=Math.round((this.factura.fltValue_Local+Number(this.multipleSelection[i].fltValue_Local))* 100)/100;
        }
        var valorIgv=Number(this.factura.fltValue_Local)*Number(this.Impuesto.fltPorcent/100);
        this.factura.fltValue_Tax_Local=Math.round(Number(this.factura.fltValue_Local)*Number(this.Impuesto.fltPorcent/100)* 100)/100;
        this.factura.fltNetValue_Doc_Local=Math.round(Number(this.factura.fltValue_Local)+ Number(valorIgv)+Number(this.factura.fltOperation_NoTax_Local)* 100)/100;
        if(this.factura.fltExchange_Rate>0){
          var dat1=(Number(this.factura.fltValue_Local)/Number(this.factura.fltExchange_Rate)).toFixed(2);
          this.factura.fltValue_Corp=parseFloat(dat1);
          var dat2=(Number(this.factura.fltValue_Tax_Local)/Number(this.factura.fltExchange_Rate)).toFixed(2);
          this.factura.fltValue_Tax_Corp=parseFloat(dat2);
          var dat1=(Number(this.factura.fltNetValue_Doc_Local)/Number(this.factura.fltExchange_Rate)).toFixed(2);
          this.factura.fltNetValue_Doc_Corp=parseFloat(dat1); 
        }       
      }
    }
    
  DateVencida(){this.factura.dtmDue_Date=new Date(this.fecha_vencida);}
  fnOcultar(){}
  clickCheck(event,edit,column){
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
    this.factura.fltOperation_NoTax_Local=0;
    this.factura.fltOperation_NoTax_Corp=0;
    for(var i=0;i< this.facturadetalle.length;i++){
      if(this.facturadetalle[i].blnCheck==false){
        this.factura.fltOperation_NoTax_Local= Math.round((this.factura.fltOperation_NoTax_Local+Number(this.facturadetalle[i].intUnit_Price))* 100)/100;
      }
    }
    var corp=(Number(this.factura.fltOperation_NoTax_Local)/Number(this.factura.fltExchange_Rate)).toFixed(2);
    this.factura.fltOperation_NoTax_Corp=parseFloat(corp);  
  }
  //#region [ACCIONES DE TABLA]
  handleBlurImporte(event) {
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
  clickPrice(event,edit,column){
    this.bln_tbl_Precio=true;
    this.bln_tbl_cantidad=false;
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
  handleSelectionChange(val) {
    this.multipleSelection = val;
    this.arrayTemp=[];
    this.factura.fltValue_Local=0;
    this.factura.fltValue_Corp=0;
    this.factura.fltValue_Tax_Local=0;
    this.factura.fltValue_Tax_Corp=0;
    this.factura.fltNetValue_Doc_Local=0;
    this.factura.fltNetValue_Doc_Corp=0;
    for (let i = 0; i < this.multipleSelection.length; i++) {
      this.factura.fltValue_Local=Math.round((this.factura.fltValue_Local+Number(this.multipleSelection[i].fltValue_Local))* 100)/100;
    }
    var valorIgv=Number(this.factura.fltValue_Local)*Number(this.Impuesto.fltPorcent/100);
    this.factura.fltValue_Tax_Local=Math.round((Number(this.factura.fltValue_Local)*Number(this.Impuesto.fltPorcent/100))* 100)/100;    
    this.factura.fltNetValue_Doc_Local=Math.round((Number(this.factura.fltValue_Local)+ Number(valorIgv)+Number(this.factura.fltOperation_NoTax_Local))* 100)/100;    
    if(this.factura.fltExchange_Rate>0){
      var dat1=(Number(this.factura.fltValue_Local)/Number(this.factura.fltExchange_Rate)).toFixed(2);
      this.factura.fltValue_Corp=parseFloat(dat1); 
      var dat2=(Number(this.factura.fltValue_Tax_Local)/Number(this.factura.fltExchange_Rate)).toFixed(2);
      this.factura.fltValue_Tax_Corp=parseFloat(dat2);
      var dat1=(Number(this.factura.fltNetValue_Doc_Local)/Number(this.factura.fltExchange_Rate)).toFixed(2);
      this.factura.fltNetValue_Doc_Corp=parseFloat(dat1); 
    }       
  }
  handleCurrentChange(val){
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
        this.facturadetalle[i].fltValue_Local=Math.round(val*this.facturadetalle[i].intUnit_Price* 100)/100;
        this.facturadetalle[i].fltValue_Corp=Math.round((val*this.facturadetalle[i].intUnit_Price/Number(this.factura.fltExchange_Rate))* 100)/100;
        this.facturadetalle[i].fltFacture_Net_PR_I=Math.round(val*this.facturadetalle[i].intUnit_Price* 100)/100;
        this.arrayTemp=this.facturadetalle; 
        this.facturadetalle=[];              
        this.facturadetalle=this.arrayTemp;  
        this.arrayTemp=[];
    }
  }
  for (let i = 0; i < this.multipleSelection.length; i++) {
    this.factura.fltValue_Local=Math.round((this.factura.fltValue_Local+Number(this.multipleSelection[i].fltValue_Local))* 100)/100;
    if(this.multipleSelection[i].intIdPOD_ID == this.rowSelect){
        this.multipleSelection[i].fltValue_Local=Math.round(val*this.facturadetalle[i].intUnit_Price* 100)/100;
    }
  }
  var valorIgv=Number(this.factura.fltValue_Local)*Number(this.Impuesto.fltPorcent/100);
  this.factura.fltValue_Tax_Local=Math.round((Number(this.factura.fltValue_Local)*Number(this.Impuesto.fltPorcent/100))* 100)/100;
  this.factura.fltNetValue_Doc_Local=Math.round((Number(this.factura.fltValue_Local)+ Number(valorIgv)+Number(this.factura.fltOperation_NoTax_Local))* 100)/100;
  if(this.factura.fltExchange_Rate>0){
    var dat1=(Number(this.factura.fltValue_Local)/Number(this.factura.fltExchange_Rate)).toFixed(2);
    this.factura.fltValue_Corp=parseFloat(dat1); 
    var dat2=(Number(this.factura.fltValue_Tax_Local)/Number(this.factura.fltExchange_Rate)).toFixed(2);
    this.factura.fltValue_Tax_Corp=parseFloat(dat2);
    var dat1=(Number(this.factura.fltNetValue_Doc_Local)/Number(this.factura.fltExchange_Rate)).toFixed(2);
    this.factura.fltNetValue_Doc_Corp=parseFloat(dat1);  
  }
}
handleChangeValUni(val){
    this.factura.fltValue_Local=0;
    this.factura.fltValue_Corp=0;
    this.factura.fltValue_Tax_Local=0;
    this.factura.fltValue_Tax_Corp=0;
    this.factura.fltNetValue_Doc_Local=0;
    this.factura.fltNetValue_Doc_Corp=0;
  for (let i = 0; i < this.facturadetalle.length; i++) {
    if(this.facturadetalle[i].intIdPOD_ID == this.rowSelect){
        this.facturadetalle[i].fltValue_Local=Math.round(val*this.facturadetalle[i].fltPay_Factura* 100)/100;
        this.facturadetalle[i].fltValue_Corp=Math.round((val*this.facturadetalle[i].fltPay_Factura/Number(this.factura.fltExchange_Rate))* 100)/100;
        this.facturadetalle[i].fltFacture_Net_PR_I=Math.round(val*this.facturadetalle[i].fltPay_Factura* 100)/100;
        this.arrayTemp=this.facturadetalle; 
        this.facturadetalle=[];              
        this.facturadetalle=this.arrayTemp;  
        this.arrayTemp=[];
    }
  }
  for (let i = 0; i < this.multipleSelection.length; i++) {
    this.factura.fltValue_Local=Math.round((this.factura.fltValue_Local+Number(this.multipleSelection[i].fltValue_Local))* 100)/100;
    if(this.multipleSelection[i].intIdPOD_ID == this.rowSelect){
        this.multipleSelection[i].fltValue_Local=Math.round(val*this.facturadetalle[i].intUnit_Price* 100)/100;
    }
  }
  var valorIgv=Number(this.factura.fltValue_Local)*Number(this.Impuesto.fltPorcent/100);
  this.factura.fltValue_Tax_Local=Math.round((Number(this.factura.fltValue_Local)*Number(this.Impuesto.fltPorcent/100))* 100)/100;
  this.factura.fltNetValue_Doc_Local=Math.round((Number(this.factura.fltValue_Local)+ Number(valorIgv)+Number(this.factura.fltOperation_NoTax_Local))* 100)/100;
  if(this.factura.fltExchange_Rate>0){
    var dat1=(Number(this.factura.fltValue_Local)/Number(this.factura.fltExchange_Rate)).toFixed(2);
    this.factura.fltValue_Corp=parseFloat(dat1); 
    var dat2=(Number(this.factura.fltValue_Tax_Local)/Number(this.factura.fltExchange_Rate)).toFixed(2);
    this.factura.fltValue_Tax_Corp=parseFloat(dat2);
    var dat1=(Number(this.factura.fltNetValue_Doc_Local)/Number(this.factura.fltExchange_Rate)).toFixed(2);
    this.factura.fltNetValue_Doc_Corp=parseFloat(dat1);  
  } 
}
getNumber(num){
  return parseFloat(num);
}
//#endregion
  //#region [ORDEN COMPRA]
  loadOrdenCompra(){
    this.dialogOrdenCompra=true; 
    this.loadingOrden=true;
    ordencompraService.getOCForFactura(this.codigoCompania)
    .then(respose=>{
      this.ordencompra=[];
      this.ordencompra=respose;
      this.ordencompra1=[];
      this.ordencompra1=respose; 
      this.loadingOrden=false; 
    }).catch(error=>{
      this.loadingOrden=false; 
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
        item.fltRec_QYT=this.ordencompraDetalle[i].fltRec_QYT;
        item.fltRec_Pend_QTY=this.ordencompraDetalle[i].fltRec_Pend_QTY;
        item.fltPay_Factura=Number(this.ordencompraDetalle[i].fltRec_QYT)-Number(this.ordencompraDetalle[i].fltPay_Factura)
        item.fltFacture_Net_PR_I=Math.round((Number(item.fltPay_Factura)*Number(this.ordencompraDetalle[i].fltPO_Net_PR_I))*100)/100;
        item.intUnit_Price=this.ordencompraDetalle[i].fltPO_Net_PR_I;
        item.strStock_Cod=this.ordencompraDetalle[i].strStock_Cod;
        item.strDesc_Item=this.ordencompraDetalle[i].strPO_Item_Desc;
        item.strAccount_Cod=this.ordencompraDetalle[i].strAccount_Cod;//aqui esta la cuenta contable
        item.strCostCenter_NO=this.ordencompraDetalle[i].strCostCenter_NO;
        item.strCostCenter_Desc=this.ordencompraDetalle[i].strCostCenter_Desc;
        item.strAcctCateg_Cod=this.ordencompraDetalle[i].strAcctCateg_Cod;
        item.strTax_Cod=this.ordencompraDetalle[i].strTax_Cod;
        item.fltValue_Tax=this.ordencompraDetalle[i].fltTax_Percent;
        item.fltValue_Doc=this.ordencompraDetalle[i].fltCurr_Net_PR_P;
        item.fltValue_Local=Math.round((Number(item.fltValue_Doc)+Number(item.fltValue_Doc)*Number(item.fltValue_Tax/100))*100)/100;
        item.fltValue_Corp=Math.round((Number(item.fltValue_Local)/Number(this.factura.fltExchange_Rate))*100)/100;
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
      this.btnactivarHes=false;
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
    this.factura.strCurrency_Doc=this.ordencompraSelect.strCurrency_Cod;
    this.dialogOrdenCompra=false;    
    this.factura.strTax_Cod=this.ordencompraSelect.strWH_Cod;
    impuestoService.GetOnlyOneImpuesto(this.factura.strTax_Cod)
    .then(respo=>{
      this.Impuesto=respo;
    })
    if(this.ordencompraSelect.strTypeReq_Cod!='S'){
      this.tipoRequiDisabled=true;
      this.loadOrdenCompraDetalle(this.ordencompraSelect.intIdPOH_ID);      
    }
    else{
        this.tipoRequiDisabled=false;
    }
    if(this.factura.strVendor_NO!=''){
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
        this.openMessageError('no se pudo cargar proveedor ');})    
    }
  }
  //#endregion
 
  //#region [HES]
  activar_hes(){
    setTimeout(() => {
      this.btnactivarHes=true;
      this.btnactivarMoneda=false;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=false;
      this.btnactivarImpuesto=false;
    }, 120)
  }
  desactivar_hes(){
    if(this.dialogHes){
      this.btnactivarHes=false;
    }
  }
  loadHes(){
    this.dialogHes=true;
    this.loading1=true;
    let loadingInstance = Loading.service({
      fullscreen: true,
      text: 'Cargando...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
      );        
    hesService.busquedaHESByPO(this.factura.strPO_NO)
    .then(respo=>{
      this.gridHes=respo;
      this.gridHes1=respo;
      loadingInstance.close();
      this.loading1=false;
    }).catch(error=>{
      this.loading1=false;
      loadingInstance.close();
      this.openMessageError('No hay Servicios');
    })
    
  }
  buscarHes(){

  }
  selectHes(val){
    this.hesSelect=val;
  }
  closeHes(){
    this.dialogHes=false;
  }
  checkHes(){
    var user:any=localStorage.getItem('User_Usuario');
    this.factura.strHES_NO=this.hesSelect.strHES_NO;
    hesService.GetHesDetalle(this.hesSelect.intIdHESH_ID)
    .then(response=>{     
      this.gridHesDetalle=response;      
      this.factura.intQuantity_Doc=0;
      this.factura.fltValue_Doc=0;
      this.facturadetalle=[];
      // for(var i=0;i<this.ordencompraDetalle.length;i++){      
        for(var i=0;i<this.gridHesDetalle.length;i++){
          var item:FacturaDetalleModel=new FacturaDetalleModel();
          item.intIdPOD_ID=this.gridHesDetalle[i].intIdPOD_ID;
          item.strCompany_Cod=this.factura.strCompany_Cod;
          item.strPO_NO=this.factura.strPO_NO;
          item.intPO_Item_NO=this.gridHesDetalle[i].intPO_Item_NO;
          item.strUM=this.gridHesDetalle[i].strUM;
          item.intQuantity=this.gridHesDetalle[i].intQuantity;
          item.fltRec_QYT=this.gridHesDetalle[i].fltRec_Value;
          item.fltRec_Pend_QTY=this.gridHesDetalle[i].fltRecTemp_Value;
          item.fltPay_Factura=this.gridHesDetalle[i].intQuantity;
          item.fltFacture_Net_PR_I=Math.round((1*Number(this.gridHesDetalle[i].fltFacture_Net_PR_I))*100)/100;
          item.intUnit_Price=this.gridHesDetalle[i].fltGross_Price;
          item.strStock_Cod=this.gridHesDetalle[i].strStock_Cod;
          item.strDesc_Item=this.gridHesDetalle[i].strDesc_Detail;
          item.strAccount_Cod=this.gridHesDetalle[i].strAccount_Cod;//aqui esta la cuenta contable
          item.strCostCenter_NO=this.gridHesDetalle[i].strCostCenter_NO;
          item.strCostCenter_Desc=this.gridHesDetalle[i].strCostCenter_Desc;
          item.strAcctCateg_Cod=this.gridHesDetalle[i].strAcctCateg_Cod;
          item.strTax_Cod=this.gridHesDetalle[i].strTax_Cod;
          item.fltValue_Tax=1;
          item.fltValue_Doc=this.gridHesDetalle[i].fltFacture_Net_PR_I;
          item.fltValue_Local=Math.round((Number(item.fltValue_Doc)+Number(item.fltValue_Doc)*Number(item.fltValue_Tax/100))*100)/100;
          item.fltValue_Corp=Math.round((Number(item.fltValue_Local)/Number(this.factura.fltExchange_Rate))*100)/100;
          item.blnCheck=true;
          item.strCreation_User=user;
          item.dtmCreation_Date=new Date();
          item.chrStatus='A';
          this.facturadetalle.push(item);
          this.factura.fltValue_Doc=this.hesSelect.fltTot_QTY;
          this.factura.intQuantity_Doc+=Number(this.gridHesDetalle[i].intQuantity);
      }
      this.dialogHes=false;
    }).catch(error=>{
      this.dialogHes=false;
      this.openMessageError('No hay Servicio Detalle')
    })
}
  filterstrHES_NO(h,{column,$index}){
    if(this.blnilterstrHES_NO){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterstrDesc_Header(h,{column,$index}){    
    if(this.blnilterstrDesc_Header){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterstrPO_Item_Desc(h,{column,$index}){
    if(this.blnilterstrPO_Item_Desc){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterstrCategItem_Cod(h,{column,$index}){    
    if(this.blnilterstrCategItem_Cod){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label)])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
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
      this.btnactivarHes=false;
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
      this.btnactivarHes=false;
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
      this.openMessageError('no se pudo cargar diarios');
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
      this.btnactivarHes=false;
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
      this.btnactivarHes=false;
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
      this.factura.strTax_Cod=this.Impuesto.strWH_Cod;
      this.factura.fltValue_Tax=this.Impuesto.fltPorcent;
      this.dialogImpuesto=false;  
      for(var i=0;i<this.facturadetalle.length;i++){
        this.facturadetalle[i].strTax_Cod=this.factura.strTax_Cod;
        this.facturadetalle[i].fltValue_Tax=this.factura.fltValue_Tax;
        this.facturadetalle[i].fltValue_Local=Math.round((Number(this.facturadetalle[i].fltValue_Doc)+Number(this.facturadetalle[i].fltValue_Doc)*Number(this.facturadetalle[i].fltValue_Tax/100))*100)/100;
        this.facturadetalle[i].fltValue_Corp=Math.round((Number(this.facturadetalle[i].fltValue_Local)/Number(this.factura.fltExchange_Rate))*100)/100;
      }
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
            this.facturadetalle[i].fltValue_Tax=this.Impuesto.fltPorcent;
            this.facturadetalle[i].fltValue_Local=Math.round((Number(this.facturadetalle[i].fltValue_Doc)+Number(this.facturadetalle[i].fltValue_Doc)*Number(this.facturadetalle[i].fltValue_Tax/100))*100)/100;
            this.facturadetalle[i].fltValue_Corp=Math.round((Number(this.facturadetalle[i].fltValue_Local)/Number(this.factura.fltExchange_Rate))*100)/100;
            this.arrayTemp=this.facturadetalle; 
            this.facturadetalle=[];    
            this.facturadetalle=[];  
            this.facturadetalle=this.arrayTemp;     
            this.arrayTemp=[];
        }
      }
      this.dialogImpuesto=false;
      //   this.factura.fltValue_Local=0;
      //   this.factura.fltValue_Corp=0;
      //   this.factura.fltValue_Tax_Local=0;
      //   this.factura.fltValue_Tax_Corp=0;
      //   this.factura.fltNetValue_Doc_Local=0;
      //   this.factura.fltNetValue_Doc_Corp=0;

      //   for (let i = 0; i < this.multipleSelection.length; i++) {
      //     if(this.multipleSelection[i].strTax_Cod==this.factura.strTax_Cod){
      //       this.factura.fltValue_Local=Math.round((this.factura.fltValue_Local+Number(this.multipleSelection[i].fltValue_Doc))*100)/100;
      //     }
      //     else{
      //       this.factura.fltOperation_NoTax_Local=Math.round((this.factura.fltOperation_NoTax_Local+Number(this.multipleSelection[i].fltValue_Local))*100)/100;
      //     }          
      //   }
      //   if(this.factura.fltExchange_Rate>0){
      //     var dat1=(Number(this.factura.fltValue_Local)/Number(this.factura.fltExchange_Rate)).toFixed(2);
      //     this.factura.fltValue_Corp=parseFloat(dat1); 
      //     var dat2=(Number(this.factura.fltValue_Tax_Local)/Number(this.factura.fltExchange_Rate)).toFixed(2);
      //     this.factura.fltValue_Tax_Corp=parseFloat(dat2);
      //     var dat1=(Number(this.factura.fltNetValue_Doc_Local)/Number(this.factura.fltExchange_Rate)).toFixed(2);
      //     this.factura.fltNetValue_Doc_Corp=parseFloat(dat1);  
      //     var datcorp=(Number(this.factura.fltOperation_NoTax_Local)/Number(this.factura.fltExchange_Rate)).toFixed(2);
      //     this.factura.fltOperation_NoTax_Corp=parseFloat(datcorp); 
      //   }
        
      //   var valorIgv=Number(this.factura.fltValue_Local)*Number(this.Impuesto.fltPorcent/100);
      //   this.factura.fltValue_Tax_Local=Math.round(Number(this.factura.fltValue_Local)*Number(this.Impuesto.fltPorcent/100)*100)/100;
        
      //   this.factura.fltNetValue_Doc_Local=Math.round((Number(this.factura.fltValue_Local)+ Number(valorIgv)+Number(this.factura.fltOperation_NoTax_Local))*100)/100;
         
    }    
  }
  closeImpuesto(){
    this.dialogImpuesto=false;
  }
  //#endregion
  //#region [Factura] 
  SaveFactura(event){   
    var user:any=localStorage.getItem('User_Usuario');
    if(this.factura.strPO_NO===''){
      this.$message({
        showClose: true,
        type: 'warning',
        message: 'debe seleccionar una orden de compra'
      });
    }
    else
    {
      if(this.PeriodoAC=='A'){
        this.factura.strCompany_Cod=this.codigoCompania;
        this.factura.strCompany_Desc=this.descripcionCompania;        
        diariogeneralService.GetLastCodCorrelativo()
        .then(res=>{
          this.CodigoGeneral=res;
          this.diarioInput=[];
          this.balanceclist=[];
          this.movimientoInven=[];
          this.factura.dtmDoc_Acc_Date=new Date(this.fecha_ejecucion);
          this.factura.dtmDoc_Date=new Date(this.fecha_ejecucion1);
          this.factura.strDoc_Status="00";
          this.factura.strCreation_User=user;    
          var date=this.factura.dtmPeriod;
          var anio:any=this.factura.dtmDoc_Acc_Date.getFullYear();
          var mes=this.factura.dtmDoc_Acc_Date.getMonth(); 
          for(let i=0;i<this.multipleSelection.length;i++){
            var item:FacturaDetalleModel=new FacturaDetalleModel();
            item.intIdPOD_ID=this.multipleSelection[i].intIdPOD_ID;
            item.strCompany_Cod=this.multipleSelection[i].strCompany_Cod;
            item.strPO_NO=this.multipleSelection[i].strPO_NO;
            item.intPO_Item_NO=this.multipleSelection[i].intPO_Item_NO;
            item.strUM=this.multipleSelection[i].strUM;
            item.intQuantity=this.multipleSelection[i].intQuantity;
            item.fltRec_QYT=this.multipleSelection[i].fltRec_QYT;
            item.fltPay_Factura=this.multipleSelection[i].fltPay_Factura;
            item.fltFacture_Net_PR_I=this.multipleSelection[i].fltFacture_Net_PR_I;
            item.fltRec_Pend_QTY=this.multipleSelection[i].fltRec_Pend_QTY;
            item.intUnit_Price=this.multipleSelection[i].intUnit_Price;
            item.strDesc_Item=this.multipleSelection[i].strDesc_Item;
            item.strAccount_Cod=this.multipleSelection[i].strAccount_Cod;
            item.strCostCenter_NO=this.multipleSelection[i].strCostCenter_NO;
            item.strCostCenter_Desc=this.multipleSelection[i].strCostCenter_Desc;
            item.strAcctCateg_Cod=this.multipleSelection[i].strAcctCateg_Cod;
            item.fltValue_Doc=this.multipleSelection[i].fltValue_Doc;
            item.fltValue_Local=this.multipleSelection[i].fltValue_Local;
            item.fltValue_Corp=this.multipleSelection[i].fltValue_Corp;
            item.strTax_Cod=this.multipleSelection[i].strTax_Cod;
            item.fltValue_Tax=this.multipleSelection[i].fltValue_Tax;
            item.blnCheck=true;
            item.strCreation_User=this.multipleSelection[i].strCreation_User;
            item.dtmCreation_Date=this.multipleSelection[i].dtmCreation_Date;
            item.chrStatus=this.multipleSelection[i].chrStatus;
            this.factura.listaDetalle.push(item);
            //Datos Para Insertar en MOvimiento inventario
            var itemMI:MovimientoInventarioModel=new MovimientoInventarioModel()
            itemMI.strPO_NO=this.factura.strPO_NO;
            itemMI.intPO_Item_NO=this.multipleSelection[i].intPO_Item_NO;
            itemMI.strSerie_Doc=this.factura.strSerie_Doc;
            itemMI.strDocument_NO=this.factura.strDocument_NO;  
            itemMI.strVendor_Cod=this.factura.strVendor_NO;
            itemMI.fltPrecUnit_Local=this.multipleSelection[i].intUnit_Price;
            itemMI.fltPrecUnit_Bal_Local=0;
            itemMI.fltAmount_PEN=0;
            itemMI.fltBalance_PEN=0;
            itemMI.fltPrecUnit_USD=Math.round((this.multipleSelection[i].intUnit_Price/Number(this.factura.fltExchange_Rate))*100)/100;
            itemMI.fltPrecUnit_Bal_USD=0;
            itemMI.fltAmount_USD=0;
            itemMI.fltBalance_USD=0;
            this.movimientoInven.push(itemMI);
            var itemDG_60:DiarioGeneralModel=new DiarioGeneralModel();
            itemDG_60.strCompany_Cod=this.factura.strCompany_Cod;
            itemDG_60.strCompany_Desc=this.factura.strCompany_Desc;
            itemDG_60.strAccDocum_NO=this.CodigoGeneral;
            itemDG_60.dtmPosting_Date=this.factura.dtmDoc_Acc_Date;
            itemDG_60.dtmProcess_Date=new Date();
            itemDG_60.strdtmPeriod=this.factura.dtmDoc_Acc_Date;
            itemDG_60.intYear=anio;
            itemDG_60.strAcctCateg_Cod=this.multipleSelection[i].strAcctCateg_Cod;
            itemDG_60.strCenCosWBS_Cod=this.multipleSelection[i].strCostCenter_NO;
            itemDG_60.strCenCosWBS_Desc=this.multipleSelection[i].strCostCenter_Desc;
            itemDG_60.strVendor_NO=this.factura.strVendor_NO;
            itemDG_60.strVendor_Desc=this.factura.strVendor_Desc;  
            itemDG_60.strRequis_NO=this.ordencompraSelect.strRequis_NO;
            itemDG_60.intRequis_Item_NO=parseInt(this.ordencompraSelect.strRequis_Item_NO);
            itemDG_60.dtmRequis_Date=this.ordencompraSelect.dtmProcess_Date;
            itemDG_60.strWHS_Cod=this.ordencompraSelect.strWHS_Cod;
            itemDG_60.strWHS_Cod_Dest=this.ordencompraSelect.strWHS_Desc;
            itemDG_60.strPO_NO=this.factura.strPO_NO;
            itemDG_60.intPO_Item_NO=this.multipleSelection[i].intPO_Item_NO;
            itemDG_60.dtmPO_Date=this.ordencompraSelect.dtmProcess_Date;
            itemDG_60.fltQuantity=this.multipleSelection[i].fltPay_Factura;            
            //VOUCHER SE ESTA INGRESANDO EN ABAJO
            itemDG_60.strType_Doc=this.factura.strType_Doc;
            itemDG_60.strSerie_Doc=this.factura.strSerie_Doc;    
            itemDG_60.strDocument_NO=this.factura.strDocument_NO;   
            itemDG_60.dtmDoc_Date=this.factura.dtmDoc_Date;  
            itemDG_60.strTax_Cod=this.multipleSelection[i].strTax_Cod;
            itemDG_60.strDoc_Status='30';
            itemDG_60.strApproved_Status='A';
            itemDG_60.strApproved_User=user;
            itemDG_60.dtmApproved_Date=new Date();
            console.log('A121');
            // itemDG_60.strStock_Cod=this.ordencompraDetalle[i].strStock_Cod;
            // itemDG_60.strStock_Desc=this.ordencompraDetalle[i].strPO_Item_Desc;
            itemDG_60.fltExchange_Rate=this.factura.fltExchange_Rate;
            itemDG_60.strAcc_Local_NO=this.multipleSelection[i].strAccount_Cod;
            //jalar de la tblCuentaContable descripcion
            console.log('w');
            
            itemDG_60.strCurrency_Cod=this.factura.strCurrency_Doc;
            if(this.factura.strCurrency_Doc=='PEN'){
              itemDG_60.fltAmount_Orig=this.multipleSelection[i].fltFacture_Net_PR_I;
            }
            if(this.factura.strCurrency_Doc=='USD'){
              itemDG_60.fltAmount_Orig=this.multipleSelection[i].fltValue_Corp;
            }
            console.log('w1');
            itemDG_60.fltAmount_Local=this.multipleSelection[i].fltFacture_Net_PR_I;
            itemDG_60.fltAmount_Corp=this.multipleSelection[i].fltValue_Corp;
            itemDG_60.intDoc_No=1;
            itemDG_60.strCreation_User=user;
            itemDG_60.dtmCreation_Date=new Date();
            itemDG_60.chrStatus='A';
  
            var balc:BalanceCuentaModel =new BalanceCuentaModel();            
            balc.strCompany_Cod=this.factura.strCompany_Cod;
            balc.strCompany_Desc=this.factura.strCompany_Desc;
            balc.intYear=anio;
            balc.dtmPeriod=this.factura.dtmPeriod;
            balc.strPeriodRepo='';
            balc.strAcc_Local_NO=this.multipleSelection[i].strAccount_Cod;
            balc.fltOpening_Balance=0;
            balc.fltCredit_Acc=0;
            balc.fltDebit_Acc=this.multipleSelection[i].fltValue_Local;            
            this.balanceclist.push(balc);
            this.diarioInput.push(itemDG_60);
          }      
          console.log('B');      
            var itemDG_40:DiarioGeneralModel=new DiarioGeneralModel();
            itemDG_40.strCompany_Cod=this.factura.strCompany_Cod;
            itemDG_40.strCompany_Desc=this.factura.strCompany_Desc;
            itemDG_40.strAccDocum_NO=this.CodigoGeneral;
            itemDG_40.dtmPosting_Date=this.factura.dtmDoc_Acc_Date;
            itemDG_40.dtmProcess_Date=new Date();
            itemDG_40.strdtmPeriod=mes+'.'+anio;
            itemDG_40.intYear=anio;
            itemDG_40.intMonth=mes;
            itemDG_40.strVendor_NO=this.factura.strVendor_NO;
            itemDG_40.strVendor_Desc=this.factura.strVendor_Desc;
            itemDG_40.strRequis_NO=this.ordencompraSelect.strRequis_NO;            
            itemDG_40.strAcc_Local_NO=this.Impuesto.strCta_Country;
            itemDG_40.intRequis_Item_NO=0;
            itemDG_40.dtmRequis_Date=new Date();
            itemDG_40.strPO_NO=this.factura.strPO_NO;
            itemDG_40.dtmPO_Date=this.ordencompraSelect.dtmProcess_Date;
            itemDG_40.strType_Doc=this.factura.strType_Doc;
            itemDG_40.strSerie_Doc=this.factura.strSerie_Doc;  
            itemDG_40.strDocument_NO=this.factura.strDocument_NO;   
            itemDG_40.dtmDoc_Date=this.factura.dtmDoc_Date;  
            itemDG_40.strDoc_Status='30';
            itemDG_40.strApproved_Status='A';
            itemDG_40.strApproved_User=user; 
            itemDG_40.dtmApproved_Date=new Date();
            itemDG_40.fltExchange_Rate=this.factura.fltExchange_Rate;
            itemDG_40.strCurrency_Cod=this.factura.strCurrency_Doc;
            // if(this.factura.strCurrency_Doc=='PEN'){
            //   itemDG_60.fltAmount_Orig=this.multipleSelection[i].fltFacture_Net_PR_I;
            // }
            // if(this.factura.strCurrency_Doc=='USD'){
            //   itemDG_60.fltAmount_Orig=this.multipleSelection[i].fltValue_Corp;
            // }
            itemDG_40.fltAmount_Local=this.factura.fltValue_Tax_Local;
            itemDG_40.fltAmount_Corp=this.factura.fltValue_Tax_Corp;
            itemDG_40.intDoc_No=1;
            itemDG_40.strCreation_User=user;
            itemDG_40.dtmCreation_Date=new Date();
            itemDG_40.chrStatus='A';            
            var balc40:BalanceCuentaModel =new BalanceCuentaModel();            
            balc40.strCompany_Cod=this.factura.strCompany_Cod;
            balc40.strCompany_Desc=this.factura.strCompany_Desc;
            balc40.intYear=anio;
            balc40.dtmPeriod=this.factura.dtmPeriod;
            balc40.strPeriodRepo='';
            balc40.strAcc_Local_NO=this.Impuesto.strCta_Country;
            balc40.fltOpening_Balance=0;
            balc40.fltDebit_Acc=this.factura.fltValue_Tax_Local;
            balc40.fltCredit_Acc=0;
            this.balanceclist.push(balc40);  
            this.diarioInput.push(itemDG_40);
            var itemDG_42:DiarioGeneralModel=new DiarioGeneralModel();
            itemDG_42.strCompany_Cod=this.factura.strCompany_Cod;
            itemDG_42.strCompany_Desc=this.factura.strCompany_Desc;
            itemDG_42.strAccDocum_NO=this.CodigoGeneral;
            itemDG_42.dtmPosting_Date==this.factura.dtmDoc_Acc_Date;
            itemDG_42.dtmProcess_Date=new Date();
            itemDG_42.strdtmPeriod=mes+'.'+anio;
            itemDG_42.intYear=anio;
            itemDG_42.intMonth=mes;
            itemDG_42.strVendor_NO=this.factura.strVendor_NO;
            itemDG_42.strVendor_Desc=this.factura.strVendor_Desc;
            itemDG_42.strRequis_NO=this.ordencompraSelect.strRequis_NO;
            itemDG_42.strAcc_Local_NO=this.diarioModel.strDaily_AccLocal;
            itemDG_42.intRequis_Item_NO=0;
            itemDG_42.dtmRequis_Date=new Date();
            itemDG_42.strPO_NO=this.factura.strPO_NO;
            itemDG_42.dtmPO_Date=this.ordencompraSelect.dtmProcess_Date;
            // itemDG_42.strPosting_Status='B';        
            itemDG_42.dtmApproved_Date=this.ordencompraSelect.dtmAuthsd_Date;
            itemDG_42.strType_Doc=this.factura.strType_Doc;
            itemDG_42.strSerie_Doc=this.factura.strSerie_Doc;  
            itemDG_42.strDocument_NO=this.factura.strDocument_NO;      
            itemDG_42.dtmDoc_Date=this.factura.dtmDoc_Date; 
            itemDG_42.strDoc_Status='30';
            itemDG_42.strApproved_Status='A';
            itemDG_42.strApproved_User=user; 
            itemDG_42.dtmApproved_Date=new Date();
            itemDG_42.fltExchange_Rate=this.factura.fltExchange_Rate;
            itemDG_42.strCurrency_Cod=this.factura.strCurrency_Doc;
            itemDG_42.fltAmount_Local=-this.factura.fltOperation_NoTax_Local;
            itemDG_42.fltAmount_Corp=-this.factura.fltOperation_NoTax_Corp;
            itemDG_42.intDoc_No=1;
            itemDG_42.strCreation_User=user;
            itemDG_42.dtmCreation_Date=new Date();
            itemDG_42.chrStatus='A';            
            var balc42:BalanceCuentaModel =new BalanceCuentaModel();            
            balc42.strCompany_Cod=this.factura.strCompany_Cod;
            balc42.strCompany_Desc=this.factura.strCompany_Desc;
            balc42.intYear=anio;
            balc42.dtmPeriod=this.factura.dtmPeriod;
            balc42.strPeriodRepo='';
            balc42.strAcc_Local_NO=this.moneda.strAcc_Local_NO;
            balc42.fltOpening_Balance=0;
            balc42.fltDebit_Acc=0;
            balc42.fltCredit_Acc=-this.factura.fltOperation_NoTax_Local;            
            this.balanceclist.push(balc42);            
            this.diarioInput.push(itemDG_42);
            let loadingInstance = Loading.service({
            fullscreen: true,
            text: 'Guardando...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.8)'
            }
            );     
            facturaService.CreateFactura(this.factura)
            .then(response=>{
              this.voucher=response;              
              this.issave = true;
              this.iserror = false;
              this.textosave = 'Se guardo correctamente. Voucher Nro. '+response;
              for(var i=0;i<this.diarioInput.length;i++){
                this.diarioInput[i].strOrigenDocum_NO=response;
                diariogeneralService.createDiarioGeneral(this.diarioInput[i])
                .then(response1=>{}).catch(ex=>{})
              }
              for(var j=0;j<this.balanceclist.length;j++){
                balanceCuentaService.CreateBalance(this.balanceclist[j])
                .then(response2=>{}).catch(ex=>{})
              }
              for(var i=0;i<this.movimientoInven.length;i++){
                movimientoService.updateMovimiento(this.movimientoInven[i])
                .then(response1=>{}).catch(ex=>{})
              }
              loadingInstance.close();
              this.openMessageSuccess('Se guardo correctamente '+response);
              this.factura=new FacturaModel();
              this.factura.fltExchange_Rate=this.tipocambio.fltExchRate_Sale; 
              this.factura.fltValue_Doc=0;
              this.factura.fltOperation_NoTax_Corp=0;  
              this.factura.fltNetValue_Doc_Corp=0;  
              this.moneda=new MonedaModel();
              this.comprobantePago=new TipoComprobantePagoModel();
              this.facturadetalle=[];
              this.fecha_vencida='';
              // this.columnView=false;
            })
            .catch(e =>{          
              this.issave = false;
              this.iserror = true;
              this.openMessageError('Error guardar factura ');
              this.textosave = 'Error guardar factura. ';
              loadingInstance.close();
            })   
          }).catch(error=>{
            this.issave = false;
              this.iserror = true;
              this.openMessageError('Error de Servicio');
              this.textosave = 'Error de Servicio. ';
          }) 
      }
      else{
        this.openMessageError('Periodo Cerrado ');
      }
     
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
  buscarOrdenC(){
    var data=this.like(this.ordencompra1,this.clickColumn,this.inputAtributo)
    this.ordencompra=[];
    this.ordencompra=data;
  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strPO_NO"){
      this.clickColumn=val.property;  
      this.inputAtributo='';  
      this.blnilterstrPO_NO=true;
      this.blnilterstrPO_Desc=false;
      this.blnilterstrVendor_NO=false;
      this.blnilterstrVendor_Desc=false;
    }
    if(val.property=="strPO_Desc"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrPO_NO=false;
      this.blnilterstrPO_Desc=true;
      this.blnilterstrVendor_NO=false;
      this.blnilterstrVendor_Desc=false;
    }
    if(val.property=="strVendor_NO"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrPO_NO=false;
      this.blnilterstrPO_Desc=false;
      this.blnilterstrVendor_NO=true;
      this.blnilterstrVendor_Desc=false;
    }
    if(val.property=="strVendor_Desc"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrPO_NO=false;
      this.blnilterstrPO_Desc=false;
      this.blnilterstrVendor_NO=false;
      this.blnilterstrVendor_Desc=true;
    }
  }
  filterstrPO_NO(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnilterstrPO_NO){
      this.Column=column1;
      this.clickColumn=column.property;
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
  filterstrPO_Desc(h,{column,$index}){
    if(this.blnilterstrPO_Desc){
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
  filterstrVendor_NO(h,{column,$index}){      
    if(this.blnilterstrVendor_NO){
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
  filterstrVendor_Desc(h,{column,$index}){      
    if(this.blnilterstrVendor_Desc){
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
  //#endregion
  data(){
    return{
      nameComponent:'factura',
      descripcionCompania:'',
      inputAtributo:'',
      fecha_actual:'',
      fecha_vencida:'',
      dialogTableVisible: false,
      selectData:'',
      selectType:'',
      dataProveedor:[],
      ordencompra:[],
      ordencompra1:[],
      ordencompraDetalle:[],
      facturadetalle:[],
      codigoCompania:'',
      totalDinero:0,
      totalUnidad:0,
      salidaUnidad:'',
      totalDolars:'',
      TotalPagarD:'',
      voucher:'',
      multipleSelection:[],
      CodigoGeneral:'',
      fecha_ejecucion:'',
      fecha_ejecucion1:'',
      PeriodoAC:'',
      tipoRequiDisabled:true,
      gridHes:[],
      gridHes1:[],
      inputAtributoHes:'',
      loading1:false,
      loadingOrden:false
    }
  }
  
}
