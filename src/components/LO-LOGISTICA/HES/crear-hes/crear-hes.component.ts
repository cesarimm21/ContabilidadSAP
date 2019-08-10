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
  CodigoPO:string;
  timer=0;
  valueSwtch:boolean=true;
  codigoCompania:any;
  descripcionCompania:any;
  sizeScreen:string = (window.innerHeight - 420).toString();//'0';
  sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  fecha_ejecucion:string;
  fecha_since:string;
  fecha_until:string;
  vifprogress:boolean=true;
  valuem:number=0;
  issave:boolean=false;
  iserror:boolean=false;
  textosave='';
  // montoaceptado:number;
  // montopendiente:number;
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
  public ordenCompraDetalle:OrdenCompraDetalleModel[];
  // public ordencompraDetalleSelect:OrdenCompraDetalleModel =new OrdenCompraDetalleModel();
  public ordencompra:OrdenCompraModel[];
  public ordencompra1:OrdenCompraModel[];
  public ordencompraSelect:OrdenCompraModel=new OrdenCompraModel();

  //activar colores
  isactivered:boolean=true;
  isactiveyellow:boolean=false;
  isactivegreen:boolean=false;
  blnilterstrPO_NO:boolean=true;
  blnilterstrPO_Desc:boolean=false;
  blnilterstrVendor_NO:boolean=false;
  blnilterstrVendor_Desc:boolean=false;
  clickColumn:string='';
  Column:string='';
  inputAtributo:any;
  //HES
  public hesModel:HESModel =new HESModel();
  public hesDetalleModel:HesDetalleModel=new HesDetalleModel();
  public TableIngreso:Array<HesDetalleModel>=[];

  multipleSelectionItem:any[];
  multipleSelectionAcept:any[];
  rowSelect:any;
  requiTemp:any[];
  constructor(){
    super();
    Global.nameComponent='crear-hes';
    // this.cell_ocultar='#e4e2e2';  
    this.fecha_ejecucion=(new Date()).toString();
    // this.TableIngreso=[];
    setTimeout(() => {
       
      this.load();
    }, 200)
   
  }
  load(){
    this.codigoCompania=localStorage.getItem('compania_cod');
    this.descripcionCompania=localStorage.getItem('compania_name');
    this.fecha_since=(new Date()).toString();
    this.fecha_until=(new Date()).toString(); 
    for(var i=0;i<50;i++){
      var reqDetalle:HesDetalleModel=new HesDetalleModel();
      reqDetalle.chrStatus="A";
      this.TableIngreso.push(reqDetalle);
    }   
  }
  //#region [ORDEN COMPRA]
  searchPO(){
    if(this.CodigoPO==''){
      this.$message({
        showClose: true,
        type: 'warning',
        message: 'Ingrese codigo PO'
      });
    }
    else{
      ordencompraService.getPOCod(this.CodigoPO)
      .then(response=>{
        this.ordencompra=response;
      })
    }
  
  }
  loadOrdenCompra(){
    let loadingInstance = Loading.service({
      fullscreen: true,
      text: 'Guardando...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
      );   
    ordencompraService.getOrdenCompraTypeRequisicion()
    .then(respose=>{
      this.ordencompra=respose;      
      this.ordencompra1=respose;      
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
    this.hesModel.intIdPOH_ID=this.ordencompraSelect.intIdPOH_ID;
    this.hesModel.strPO_NO=this.ordencompraSelect.strPO_NO;
    this.hesModel.strCompany_Cod=this.ordencompraSelect.strCompany_Cod;
  }
  checkOrdenCompra(){    
    this.dialogOrdenCompra=false;
    this.loadOrdenDet(this.ordencompraSelect.intIdPOH_ID);
    this.valueSwtch=false;
    // this.TableIngreso=[];
    // for(var i=0;i<10;i++){
    //   var reqDetalle:HesDetalleModel=new HesDetalleModel();
    //   reqDetalle.chrStatus="A";
    //   reqDetalle.strCurrency=this.ordencompraSelect.strCurrency_Cod;
    //   this.TableIngreso.push(reqDetalle);   
    // }
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
  // handleCurrentChangeItem(val:OrdenCompraDetalleModel){
  //   this.ordencompraDetalleSelect=val;
  // }
  handleCurrentChange(val){
    this.rowSelect=val.strService_NO;         
}
  dbclickSelect(){
    this.dialogOrdenC=false;
  }
  getNumber(num){
    return parseFloat(num);
}
  loadOrdenDet(id){    
    ordencompraService.GetAllOrdenDetalleHES(id)
    .then(response=>{
      this.ordenCompraDetalle=[];
      this.ordenCompraDetalle=response;
      this.TableIngreso=[];
      for(var i=0;i<this.ordenCompraDetalle.length;i++){
        var reqDetalle:HesDetalleModel=new HesDetalleModel();
        reqDetalle.intIdPOD_ID=this.ordenCompraDetalle[i].intIdPOD_ID;
        reqDetalle.strService_NO=this.ordenCompraDetalle[i].intPO_Item_NO.toString();
        reqDetalle.strDesc_Detail=this.ordenCompraDetalle[i].strPO_Item_Desc;
        reqDetalle.strUM=this.ordenCompraDetalle[i].strUM_Cod;
        reqDetalle.intQuantity=this.ordenCompraDetalle[i].fltPO_QTY_I;
        reqDetalle.fltGross_Price=this.ordenCompraDetalle[i].fltPO_Net_PR_I;//precio unitario
        reqDetalle.fltNet_Value=this.ordenCompraDetalle[i].fltCurr_Net_PR_P;//total por producto
        reqDetalle.fltRec_Value=this.ordenCompraDetalle[i].fltRec_Value;//pendiente
        reqDetalle.fltRecTemp_Value=this.ordenCompraDetalle[i].fltRec_Value;//pendiente
        reqDetalle.fltFacture_Net_PR_I=0;//hes aceptar
        reqDetalle.intPO_Item_NO=this.ordenCompraDetalle[i].intPO_Item_NO;//hes aceptar
        reqDetalle.strPO_NO=this.hesModel.strPO_NO;//hes aceptar
        reqDetalle.strCurrency=this.ordenCompraDetalle[i].strCurrency_Cod;
        reqDetalle.intIdCostCenter_ID=this.ordenCompraDetalle[i].intIdCostCenter_ID;
        reqDetalle.strCostCenter_NO=this.ordenCompraDetalle[i].strCostCenter_NO;
        reqDetalle.strCostCenter_Desc=this.ordenCompraDetalle[i].strCostCenter_Desc;
        reqDetalle.chrStatus="A";
        this.TableIngreso.push(reqDetalle);
      }  
      var num=this.TableIngreso.length;
      for(var i=0;i<50-num;i++){
        var reqDetalle:HesDetalleModel=new HesDetalleModel();
        reqDetalle.chrStatus="A";
        this.TableIngreso.push(reqDetalle);
      }    
      
    })
  }
  closeServicios(){
    this.TableIngreso=[];
      for(var i=0;i<this.ordenCompraDetalle.length;i++){
        var reqDetalle:HesDetalleModel=new HesDetalleModel();
        reqDetalle.strService_NO=this.ordenCompraDetalle[i].intPO_Item_NO.toString();
        reqDetalle.strDesc_Detail=this.ordenCompraDetalle[i].strPO_Item_Desc;
        reqDetalle.strUM=this.ordenCompraDetalle[i].strUM_Cod;
        reqDetalle.intQuantity=this.ordenCompraDetalle[i].fltPO_QTY_I;
        reqDetalle.fltGross_Price=this.ordenCompraDetalle[i].fltPO_Net_PR_I;
        reqDetalle.fltNet_Value=this.ordenCompraDetalle[i].fltCurr_Net_PR_P;
        reqDetalle.strCurrency=this.ordenCompraDetalle[i].strCurrency_Cod;
        reqDetalle.intIdCostCenter_ID=this.ordenCompraDetalle[i].intIdCostCenter_ID;
        reqDetalle.strCostCenter_NO=this.ordenCompraDetalle[i].strCostCenter_NO;
        reqDetalle.chrStatus="A";
        this.TableIngreso.push(reqDetalle);
      }  
    this.dialogOrdenD=false;
  }
  CheckServicios(){
    if(this.multipleSelectionItem.length==0){
      this.$message({
        showClose:true,
        type:'info',
        message:'Debe seleccionar al menos un detalle'
    });    
    }
    else{
      this.TableIngreso=[];
      for(var i=0;i<this.multipleSelectionItem.length;i++){
        var reqDetalle:HesDetalleModel=new HesDetalleModel();
        reqDetalle.strService_NO=this.multipleSelectionItem[i].intPO_Item_NO.toString();
        reqDetalle.strDesc_Detail=this.multipleSelectionItem[i].strPO_Item_Desc;
        reqDetalle.strUM=this.multipleSelectionItem[i].strUM_Cod;
        reqDetalle.intQuantity=this.multipleSelectionItem[i].fltPO_QTY_I;
        reqDetalle.fltGross_Price=this.multipleSelectionItem[i].fltPO_Net_PR_I;
        reqDetalle.fltNet_Value=this.multipleSelectionItem[i].fltCurr_Net_PR_P;
        reqDetalle.strCurrency=this.multipleSelectionItem[i].strCurrency_Cod;
        reqDetalle.intIdCostCenter_ID=this.multipleSelectionItem[i].intIdCostCenter_ID;
        reqDetalle.strCostCenter_NO=this.multipleSelectionItem[i].strCostCenter_NO;
        reqDetalle.chrStatus="A";
        this.TableIngreso.push(reqDetalle);
      }  
    this.dialogOrdenD=false;   
    }
     
  }
  loadOrdenD(){
    this.dialogOrdenD=true;
  }
  handleSelectionChangeItem(val){
    this.multipleSelectionItem=val;
  }
  handleSelectionChangeDet(val){
    this.multipleSelectionAcept=val;
    this.hesModel.fltTot_QTY=0;
    this.hesModel.fltTot_Value=0
    this.hesModel.fltTot_Peding_Value=0;
    for(var i=0;i< this.multipleSelectionAcept.length;i++){
      this.hesModel.fltTot_QTY+=Number(this.multipleSelectionAcept[i].fltGross_Price);
      this.hesModel.fltTot_Value+=Number(this.multipleSelectionAcept[i].fltFacture_Net_PR_I);
      this.hesModel.fltTot_Peding_Value+=Number(this.multipleSelectionAcept[i].fltRec_Value);
    }
    // this.hesModel.fltTot_Peding_Value=Math.round((Number(this.hesModel.fltTot_QTY)-Number(this.hesModel.fltTot_Value))*100)/100
  }
//#endregion
  //#region [GUARDAR HES]
  guardarHes(){    
    this.hesModel.strHES_Status='00';
    this.hesModel.intChange_Count=0;
    this.hesModel.chrStatus='A';
    this.hesModel.dtmProcess_Date=new Date();
    this.hesModel.dtmAuthsd_Date=this.ordencompraSelect.dtmProcess_Date;
    this.hesModel.strCurrency=this.ordencompraSelect.strCurrency_Cod;
    this.hesModel.strCreation_User='egaona';
    this.hesModel.dtmSince_Date=new Date(this.fecha_since);
    this.hesModel.dtmUntil_Date=new Date(this.fecha_until);
    this.hesModel.listaDetalle=[];
    this.hesModel.listaDetalle=this.multipleSelectionAcept;
    let loadingInstance = Loading.service({
      fullscreen: true,
      text: 'Guardando...',
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
          for(var i=0;i<50;i++){
            var reqDetalle:HesDetalleModel=new HesDetalleModel();
            reqDetalle.chrStatus="A";
            this.TableIngreso.push(reqDetalle);
          } 
          this.multipleSelectionAcept=[];
          this.categoriaSelect=new CategoriaLineaModel();
          this.ordencompraSelect=new OrdenCompraModel();
          this.hesModel.dtmSince_Date=new Date();
          this.hesModel.dtmUntil_Date=new Date();
          this.openMessageSuccess('Se guardo correctamente '+response.strHES_NO);
          this.textosave = 'Se guardo correctamente '+response.strHES_NO;
        }).catch(error=>{
          loadingInstance.close();
          this.issave = false;
          this.iserror = true;
          this.textosave = 'Error al guardar.';
          this.openMessageError('Error al guardar.');
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
  linksUser(comand){
    router.push('/barmenu/'+comand)
  }
  created(){
   
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
    // var inttotal=0;   
    // for(var i=0;i< this.multipleSelectionAcept.length;i++){
    //   inttotal+=Number((this.multipleSelectionAcept[i].intQuantity)*(this.multipleSelectionAcept[i].fltGross_Price));            
    // }
    // this.hesModel.fltTot_QTY=Math.round(inttotal*100)/100;
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
  handleChangeCantidad(val){
    
    for (let i = 0; i < this.TableIngreso.length; i++) {
      if(this.TableIngreso[i].strService_NO == this.rowSelect){
          this.TableIngreso[i].fltNet_Value=Math.round(val*this.TableIngreso[i].fltGross_Price*100)/100;
          this.requiTemp=this.TableIngreso; 
          this.TableIngreso=[];              
          this.TableIngreso=this.requiTemp;  
          this.requiTemp=[];
      }
    }          
}
handleChangeValUni(val){
  for (let i = 0; i < this.TableIngreso.length; i++) {
      if(this.TableIngreso[i].strService_NO == this.rowSelect){
          // this.TableIngreso[i].fltNet_Value=Math.round(val*this.TableIngreso[i].intQuantity*100)/100;
          this.TableIngreso[i].fltRec_Value=Math.round((this.TableIngreso[i].fltRecTemp_Value-val)*100)/100;
          this.requiTemp=this.TableIngreso; 
          this.TableIngreso=[];              
          this.TableIngreso=this.requiTemp;  
          this.requiTemp=[];
      }
    }
    this.hesModel.fltTot_QTY=0;
    this.hesModel.fltTot_Value=0;
    this.hesModel.fltTot_Peding_Value=0;
    for(let i = 0; i < this.multipleSelectionAcept.length; i++){
      if(this.multipleSelectionAcept[i].strService_NO == this.rowSelect){
        this.multipleSelectionAcept[i].fltFacture_Net_PR_I=val;
      }
      this.hesModel.fltTot_QTY+=Number(this.multipleSelectionAcept[i].fltNet_Value);
      this.hesModel.fltTot_Value+=Number(this.multipleSelectionAcept[i].fltFacture_Net_PR_I);
      this.hesModel.fltTot_Peding_Value+=Number(this.multipleSelectionAcept[i].fltRec_Value);
    }  
    // this.hesModel.fltTot_Peding_Value=Math.round((Number(this.hesModel.fltTot_QTY)-Number(this.hesModel.fltTot_Value))*100)/100;
}
  changeAcepte(val){
    if(this.hesModel.fltTot_QTY<this.hesModel.fltTot_Value){
        this.$message({
          showClose:true,
          type:'warning',
          message:'valor aceptado debe ser menor que el Importe total'
      })
    }
    else{
      this.hesModel.fltTot_Peding_Value=Math.round((Number(this.hesModel.fltTot_QTY)-Number(this.hesModel.fltTot_Value))*100)/100;
    }
  }
  //#endregion
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
  backPage(){
    window.history.back();
  }
  reloadpage(){
    window.location.reload();
  }
  data(){
    return{
      nameComponent:'crear-hes',
      dialogTableVisible: false,
      TableIngreso:[],
      codigoCompania:'',
      inputAtributo:'',
      descripcionCompania:'',
      value:'',
      dataOrdenCompra:[],
      ordenCompraDetalle:[],
      valueSwtch:true,
      montoaceptado:0,
      montopendiente:0,
      CodigoPO:'',
      ordencompra:[],
      ordencompra1:[],
      multipleSelectionItem: [],
      multipleSelectionAcept:[],
      fecha_since:'',
      fecha_until:''
    }
  }
  
}
