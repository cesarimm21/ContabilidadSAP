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
    checked:boolean=true;
    nochancePro:boolean=true;
    textosave='';
    valuem:number=0;
    totalItems:number;
    totalPrice:number;
    dialogPrioridad:boolean=false;
    btnactivarprioridad:boolean=false;
    public selectrow:RequisicionDetalleModel=new RequisicionDetalleModel();
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
        console.log(this.OrdenCompra);        
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
            this.checked=false;
        }
        this.codigoCompania=localStorage.getItem('compania_cod');
        this.descripcionCompania=localStorage.getItem('compania_name');            
        this.codigoInput='';
        
        this.getOrdenCDetalle(this.OrdenCompra.intIdPOH_ID);
        // requisicionService.GetRequisicionCompany(this.codigoCompania)
        // .then(response=>{
        //     this.requisicionData=[];
        //     this.requisicionData=response;
        // })
        proveedorService.GetProveedoresCompany(this.codigoCompania)
        .then(resp=>{
            this.gridProveedor=[];
            this.gridProveedor=resp;            
        })
    }
    getOrdenCDetalle(val){
        ordenCompraService.GetAllOrdenDetalle(val)
        .then(resp=>{
            this.detalleOrdenCompra=[];
            this.detalleOrdenCompra=resp;
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
        if(this.checked==false){
            this.tempGrid=[];
            this.tempGrid.push(this.selectProo);
        }
        if(this.checked==true){
            this.tempGrid=[];
            this.tempGrid=this.gridProveedor;
        }        
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
        if(this.checked==false){
            this.provData1=this.provData;
            this.provData=[];
            var temp=0;
            if(this.provData1.length>0){
                for(var i=0;i<this.provData1.length;i++){
                    if(this.provData.length>0){
                        for(var j=0;j<this.provData.length;j++){
                            if(this.provData[j].strVendor_NO===this.provData1[i].strVendor_NO){
                                temp=1;                     
                            }
                        }
                        if(temp==0){
                            
                            this.provData.push(this.provData1[i]);
                        }
                    }
                    else{
                        this.provData.push(this.provData1[i]);
                    }
                }          
            }
            this.tempGrid=[];
            this.tempGrid=this.provData;
        }
        if(this.checked==true){
            this.tempGrid=[];
            this.tempGrid=this.gridProveedor;
        }
        
        
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
        if(this.$route.query.vista=='Modificar'){
            if (this.multipleSelection.length == 0) {
                this.$message({
                    showClose: true,
                    type: 'warning',
                    message: 'Debe seleccionar al menos 1 detalle'
                });
            }
            else {
                this.OrdenCompra.listaDetalle = [];
                for (var i = 0; i < this.multipleSelection.length; i++) {
                    var item:OrdenCompraDetalleModel=new OrdenCompraDetalleModel();
                    var IdAcctCateg_ID=this.multipleSelection[i].intIdAcctCateg_ID;
                    item.intIdAcctCateg_ID= parseInt(IdAcctCateg_ID.intIdAcctCateg_ID)
                    item.intIdCategLine_ID=this.multipleSelection[i].intIdCategLine_ID
                    item.intIdCurrency_ID=this.moneda.intIdCurrency_ID
                    item.intIdCostCenter_ID=this.multipleSelection[i].intIdCostCenter_ID
                    item.intPO_Item_NO=i+1;
                    item.strAcctCateg_Cod=this.valorSelectCodStock[i].intIdAcctCateg_ID.strAcctCateg_Cod
                    if(this.valorSelectCodStock[i].intIdCategLine_ID!=null){
                        item.strCategItem_Cod=this.valorSelectCodStock[i].strCateg_Line;    
                    }
                    else {
                        item.strCategItem_Cod='';
                    }
                    if(this.valorSelectCodStock[i].intIdCostCenter_ID){
                        item.intIdCostCenter_ID=this.valorSelectCodStock[i].intIdCostCenter_ID,   
                        item.strCostCenter_NO=this.valorSelectCodStock[i].strCostCenter_NO,
                        item.strCostCenter_Desc=this.valorSelectCodStock[i].strCostCenter_Desc
                    }
                    else{
                        item.strCostCenter_NO='';
                        item.strCostCenter_Desc='';
                    }              
                    item.strStock_Cod=this.valorSelectCodStock[i].intIdInvStock_ID.strStock_Cod
                    item.strUM_Cod=this.valorSelectCodStock[i].intIdInvStock_ID.strUM_Cod
                    item.strVendor_NO=this.OrdenCompra.strVendor_NO
                    item.strVendor_Desc=this.OrdenCompra.strVendor_Desc
                    item.strCurrency_Cod=this.OrdenCompra.strPO_Curr
                    item.strPriority_Cod=this.multipleSelection[i].strPriority_Cod
                    item.strPO_Item_Desc=this.multipleSelection[i].strDescription
                    item.chrPO_Item_Status=this.multipleSelection[i].chrStatus
                    item.strPO_Curr=this.multipleSelection[i].strCurr
                    item.strRequis_NO=this.OrdenCompra.strRequis_NO
                    item.intRequis_Item_NO=this.requiSelect.intIdPurReqH_ID//requis
                    item.intChange_Count=0//0 cantidad de veces que cambia
                    item.chrReceipt_Status='00'//los codigos de aprobacion
                    item.strMaterial_Group=this.multipleSelection[i].strMat_Group_Cod//si hay
                    item.strPreq_Stock_Cod=this.multipleSelection[i].strMaterial_Cod
                    item.intIdInvStock_ID=this.valorSelectCodStock[i].intIdInvStock_ID.intIdInvStock_ID//id  de stock
                    item.dtmOrig_Due_Date=new Date()
                    item.strUnit_Of_Purch=this.multipleSelection[i].strUM//unidad de medida
                    item.fltPO_QTY_I=this.multipleSelection[i].fltQuantity//cantidad
                    item.fltPO_Net_PR_I=this.multipleSelection[i].fltUnitPrice//precio unitario
                    item.fltCurr_Net_PR_P=this.multipleSelection[i].fltValue_Total//total por producto
                    item.intConv_Factor=this.multipleSelection[i].intConv_Factor//factor multiplica a la cantidad de productos/Editable
                    item.strTax_Cod=this.Impuesto.strWH_Cod
                    item.strWH_Tax_Detraccion=this.Impuesto.strWH_Cod
                    item.fltWH_Retention=this.Impuesto.fltPorcent
                    item.fltTax_Percent=this.Impuesto.fltPorcent
                    item.intIdWHS_ID=this.OrdenCompra.intIdWHS_ID//almacen id correlativo
                    item.intInv_QTY_UOP=0//Inv_QTY //viene de la factura
                    item.intInvoice_NO=0
                    item.fltInv_Pend_QTY_P=0//cantidad pendiente
                    item.fltInv_Pend_Val_F=0//
                    item.fltInv_Pend_Val_L=0
                    item.fltInv_Pend_Val_S=0
                    item.strDeliv_Location=this.OrdenCompra.strPO_Desc//texto de la requisicion puede ser editado
                    item.fltTot_PO_Item=this.multipleSelection[i].fltQuantity
                    item.strAccount_Cod=this.multipleSelection[i].strAccount_NO
                    item.strWBS_Project=''//vacio
                    item.blnCheck=this.multipleSelection[i].blnCheck//vacio
                    item.strMatClass_Cod=this.multipleSelection[i].strMatClass_Cod
                    item.strMatClass_Desc=this.multipleSelection[i].strMatClass_Desc
                    item.strCreation_User='egaona'
                    this.OrdenCompra.listaDetalle.push(item);   
                    requisicionService.getUpdateRequisicionStatus(this.multipleSelection[i].intIdPurReqD_ID)
                    .then(response=>{}).catch(error=>{})
    
                }            
                this.OrdenCompra.strAuthsd_By='egaona';
                this.OrdenCompra.intChange_Count=0;
                this.OrdenCompra.dtmProcess_Date=new Date();            
                this.OrdenCompra.strPO_Item_Type='C';
                this.OrdenCompra.strAuthsd_Status='00';
                this.OrdenCompra.fltCURR_QTY_I=this.totalItems;
                this.OrdenCompra.fltTotal_Val=this.totalPrice;
                this.OrdenCompra.strUser_ID='egaona';
                this.OrdenCompra.strCreation_User='egaona';
                this.OrdenCompra.fltTot_Rec_QYT=0;
                this.OrdenCompra.fltTot_Rec_Pend_QTY=0;
                this.OrdenCompra.fltTot_Rec_Value=0;
                this.OrdenCompra.fltTot_Inv_QTY=0;
                this.OrdenCompra.fltTot_Inv_Value=0;
                
                let loadingInstance = Loading.service({
                    fullscreen: true,
                    text: 'Guargando...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.8)'
                }
                );
                if (val == 'crear-po') {
                    ordenCompraService.CreateOrdenCompra(this.OrdenCompra)
                        .then(response => {
                            loadingInstance.close();
                            this.issave = true;
                            this.iserror = false;
                            this.OrdenCompra = new OrdenCompraModel();
                            this.requiSelect = new RequisicionModel();
                            this.Impuesto = new ImpuestoModel();
                            this.almacen=new AlmacenModel();
                            this.moneda=new MonedaModel();
                            this.selectProo=new ProveedorModel();
                            this.openMessageSuccess('Se guardo correctamente '+response);
                            this.textosave = 'Se guardo correctamente. '+response;
    
                        }).catch(error => {
                            loadingInstance.close();
                            this.issave = false;
                            this.iserror = true;
                            this.textosave = 'Error al guardar.';
                            this.openMessageError('Error al guardar.');
                    })
                }
            }
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
        this.valuem=0;
        this.OrdenCompra.strAuthsd_By='ADMINISTRADOR';
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
                        router.push({ path: `/barmenu/LO-LOGISTICA/orden_compra/po_aprobacion`});
                    }, 600)
                })
                .catch(error=>{
                    this.textosave='Ocurrio un error inesperado. ';
                })
            }
            else{
                this.textosave='Se aprobó correctamente. '+res.strPO_NO;
                this.openMessage('Se aprobó correctamente '+res.strPO_NO);
                router.push({ path: `/barmenu/LO-LOGISTICA/orden_compra/po_aprobacion`});
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
        this.selectrow.intIdPriority_ID=val.intIdPriority_ID;
        this.dialogPrioridad=false;
      }
      handleChangeCantidad(val){
          for (let i = 0; i < this.detalleOrdenCompra.length; i++) {
            if(this.detalleOrdenCompra[i].intIdPOD_ID == this.rowSelect){
                this.detalleOrdenCompra[i].fltPO_QTY_I=val*this.detalleOrdenCompra[i].fltPO_Net_PR_I*this.detalleOrdenCompra[i].intConv_Factor;
                this.requiTemp=this.detalleOrdenCompra; 
                this.detalleOrdenCompra=[];              
                this.detalleOrdenCompra=this.requiTemp;  
                this.requiTemp=[];
            }
          }          
      }
      handleChangeValUni(val){
        for (let i = 0; i < this.detalleOrdenCompra.length; i++) {
            if(this.detalleOrdenCompra[i].intIdPOD_ID == this.rowSelect){
                this.detalleOrdenCompra[i].fltCurr_Net_PR_P=val*this.detalleOrdenCompra[i].fltPO_QTY_I*this.detalleOrdenCompra[i].intConv_Factor;
                this.requiTemp=this.detalleOrdenCompra; 
                this.detalleOrdenCompra=[];              
                this.detalleOrdenCompra=this.requiTemp;  
                this.requiTemp=[];
            }
          }  
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
        this.selectrow.strCateg_Account=val.strAcctCateg_Cod;
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
        this.selectrow.strCateg_Line=val.strCategItem_Cod;
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
        this.selectrow.strCostCenter=val.strCostCenter_NO;
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
        this.selectrow.strUM=val.strUM_Cod; 
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
            checked: false,
            nochancePro:true,
            bln_tbl_check:true,
            descripcionCompania:'',
            gridProveedor:[],
            tempGrid:[]

        }
    }
}