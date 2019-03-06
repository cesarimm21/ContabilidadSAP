import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';


import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import { Notification } from 'element-ui';
import ordencompraService from '@/components/service/ordencompra.service';
import BCategoriaLineaComponent from '@/components/buscadores/b_categoria_linea/b_categoria_linea.vue';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
//**BUS */
import {bus} from '../../../../main';
import {OrdenCompraModel} from '@/modelo/maestro/ordencompra';
import {CategoriaLineaModel} from '@/modelo/maestro/categorialinea';
import {OrdenCompraDetalleModel} from '@/modelo/maestro/ordencompradetalle';
import {HESModel} from '@/modelo/maestro/hes';
import {HesDetalleModel} from '@/modelo/maestro/hesDetalle';
import Global from '@/Global';
import { Loading } from 'element-ui';

@Component({
  name: 'crear-hes',
  components:{'buttons-accions':ButtonsAccionsComponent,
  'bcategorialinea':BCategoriaLineaComponent,
  'quickaccessmenu':QuickAccessMenuComponent,}
})
export default class CrearHesComponent extends Vue {
  nameComponent:string;
  timer=0;
  valueSwtch:boolean=true;
  codigoCompania:string;
  sizeScreen:string = (window.innerHeight - 420).toString();//'0';
  sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  fecha_ejecucion:string;
  /*bolean_tabla_dinamica*/
  editing:any= {
    row:'',
    column:''
  };
  //#region [BOTONES]
  bln_tbl_Descripcion:boolean=false;
  bln_tbl_cantidad:boolean=false;
  bln_tbl_total:boolean=false;
  bln_tbl_Servicio:boolean=false;
  bln_tbl_Unidad:boolean=false;
  //#endregion

  //**CENTRO COSTO */
  dialogOrdenC:boolean=false;
  btnactivarOrdenC:boolean=false;

  //**CATEGORIA LINEA */
  dialogCategoriaLinea:boolean=false;
  btnactivarcategoria:boolean=false;
  public categoriaSelect:CategoriaLineaModel=new CategoriaLineaModel();
  //**ORDEN COMPRA */
  dialogOrdenCompra:boolean=false;
  btnactivarOrdenCompra:boolean=false;
  btnactivarOrdenD:boolean=false;
  dialogOrdenD:boolean=false;
  dataOrdenCompra:any[];
  public ordenCompraModel:OrdenCompraModel =new OrdenCompraModel();
  public ordenCompraDetalle:OrdenCompraDetalleModel =new OrdenCompraDetalleModel();
  public ordencompraDetalleSelect:OrdenCompraDetalleModel =new OrdenCompraDetalleModel();
  public ordencompra:OrdenCompraModel=new OrdenCompraModel();
  public ordencompraSelect:OrdenCompraModel=new OrdenCompraModel();

  //activar colores
  isactivered:boolean=true;
  isactiveyellow:boolean=false;
  isactivegreen:boolean=false;

  //HES
  public hesModel:HESModel =new HESModel();
  public hesDetalleModel:HesDetalleModel=new HesDetalleModel();
  public TableIngreso:Array<HesDetalleModel>=[];

  constructor(){
    super();
    Global.nameComponent='crear-hes';
    this.fecha_ejecucion=Global.getParseDate(new Date().toDateString()); 
    // this.TableIngreso=[];
    for(var i=0;i<10;i++){
      var reqDetalle:HesDetalleModel=new HesDetalleModel();
      reqDetalle.chrStatus="A";
      this.TableIngreso.push(reqDetalle);
    }    
  }

  //#region [ORDEN COMPRA]
  loadOrdenCompra(){
    let loadingInstance = Loading.service({
      fullscreen: true,
      text: 'Guargando...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
      );   
    ordencompraService.GetAllOrdenCompra()
    .then(respose=>{
      this.ordencompra=respose;
      loadingInstance.close();
      this.dialogOrdenCompra=true;
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'no se pudo cargar orden compra'
      });
      loadingInstance.close();
      this.dialogOrdenCompra=false;
    })
  }
  selectdbOrdenCompra(){
    this.dialogOrdenCompra=false;
  }
  selectOrdenCompra(val:OrdenCompraModel){    
    this.ordencompraSelect=val;
    this.hesModel.strDesc_Header=this.ordencompraSelect.strPO_Desc;
    this.hesModel.intIdHESH_ID=this.ordencompraSelect.intIdPOH_ID;
  }
  checkOrdenCompra(){    
    this.dialogOrdenCompra=false;
    this.loadOrdenDet(this.ordencompraSelect.intIdPOH_ID);
    this.valueSwtch=false;
    this.TableIngreso=[];
    debugger;
    for(var i=0;i<10;i++){
      var reqDetalle:HesDetalleModel=new HesDetalleModel();
      reqDetalle.chrStatus="A";
      reqDetalle.strCurrency=this.ordencompraSelect.strCurrency_Cod;
      this.TableIngreso.push(reqDetalle);
      console.log(i + ' '+reqDetalle.strCurrency);      
    }
  } 
  closeOrdenCompra(){    
    this.btnactivarOrdenCompra=false;
    this.dialogOrdenCompra=false;
    this.ordencompraSelect=new OrdenCompraModel();
    return false;
  }
  loadOrdenC(){
    this.loadOrdenCompra();
  }
  closeOrdenC(){
    debugger;
    this.btnactivarOrdenC=false;
    this.dialogOrdenCompra=false;
    // this.ordenCompraModel=new OrdenCompraModel();
    return false;
  }
  checkOrdenC(){
    this.dialogOrdenC=false;
    this.btnactivarOrdenC=false;
  }
  activar_OrdenD(){
    setTimeout(() => {
      this.btnactivarOrdenC=false;
      this.btnactivarOrdenD=true;
      this.btnactivarcategoria=false;
    }, 120);
  }
  activar_OrdenC(){
    setTimeout(() => {
      this.btnactivarOrdenC=true;
      this.btnactivarOrdenD=false;
      this.btnactivarcategoria=false;
    }, 120)
  }
  desactivar_OrdenD(){
    if(this.dialogOrdenD){
      this.btnactivarOrdenD=false;
    }
  }
  desactivar_OrdenC(){
    debugger;
    if(this.dialogOrdenC){
      this.btnactivarOrdenC=false;
    }
  }
  desactivar(){
    this.btnactivarOrdenC=false;
  }
  handleCurrentChange(val:OrdenCompraDetalleModel){
    this.ordencompraDetalleSelect=val;
  }
  dbclickSelect(){
    this.dialogOrdenC=false;
  }
  loadOrdenDet(id){    
    ordencompraService.GetAllOrdenDetalle(id)
    .then(response=>{
      this.ordenCompraDetalle=response;           
    })
  }
  closeServicios(){
    this.dialogOrdenD=false;
  }
  CheckServicios(){
    this.dialogOrdenD=false;
  }
  loadOrdenD(){
    this.dialogOrdenD=true;
  }
//#endregion
  //#region [GUARDAR HES]
  guardarHes(){
    alert('ESTAMOS EN HES');
    this.hesModel.intIdCategLine_ID=this.categoriaSelect.intIdCategLine_ID;
    this.hesModel.strCategItem_Cod=this.categoriaSelect.strCategLine_Cod;
    this.hesModel.strCompany_Cod=this.ordencompraSelect.strCompany_Cod;
    this.hesModel.strHES_Status='00';
    this.hesModel.intChange_Count=0;
    this.hesModel.dtmProcess_Date=new Date();
    this.hesModel.dtmAuthsd_Date=this.ordencompraSelect.dtmProcess_Date;
    this.hesModel.strCurrency=this.ordencompraSelect.strCurrency_Cod;
    this.hesModel.fltTot_QTY=parseInt(this.ordencompraDetalleSelect.fltCurr_Net_PR_P);
    this.hesModel.strCreation_User='egaona';
    this.hesModel.fltTot_Value=0;
    console.log(this.hesModel);
    
  }
  //#endregion
  linksUser(comand){
    router.push('/barmenu/'+comand)
  }
  created(){
    bus.$on('SaveHes',(data)=>{
      if(data===this.nameComponent){
        this.guardarHes();
      }
    })
    bus.$on('ValidadHes',(data)=>{
      if(data===this.nameComponent){
          this.$message({
              showClose:true,
              type:'info',
              message:'Validate hes'
          })
      }
  })
  }

  //#region [CATEGORIA LINEA]
  loadCategoria(){
    this.dialogCategoriaLinea=true;
  }
  closeCategoriaLinea(){
    this.dialogCategoriaLinea=false;
  }
  SeleccionadoCategoriaLinea(val){
    this.categoriaSelect=val;
    this.dialogCategoriaLinea=false;    
  }
  activar_categoria(){
    setTimeout(() => {
      this.btnactivarOrdenC=false;
      this.btnactivarOrdenD=false;
      this.btnactivarcategoria=true;
    }, 120)
  }
  desactivar_categoria(){
    if(this.dialogCategoriaLinea){
      this.btnactivarcategoria=false;
    }
  }
  categorialineaclose(){

  }
  //#endregion

  //#region [ACCIONES BOTON]
  handleBlur(event) {
    debugger;
    // this.bln_tbl_categoria_cuenta=false;
    event.edit=true;
    this.editing.row='';
    this.editing.column='';
  }
  clickDescripcion(event,edit,column){
    this.bln_tbl_Descripcion=true;
    this.bln_tbl_total=false;
    this.bln_tbl_cantidad=false;
    this.bln_tbl_Servicio=false;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  clickcantidad(event,edit,column){
    debugger;
    this.bln_tbl_cantidad=true;
    this.bln_tbl_Descripcion=false;
    this.bln_tbl_total=false;
    this.bln_tbl_Servicio=false;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  clickTtotal(event,edit,column){
    this.bln_tbl_cantidad=false;
    this.bln_tbl_Descripcion=false;
    this.bln_tbl_total=true;
    this.bln_tbl_Servicio=false;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  clickServicio(event,edit,column){
    this.bln_tbl_cantidad=false;
    this.bln_tbl_Descripcion=false;
    this.bln_tbl_total=false;
    this.bln_tbl_Servicio=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  clickUnidad(event,edit,column){
    this.bln_tbl_cantidad=false;
    this.bln_tbl_Descripcion=false;
    this.bln_tbl_total=false;
    this.bln_tbl_Servicio=false;
    this.bln_tbl_Unidad=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  //#endregion
  data(){
    return{
      nameComponent:'crear-hes',
      dialogTableVisible: false,
      codigoCompania:'',
      value:'',
      dataOrdenCompra:[],
      valueSwtch:true
    }
  }
  
}
