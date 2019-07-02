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

import {CategoriaLineaModel} from '@/modelo/maestro/categorialinea';
import {OrdenCompraDetalleModel} from '@/modelo/maestro/ordencompradetalle';
import {HESModel} from '@/modelo/maestro/hes';
import {HesDetalleModel} from '@/modelo/maestro/hesDetalle';
import {CentroCostosModel} from '@/modelo/maestro/centrocostos';
import Global from '@/Global';
import { Loading } from 'element-ui';
import { User } from '@/modelo/user';

@Component({
  name: 'viewandedit-hes',
  components:{'buttons-accions':ButtonsAccionsComponent,
  'bcategorialinea':BCategoriaLineaComponent,
  'quickaccessmenu':QuickAccessMenuComponent,
  'bcentrocosto':BCentroCostoComponent,}
})
export default class ViewAndEditHesComponent extends Vue {
  nameComponent:string;
  timer=0;
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

  //activar colores
  isactivered:boolean=true;
  isactiveyellow:boolean=false;
  isactivegreen:boolean=false;

  //HES
  public hesModel:HESModel =new HESModel();
  public hesDetalleModel:HesDetalleModel=new HesDetalleModel();
  public TableIngreso:Array<HesDetalleModel>=[];

  multipleSelectionItem:any[];
  multipleSelectionAcept:any[];
  rowSelect:any;
  requiTemp:any[];
    nameFuncion:string;
    impDisabled:boolean=false;
    vifaprobarrechasar:boolean=false;
  constructor(){
    super();
    Global.nameComponent='crear-hes';
    // this.cell_ocultar='#e4e2e2';  
    this.fecha_ejecucion=Global.getParseDate(new Date().toDateString()); 
    // this.TableIngreso=[];
    setTimeout(() => {
       
      this.load();
    }, 200)
   
  }
  load(){
    this.hesModel= JSON.parse(this.$route.query.data);
    var vista=this.$route.query.vista;
    if(vista=='Modificar'){
        this.nameFuncion='Modificar HES';
        this.impDisabled=false;
    }
    if(vista=='Visualizar'){
        this.nameFuncion='Visualizar HES';
        this.impDisabled=true;
    }
    if(vista=='Aprobar'){
        this.nameFuncion='Aprobar HES';
        this.vifaprobarrechasar=true;
        this.impDisabled=true;
    }
    if(this.hesModel.strHES_Status=='00'){
      this.isactivered=true;
      this.isactiveyellow=false;
      this.isactivegreen=false;
    }
    if(this.hesModel.strHES_Status=='30'){
      this.isactiveyellow=true;
      this.isactivered=false;
      this.isactivegreen=false;
    }
    if(this.hesModel.strHES_Status=='50'){
      this.isactivegreen=true;
      this.isactivered=false;
      this.isactiveyellow=false;
    }
    this.codigoCompania=localStorage.getItem('compania_cod');
    this.descripcionCompania=localStorage.getItem('compania_name');
    this.fecha_ejecucion=Global.getParseDate(this.hesModel.dtmProcess_Date);
    this.fecha_since=Global.getParseDate(this.hesModel.dtmSince_Date);
    this.fecha_until=Global.getParseDate(this.hesModel.dtmUntil_Date);
    hesService.GetHesDetalle(this.hesModel.intIdHESH_ID)
    .then(response=>{
        this.TableIngreso=[];
        this.TableIngreso=response;
    })
    // for(var i=0;i<10;i++){
    //   var reqDetalle:HesDetalleModel=new HesDetalleModel();
    //   reqDetalle.chrStatus="A";
    //   this.TableIngreso.push(reqDetalle);
    // }   
  }
  //#region [ORDEN COMPRA]
  // handleCurrentChangeItem(val:OrdenCompraDetalleModel){
  //   this.ordencompraDetalleSelect=val;
  // }
  handleCurrentChange(val){
    this.rowSelect=val.strService_NO;         
}
  dbclickSelect(){
    this.dialogOrdenC=false;
  }
  handleSelectionChangeItem(val){
    this.multipleSelectionItem=val;
  }
//   handleSelectionChangeDet(val){
//     this.multipleSelectionAcept=val;s
//     this.hesModel.fltTot_QTY=0;
//     for(var i=0;i< this.multipleSelectionAcept.length;i++){
//       this.hesModel.fltTot_QTY+=Number(this.multipleSelectionAcept[i].fltNet_Value);
//     }
//   }
//#endregion
  //#region [ACTUALIZAR HES]
  UpdateHes(){
    var user:any=localStorage.getItem('User_Usuario');
      if(this.$route.query.vista=='Modificar'){
        this.hesModel.intChange_Count=Number(this.hesModel.intChange_Count)+1;
        this.hesModel.dtmModified_Date=new Date();
        this.hesModel.strModified_User=user;
        this.hesModel.dtmSince_Date=new Date(this.fecha_since);
        this.hesModel.dtmUntil_Date=new Date(this.fecha_until);
        this.hesModel.listaDetalle=[];
        this.hesModel.listaDetalle=this.TableIngreso;
        let loadingInstance = Loading.service({
          fullscreen: true,
          text: 'Guardando...',
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
              this.openMessageSuccess('Se actualizo correctamente '+response);
              this.textosave = 'Se actualizo correctamente '+response;
            }).catch(error=>{
              loadingInstance.close();
              this.issave = false;
              this.iserror = true;
              this.textosave = 'Error al actualizar.';
              this.openMessageError('Error al actualizar.');
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
      if(this.$route.query.vista=='Visualizar') {
        this.$message({
          showClose:true,
          type:'info',
          message:'Accion no permitida'
      });  
      }   
      if(this.$route.query.vista=='Aprobar'){
        
      }
    
    }
    async aprobar(){
      var user:any=localStorage.getItem('User_Usuario');
        this.valuem=0;
        this.hesModel.strModified_User=user;
        await setTimeout(() => {
            for(var i=0;i<100;i++){
            this.valuem++; 
            }
        }, 200)
        console.log(this.hesModel);
        
        await hesService.aprobarHES(this.hesModel)
        .then(res=>{
            setTimeout(() => {
                this.vifprogress=false;
                this.issave=true;
                this.textosave='Se aprobo correctamente. '+res.strPO_NO;
                this.openMessageSuccess('Se aprobo correctamente '+res.strPO_NO);
                // router.push({ path: `/barmenu/LO-LOGISTICA/orden_compra/po_aprobacion`});
            }, 600)
           
        })
        .catch(error=>{
            this.issave = false;
            this.iserror = true;
            this.textosave='Ocurrio un error inesperado. ';
            this.openMessageError('Ocurrio un error inesperado ');
        })
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
    debugger;
    var inttotal=0;   
    // this.totalItems=0;
    for(var i=0;i< this.TableIngreso.length;i++){
      inttotal+=Number((this.TableIngreso[i].intQuantity)*(this.TableIngreso[i].fltGross_Price));            
    }
    this.hesModel.fltTot_QTY=Math.round(inttotal*100)/100;
    this.hesModel.fltTot_Peding_Value=Math.round((Number(this.hesModel.fltTot_QTY)-Number(this.hesModel.fltTot_Value))*100)/100;
    // this.totalPrice=inttotal;
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
          this.TableIngreso[i].fltNet_Value=Math.round(val*this.TableIngreso[i].intQuantity*100)/100;
          this.requiTemp=this.TableIngreso; 
          this.TableIngreso=[];              
          this.TableIngreso=this.requiTemp;  
          this.requiTemp=[];
      }
    }  
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
      descripcionCompania:'',
      value:'',
      dataOrdenCompra:[],
      ordenCompraDetalle:[],
      valueSwtch:true,
      montoaceptado:0,
      montopendiente:0,
      CodigoPO:'',
      ordencompra:[],
      multipleSelectionItem: [],
      multipleSelectionAcept:[],
      fecha_since:'',
      fecha_until:'',
      nameFuncion:''
    }
  }
  
}
