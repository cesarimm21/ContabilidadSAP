import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import BCompaniaProveedor from '@/components/buscadores/b_compania/b_compania.vue';
import BProveedorComponent from '@/components/buscadores/b_proveedor/b_proveedor.vue';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';

//***Modelos */
import {ImpuestoModel} from '@/modelo/maestro/impuesto';
import {AlmacenModel} from '@/modelo/maestro/almacen';
import {CompaniaModel} from '@/modelo/maestro/compania';
import {OrdenCompraModel} from '@/modelo/maestro/ordencompra';
import {CategoriaLineaModel} from '@/modelo/maestro/categorialinea';
import {CategoriaCuentaModel} from '@/modelo/maestro/categoriacuenta';
import {PrioridadModel} from '@/modelo/maestro/prioridad';
import {MonedaModel} from '@/modelo/maestro/moneda';
import {ProveedorModel} from '@/modelo/maestro/proveedor';

import { Notification } from 'element-ui';
@Component({
  name: 'crear-ingreso-comprobante',
  components:{'buttons-accions':ButtonsAccionsComponent,'bproveedor':BProveedorComponent,'bcompania':BCompaniaProveedor}
})
export default class CrearIngresoComprobanteComponent extends Vue {
  timer=0;
  codigoCompania:string;
  descripcionCompania:string;
  sizeScreen:string = (window.innerHeight - 420).toString();
  TableIngreso:any[];
  //**Compania */
  btnactivarcompania:boolean=false;
  dialogCompania:boolean=false;
  dataCompania:any[];
  //**Orden compra */
  dialogOrdenCompra:boolean=false;
  btnactivarOrdenCompra:boolean=false;
  dataOrdenCompra:any[];
  selectData:string;
  //**Proveedor */
  btnactivarproveedor:boolean=false;
  dialogProveedor:boolean=false;
  dataProveedor:any[];
  public proveedor:ProveedorModel=new ProveedorModel();
  //**Tipo Documento */
  dialogTipoDocumento:boolean=false;
  btnactivarTipoDocumento:boolean=false;
  dataTipoD:any[];
  selectType:string;
  //**Documento */

  //**Moneda */
  dialogMoneda:boolean=false;
  btnactivarMoneda:boolean=false;
  dataMoneda:any[];
  public moneda:MonedaModel=new MonedaModel();
  constructor(){
    super();
    
  }
  //#region [COMPANIA]
  loadCompania(){
    this.dialogCompania=true;
  }
  activar_compania(){
    setTimeout(() => {
      this.btnactivarcompania=true;
      this.btnactivarMoneda=false;
      this.btnactivarproveedor=false;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
    }, 120)
  }
  desactivar_compania(){
    debugger;
    if(this.dialogCompania){
      this.btnactivarcompania=false;
    }
  }
  closeCompania(){
    debugger;
    this.btnactivarcompania=false;
    return false;
  }
  //#endregion

  //#region [ORDEN COMPRA]
  loadOrdenCompra(){
    this.dialogOrdenCompra=true;
  }
  closeOrdenCompra(){
    debugger;
    this.btnactivarOrdenCompra=false;
    this.dialogOrdenCompra=false;
    // this.selectData='';
    return false;
  }
  activar_OrdenCompra(){
    setTimeout(() => {
      this.btnactivarcompania=false;
      this.btnactivarMoneda=false;
      this.btnactivarproveedor=false;
      this.btnactivarOrdenCompra=true;
      this.btnactivarTipoDocumento=false;
    }, 120)
  }
  desactivar_OrdenCompra(){
    debugger;
    if(this.dialogOrdenCompra){
      this.btnactivarOrdenCompra=false;
    }
  }
  selectOrdenCompra(val){
    debugger;
    this.selectData=val.codigo;
    console.log(this.selectData);
    
  }
  checkOrdenCompra(){
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
    }, 120)
  }
  desactivar_TipoDocumento(){
    if(this.dialogTipoDocumento){
      this.btnactivarTipoDocumento=false;
    }
  }
  selectTipoDocumento(val){
    this.selectType=val.codigo;
  }
  //#endregion

  //#region [DOCUMENTO]
  //#endregion
  //#region [MONEDA]
  loadMoneda(){
    this.dialogMoneda=true;
  }
  closeMoneda(){
    debugger;
    this.btnactivarMoneda=false;
    this.dialogMoneda=false;
    return false;
  }
  activar_Moneda(){
    setTimeout(() => {
      this.btnactivarcompania=false;
      this.btnactivarMoneda=true;
      this.btnactivarproveedor=false;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
    }, 120)
  }
  desactivar_Moneda(){
    debugger;
    if(this.dialogMoneda){
      this.btnactivarMoneda=false;
    }
  }
  checkSelectMoneda(val){
    this.moneda.strCurrency_Cod=val.codigo
  }
  //#endregion
  data(){
    return{
      dialogTableVisible: false,
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
