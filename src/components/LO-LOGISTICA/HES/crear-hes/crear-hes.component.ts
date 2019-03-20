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
import hesService from '@/components/service/hes.service';
import BCategoriaLineaComponent from '@/components/buscadores/b_categoria_linea/b_categoria_linea.vue';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import BCentroCostoComponent from '@/components/buscadores/b_centro_costo/b_centro_costo.vue';
//**BUS */
import {bus} from '../../../../main';
import {OrdenCompraModel} from '@/modelo/maestro/ordencompra';
import {CategoriaLineaModel} from '@/modelo/maestro/categorialinea';
import {OrdenCompraDetalleModel} from '@/modelo/maestro/ordencompradetalle';
import {HESModel} from '@/modelo/maestro/hes';
import {HesDetalleModel} from '@/modelo/maestro/hesDetalle';
import {CentroCostosModel} from '@/modelo/maestro/centrocostos';
import Global from '@/Global';
import { Loading } from 'element-ui';

@Component({
  name: 'crear-hes',
  components:{'buttons-accions':ButtonsAccionsComponent,
  'bcategorialinea':BCategoriaLineaComponent,
  'quickaccessmenu':QuickAccessMenuComponent,
  'bcentrocosto':BCentroCostoComponent,}
})
export default class CrearHesComponent extends Vue {
  nameComponent:string;
  timer=0;
  valueSwtch:boolean=true;
  codigoCompania:string;
  sizeScreen:string = (window.innerHeight - 420).toString();//'0';
  sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  fecha_ejecucion:string;
  vifprogress:boolean=true;
  valuem:number=0;
  issave:boolean=false;
  iserror:boolean=false;
  textosave='';
  montoaceptado:number;
  montopendiente:number;
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
  dialogCentroCostos:boolean=false;
  blncentrocosto:boolean=true;
  bln_tbl_centro_costo:boolean=false;
  cell_ocultar:string='transparent';
  public centrocosto:CentroCostosModel=new CentroCostosModel();
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
  isactivered:boolean=false;
  isactiveyellow:boolean=false;
  isactivegreen:boolean=false;

  //HES
  public hesModel:HESModel =new HESModel();
  public hesDetalleModel:HesDetalleModel=new HesDetalleModel();
  public TableIngreso:Array<HesDetalleModel>=[];

  constructor(){
    super();
    Global.nameComponent='crear-hes';
    // this.cell_ocultar='#e4e2e2';  
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
    ordencompraService.getOrdenCompraTypeRequisicion()
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
    this.valueSwtch=false;
  }
  selectOrdenCompra(val:OrdenCompraModel){    
    this.ordencompraSelect=val;
    this.hesModel.strDesc_Header=this.ordencompraSelect.strPO_Desc;
    this.hesModel.intIdHESH_ID=this.ordencompraSelect.intIdPOH_ID;
    this.hesModel.strPO_NO=this.ordencompraSelect.strPO_NO;
    this.hesModel.strCompany_Cod=this.ordencompraSelect.strCompany_Cod;
  }
  checkOrdenCompra(){    
    this.dialogOrdenCompra=false;
    this.loadOrdenDet(this.ordencompraSelect.intIdPOH_ID);
    this.valueSwtch=false;
    this.TableIngreso=[];
    for(var i=0;i<10;i++){
      var reqDetalle:HesDetalleModel=new HesDetalleModel();
      reqDetalle.chrStatus="A";
      reqDetalle.strCurrency=this.ordencompraSelect.strCurrency_Cod;
      this.TableIngreso.push(reqDetalle);   
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
    this.hesModel.strHES_Status='00';
    this.hesModel.intChange_Count=0;
    this.hesModel.dtmProcess_Date=new Date();
    this.hesModel.dtmAuthsd_Date=this.ordencompraSelect.dtmProcess_Date;
    this.hesModel.strCurrency=this.ordencompraSelect.strCurrency_Cod;
    this.hesModel.fltTot_QTY=this.ordencompraDetalleSelect.fltCurr_Net_PR_P;
    this.hesModel.strPO_Item_NO=this.ordencompraDetalleSelect.intIdPOD_ID.toString();
    this.hesModel.strCreation_User='egaona';
    this.hesModel.fltTot_Value=this.montoaceptado;
    this.hesModel.fltTot_Peding_Value=this.montopendiente;
    this.hesModel.listaDetalle=[];
    for(var i=0;i< this.TableIngreso.length;i++){
      if(this.TableIngreso[i].strCostCenter_NO!=''&&this.TableIngreso[i].strDesc_Detail!=''&&this.TableIngreso[i].strService_NO!=''){
        this.hesModel.listaDetalle.push({
          intHES_Item_NO:this.ordencompraDetalleSelect.intIdPOD_ID,
          strService_NO:this.TableIngreso[i].strService_NO,
          strDesc_Detail:this.TableIngreso[i].strDesc_Detail,
          strHES_Status:'00',
          intQuantity:this.TableIngreso[i].intQuantity,
          strUM:this.TableIngreso[i].strUM,
          strCurrency:this.TableIngreso[i].strCurrency,
          intIdCostCenter_ID:-1,
          strCostCenter_NO:this.TableIngreso[i].strCostCenter_NO,
          fltGross_Price:this.TableIngreso[i].fltGross_Price,
          fltNet_Value:this.TableIngreso[i].fltNet_Value,
          chrStatus:'A'
        })
      }      
    }
    
    let loadingInstance = Loading.service({
      fullscreen: true,
      text: 'Guargando...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
      );
      if(this.hesModel.listaDetalle.length>0){
        hesService.CreateHes(this.hesModel)
        .then(response=>{
          loadingInstance.close();
          this.issave = true;
          this.iserror = false;
          this.hesModel=new HESModel();
          this.TableIngreso=[];
          for(var i=0;i<10;i++){
            var reqDetalle:HesDetalleModel=new HesDetalleModel();
            reqDetalle.chrStatus="A";
            this.TableIngreso.push(reqDetalle);
          } 
          this.ordencompraDetalleSelect=new OrdenCompraDetalleModel();
          this.categoriaSelect=new CategoriaLineaModel();
          this.ordencompraSelect=new OrdenCompraModel();
          this.ordenCompraDetalle=new OrdenCompraDetalleModel();
          this.montoaceptado=0;
          this.montopendiente=0;
          this.textosave = 'Se guardo correctamente '+response.strHES_NO;
        }).catch(error=>{
          loadingInstance.close();
          this.issave = false;
          this.iserror = true;
          this.textosave = 'Error al guardar.';
        })    
      }
      else{
        loadingInstance.close();
        this.$message({
          showClose:true,
          type:'info',
          message:'Debe ingresar al menos un detalle'
      });      
      }
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
    this.hesModel.intIdCategLine_ID=this.categoriaSelect.intIdCategLine_ID;
    this.hesModel.strCategItem_Cod=this.categoriaSelect.strCategItem_Cod;
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
  //#region [CENTRO COSTO]
  LoadCentroCosto(row){    
    this.centrocosto=row;
    this.dialogCentroCostos=true;
  }
  clickcentrocosto(event,edit,column){
    this.bln_tbl_centro_costo=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  SeleccionadoCentroCosto(val){
    this.centrocosto.strCostCenter_NO=val.strCostCenter_NO;
    this.centrocosto.intIdCostCenter_ID=val.intIdCostCenter_ID;
    this.dialogCentroCostos=false;
  }
  Centrocostoclose(){
    this.dialogCentroCostos=false;
    this.centrocosto=new CentroCostosModel();
  }
  closeCentroCostos(){
    return false;
  }
  //#endregion
  //#region [ACCIONES BOTON]
  handleBlur(event) {
    // this.bln_tbl_categoria_cuenta=false;
    event.edit=true;
    this.editing.row='';
    this.editing.column='';
  }
  handleBlurImporte(event) {
    var inttotal=0; 
    for(var i=0;i< this.TableIngreso.length;i++){
      if(this.TableIngreso[i].intQuantity>0){
        inttotal+=Number((this.TableIngreso[i].fltGross_Price)*this.TableIngreso[i].intQuantity);
      }
      else{
        inttotal+=Number(this.TableIngreso[i].fltGross_Price);    
      }
           
    }
    this.montoaceptado=Math.round(inttotal*100)/100;
    if(Number(this.ordencompraDetalleSelect.fltCurr_Net_PR_P)>=Number(this.montoaceptado)){
      this.montopendiente=Math.round((Number(this.ordencompraDetalleSelect.fltCurr_Net_PR_P)-Number(this.montoaceptado))*100)/100;
      
    }
    else{
      this.montopendiente=-1;
      this.$message({
        showClose:true,
        type:'warning',
        message:'valor aceptado debe ser menor que el Importe total'
    })
    }
    var Tabletemp:Array<HesDetalleModel>=[];
    Tabletemp=this.TableIngreso;
    this.TableIngreso=[];
    for(var i=0;i<10;i++){
      Tabletemp[i].fltNet_Value=Number(Tabletemp[i].intQuantity)*Number(Tabletemp[i].fltGross_Price);      
    }
    this.TableIngreso=Tabletemp;        
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
      valueSwtch:true,
      montoaceptado:0,
      montopendiente:0
    }
  }
  
}
