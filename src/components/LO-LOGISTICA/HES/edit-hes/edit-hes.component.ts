import Vue from 'vue';
import {Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import { Notification } from 'element-ui';
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
    name:'edit-hes',
    components:{'buttons-accions':ButtonsAccionsComponent,
    'bcategorialinea':BCategoriaLineaComponent,
    'quickaccessmenu':QuickAccessMenuComponent,
    'bcentrocosto':BCentroCostoComponent,}
})
export default class EditHesComponent extends Vue{
    nameComponent:string;
  timer=0;
  valueSwtch:boolean=true;
  codigoCompania:string;
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
  dialogHES:boolean=false;
  btnactivarHES:boolean=false;
  dialogOrdenD:boolean=false;
  dataOrdenCompra:any[];
  public ordenCompraModel:OrdenCompraModel =new OrdenCompraModel();

  //activar colores
  isactivered:boolean=false;
  isactiveyellow:boolean=false;
  isactivegreen:boolean=false;

  //HES
  public hesModel:HESModel =new HESModel();
  public gridhesModel:HESModel =new HESModel();
  hesDetalleModel:any[];
  public TableIngreso:Array<HesDetalleModel>=[];

    constructor(){
        super();
        Global.nameComponent='edit-hes';
        for(var i=0;i<10;i++){
        var reqDetalle:HesDetalleModel=new HesDetalleModel();
        reqDetalle.chrStatus="A";
        this.TableIngreso.push(reqDetalle);
        }    
    }
     //#region [HES]
  loadAllHES(){
    let loadingInstance = Loading.service({
      fullscreen: true,
      text: 'Guargando...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
      );   
      hesService.GetAllHes()
    .then(respose=>{
      this.gridhesModel=respose;      
      loadingInstance.close();
      this.dialogHES=true;
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'no se pudo cargar aceptación servicio'
      });
      loadingInstance.close();
      this.dialogHES=false;
    })
  }
  selectdbOrdenCompra(){
    this.dialogHES=false;
  }
  selectHES(val:HESModel){    
    this.hesModel=val;    
    this.fecha_ejecucion=Global.getParseDate(this.hesModel.dtmProcess_Date);
    this.fecha_since=Global.getParseDate(this.hesModel.dtmSince_Date);
    this.fecha_until=Global.getParseDate(this.hesModel.dtmUntil_Date);
    this.montoaceptado=this.hesModel.fltTot_Value;
    this.montopendiente=this.hesModel.fltTot_Peding_Value;
    if(this.hesModel.strHES_Status=='00'){
      this.isactivered=true;
    }
    if(this.hesModel.strHES_Status=='30'){
      this.isactiveyellow=true;
    }
    if(this.hesModel.strHES_Status=='50'){
      this.isactivegreen=true;
    }
    this.hesModel.intChange_Count=Number(this.hesModel.intChange_Count)+1;
  }
  checkHES(){    
    this.dialogHES=false;
    this.loadHESDet(this.hesModel.intIdHESH_ID); 
    
  } 
  closehes(){    
    this.btnactivarHES=false;
    this.dialogHES=false;
    this.hesModel=new HESModel();
    return false;
  }
  loadHES(){
    this.loadAllHES();
  }
  checkOrdenC(){
    this.dialogOrdenC=false;
    this.btnactivarHES=false;
  }
  activar_HES(){
    setTimeout(() => {
      this.btnactivarHES=true;
      this.btnactivarcategoria=false;
    }, 120)
  }
  desactivar_HES(){
    if(this.dialogOrdenC){
      this.btnactivarHES=false;
    }
  }
  desactivar(){
    this.btnactivarHES=false;
  }
  dbclickSelect(){
    this.dialogOrdenC=false;
  }
  loadHESDet(id){    
    hesService.GetHesDetalle(id)
    .then(response=>{
        this.hesDetalleModel=[];
        this.hesDetalleModel=response; 
        this.TableIngreso=[];
        var total=this.hesDetalleModel.length;
        var dataadd=10-total;
        for(var i=0;i<total;i++){
            this.TableIngreso.push(this.hesDetalleModel[i]); 
        }
        for(var i=0;i<dataadd;i++){
            var reqDetalle:HesDetalleModel=new HesDetalleModel();
            reqDetalle.chrStatus="A";
            reqDetalle.strCurrency=this.hesModel.strCurrency;
            this.TableIngreso.push(reqDetalle);   
        }        
    })
  }
  datesince(){
    let datenuevo=this.fecha_since;
    this.hesModel.dtmSince_Date=new Date(datenuevo); 
  }
  dateuntil(){
    let datenuevo=this.fecha_since;
    this.hesModel.dtmUntil_Date=new Date(datenuevo); 
  }
//#endregion
  //#region [GUARDAR HES]
  guardarEditHES(){   
    this.hesModel.strModified_User='egaona';
    this.hesModel.dtmModified_Date=new Date();
    this.hesModel.fltTot_Value=this.montoaceptado;
    this.hesModel.fltTot_Peding_Value=this.montopendiente;
    this.hesModel.listaDetalle=[];
    for(var i=0;i< this.TableIngreso.length;i++){
      if(this.TableIngreso[i].strCostCenter_NO!=''&&this.TableIngreso[i].strDesc_Detail!=''&&this.TableIngreso[i].strService_NO!=''){
        this.hesModel.listaDetalle.push({
          intIdHESD_ID:this.TableIngreso[i].intIdHESD_ID,
          intIdHESH_ID:this.hesModel.intIdHESH_ID,
          intHES_Item_NO:this.TableIngreso[i].intHES_Item_NO,
          strService_NO:this.TableIngreso[i].strService_NO,
          strDesc_Detail:this.TableIngreso[i].strDesc_Detail,
          strHES_NO:this.TableIngreso[i].strHES_NO,
          intQuantity:this.TableIngreso[i].intQuantity,
          strUM:this.TableIngreso[i].strUM,
          strCurrency:this.TableIngreso[i].strCurrency,
          intIdCostCenter_ID:-1,
          dtmCreation_Date:this.TableIngreso[i].dtmCreation_Date,
          strCostCenter_NO:this.TableIngreso[i].strCostCenter_NO,
          fltGross_Price:this.TableIngreso[i].fltGross_Price,
          fltNet_Value:this.TableIngreso[i].fltNet_Value,
          chrStatus:'A',

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
        hesService.UpdateHes(this.hesModel)
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
          this.categoriaSelect=new CategoriaLineaModel();
          this.hesModel=new HESModel();
          this.montoaceptado=0;
          this.montopendiente=0;
          this.textosave = 'Se actualizó correctamente '+response;
        }).catch(error=>{
          loadingInstance.close();
          this.issave = false;
          this.iserror = true;
          this.textosave = 'Error al actualizar.';
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
  //#region [CATEGORIA LINEA]
  loadCategoria(){
    this.dialogCategoriaLinea=true;
  }
  closeCategoriaLinea(){
    this.dialogCategoriaLinea=false;
  }
  SeleccionadoCategoriaLinea(val:CategoriaLineaModel){
    this.categoriaSelect=val;
    this.hesModel.intIdCategLine_ID=this.categoriaSelect.intIdCategLine_ID;
    this.hesModel.strCategItem_Cod=this.categoriaSelect.strCategItem_Cod;
    this.dialogCategoriaLinea=false;      
  }
  activar_categoria(){
    setTimeout(() => {
      this.btnactivarHES=false;
      this.btnactivarcategoria=true;
    }, 120)
  }
  desactivar_categoria(){
    if(this.dialogCategoriaLinea){
      this.btnactivarcategoria=false;
    }
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
    if(Number(this.hesModel.fltTot_QTY)>=Number(this.montoaceptado)){
      this.montopendiente=Math.round((Number(this.hesModel.fltTot_QTY)-Number(this.montoaceptado))*100)/100;
      
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
  backPage(){
    window.history.back();
  }
  reloadpage(){
    window.location.reload();
  }
    data(){
        return{
            nameComponent:'edit-hes',
            dialogTableVisible: false,
            codigoCompania:'',
            value:'',
            dataOrdenCompra:[],
            valueSwtch:true,
            montoaceptado:0,
            montopendiente:0,
            hesDetalleModel:[],
            fecha_ejecucion:'',
            fecha_since:'',
            fecha_until:''
        }
    }

}