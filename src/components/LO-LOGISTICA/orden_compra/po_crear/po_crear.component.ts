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
import {CompaniaModel} from '@/modelo/maestro/compania';
import companiaService from '@/components/service/compania.service';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
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
    }
})
export default class CrearPOComponent extends Vue {
    nameComponent:string='crear-po';
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
    btnactivarrequisicion:boolean=false;
    dialogRequisicion:boolean=false;
    fecha_ejecucion:string;
    vifprogress:boolean=true;
    issave:boolean=false;
    iserror:boolean=false;
    codigoInput:any;
    textosave='';
    valuem:number=0;
    totalItems:number;
    totalPrice:number;
    dialogPrioridad:boolean=false;
    btnactivarprioridad:boolean=false;
    public selectrow:RequisicionDetalleModel=new RequisicionDetalleModel();
  /*bolean_tabla_dinamica*/
    editing:any= {
        row:'',
        column:''
    };
    rowSelect:number;
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
    requisicionData: Array<RequisicionModel>[];
    requisicionDetalle: any[];
    public requiSelect: RequisicionModel = new RequisicionModel();
    public requiDetalle: RequisicionDetalleModel[];
    requiDetalle1:any[];
    requiTemp:any[];
    arrayTemp:any[];
    public detalleOrdenCompra:OrdenCompraDetalleModel[];
    multipleSelection: any[];

    //**[PROVEEDORES] */
    dialogProveedor: boolean = false;
    btnactivarpro: boolean = false;
    valueProvee: Array<ProveedorModel>[];
    public selectProo: ProveedorModel = new ProveedorModel();

    //**[ORDEN COMPRA] */
    public OrdenCompra: OrdenCompraModel = new OrdenCompraModel();
    ordencompraDetalle: any[];
    //* [COMPANIA]
    public compania:CompaniaModel=new CompaniaModel();
    //**[PRODUCTO] */
    valorSelectCodStock:any[];
    provData:ProveedorModel[];
    provData1:ProveedorModel[];
    constructor(){
        super();
        Global.nameComponent = 'crear-po';
        this.OrdenCompra.chrPO_Status = '00';
        this.fecha_ejecucion = Global.getParseDate(new Date().toDateString());
    }
    //#region [COMPANIA]
    loadCompania(v) {
        companiaService.GetOnlyOneCompania(v)
        .then(response=>{
            this.compania=response;   
            this.OrdenCompra.intIdCompany_ID=this.compania.intIdCompany_ID; 
            this.OrdenCompra.strCompany_Desc=this.compania.strCompany_Desc;                                
        })
    }

    //#endregion
    //#region [REQUISICION]
    loadRequisicion(){
        this.dialogRequisicion=true;
        this.requisicionData=[];
        this.codigoInput='';
        requisicionService.getAllRequisicion()
        .then(response=>{
            this.requisicionData=response;
        })
    }
    searchRequisicion() {
        this.getRequisicion(this.codigoInput);
    }
    getRequisicion(codigo) {
        requisicionService.getRequisicionByCod(codigo)
        .then(response=>{
            this.requisicionData=response;                                 
        })
    }
    getReqDetalle(v) {
        requisicionService.getRequiDetallById(v)
        .then(response=>{
            this.requiDetalle=response;  
            this.requiDetalle1=[];     
            this.provData=[]; 
            debugger;  
            for(var i=0;i<this.requiDetalle.length;i++){ 
                this.requiDetalle1.push({
                    intIdPurReqD_ID:this.requiDetalle[i].intIdPurReqD_ID,
                    intRequis_Item_NO:this.requiDetalle[i].intRequis_Item_NO,
                    intIdPurReqH_ID:this.requiDetalle[i].intIdPurReqH_ID,
                    intIdInvStock_ID:this.requiDetalle[i].intIdInvStock_ID,
                    intIdAcctCateg_ID:this.requiDetalle[i].intIdAcctCateg_ID,
                    intIdCategLine_ID:this.requiDetalle[i].intIdCategLine_ID,
                    intIdCurrency_ID:this.requiDetalle[i].intIdCurrency_ID,
                    intIdCostCenter_ID:this.requiDetalle[i].intIdCostCenter_ID,
                    intIdPriority_ID:this.requiDetalle[i].intIdPriority_ID,
                    strDescription:this.requiDetalle[i].strDescription,
                    strCateg_Account:this.requiDetalle[i].strCateg_Account,
                    strCateg_Line:this.requiDetalle[i].strCateg_Line,
                    strMaterial_Cod:this.requiDetalle[i].strMaterial_Cod,
                    strPriority_Cod:this.requiDetalle[i].strPriority_Cod,
                    blncheck:false,
                    fltQuantity:Math.round(this.requiDetalle[i].fltQuantity * 100)/100,
                    strUM:this.requiDetalle[i].strUM,
                    fltUnitPrice:Math.round(this.requiDetalle[i].fltUnitPrice * 100)/100,
                    fltValue_Total:(Math.round(this.requiDetalle[i].fltQuantity * 100)/100)*(Math.round(this.requiDetalle[i].fltUnitPrice * 100)/100)*1,
                    strCurr:this.requiDetalle[i].strCurr,
                    dtmRequested_Date:this.requiDetalle[i].dtmRequested_Date,
                    dtmDelivery_Date:this.requiDetalle[i].dtmDelivery_Date,
                    strMat_Group_Cod:this.requiDetalle[i].strMat_Group_Cod,
                    strWHS_Cod:this.requiDetalle[i].strWHS_Cod,
                    strVendor_Suggested:this.requiDetalle[i].strVendor_Suggested,
                    strAccount_NO:this.requiDetalle[i].strAccount_NO,
                    strCostCenter:this.requiDetalle[i].strCostCenter,
                    dtmCompleted_Date:this.requiDetalle[i].dtmCompleted_Date,
                    strMatClass_Cod:this.requiDetalle[i].strMatClass_Cod,
                    strMatClass_Desc:this.requiDetalle[i].strMatClass_Desc,
                    strCostCenter_Desc:this.requiDetalle[i].strCostCenter_Desc,
                    strVendor_Desc:this.requiDetalle[i].strVendor_Desc,
                    intConv_Factor:1
                })
                proveedorService.GetOnlyOneProveedor(this.requiDetalle[i].strVendor_Suggested)
                .then(response=>{
                    this.provData.push(response);                       
                })
            }                       
        })
    }
    closeDialogReq(){
        this.dialogRequisicion=false;
        this.requiSelect=new RequisicionModel();
        this.OrdenCompra.strRequis_NO=this.requiSelect.strRequis_NO;        
    }
    closeDialog(){
        this.dialogRequisicion=false;
    }
    desactivar_requisicion(){
        if(this.dialogRequisicion){
            this.btnactivarrequisicion=false;      
        }   
    }
    checkSelectdbRequisicion(val){
        this.OrdenCompra.intIdTypeReq_ID=val.intIdTypeReq_ID.intIdTypeReq_ID;
        this.OrdenCompra.intIdWHS_ID=val.intIdWHS_ID.intIdWHS_ID;  
        this.OrdenCompra.strPO_Desc=val.strDesc_Header;
        this.OrdenCompra.strTypeMov_Cod=val.strTypeMov_Cod;    
        this.OrdenCompra.strTypeMov_Desc=val.strTypeMov_Desc;  
        this.requiSelect=val;  
        this.getReqDetalle(this.requiSelect.intIdPurReqH_ID); 
        this.loadCompania(this.requiSelect.strCompany_Cod); 
        this.loadAlmacen(this.requiSelect.strWHS_Cod);
        this.OrdenCompra.strCompany_Cod=this.requiSelect.strCompany_Cod;
    }
    checkSelectdbRequi(){
        this.dialogRequisicion=false;
        this.OrdenCompra.strRequis_NO=this.requiSelect.strRequis_NO;
        
    }
    checkSelectdb(val:RequisicionModel){
        this.requiSelect=val;
        this.dialogRequisicion=false;
        this.OrdenCompra.strRequis_NO=this.requiSelect.strRequis_NO;
    }
    activar_requisicion(){
        setTimeout(() => {
            this.btnactivarpro = false;
            this.btnactivarrequisicion = true;
            this.btnactivarMoneda = false;
            this.btnactivarImpuesto = false;
        }, 120)
    }    
    handleSelectionChange(val) {
        this.valorSelectCodStock=val;
        this.multipleSelection = val;
        this.arrayTemp=[];
        this.totalItems=0;
        this.totalPrice=0;
        for (let i = 0; i < this.requiDetalle1.length; i++) {
            for(let y=0;y<this.multipleSelection.length;y++){
                if(this.requiDetalle1[i].intIdPurReqD_ID === this.multipleSelection[y].intIdPurReqD_ID){                   
                    this.requiDetalle1[i].blnCheck=true;
                    this.requiTemp=this.requiDetalle1; 
                    this.requiDetalle1=[];              
                    this.requiDetalle1=this.requiTemp;  
                    this.requiTemp=[];
                }      
            }       
          } 
          for(let y=0;y<this.multipleSelection.length;y++){
            if(this.multipleSelection[y].blnCheck==true){
                this.totalItems=this.totalItems+Math.round(this.multipleSelection[y].fltQuantity * 100)/100;
                this.totalPrice= this.totalPrice+Math.round(this.multipleSelection[y].fltValue_Total * 100)/100;
            }
          }         
      }
      handleCurrentChange(val){
          this.rowSelect=val.intIdPurReqD_ID;         
      }
    //   selectforEdit(val){

    //   }
    //#endregion
    //#region [ALMACEN]
      loadAlmacen(code){
        almacenService.getAlmacenCodigo(code)
        .then(response=>{
            this.almacen=response;          
        })
      }
    //#endregion
    //#region [PRODUCTO]

    //#endregion
    //#region [PROVEEDORES]
    desactivar_pro() {
        if (this.dialogProveedor) {
            this.btnactivarpro = false;
        }
    }
    activar_pro() {
        setTimeout(() => {
            this.btnactivarpro = true;
            this.btnactivarrequisicion = false;
            this.btnactivarMoneda = false;
            this.btnactivarImpuesto = false;
        }, 120)
    }
    loadPro() {
        this.dialogProveedor = true;
        this.provData1=this.provData;
        this.provData=[];
        var temp=0;
        if(this.provData1.length>0){
            for(var i=0;i<this.provData1.length;i++){
                if(this.provData.length>0){
                    for(var j=0;j<this.provData.length;j++){
                        if(this.provData[j].strVendor_NO===this.provData1[i].strVendor_NO){
                            temp=1;
                            console.log('A');                            
                        }
                    }
                    if(temp==0){
                        console.log('B');
                        
                        this.provData.push(this.provData1[i]);
                    }
                }
                else{
                    this.provData.push(this.provData1[i]);
                }
            }          
        }
    }
    searchProo() {
        proveedorService.GetOnlyOneProveedor(this.valueProvee)
            .then(response => {
                this.provData = response;
            })
    }
    checkSelectProo() {
        this.dialogProveedor = false;
        this.OrdenCompra.strVendor_NO = this.selectProo.strVendor_NO;
        this.OrdenCompra.intIdVendor_ID = this.selectProo.intIdVendor_ID;
    }
    checkDoblePro() {
        this.dialogProveedor = false;
        this.OrdenCompra.strVendor_NO = this.selectProo.strVendor_NO;
        this.OrdenCompra.intIdVendor_ID = this.selectProo.intIdVendor_ID;
    }
    closeDialogPro() {
        this.dialogProveedor = false;
    }
    closeDialogProX() {
        this.dialogProveedor = false;
        this.selectProo = new ProveedorModel();
    }
    checkSelectdbProveedor(val:ProveedorModel){
        this.dialogProveedor=false;
        this.selectProo=val;   
        this.OrdenCompra.strVendor_NO=this.selectProo.strVendor_NO;
        this.OrdenCompra.intIdVendor_ID=this.selectProo.intIdVendor_ID;
        this.OrdenCompra.strVendor_Desc=this.selectProo.strVendor_Desc;
        var code=val.strVendor_NO;
        var temp=this.requiDetalle;
        this.requiDetalle1=[];
        this.requiDetalle1 = temp.filter(function(hero) {
            return hero.strVendor_Suggested == code;
        });         
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
      this.btnactivarrequisicion = false;
    }, 120)
  }
  desactivar_Impuesto(){
    if(this.dialogImpuesto){
      this.btnactivarImpuesto=false;
    }
  }  
  ImpuestoSeleccionado(val:ImpuestoModel){
    this.Impuesto=val
    this.dialogImpuesto=false;
  }
  closeImpuesto(){
    this.Impuesto=new ImpuestoModel();
    this.dialogImpuesto=false;
  }
  //#endregion
    //#region [ORDEN COMPRA]
    guardarPO(val) {
        if (this.multipleSelection.length == 0) {
            this.$message({
                showClose: true,
                type: 'warning',
                message: 'Debe seleccionar al menos 1 detalle'
            });
        }
        else {
            debugger;
            this.OrdenCompra.listaDetalle = [];
            for (var i = 0; i < this.multipleSelection.length; i++) {
                debugger;
                var item:OrdenCompraDetalleModel=new OrdenCompraDetalleModel();
                console.log(this.multipleSelection[i]);
                var IdAcctCateg_ID=this.multipleSelection[i].intIdAcctCateg_ID;
                item.intIdAcctCateg_ID= parseInt(IdAcctCateg_ID.intIdAcctCateg_ID)
                debugger;
                item.intIdCategLine_ID=this.multipleSelection[i].intIdCategLine_ID
                item.intIdCurrency_ID=this.multipleSelection[i].intIdCurrency_ID
                item.intIdCostCenter_ID=this.multipleSelection[i].intIdCostCenter_ID
                item.intPO_Item_NO=1//falta de la cabecea
                item.strAcctCateg_Cod=this.valorSelectCodStock[i].intIdAcctCateg_ID.strAcctCateg_Cod
                if(this.valorSelectCodStock[i].intIdCategLine_ID!=null){
                    item.strCategItem_Cod=this.valorSelectCodStock[i].intIdCategLine_ID.strCategItem_Cod;    
                }
                else {
                    item.strCategItem_Cod='';
                }
                if(this.valorSelectCodStock[i].intIdCostCenter_ID){
                    item.strCostCenter_NO=this.valorSelectCodStock[i].intIdCostCenter_ID.strCostCenter_NO
                }
                else{
                    item.strCostCenter_NO='';
                }
                
                item.strCostCenter_Desc=this.multipleSelection[i].strCostCenter_Desc
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
                item.strWH_Retention=this.Impuesto.fltPorcent.toString()
                item.fltTax_Percent=this.Impuesto.fltPorcent
                item.intIdWHS_ID=this.OrdenCompra.intIdWHS_ID//almacen id correlativo
                item.intInv_QTY_UOP=0//Inv_QTY //viene de la factura
                item.intInvoice_NO=0//numero de la factura
                item.fltInv_Pend_QTY_P=0//cantidad pendiente
                item.fltInv_Pend_Val_F=0//
                item.fltInv_Pend_Val_L=0
                item.fltInv_Pend_Val_S=0
                item.strDeliv_Location=''//texto de la requisicion puede ser editado
                item.fltTot_PO_Item=1
                item.strAccount_Cod=''//codigo de cuenta contable
                item.strWBS_Project=''//vacio
                item.strMatClass_Cod=this.multipleSelection[i].strMatClass_Cod
                item.strMatClass_Desc=this.multipleSelection[i].strMatClass_Desc
                item.strCreation_User='egaona'
                this.OrdenCompra.listaDetalle.push(item);
            }
            this.OrdenCompra.strWH_Cod=this.Impuesto.strWH_Cod;
            this.OrdenCompra.strWH_Desc=this.Impuesto.strWH_Desc;
            this.OrdenCompra.strAuthsd_By='egaona';
            this.OrdenCompra.intChange_Count=0;
            this.OrdenCompra.dtmProcess_Date=new Date();
            this.OrdenCompra.intIdPurReqH_ID=this.requiSelect.intIdPurReqH_ID;
            this.OrdenCompra.strPO_Item_Type='C';
            this.OrdenCompra.strAuthsd_Status='00';
            this.OrdenCompra.fltCURR_QTY_I=this.totalItems;
            this.OrdenCompra.fltTotal_Val=this.totalPrice;
            this.OrdenCompra.strCreation_User='egaona';
            let loadingInstance = Loading.service({
                fullscreen: true,
                text: 'Guargando...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
            }
            );
            if (val == 'crear-po') {
                debugger;
                ordenCompraService.CreateOrdenCompra(this.OrdenCompra)
                    .then(response => {
                        debugger;
                        loadingInstance.close();
                        this.issave = true;
                        this.iserror = false;
                        this.OrdenCompra = new OrdenCompraModel();
                        this.requiSelect = new RequisicionModel();
                        this.Impuesto = new ImpuestoModel();
                        this.almacen=new AlmacenModel();
                        this.moneda=new MonedaModel();
                        this.selectProo=new ProveedorModel();
                        this.requiDetalle1 = [];
                        this.textosave = 'Se guardo correctamente. '+response;

                    }).catch(error => {
                        loadingInstance.close();
                        this.issave = false;
                        this.iserror = true;
                        this.textosave = 'Error al guardar.';
                    })
            }
        }

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
            this.btnactivarrequisicion = false;
            this.btnactivarMoneda = true;
            this.btnactivarImpuesto = false;
        }, 120)
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
        this.bln_tbl_check=true;
        event.edit=!edit;
        this.editing.row=event;
        this.editing.column=column;
        this.totalPrice=0;
        for (let i = 0; i < this.requiDetalle1.length; i++) {
            if(this.requiDetalle1[i].blnCheck===true){
                this.totalPrice=this.totalPrice+Math.round(this.requiDetalle1[i].fltValue_Total * 100)/100;
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
          for (let i = 0; i < this.requiDetalle1.length; i++) {
            if(this.requiDetalle1[i].intIdPurReqD_ID == this.rowSelect){
                this.requiDetalle1[i].fltValue_Total=val*this.requiDetalle1[i].fltUnitPrice*this.requiDetalle1[i].intConv_Factor;
                this.requiTemp=this.requiDetalle1; 
                this.requiDetalle1=[];              
                this.requiDetalle1=this.requiTemp;  
                this.requiTemp=[];
            }
          }          
      }
      handleChangeValUni(val){
        for (let i = 0; i < this.requiDetalle1.length; i++) {
            if(this.requiDetalle1[i].intIdPurReqD_ID == this.rowSelect){
                this.requiDetalle1[i].fltValue_Total=val*this.requiDetalle1[i].fltQuantity*this.requiDetalle1[i].intConv_Factor;
                this.requiTemp=this.requiDetalle1; 
                this.requiDetalle1=[];              
                this.requiDetalle1=this.requiTemp;  
                this.requiTemp=[];
            }
          }  
      }
      handleChangeFactor(val){
        for (let i = 0; i < this.requiDetalle1.length; i++) {
            if(this.requiDetalle1[i].intIdPurReqD_ID == this.rowSelect){
                this.requiDetalle1[i].fltValue_Total=val*this.requiDetalle1[i].fltQuantity*this.requiDetalle1[i].fltUnitPrice;
                this.requiTemp=this.requiDetalle1; 
                this.requiDetalle1=[];              
                this.requiDetalle1=this.requiTemp;  
                this.requiTemp=[];
            }
          }  
      }
    //#endregion
    
    data(){
        return{
            nameComponent:'crear-po',
            codigoInput:'',
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
            bln_tbl_check:true
        }
    }
}