import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import BDocumentoComponent from '@/components/buscadores/b_tipoDocumento/b_tipoDocumento.vue';
import BCuentaContableComponent from '@/components/buscadores/b_cuenta_contable/b_cuenta_contable.vue';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';

///**Servicios */
import tipocambioService from '@/components/service/tipocambio.service';
import facturaService from '@/components/service/factura.service';
//***Modelos */
import {ProveedorModel} from '@/modelo/maestro/proveedor';
import {FacturaModel} from '@/modelo/maestro/factura';
import {TipoCambioModel} from '@/modelo/maestro/tipocambio';
import {ClaseMaterialModel} from '@/modelo/maestro/clasematerial';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';

import tipoRequisicionService from '@/components/service/tipoRequisicion.service';
import {TipoRequisicionModel} from '@/modelo/maestro/tipoRequisicion';
import { Notification } from 'element-ui';
import clasematerialService from '@/components/service/clasematerial.service';
@Component({
  name: 'crear-ingreso-comprobante',
  components:{
  'buttons-accions':ButtonsAccionsComponent,
  'bdocumento':BDocumentoComponent,
  'quickaccessmenu':QuickAccessMenuComponent,
  'bcuentacontable':BCuentaContableComponent,
  }
})
export default class CrearClaseServicioComponent extends Vue {
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
  public clasematerial:ClaseMaterialModel=new ClaseMaterialModel();
  //**Compania */
  btnactivarcompania:boolean=false;
  dataCompania:any[];
  public tabletipoRequisicion:Array<TipoRequisicionModel>=[]; 
  btnactivarGrupoProceso:boolean=false;
  btnactivarGrupoArea:boolean=false;
  btnactivarCategoriaCentroCosto:boolean=false;
  btnactivarCuentaContableDebe:boolean=false;
  dialogCuentaContableDebe:boolean=false;
  btnactivarCuentaContableHaber:boolean=false;
  dialogCuentaContableHaber:boolean=false;
  
  btnactivarCentroCosto:boolean=false;
  //**Orden compra */
  btnactivarOrdenCompra:boolean=false;
  dataOrdenCompra:any[];
  selectData:string;
  tabletipo:any=[{}]
  //**Proveedor */
  public proveedor:ProveedorModel=new ProveedorModel();
  //**Tipo Documento */
  dialogTipoDocumento:boolean=false;
  btnactivarTipoDocumento:boolean=false;

  //**Documento */
  strlevel:string='';
  dtmStart_Date:Date=new Date();
  dtmEnd_Date:Date=new Date();
  //**Factura */
  public factura:FacturaModel=new FacturaModel();
  //**impuesto */
  btnactivarImpuesto:boolean=false;
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  tiporequisicion:string='';
  cuentacontable:string='';

  btnstrIssue_Cred:boolean=false;
  btnstrIssue_Deb:boolean=false;
  btnstrInvoice_Cred:boolean=false;
  btnstrInvoice_Deb:boolean=false;
  btnstrRecep_Cred:boolean=false;
  btnstrRecep_Deb:boolean=false;
  btnstrExp_Cod_Corp:boolean=false;
  btnstrExp_Cod_Loc:boolean=false;
  btnstrAcct_Corp:boolean=false;
  blnstrAcct_Loc:boolean=false;

  constructor(){    
    super();
    Global.nameComponent='crear-ingreso-comprobante';
    this.loadTipocambio();
    var desc:any=localStorage.getItem('compania_name');
    var cod:any=localStorage.getItem('compania_cod');
    this.clasematerial.strCompany_Cod=cod;
    this.clasematerial.strCompany_Desc=desc;
    
    setTimeout(() => {
      this.load();
    }, 200)
  }
  load(){
    tipoRequisicionService.GetAllTipoRequisicion()
    .then(res=>{
      debugger;
      this.tabletipoRequisicion=res;
      this.tiporequisicion="S";    
    })
    .catch(error=>{})
  }
  loadTipocambio(){
    tipocambioService.GetAllTipoCambio1()
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
  
  activar_CuentaContableHaber(atrib){
    setTimeout(() => {
      this.btnactivarCuentaContableHaber=true;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarImpuesto=false;
      this.limpiarBotones(atrib);
    }, 120)
  }
  desactivar_CuentaContableHaber (){
    debugger;
    if(this.dialogCuentaContableHaber){
      this.btnactivarCuentaContableHaber=false;      
    }
  }
  limpiarBotones(boton){
    
    this.btnstrIssue_Cred=false;
    this.btnstrIssue_Deb=false;
    this.btnstrInvoice_Cred=false;
    this.btnstrInvoice_Deb=false;
    this.btnstrRecep_Cred=false;
    this.btnstrRecep_Deb=false;
    this.btnstrExp_Cod_Corp=false;
    this.btnstrExp_Cod_Loc=false;
    this.btnstrAcct_Corp=false;
    this.blnstrAcct_Loc=false;
    if(boton=="strIssue_Cred"){
      this.btnstrIssue_Cred=true;
    }
    if(boton=="strIssue_Deb"){
      this.btnstrIssue_Deb=true;
    }
    if(boton=="strInvoice_Cred"){
      this.btnstrInvoice_Cred=true;
    }
    if(boton=="strInvoice_Deb"){
      this.btnstrInvoice_Deb=true;
    }
    if(boton=="strRecep_Cred"){
      this.btnstrRecep_Cred=true;
    }
    if(boton=="strRecep_Deb"){
      this.btnstrRecep_Deb=true;
    }
    if(boton=="strExp_Cod_Corp"){
      this.btnstrExp_Cod_Corp=true;
    }
    if(boton=="strExp_Cod_Loc"){
      this.btnstrExp_Cod_Loc=true;
    }
    if(boton=="strAcct_Corp"){
      this.btnstrAcct_Corp=true;
    }
    if(boton=="strAcct_Loc"){
      this.blnstrAcct_Loc=true;
    }
  }
  loadCuentaContableHaber(cuenta)
  {
    debugger;
    this.cuentacontable=cuenta;
    this.dialogCuentaContableHaber=true;
    console.log('asdas',this.cuentacontable);
  }
  closeDialogCuentaContableHaber(){
    this.dialogCuentaContableHaber=false;
  }
  cuentacontableselecionadohaber(val,dialog:boolean){
    if(this.cuentacontable=="strAcct_Loc"){
      this.clasematerial.strAcct_Loc=val.strAcc_Local_NO;
      this.clasematerial.strAcct_Loc_Desc=val.strAcc_Local_Name;
    }
    if(this.cuentacontable=="strAcct_Corp"){
      this.clasematerial.strAcct_Corp=val.strAcc_Local_NO;
      this.clasematerial.strAcct_Corp_Desc=val.strAcc_Local_Name;
    }
    if(this.cuentacontable=="strExp_Cod_Loc"){
      this.clasematerial.strExp_Cod_Loc=val.strAcc_Local_NO;
      this.clasematerial.strExp_Cod_Loc_Desc=val.strAcc_Local_Name;
    }
    if(this.cuentacontable=="strExp_Cod_Corp"){
      this.clasematerial.strExp_Cod_Corp=val.strAcc_Local_NO;
      this.clasematerial.strExp_Cod_Corp_Desc=val.strAcc_Local_Name;
    }
    if(this.cuentacontable=="strRecep_Deb"){
      this.clasematerial.strRecep_Deb=val.strAcc_Local_NO;
      this.clasematerial.strRecep_Deb_Desc=val.strAcc_Local_Name;
    }
    if(this.cuentacontable=="strRecep_Cred"){
      this.clasematerial.strRecep_Cred=val.strAcc_Local_NO;
      this.clasematerial.strRecep_Cred_Desc=val.strAcc_Local_Name;
    }
    if(this.cuentacontable=="strInvoice_Deb"){
      this.clasematerial.strInvoice_Deb=val.strAcc_Local_NO;
      this.clasematerial.strInvoice_Deb_Desc=val.strAcc_Local_Name;
    }
    if(this.cuentacontable=="strInvoice_Cred"){
      this.clasematerial.strInvoice_Cred=val.strAcc_Local_NO;
      this.clasematerial.strInvoice_Cred_Desc=val.strAcc_Local_Name;
    }
    if(this.cuentacontable=="strIssue_Deb"){
      this.clasematerial.strIssue_Deb=val.strAcc_Local_NO;
      this.clasematerial.strIssue_Deb_Desc=val.strAcc_Local_Name;
    }
    if(this.cuentacontable=="strIssue_Cred"){
      this.clasematerial.strIssue_Cred=val.strAcc_Local_NO;
      this.clasematerial.strIssue_Cred_Desc=val.strAcc_Local_Name;
    }
    
    this.dialogCuentaContableHaber=false;  
  }

  activar_CuentaContableDebe(){
    setTimeout(() => {
      this.btnactivarCuentaContableDebe=true;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarImpuesto=false;
    }, 120)
  }
  desactivar_CuentaContableDebe (){
    debugger;
    if(this.dialogCuentaContableDebe){
      this.btnactivarCuentaContableDebe=false;      
    }
  }
  loadCuentaContableDebe()
  {
    this.dialogCuentaContableDebe=true;
  }
  closeDialogCuentaContableDebe(){
    this.dialogCuentaContableDebe=false;
  }
  cuentacontableselecionadodebe(val,dialog:boolean){
    this.clasematerial.strExp_Cod_Loc=val.strAcc_Local_NO;
    this.dialogCuentaContableDebe=false;  
  }

  activar_CategoriaCentroCosto(){
    setTimeout(() => {
      this.btnactivarCategoriaCentroCosto=true;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarImpuesto=false;
    }, 120)
  }
  
  activar_CentroCosto(){
    setTimeout(() => {
      this.btnactivarCentroCosto=true;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarImpuesto=false;
    }, 120)
  }
 

  activar_compania(){
    setTimeout(() => {
      this.btnactivarcompania=true;
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=false;
      this.btnactivarImpuesto=false;
    }, 120)
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
      this.btnactivarOrdenCompra=false;
      this.btnactivarTipoDocumento=true;
      this.btnactivarImpuesto=false;
    }, 120)
  }
  desactivar_TipoDocumento(){
    if(this.dialogTipoDocumento){
      this.btnactivarTipoDocumento=false;
    }
  }

  //#endregion
  //#region [DOCUMENTO]
  //#endregion
  
  
  //#region [Factura] 
  created(){
    
  }
  limpiar(){
    this.clasematerial=new ClaseMaterialModel();
    var desc:any=localStorage.getItem('compania_name');
    var cod:any=localStorage.getItem('compania_cod');
    this.clasematerial.strCompany_Cod=cod;
    this.clasematerial.strCompany_Desc=desc;
  }
  guardarTodo(){
    this.clasematerial.strStock_Type_Cod=this.tiporequisicion;  
    var user:any=localStorage.getItem('User_Usuario'); 
    this.clasematerial.strCreation_User=user;
    for(var i=0;i<this.tabletipoRequisicion.length;i++){
      if(this.tabletipoRequisicion[i].strTypeReq_Cod==this.tiporequisicion){
        this.clasematerial.strStock_Type_Desc=this.tabletipoRequisicion[i].strTipReq_Desc;
      }
    }
    let loadingInstance = Loading.service({
      fullscreen: true,
      text: 'Guardando...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
      );
    clasematerialService.CreateClaseMaterial(this.clasematerial)
    .then(response=>{
      loadingInstance.close();
      this.issave=true;
      this.textosave='Se guardo correctamente.'+response.strMatClass_Cod;
      this.openMessageSuccess('Se guardo Correctamente');      
      this.limpiar();
    }).catch(error=>{
      loadingInstance.close();
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo guardar producto'
      });
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
  data(){
    return{
      nameComponent:'crear-ingreso-comprobante',
      fechavencida:'',
      dialogTableVisible: false,
      periodoData:'',
      selectData:'',
      selectType:'',
      dataProveedor:[],
      tabletipo:[{
        strType_Cod:"T",
        strType_Desc:"Titulo"
      },
      {
        strType_Cod:"D",
        strType_Desc:"Detalle"
      }],
      
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
