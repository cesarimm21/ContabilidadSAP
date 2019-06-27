import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import {RequisicionModel} from '@/modelo/maestro/requisicion';
import {RequisicionDetalleModel} from '@/modelo/maestro/requisiciondetalle';
import {ProveedorModel} from '@/modelo/maestro/proveedor';
import {MonedaModel} from '@/modelo/maestro/moneda';
import {OrdenCompraModel} from '@/modelo/maestro/ordencompra';
import {AlmacenModel} from '@/modelo/maestro/almacen';
import {OrdenCompraDetalleModel} from '@/modelo/maestro/ordencompradetalle';
import ordenCompraService from '@/components/service/ordencompra.service';
import requisicionService from '@/components/service/requisicion.service';
import proveedorService from '@/components/service/proveedor.service';
import almacenService from '@/components/service/almacen.service';
import BMonedaComponent from '@/components/buscadores/b_moneda/b_moneda.vue';
import BImpuestoComponent from '@/components/buscadores/b_impuesto/b_impuesto.vue';
import BPrioridadComponent from '@/components/buscadores/b_prioridad/b_prioridad.vue';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import BUnidadMedidaComponent from '@/components/buscadores/b_unidad_medida/b_unidad_medida.vue';
import BCategoriaCuentaComponent from '@/components/buscadores/b_categoria_cuenta/b_categoria_cuenta.vue';
import BCategoriaLineaComponent from '@/components/buscadores/b_categoria_linea/b_categoria_linea.vue';
import BCentroCostoComponent from '@/components/buscadores/b_centro_costo/b_centro_costo.vue';
import { ImpuestoModel } from '@/modelo/maestro/impuesto';
import { Loading } from 'element-ui';
import Global from '@/Global';
@Component({
    name: 'crear-po',
    components:{
        'buttons-accions':ButtonsAccionsComponent,
        'bmoneda':BMonedaComponent,
        'quickaccessmenu':QuickAccessMenuComponent,
        'bimpuesto':BImpuestoComponent,
        'bprioridad':BPrioridadComponent,
        'bunidadmedida':BUnidadMedidaComponent,
        'bcategoriacuenta':BCategoriaCuentaComponent,
        'bcategorialinea':BCategoriaLineaComponent,
        'bcentrocosto':BCentroCostoComponent,
    }
})
export default class ViewAndEditPOComponent extends Vue {
    nameComponent:string='viewandedit-po';
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
    fecha_ejecucion:string;
    vifprogress:boolean=true;
    issave:boolean=false;
    iserror:boolean=false;
    codigoInput:any;
    checked:boolean=false;
    nochancePro:boolean=true;
    textosave='';
    valuem:number=0;
    totalItems:number;
    totalPrice:number;
    dialogPrioridad:boolean=false;
    btnactivarprioridad:boolean=false;
    public selectrow:OrdenCompraDetalleModel=new OrdenCompraDetalleModel();
    cell_ocultar:string='transparent';

    disabledRow:boolean=false;
    blncategorialinea:boolean=true;
    blncategoriacuenta:boolean=true;
    blncentrocosto:boolean=true;
    
    bln_tbl_categoria_cuenta:boolean=false;
    bln_tbl_categoria_linea:boolean=false;
    bln_tbl_centro_costo:boolean=false;

    dialogCategoriaCuenta:boolean=false;
    dialogCategoriaLinea:boolean=false;
    dialogCentroCostos:boolean=false;
    selectcolumn:any;
  /*bolean_tabla_dinamica*/
    editing:any= {
        row:'',
        column:''
    };
    rowSelect:number;
    nameFuncion:string;
    impDisabled:boolean=false;
    //#region [BOTONES]
    bln_tbl_cantidad:boolean=false;
    bln_tbl_UnidadMedida:boolean=false;
    bln_tbl_Precio:boolean=false;
    bln_tbl_prioridad:boolean=false;
    bln_tbl_factor:boolean=false;
    bln_tbl_check:boolean=true;
    //#endregion

    //#region [ALMACEN]
    public almacen:AlmacenModel=new AlmacenModel();
    //#endregion
    //**[IMPUESTO] */
    public Impuesto: ImpuestoModel = new ImpuestoModel();
    dialogImpuesto: boolean = false;
    btnactivarImpuesto: boolean = false;

    //**[MONEDA] */
    dialogMoneda: boolean = false;
    btnactivarMoneda: boolean = false;
    dataMoneda: any[];
    public moneda: MonedaModel = new MonedaModel();
    //**[REQUISICION] */
    requisicionDetalle: any[];
    public requiSelect: RequisicionModel = new RequisicionModel();
    requiTemp:any[];
    arrayTemp:any[];
    detalleOrdenCompra:OrdenCompraDetalleModel[];
    multipleSelection: any[];

    //**[PROVEEDORES] */
    dialogProveedor: boolean = false;
    btnactivarpro: boolean = false;
    valueProvee: Array<ProveedorModel>[];
    public selectProo: ProveedorModel = new ProveedorModel();
    gridProveedor:ProveedorModel[];
    provData:ProveedorModel[];
    provData1:ProveedorModel[];
    tempGrid:ProveedorModel[];

    //**[ORDEN COMPRA] */
    public OrdenCompra: OrdenCompraModel = new OrdenCompraModel();
    ordencompraDetalle: any[];
    //* [COMPANIA]
    codigoCompania:any;
    descripcionCompania:any;
    //**[PRODUCTO] */
    valorSelectCodStock:any[];
    //**[unidad medidad] */
    dialogUnidadMedida:boolean=false;
    btnactivarunidadmedida:boolean=false;
    txtmodulo:string='';
    vifaprobarrechasar:boolean=false;
    visualizar:boolean=false;
    intIdPurReqH_ID:number=0;
    intIdVendor_ID:number=0;
    intIdTypeReq_ID:number=0;
    intIdCompany_ID:number=0;
    intIdWHS_ID:number=0;

    activeValues:boolean=false;

    //activar colores
  isactivered:boolean=false;
  isactiveyellow:boolean=false;
  isactivegreen:boolean=false;

  totalRecibida:number;
  totalFaltante:number;
    constructor(){
        super();
        Global.nameComponent = 'viewandedit-po';
        this.OrdenCompra.chrPO_Status = 'A';
        this.OrdenCompra.strRequis_Item_NO="0";
        this.fecha_ejecucion = Global.getParseDate(new Date().toDateString());
        setTimeout(() => {
            this.load();
          }, 200)
    }
    //#region [REQUISICION]
    load(){
        this.OrdenCompra= JSON.parse(this.$route.query.data);
        var vista=this.$route.query.vista;
        if(vista=='Modificar'){
            this.nameFuncion='Modificar PO';
            this.impDisabled=false;
            if(this.requiSelect.strTypeReq_Cod=='A'){
                this.disabledRow=true;
            }
            else{
                this.disabledRow=false;
            }
        }
        if(vista=='Visualizar'){
            this.nameFuncion='Visualizar PO';
            this.impDisabled=true;
            this.disabledRow=true;
            this.activeValues=true;
            this.checked=false;
        }
        if(vista=='aprobar'){
            var object = JSON.parse(this.$route.query.data); 
            this.visualizar=false;
            this.vifaprobarrechasar=true;
            this.impDisabled=true;
            this.disabledRow=true;
            this.nameFuncion='Aprobar Orden Compra';
            this.intIdVendor_ID=object.intIdVendor_ID;
            this.intIdTypeReq_ID=object.intIdTypeReq_ID;
            this.intIdPurReqH_ID=object.intIdPurReqH_ID;
            this.intIdWHS_ID=object.intIdWHS_ID;
        }
        if(this.OrdenCompra.chrPO_Status=='00'){
          this.isactivered=true;
          this.isactiveyellow=false;
          this.isactivegreen=false;
        }
        if(this.OrdenCompra.chrPO_Status=='30'){
          this.isactivered=false;
          this.isactiveyellow=true;
          this.isactivegreen=false;
        }
        if(this.OrdenCompra.chrPO_Status=='50'){
          this.isactivered=false;
          this.isactiveyellow=false;
          this.isactivegreen=true;
        }
        this.codigoCompania=localStorage.getItem('compania_cod');
        this.descripcionCompania=localStorage.getItem('compania_name');            
        this.codigoInput='';
        
        this.getOrdenCDetalle(this.OrdenCompra.intIdPOH_ID);
        proveedorService.GetProveedoresCompany(this.codigoCompania)
        .then(resp=>{
            this.gridProveedor=[];
            this.gridProveedor=resp;  
            this.tempGrid=this.gridProveedor;                     
        })
    }
    getOrdenCDetalle(val){
        ordenCompraService.GetAllOrdenDetalle(val)
        .then(resp=>{
            this.detalleOrdenCompra=[];
            this.detalleOrdenCompra=resp;    
            this.totalRecibida=0;
            this.totalFaltante=0;
            for (let index = 0; index < this.detalleOrdenCompra.length; index++) {
              this.detalleOrdenCompra[index].blnSelection=true;
              this.totalRecibida=Number(this.totalRecibida)+Number(this.detalleOrdenCompra[index].fltRec_QYT);
              this.totalFaltante=Number(this.totalFaltante)+Number(this.detalleOrdenCompra[index].fltRec_Pend_QTY);
            }        
        })
    }
    
    tableRowClassName(val,row) {
        if (val.chrStatus === "B") {    
          return 'warning-row';
        } 
    }
    checkSelectdbRequisicion(val){
        var comId:any=localStorage.getItem('compania_ID');
        this.OrdenCompra.intIdCompany_ID=parseInt(comId); 
        this.OrdenCompra.strCompany_Desc=val.strCompany_Desc;
        this.OrdenCompra.intIdTypeReq_ID=val.intIdTypeReq_ID.intIdTypeReq_ID;
        this.OrdenCompra.intIdWHS_ID=val.intIdWHS_ID.intIdWHS_ID;  
        this.OrdenCompra.strPO_Desc=val.strDesc_Header;
        this.OrdenCompra.strTypeMov_Cod=val.strTypeMov_Cod;    
        this.OrdenCompra.strTypeMov_Desc=val.strTypeMov_Desc;  
        this.requiSelect=val;          
    }
      handleCurrentChange(val){
          debugger;
          this.rowSelect=val.intIdPOD_ID;         
      }
    //#endregion
    //#region [ALMACEN]
      loadAlmacen(code){
        almacenService.getAlmacenCodigo(code)
        .then(response=>{
            this.almacen=response;          
        })
      }
    //#endregion
    //#region [PROVEEDORES]
    handleCheckAllChange(val){
        // if(this.checked==false){
        //     this.tempGrid=[];
        //     this.tempGrid.push(this.selectProo);
        // }
        // if(this.checked==true){
        //     this.tempGrid=[];
        //     this.tempGrid=this.gridProveedor;
        // }        
    }
    desactivar_pro() {
        if (this.dialogProveedor) {
            this.btnactivarpro = false;
        }
    }
    activar_pro() {
        setTimeout(() => {
            this.btnactivarpro = true;
            this.btnactivarMoneda = false;
            this.btnactivarImpuesto = false;
        }, 120)
    }
    loadPro() {
        this.dialogProveedor = true;
        // if(this.checked==false){
        //     this.provData1=this.provData;
        //     this.provData=[];
        //     var temp=0;
        //     if(this.provData1.length>0){
        //         for(var i=0;i<this.provData1.length;i++){
        //             if(this.provData.length>0){
        //                 for(var j=0;j<this.provData.length;j++){
        //                     if(this.provData[j].strVendor_NO===this.provData1[i].strVendor_NO){
        //                         temp=1;                     
        //                     }
        //                 }
        //                 if(temp==0){
                            
        //                     this.provData.push(this.provData1[i]);
        //                 }
        //             }
        //             else{
        //                 this.provData.push(this.provData1[i]);
        //             }
        //         }          
        //     }
        //     this.tempGrid=[];
        //     this.tempGrid=this.provData;
        // }
        // if(this.checked==true){
        //     this.tempGrid=[];
        //     this.tempGrid=this.gridProveedor;
        // }
        
        
    }
    searchProo() {
        proveedorService.GetOnlyOneProveedor(this.valueProvee)
            .then(response => {
                this.provData = response;
                this.tempGrid=[];
                this.tempGrid=this.provData;
            })
    }
    checkDoblePro() {     
        this.OrdenCompra.strVendor_NO = this.selectProo.strVendor_NO;
        this.OrdenCompra.intIdVendor_ID = this.selectProo.intIdVendor_ID;
        this.OrdenCompra.strVendor_Desc=this.selectProo.strVendor_Desc;
        this.dialogProveedor = false;         
    }
    closeDialogPro() {
        this.dialogProveedor = false;
    }
    closeDialogProX() {
        this.dialogProveedor = false;
        this.selectProo = new ProveedorModel();
    }
    checkSelectdbProveedor(val:ProveedorModel){
        this.selectProo=val;                
    }
    //#endregion
    //#region [IMPUESTO]
  loadImpuesto(){
    this.dialogImpuesto=true;
  }
  
  closeDialogImpuesto(){
    this.btnactivarImpuesto=false;
    this.dialogImpuesto=false;
  }
  activar_Impuesto(){
    setTimeout(() => {
      this.btnactivarMoneda=false;
      this.btnactivarImpuesto=true;
      this.btnactivarpro = false;
    }, 120)
  }
  desactivar_Impuesto(){
    if(this.dialogImpuesto){
      this.btnactivarImpuesto=false;
    }
  }  
  ImpuestoSeleccionado(val:ImpuestoModel){
    this.Impuesto=val
    this.OrdenCompra.strWH_Cod=this.Impuesto.strWH_Cod;
    this.OrdenCompra.strWH_Desc=this.Impuesto.strWH_Desc;
    this.dialogImpuesto=false;
  }
  closeImpuesto(){
    this.Impuesto=new ImpuestoModel();
    this.dialogImpuesto=false;
  }
  //#endregion
    //#region [ORDEN COMPRA]
    guardarPO(val) {
        debugger;
        if(this.$route.query.vista=='Modificar'){
          var use:any=localStorage.getItem('User_Usuario');;
          this.OrdenCompra.strModified_User=use;
          this.OrdenCompra.listaDetalle=this.detalleOrdenCompra;
          this.OrdenCompra.intChange_Count=Number(this.OrdenCompra.intChange_Count)+1;
            // else {
            //     this.OrdenCompra.listaDetalle = [];                
                
                let loadingInstance = Loading.service({
                    fullscreen: true,
                    text: 'Guardando...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.8)'
                }
                );

            //     if (val == 'crear-po') {
                    ordenCompraService.UpdateOrdenCompra(this.OrdenCompra)
                        .then(response => {
                            loadingInstance.close();
                            this.issave = true;
                            this.iserror = false;
                            // this.OrdenCompra = new OrdenCompraModel();
                            // this.requiSelect = new RequisicionModel();
                            // this.Impuesto = new ImpuestoModel();
                            // this.almacen=new AlmacenModel();
                            // this.moneda=new MonedaModel();
                            // this.selectProo=new ProveedorModel();
                            this.openMessageSuccess('Se actualizo correctamente '+response);
                            this.textosave = 'Se actualizo correctamente. '+response;
    
                        }).catch(error => {
                            loadingInstance.close();
                            this.issave = false;
                            this.iserror = true;
                            this.textosave = 'Error al actualizo.';
                            this.openMessageError('Error al actualizo.');
                    })
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
    //#endregion
    //#region [MONEDA]
    loadMoneda(){
        this.dialogMoneda=true;
      }
    MonedaSeleccionado(val:MonedaModel){
        this.moneda=val
        this.dialogMoneda=false;
        this.OrdenCompra.strPO_Curr=this.moneda.strCurrency_Cod;
        this.OrdenCompra.strCurrency_Cod=this.moneda.strCurrency_Cod;
        this.OrdenCompra.strCurrency_Desc=this.moneda.strCurrency_Desc;
        this.OrdenCompra.intIdAcctCont_ID=this.moneda.intIdAcctCont_ID;
        this.OrdenCompra.strAcc_Local_NO=this.moneda.strAcc_Local_NO;
        this.OrdenCompra.strAcc_Corp_NO=this.moneda.strAcc_Corp_NO;
      }
      closeMoneda(){
        this.moneda=new MonedaModel();
        this.dialogMoneda=false;
      }
      closeDialogMoneda(){
        this.btnactivarMoneda=false;
        this.dialogMoneda=false;
      }
      desactivar_Moneda(){
        if(this.dialogMoneda){
          this.btnactivarMoneda=false;
        }
    }
    activar_Moneda() {
        setTimeout(() => {
            this.btnactivarpro = false;
            this.btnactivarMoneda = true;
            this.btnactivarImpuesto = false;
        }, 120)
    }
    //#endregion
    //#region [ACCIONES DE TABLA]
    handleBlurImporte(event) {
        debugger;
        var inttotal=0;   
        this.totalItems=0;
        for(var i=0;i< this.multipleSelection.length;i++){
            if(this.multipleSelection[i].blnCheck==true){
                
                inttotal+=Number((this.multipleSelection[i].fltUnitPrice)*(this.multipleSelection[i].fltQuantity)*(this.multipleSelection[i].intConv_Factor));
                this.totalItems+=Number(this.multipleSelection[i].fltQuantity);
            }               
        }
        this.totalPrice=inttotal;
      }
    //#endregion
    //#region [ACCIONES TABLA]
    clickcantidad(event,edit,column){
        this.bln_tbl_Precio=false;
        this.bln_tbl_cantidad=true;
        this.bln_tbl_UnidadMedida=false;
        event.edit=!edit;
        this.editing.row=event;
        this.editing.column=column;
      }
    async aprobar(){
        var user:any=localStorage.getItem('User_Usuario');
        this.valuem=0;
        this.OrdenCompra.strAuthsd_By=user;
        this.OrdenCompra.intIdPurReqH_ID=this.requiSelect.intIdPurReqH_ID;
        this.OrdenCompra.intIdVendor_ID=this.selectProo.intIdVendor_ID;
        this.OrdenCompra.intIdTypeReq_ID=this.requiSelect.intIdTypeReq_ID;
        this.OrdenCompra.intIdWHS_ID=this.requiSelect.intIdWHS_ID;        
        await setTimeout(() => {
            for(var i=0;i<100;i++){
            this.valuem++; 
            }
        }, 200)
        await ordenCompraService.aprobarPO(this.OrdenCompra)
        .then(res=>{
            this.OrdenCompra.listaDetalle=this.ordencompraDetalle;
            if(this.OrdenCompra.listaDetalle.length>0){
                ordenCompraService.inventarioPO(this.OrdenCompra)
                .then(res=>{
                    setTimeout(() => {
                        this.vifprogress=false;
                        this.issave=true;
                        this.textosave='Se aprobó correctamente. '+res.strPO_NO;
                        this.openMessage('Se aprobó correctamente '+res.strPO_NO);
                        // router.push({ path: `/barmenu/LO-LOGISTICA/orden_compra/po_aprobacion`});
                    }, 600)
                })
                .catch(error=>{
                    this.textosave='Ocurrio un error inesperado. ';
                })
            }
            else{
                this.textosave='Se aprobó correctamente. '+res.strPO_NO;
                this.openMessage('Se aprobó correctamente '+res.strPO_NO);
                // router.push({ path: `/barmenu/LO-LOGISTICA/orden_compra/po_aprobacion`});
            }
           
        })
        .catch(error=>{
            this.textosave='Ocurrio un error inesperado. ';
        })
    }
      
    openMessage(newMsg : string) {
        this.$message({
        showClose: true,
        message: newMsg,
        type: 'success'
        });
    }
    clickUnidadMedida(event,edit,column){
        this.bln_tbl_Precio=false;
        this.bln_tbl_cantidad=false;
        this.bln_tbl_UnidadMedida=true;
        event.edit=!edit;
        this.editing.row=event;
        this.editing.column=column;
    }
    clickPrice(event,edit,column){
        this.bln_tbl_Precio=true;
        this.bln_tbl_cantidad=false;
        this.bln_tbl_UnidadMedida=false;
        event.edit=!edit;
        this.editing.row=event;
        this.editing.column=column;
      }
      clickprioridad(event,edit,column){
        this.bln_tbl_prioridad=true;
        event.edit=!edit;
        this.editing.row=event;
        this.editing.column=column;
      }
      clickFactor(event,edit,column){
        this.bln_tbl_factor=true;
        event.edit=!edit;
        this.editing.row=event;
        this.editing.column=column;
      }
      clickCheck(event,edit,column){
          debugger;
        event.edit=!edit;
        this.editing.row=event;
        this.editing.column=column;
        this.totalPrice=0;
        this.totalItems=0;
        for(var i=0;i< this.multipleSelection.length;i++){
            if(this.multipleSelection[i].blnCheck==true){                
                this.totalPrice+=Number((this.multipleSelection[i].fltUnitPrice)*(this.multipleSelection[i].fltQuantity)*(this.multipleSelection[i].intConv_Factor));
                this.totalItems+=Number(this.multipleSelection[i].fltQuantity);
            }               
        }        
      }
      handleBlur(event) {
        // this.bln_tbl_categoria_cuenta=false;
        event.edit=false;
        this.editing.row='';
        this.editing.column='';
      }
      LoadPrioridad(row){
        this.selectrow=row;
        this.dialogPrioridad=true;      
      }
      closePrioridad(){
        this.btnactivarprioridad=false;
        return false;
      }
      SeleccionadoPrioridad(val){
        this.selectrow.strPriority_Cod=val.strPriority_Cod;
        this.dialogPrioridad=false;
      }
      handleChangeCantidad(val){
        this.OrdenCompra.fltCURR_QTY_I=0;
        this.OrdenCompra.fltTotal_Val=0;
        this.totalPrice=0;
          for (let i = 0; i < this.detalleOrdenCompra.length; i++) {
            if(this.detalleOrdenCompra[i].intIdPOD_ID == this.rowSelect){
              // alert(this.detalleOrdenCompra[i].fltPO_QTY_I)
                this.detalleOrdenCompra[i].fltPO_QTY_I=val;
                this.detalleOrdenCompra[i].fltCurr_Net_PR_P=val*this.detalleOrdenCompra[i].fltPO_Net_PR_I*this.detalleOrdenCompra[i].intConv_Factor;
                this.detalleOrdenCompra[i].fltCurr_Net_PR_P=Math.round(this.detalleOrdenCompra[i].fltCurr_Net_PR_P * 100)/100;
                this.requiTemp=this.detalleOrdenCompra; 
                this.detalleOrdenCompra=[];              
                this.detalleOrdenCompra=this.requiTemp;  
                this.requiTemp=[];
            }
            this.OrdenCompra.fltCURR_QTY_I+=Number(this.detalleOrdenCompra[i].fltPO_QTY_I);
            this.OrdenCompra.fltTotal_Val+=Number(this.detalleOrdenCompra[i].fltCurr_Net_PR_P);
          }
          this.OrdenCompra.fltTotal_Val= Math.round(this.OrdenCompra.fltTotal_Val * 100)/100;         
      }
      handleChangeValUni(val){
        this.OrdenCompra.fltTotal_Val=0;
        this.totalPrice=0;
        for (let i = 0; i < this.detalleOrdenCompra.length; i++) {
            if(this.detalleOrdenCompra[i].intIdPOD_ID == this.rowSelect){
                this.detalleOrdenCompra[i].fltCurr_Net_PR_P=val*this.detalleOrdenCompra[i].fltPO_QTY_I*this.detalleOrdenCompra[i].intConv_Factor;
                this.detalleOrdenCompra[i].fltCurr_Net_PR_P=Math.round(this.detalleOrdenCompra[i].fltCurr_Net_PR_P * 100)/100;
                this.requiTemp=this.detalleOrdenCompra; 
                this.detalleOrdenCompra=[];              
                this.detalleOrdenCompra=this.requiTemp;  
                this.requiTemp=[];
            }
            this.totalPrice=this.totalPrice+Math.round(this.detalleOrdenCompra[i].fltCurr_Net_PR_P * 100)/100;
          }
        this.OrdenCompra.fltTotal_Val=this.totalPrice;  
      }
      handleChangeFactor(val){
        for (let i = 0; i < this.detalleOrdenCompra.length; i++) {
            if(this.detalleOrdenCompra[i].intIdPOD_ID == this.rowSelect){
                this.detalleOrdenCompra[i].fltCurr_Net_PR_P=val*this.detalleOrdenCompra[i].fltPO_QTY_I*this.detalleOrdenCompra[i].fltPO_QTY_I;
                this.requiTemp=this.detalleOrdenCompra; 
                this.detalleOrdenCompra=[];              
                this.detalleOrdenCompra=this.requiTemp;  
                this.requiTemp=[];
            }
          }  
      }
    //#endregion

    //#region [Categoria cuenta]
    LoadCategoriaCuenta(row,column){
        this.selectrow=row;
        this.selectcolumn=column;
        this.dialogCategoriaCuenta=true;
      }
      alerta(event,edit,column){
        debugger;
        this.bln_tbl_categoria_cuenta=true;
        event.edit=!edit;
        this.editing.row=event;
        this.editing.column=column;
      }
      SeleccionadoCategoriaCuenta(val){
        this.selectrow.strAcctCateg_Cod=val.strAcctCateg_Cod;
        this.selectrow.intIdAcctCateg_ID=val.intIdAcctCateg_ID;        
        this.dialogCategoriaCuenta=false;       
      }
      closeCategoriaCuenta(){
        this.dialogCategoriaCuenta=false;   
      }
    //#endregion
    //#region [CATEGORIA LINEA]
    LoadCategoriaLinea(row,column){
        this.selectrow=row;
        this.selectcolumn=column;
        this.dialogCategoriaLinea=true;
      }
      clickcategorialinea(event,edit,column){
        debugger;
        this.bln_tbl_categoria_linea=true;
        event.edit=!edit;
        this.editing.row=event;
        this.editing.column=column;
      }
      SeleccionadoCategoriaLinea(val){
        debugger;
        this.selectrow.strCategItem_Cod=val.strCategItem_Cod;
        this.selectrow.intIdCategLine_ID=val.intIdCategLine_ID;
        this.dialogCategoriaLinea=false;
      }
      closeCategoriaLinea(){
        this.dialogCategoriaLinea=false;
      }
    //#endregion
    //#region [Cuenta Contable]
    LoadCentroCosto(row){
        this.selectrow=row;
        this.dialogCentroCostos=true;
      }
      clickcentrocosto(event,edit,column){
        debugger;
        this.bln_tbl_centro_costo=true;
        event.edit=!edit;
        this.editing.row=event;
        this.editing.column=column;
      }
      SeleccionadoCentroCosto(val){
        debugger;
        this.selectrow.strCostCenter_NO=val.strCostCenter_NO;
        this.selectrow.strCostCenter_Desc=val.strCostCenter_Desc;
        this.selectrow.intIdCostCenter_ID=val.intIdCostCenter_ID;
        this.dialogCentroCostos=false;        
      }
      closeCentroCostos(){
        this.dialogCentroCostos=false;     
      }
    //#endregion
    //#region [Unidad Medida]
    LoadUnidadMedida(row){
        this.selectrow=row;
        this.dialogUnidadMedida=true;
      }
      closeUnidadMedida(){
        this.btnactivarunidadmedida=false;
        return false;
      }
      SeleccionadoUnidadMedida(val){
        debugger;
        this.selectrow.strUnit_Of_Purch=val.strUM_Cod; 
        this.dialogUnidadMedida=false;
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
            nameComponent:'crear-po',
            codigoInput:'',
            codigoCompania:'',
            nameFuncion:'',
            tableData:[],
            requisicionDetalle:[],
            requisicionData:[],
            provData:[],
            valueProvee:'',
            requiDetalle:[],
            requiDetalle1:[],
            detalleOrdenCompra:[],
            multipleSelection:[],
            ordencompraDetalle:[],
            totalItems:0,
            totalPrice:0,
            valorSelectCodStock:[],
            checked: true,
            nochancePro:true,
            bln_tbl_check:true,
            descripcionCompania:'',
            gridProveedor:[],
            tempGrid:[],
            activeValues:false,
            totalRecibida:0,
            totalFaltante:0

        }
    }
}