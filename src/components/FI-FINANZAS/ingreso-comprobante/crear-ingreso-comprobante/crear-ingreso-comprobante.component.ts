import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import BCompaniaProveedor from '@/components/buscadores/b_compania/b_compania.vue';
import BProveedorComponent from '@/components/buscadores/b_proveedor/b_proveedor.vue';
import BDocumentoComponent from '@/components/buscadores/b_tipoDocumento/b_tipoDocumento.vue';
import BMonedaComponent from '@/components/buscadores/b_moneda/b_moneda.vue';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';

///**Servicios */
import ordencompraService from '@/components/service/ordencompra.service';
import diarioService from '@/components/service/diario.service'; 
//***Modelos */
import {TipoDocIdentidadModel} from '@/modelo/maestro/tipodocidentidad';
import {ImpuestoModel} from '@/modelo/maestro/impuesto';
import {AlmacenModel} from '@/modelo/maestro/almacen';
import {CompaniaModel} from '@/modelo/maestro/compania';
import {OrdenCompraModel} from '@/modelo/maestro/ordencompra';
import {CategoriaLineaModel} from '@/modelo/maestro/categorialinea';
import {CategoriaCuentaModel} from '@/modelo/maestro/categoriacuenta';
import {PrioridadModel} from '@/modelo/maestro/prioridad';
import {MonedaModel} from '@/modelo/maestro/moneda';
import {ProveedorModel} from '@/modelo/maestro/proveedor';
import {FacturaModel} from '@/modelo/maestro/factura';
import {FacturaDetalleModel} from '@/modelo/maestro/facturadetalle';
import {DiarioModel} from '@/modelo/maestro/diario';

import { Notification } from 'element-ui';
@Component({
  name: 'crear-ingreso-comprobante',
  components:{
  'buttons-accions':ButtonsAccionsComponent,
  'bproveedor':BProveedorComponent,
  'bcompania':BCompaniaProveedor,
  'bdocumento':BDocumentoComponent,
  'bmoneda':BMonedaComponent,
  }
})
export default class CrearIngresoComprobanteComponent extends Vue {
  timer=0;
  codigoCompania:string;
  descripcionCompania:string;
  sizeScreen:string = (window.innerHeight - 420).toString();
  TableIngreso:any[];
  periodoData:Date;
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
  public ordencompra:OrdenCompraModel=new OrdenCompraModel();
  public ordencompraSelect:OrdenCompraModel=new OrdenCompraModel();
  //**Proveedor */
  btnactivarproveedor:boolean=false;
  dialogProveedor:boolean=false;
  dataProveedor:any[];
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
  constructor(){    
    super();
    this.fecha_actual=Global.getDate(new Date().toDateString());   
    this.fecha_ejecucion=Global.getParseDate(new Date().toDateString());  
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
      this.btnactivarproveedor=false;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=false;
    }, 120)
  }
  desactivar_compania(){
    if(this.dialogCompania){
      this.btnactivarcompania=false;
    }
  }
  closeCompania(){
    debugger;
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
      this.btnactivarproveedor=false;
      this.btnactivarOrdenCompra=true;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=false;
    }, 120)
  }
  desactivar_OrdenCompra(){
    debugger;
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
    this.dialogOrdenCompra=false;
  }
  //#endregion
  handleCurrentChange(){

  }
  //#region [PROVEEDOR]
  loadProveedor(){
    this.dialogProveedor=true;
  }
  closeProveedor(){
    this.btnactivarproveedor=false;
    this.dialogProveedor=false;
    return false;
  }
  activar_proveedor(){
    setTimeout(() => {
      this.btnactivarcompania=false;
      this.btnactivarMoneda=false;
      this.btnactivarproveedor=true;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=false;
    }, 120)
  }
  desactivar_proveedor(){
    debugger;
    if(this.dialogProveedor){
      this.btnactivarproveedor=false;
    }
  }
  checkSelectProveedor(val){
    this.proveedor.strVendor_NO=val.codigo;    
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
      this.btnactivarproveedor=false;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=true;
      this.btnactivarDiario=false;
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
      this.btnactivarproveedor=false;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=false;
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
    this.factura.strCompany_Cod=this.moneda.strCurrency_Cod;
    this.dialogMoneda=false;
  }

  closeMoneda(){
    this.moneda=new MonedaModel();
    this.factura.strCompany_Cod=this.moneda.strCurrency_Cod;
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
      this.btnactivarproveedor=false;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarDiario=true;
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

  data(){
    return{
      dialogTableVisible: false,
      periodoData:'',
      selectData:'',
      selectType:'',
      dataProveedor:[],
      codigoCompania:'001',
      descripcionCompania:'GADEL SOLUTIONS S.R.L.',
      dataOrdenCompra:[{
        codigo:'67000001',
        descripcion:'compra de vienes y servicio'
      },{
        codigo:'45000002',
        descripcion:'compra de vehiculos'
      },{
        codigo:'56000003',
        descripcion:'Fomentar el bienestar'
      },{
        codigo:'67000004',
        descripcion:'Información en radio'
      },{
        codigo:'67000005',
        descripcion:'Vehiculo de carga'
      },{
        codigo:'67000006',
        descripcion:'para navidad'
      }],
      TableIngreso:[{
        cuenta:'0011-0222-0200400701',
        almacen:'almacen centro',
        material:'material 1',
        descripcion:'descripcion 1',
        lugar:'Arequipa'
      },{
        cuenta:'0011-0222-0200400234',
        almacen:'almacen 2',
        material:'material 2',
        descripcion:'descripcion 2',
        lugar:'Cusco'
      },{
        cuenta:'0011-0222-0200400701',
        almacen:'almacen 3',
        material:'material 3',
        descripcion:'descripcion 3',
        lugar:'Moquegua'
      },{
        cuenta:'0011-0222-0200400701',
        almacen:'almacen centro',
        material:'material 4',
        descripcion:'descripcion 4',
        lugar:'Arequipa'
      },{
        cuenta:'0011-0222-0200400701',
        almacen:'almacen centro',
        material:'material 5',
        descripcion:'descripcion 5',
        lugar:'Arequipa'
      },{
        cuenta:'0011-0222-0200400701',
        almacen:'almacen centro',
        material:'material 6',
        descripcion:'descripcion 6',
        lugar:'Arequipa'
      },{
        cuenta:'0011-0222-0200400701',
        almacen:'almacen centro',
        material:'material 7',
        descripcion:'descripcion 7',
        lugar:'Arequipa'
      }],
      dataTipoD:[{
        codigo:'0',
        descripcion:'OTROS TIPOS DE DOCUMENTOS'
      },{
        codigo:'1',
        descripcion:'DOCUMENTO NACIONAL DE IDENTIDAD (DNI)'
      },{
        codigo:'4',
        descripcion:'CARNET DE EXTRANJERIA'
      },{
        codigo:'6',
        descripcion:'REGISTRO ÚNICO DE CONTRIBUYENTES'
      },{
        codigo:'7',
        descripcion:'PASAPORTE'
      },{
        codigo:'A',
        descripcion:'CÉDULA DIPLOMÁTICA DE IDENTIDAD'
      },],
      dataMoneda:[{
        codigo:'PEN',
        descripcion:'soles'
      },{
        codigo:'USD',
        descripcion:'Dólar estadounidense'
      },{
        codigo:'ARG',
        descripcion:'Peso argentino'
      },{
        codigo:'AUD',
        descripcion:'Dólar australiano'
      },{
        codigo:'AMD',
        descripcion:'Kwanza'
      },{
        codigo:'AED',
        descripcion:'Dírham de los Emiratos Árabes Unidos'
      },]
    }
  }
  
}
