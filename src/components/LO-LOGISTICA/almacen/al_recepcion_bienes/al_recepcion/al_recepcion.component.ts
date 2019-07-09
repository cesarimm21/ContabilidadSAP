import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import { RequisicionModel } from '@/modelo/maestro/requisicion';
import { RequisicionDetalleModel } from '@/modelo/maestro/requisiciondetalle';
import { ProveedorModel } from '@/modelo/maestro/proveedor';
import { MonedaModel } from '@/modelo/maestro/moneda';
import { OrdenCompraModel } from '@/modelo/maestro/ordencompra';
import { OrdenCompraDetalleModel } from '@/modelo/maestro/ordencompradetalle';
import ordenCompraService from '@/components/service/ordencompra.service';
import requisicionService from '@/components/service/requisicion.service';
import proveedorService from '@/components/service/proveedor.service';
import BMonedaComponent from '@/components/buscadores/b_moneda/b_moneda.vue';
import BImpuestoComponent from '@/components/buscadores/b_impuesto/b_impuesto.vue';
import BComprobantepagoComponent from '@/components/buscadores/b_comprobante_pago/b_comprobante_pago.vue';

import { Notification } from 'element-ui';
import { CompaniaModel } from '@/modelo/maestro/compania';
import companiaService from '@/components/service/compania.service';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { ImpuestoModel } from '@/modelo/maestro/impuesto';
import maestroService from '@/components/service/maestro.service';
import { Loading } from 'element-ui';
import Global from '@/Global';
import tipocambioService from '@/components/service/tipocambio.service';

@Component({
    name: 'al-recepcion',
    components: {
        'buttons-accions': ButtonsAccionsComponent,
        'bmoneda': BMonedaComponent,
        'quickaccessmenu': QuickAccessMenuComponent,
        'bimpuesto': BImpuestoComponent,
        'bcomprobantepago':BComprobantepagoComponent
    }
})
export default class RecepcionMaterialComponent extends Vue {
    nameComponent: string = 'modificar-po';
    sizeScreen: string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth: string = (window.innerWidth - 288).toString();//'0';
    btnactivarrequisicion: boolean = false;
    dialogRequisicion: boolean = false;
    fecha_ejecucion: string;
    vifprogress: boolean = true;
    issave: boolean = false;
    iserror: boolean = false;
    codigoInput: any;
    textosave = '';
    valuem: number = 0;
    totalItems: number;
    totalPrice: number;
    //**[IMPUESTO] */
    public Impuesto: ImpuestoModel = new ImpuestoModel();
    dialogImpuesto: boolean = false;
    btnactivarImpuesto: boolean = false;
    intIdPurReqH_ID:number=0;
    intIdVendor_ID:number=0;
    intIdTypeReq_ID:number=0;
    intIdCompany_ID:number=0;
    intIdWHS_ID:number=0;

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
    public requiDetalle1: OrdenCompraDetalleModel[];
    multipleSelection: OrdenCompraDetalleModel[];

    //**[PROVEEDORES] */
    dialogProveedor: boolean = false;
    btnactivarpro: boolean = false;
    valueProvee: Array<ProveedorModel>[];
    public selectProo: ProveedorModel = new ProveedorModel();

    //**[ORDEN COMPRA] */
    public OrdenCompra: OrdenCompraModel = new OrdenCompraModel();
    ordencompraDetalle: any[];
    //* [COMPANIA]
    public compania: CompaniaModel = new CompaniaModel();

    txtmodulo:string='';
    vifaprobarrechasar:boolean=false;
    visualizar:boolean=false;

    provData: ProveedorModel[];
    provData1: ProveedorModel[];

    strGuiaRemitente:string='';
    strGuiaTransportista:string='';
    dtmFechaGuiaTransportista:Date=new Date();
    dtmFechaRecepcion:Date=new Date();
    strConductor:string='';
    strPlaca:string='';
    strCompany:string='';
    strCode:string='';
    fltTot_Rec_QYT:number=0;
    fltTot_Rec_Pend_QTY:number=0;
    fltCURR_QTY_I:number=0;
    fltTot_Rec_Value:number=0;
    blnchangerec:boolean=true;
    strTypeMov_Cod:string='';
    strTypeMov_Desc:string='';
    strVoucher_NO:string='';
    dtmDoc_Date:Date=new Date();
    nameuser:any;
    tipocambio:number=0;
    dialogTipoDocumentoIdentidad:boolean=false;
    strDocument_NO_Ref:string='';
    btnactivartipodoc:boolean=false;
    strSerie:string='';
    strDocument_NO_Ref_desc:string='';

    constructor() {
        super();
        this.dtmDoc_Date.setDate(this.dtmDoc_Date.getDate() - 1);

        this.nameuser=localStorage.getItem('User_Usuario');
        Global.nameComponent = 'crear-po';
        this.OrdenCompra.chrPO_Status = '00';
        this.fecha_ejecucion = Global.getParseDate(new Date().toDateString());
        setTimeout(() => {
            this.loadPO();
        }, 200)
    }
    DateforGetChanceDolar(){
        tipocambioService.GetAllTipoCambioS(this.dtmDoc_Date)
        .then(response=>{
          this.tipocambio=response.fltExchRate_Sale; 
        }).catch(error=>{
          this.$message({
            showClose: true,
            type: 'error',
            message: 'no se pudo cargar tipocambio '+error
          });
        })
        
    }
    getParseDate(date){
        if(date!='' && date!=null && date!=undefined){
            var dateString = new Date(date);
            var dia = dateString.getDate();
            var mes = (dateString.getMonth()<12) ? dateString.getMonth()+1 : mes = dateString.getMonth();
            var yyyy = dateString.getFullYear();
            var dd = (dia<10) ? '0'+dia : dd=dia;
            var mm = (mes<10) ? '0'+mes : mm=mes;
            return dd+'.'+mm+'.'+yyyy;
        }
        return '';
    }
    //#region [COMPANIA]
    loadCompania(v) {
        companiaService.GetOnlyOneCompania(v)
            .then(response => {
                this.compania = response;
                this.OrdenCompra.intIdCompany_ID = this.compania.intIdCompany_ID;
            })
    }

    //#endregion
    //#region [REQUISICION]
    loadRequisicion() {
        this.dialogRequisicion = true;
        this.requisicionData = [];
        this.codigoInput = '';
    }
    searchRequisicion() {
        this.getRequisicion(this.codigoInput);
    }
    getRequisicion(codigo) {
        requisicionService.getRequisicionByCod(codigo)
            .then(response => {
                this.requisicionData = response;
            })
    }
    getReqDetalle(v) {
        requisicionService.getRequiDetallById(v)
            .then(response => {
                this.requiDetalle = response;
                this.requiDetalle1 = response;
                console.log(this.requiDetalle1)
                for (var i = 0; i <= this.requiDetalle.length; i++) {
                    if (this.requiDetalle[i].strVendor_Suggested != undefined) {
                        proveedorService.GetOnlyOneProveedor(this.requiDetalle[i].strVendor_Suggested)
                            .then(response => {
                                this.provData.push(response);
                            })
                    }
                }
            })
    }
    closeDialogReq() {
        this.dialogRequisicion = false;
        this.requiSelect = new RequisicionModel();
        this.OrdenCompra.strRequis_NO = this.requiSelect.strRequis_NO;
    }
    closeDialog() {
        this.dialogRequisicion = false;
    }
    desactivar_requisicion() {
        if (this.dialogRequisicion) {
            this.btnactivarrequisicion = false;
        }
    }
    checkSelectdbRequisicion(val) {

        this.OrdenCompra.intIdTypeReq_ID = val.intIdTypeReq_ID.intIdTypeReq_ID;
        this.OrdenCompra.intIdWHS_ID = val.intIdWHS_ID.intIdWHS_ID;
        this.requiSelect = val;
        this.getReqDetalle(this.requiSelect.intIdPurReqH_ID);
        this.loadCompania(this.requiSelect.strCompany_Cod);

        this.OrdenCompra.strCompany_Cod = this.requiSelect.strCompany_Cod;
    }
    checkSelectdbRequi() {
        this.dialogRequisicion = false;
        this.OrdenCompra.strRequis_NO = this.requiSelect.strRequis_NO;

    }
    checkSelectdb(val: RequisicionModel) {
        this.requiSelect = val;
        this.dialogRequisicion = false;
        this.OrdenCompra.strRequis_NO = this.requiSelect.strRequis_NO;
    }
    activar_requisicion() {
        setTimeout(() => {
            this.btnactivarpro = false;
            this.btnactivarrequisicion = true;
            this.btnactivarMoneda = false;
            this.btnactivarImpuesto = false;
        }, 120)
    }
    handleSelectionChange(val) {
        var dataselect:any=[];
        console.log('handleSelectionChange',val.length);
        for(var i=0;i<val.length;i++){
            if(val[0].blnSelection){
                dataselect.push(val[0])
            }
        }
        this.multipleSelection = dataselect;
        console.log('size-s-handleSelectionChange',this.multipleSelection.length)
    }
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
  
    //#endregion
    //#region [IMPUESTO]
    loadImpuesto() {
        this.dialogImpuesto = true;
    }

    closeDialogImpuesto() {
        this.btnactivarImpuesto = false;
        this.dialogImpuesto = false;
    }
    activar_Impuesto() {
        setTimeout(() => {
            this.btnactivarMoneda = false;
            this.btnactivarImpuesto = true;
            this.btnactivarpro = false;
            this.btnactivarrequisicion = false;
        }, 120)
    }
    desactivar_Impuesto() {
        if (this.dialogImpuesto) {
            this.btnactivarImpuesto = false;
        }
    }
    impuestoselecionado(val: ImpuestoModel) {
        this.Impuesto = val;
        this.dialogImpuesto = false;
    }
    closeImpuesto() {
        this.Impuesto = new ImpuestoModel();
        this.dialogImpuesto = false;
    }
    impuestoClose() {
        this.Impuesto = new ImpuestoModel();
        this.dialogImpuesto = false;
    }
    //#endregion
    //#region [ORDEN COMPRA]
    guardarPO(val) {
        this.vifprogress=true;
        this.multipleSelection=[];
        console.log('multiple selec',this.multipleSelection.length)
        
var total=0;
var valueTotal=0;
console.log('***-leng',this.requiDetalle1.length)
        for(var i=0;i<this.requiDetalle1.length;i++){
            if(this.requiDetalle1[i].blnCheck){
                if(this.requiDetalle1[i].fltRec_QYT1 >0){
                    total+=this.requiDetalle1[i].fltRec_QYT1;
                    valueTotal+=this.requiDetalle1[i].fltRec_QYT1*this.requiDetalle1[i].fltPO_Net_PR_I;
                }
                this.multipleSelection.push(this.requiDetalle1[i])
            }
        } 
        
        console.log('***-size-s-changeRecibida',this.multipleSelection.length)
        this.fltTot_Rec_QYT=Math.round(total*100)/100;
        this.fltTot_Rec_Pend_QTY=Math.round((Number(this.fltCURR_QTY_I)-Number(this.fltTot_Rec_QYT))*100)/100; 
        this.fltTot_Rec_Value=Math.round(valueTotal*100)/100;


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
                if(this.multipleSelection[i].fltRec_QYT!=undefined && this.multipleSelection[i].fltPO_QTY_I!=undefined && this.multipleSelection[i].fltRec_QYT!=null && this.multipleSelection[i].fltPO_QTY_I!=null) {
                    this.multipleSelection[i].strDocument_NO_Ref=this.strVoucher_NO;
                    this.multipleSelection[i].dtmGuiaRem_Date=this.dtmDoc_Date;
                    this.multipleSelection[i].strGuiaRem_Type=this.strDocument_NO_Ref;
                    this.multipleSelection[i].strDocument_NO_Ref_desc=this.strDocument_NO_Ref_desc;
                    
                    this.multipleSelection[i].fltExchange_Rate=this.tipocambio;
                    var item=Number(this.multipleSelection[i].fltRec_Pend_QTY)-Number(this.multipleSelection[i].fltRec_QYT1);
                    console.log('*************')
                    console.log(item,this.multipleSelection[i].fltRec_Pend_QTY,this.multipleSelection[i].fltRec_QYT1)
                    console.log('*************')
                    if(item<=0){
                        this.multipleSelection[i].chrReceipt_Status='50';
                    }
                    else{
                        if(item>0)
                        {
                            this.multipleSelection[i].chrReceipt_Status='30';
                        }
                    }
                    this.multipleSelection[i].strGuiaRem_Serie=this.strSerie;
                    this.multipleSelection[i].strGuiaRem_NO=this.strGuiaRemitente;
                    this.multipleSelection[i].strGuiaTrans_NO=this.strGuiaTransportista;
                    this.multipleSelection[i].dtmGuiaRem_Date=this.dtmFechaRecepcion;
                    this.multipleSelection[i].dtmGuiaTrans_Date=this.dtmFechaGuiaTransportista;

                    this.multipleSelection[i].strRec_Driver=this.strConductor;
                    this.multipleSelection[i].strPlaca=this.strPlaca;
                    this.multipleSelection[i].fltRec_QYT=this.multipleSelection[i].fltRec_QYT1;
                   //this.multipleSelection[i].fltRec_Pend_QTY=Number(this.multipleSelection[i].fltRec_Pend_QTY)-Number(this.multipleSelection[i].fltRec_QYT);
                    
                }
                this.OrdenCompra.listaDetalle.push(this.multipleSelection[i]);
            }
            this.OrdenCompra.strAuthsd_By = this.nameuser;
            this.OrdenCompra.intChange_Count = 0;
            this.OrdenCompra.dtmProcess_Date = new Date();
            this.OrdenCompra.intIdPurReqH_ID = this.requiSelect.intIdPurReqH_ID;
            this.OrdenCompra.strPO_Item_Type = 'C';
            this.OrdenCompra.chrPO_Status = '00';
            this.OrdenCompra.fltCURR_QTY_I = 0;
            this.OrdenCompra.fltTotal_Val = 0;
            this.OrdenCompra.strCreation_User = this.nameuser;
            this.OrdenCompra.fltTot_Rec_QYT=this.fltTot_Rec_QYT;
            this.OrdenCompra.fltTot_Rec_Pend_QTY=this.fltTot_Rec_Pend_QTY;
            if(this.fltTot_Rec_Pend_QTY==0){
                this.OrdenCompra.strReceipt_Status='50'  
            }
            else{
                if(this.fltTot_Rec_Pend_QTY>0){
                    this.OrdenCompra.strReceipt_Status='30'  ;
                }
            }
            console.log(this.OrdenCompra);
            let loadingInstance = Loading.service({
                fullscreen: true,
                text: 'Guardando...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
            });
            this.OrdenCompra.strTypeMov_Cod=this.strTypeMov_Cod;
            this.OrdenCompra.strTypeMov_Desc=this.strTypeMov_Desc;
            ordenCompraService.recepcionar(this.OrdenCompra)
            .then(response => {
                console.log('crear-inventario,',this.OrdenCompra);
                ordenCompraService.inventarioPO(this.OrdenCompra)
                .then(res=>{
                    setTimeout(() => {
                        loadingInstance.close();
                        this.issave = true;
                        this.iserror = false;
                        this.vifprogress=false;
                        this.strVoucher_NO='';
                        this.dtmDoc_Date=new Date();
                        this.strDocument_NO_Ref='';
                        this.textosave = 'Se recepciono correctamente. '+ this.strCode;
                        this.loadPO();
                        // this.$notify({
                        //     title: 'Success',
                        //     message: 'This is a success message',
                        //     type: 'success'
                        //   });
                        
                        Notification.success({title: 'Recepcion',message:this.textosave,duration: 0})
                        //this.openMessage(this.textosave);
                        router.push({ path: `/barmenu/LO-LOGISTICA/almacen/al_recepcion_bienes/al_recepcion_busqueda` })
        
                    }, 600)
                })
                .catch(error=>{
                    loadingInstance.close();
                    this.textosave='Ocurrio un error inesperado. ';
                })
            }).catch(error => {
                loadingInstance.close();
                this.issave = false;
                this.iserror = true;
                this.textosave = 'Error al guardar.';
            })
        }

    }
    //#endregion
    //#region [MONEDA]
    loadMoneda() {
        this.dialogMoneda = true;
    }
    MonedaSeleccionado(val: MonedaModel) {
        this.moneda = val
        this.dialogMoneda = false;
        this.OrdenCompra.strPO_Curr = this.moneda.strCurrency_Cod;
    }
    closeMoneda() {
        this.moneda = new MonedaModel();
        this.dialogMoneda = false;
    }
    closeDialogMoneda() {
        this.btnactivarMoneda = false;
        this.dialogMoneda = false;
    }
    desactivar_Moneda() {
        if (this.dialogMoneda) {
            this.btnactivarMoneda = false;
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
    //#region [LOAD GET]

    Check(event){
        alert('nad');
    }
    changeRecibida(val){
        debugger;
        return 0;
        this.selectRow=val;
        //alert(val);
        var total=0;
        var valueTotal=0;
        this.blnchangerec=false;
        this.multipleSelection=[];
        console.log(val.fltRec_QYT1);
        if(Number(val.fltRec_QYT1)>Number(val.fltRec_Pend_QTY)){
            val.fltRec_QYT1=Number(val.fltRec_Pend_QTY);
        }
        setTimeout(() => {
            for(var i=0;i<this.requiDetalle1.length;i++){
                if(this.requiDetalle1[i].blnCheck){
                    if(this.requiDetalle1[i].fltRec_QYT1 >0){
                        total+=this.requiDetalle1[i].fltRec_QYT1;
                        valueTotal+=this.requiDetalle1[i].fltRec_QYT1*this.requiDetalle1[i].fltPO_Net_PR_I;
                    }
                    this.multipleSelection.push(this.requiDetalle1[i])
                }
            } 
            
            console.log('size-s-changeRecibida',this.multipleSelection.length)
            this.fltTot_Rec_QYT=Math.round(total*100)/100;
            this.fltTot_Rec_Pend_QTY=Math.round((Number(this.fltCURR_QTY_I)-Number(this.fltTot_Rec_QYT))*100)/100; 
            this.fltTot_Rec_Value=Math.round(valueTotal*100)/100;
        }, 120)
    }
    getNumber(num){
        return parseFloat(num);
    }
    selectRow(row){
        this.multipleSelection=[];
        var total=0;
        var valueTotal=0;
        debugger;
        for(var i=0;i<this.requiDetalle1.length;i++){
            if(this.requiDetalle1[i].blnCheck){
                //setTimeout(() => {
                    this.multipleSelection.push(this.requiDetalle1[i])
                    if(this.requiDetalle1[i].fltRec_QYT >0){
                        total+=this.requiDetalle1[i].fltRec_QYT;
                        valueTotal+=this.requiDetalle1[i].fltRec_QYT*this.requiDetalle1[i].fltPO_Net_PR_I;
                    }
                //}, 50)
            }
        }
        console.log('size-s-selectRow',this.multipleSelection.length)
        this.fltTot_Rec_QYT=Math.round(total*100)/100;
        this.fltTot_Rec_Value=Math.round(valueTotal*100)/100;
        this.fltTot_Rec_Pend_QTY=Math.round((Number(this.fltCURR_QTY_I)-Number(this.fltTot_Rec_QYT))*100)/100;
        console.log('##########################')
        console.log(this.fltTot_Rec_Pend_QTY)
        console.log('##########################')
    }
    getDisabled(num1,num2,row){
        if(this.blnchangerec){
            // if(num1==num2){
            //     row.blnSelection=false;
            //     return true;
            // }
            if(num1<=0){
                row.blnSelection=false;
                return true;
            }
        }
        return false;
    }
    limpiarVista(){
        this.intIdVendor_ID=0;
        this.intIdTypeReq_ID=0;
        this.intIdPurReqH_ID=0;
        this.intIdWHS_ID=0;
        this.strCompany='';
        this.strCode='';
        this.fltTot_Rec_QYT=0;
        this.fltTot_Rec_Pend_QTY=0;
        this.fltCURR_QTY_I=0;
        this.fltTot_Rec_Pend_QTY=0;
        this.strPlaca='';
        this.strConductor='';
        this.strGuiaRemitente='';
        this.strGuiaTransportista='';
        this.requiDetalle1=[];
    }
    loadPO(){
        this.limpiarVista();
        var object = JSON.parse(this.$route.query.data);
        var modulo = this.$route.query.vista;
        if(modulo.toLowerCase()!='aprobar'){
          this.txtmodulo='Recepcion Material';
          this.vifaprobarrechasar=false;
          if(modulo.toLowerCase()!='visualizar'){
            this.visualizar=true;
          }
          else{
            this.visualizar=false;
          }
        }
        else{
            this.visualizar=true;
            this.vifaprobarrechasar=true;
            this.txtmodulo='Aprobar Orden Compra';
        }
        this.OrdenCompra=object;
        console.log('orden-compra',this.OrdenCompra);
        this.intIdVendor_ID=object.intIdVendor_ID;
        this.intIdTypeReq_ID=object.intIdTypeReq_ID;
        this.intIdPurReqH_ID=object.intIdPurReqH_ID;
        this.intIdWHS_ID=object.intIdWHS_ID;
        this.strCompany=object.strCompany_Cod;
        this.strCode=object.strPO_NO;
        this.fltTot_Rec_QYT=object.fltTot_Rec_QYT;
        this.fltTot_Rec_Pend_QTY=object.fltTot_Rec_Pend_QTY;
        this.fltCURR_QTY_I=object.fltCURR_QTY_I;
        this.fltTot_Rec_Pend_QTY=this.fltCURR_QTY_I-this.fltTot_Rec_QYT; 
        this.strPlaca=object.strPlaca;
        this.strConductor=object.strRec_Driver;
        this.strGuiaRemitente=object.strGuiaRem_NO;
        this.strGuiaTransportista=object.strGuiaTrans_NO;
        this.cargar(object.intIdPOH_ID);
        // maestroService.GetMaestro('VIEW','LA05') 
        // .then(res=>{
        //   if(res!=undefined){
        //     this.strTypeMov_Cod=res.strTypeMov_Cod;
        //     this.strTypeMov_Desc=res.strTypeMov_Desc;
        //     console.log(this.strTypeMov_Cod,this.strTypeMov_Desc);
        //   }
        // })
        // .catch(error=>{
        // });
        
        this.DateforGetChanceDolar();
      }
      cargar(code){
        ordenCompraService.getPOId(code)
        .then(res=>{
          if(res!=undefined){
            ordenCompraService.getPODetalleId(res[0].intIdPOH_ID)
            .then(resd=>{
              this.OrdenCompra=res[0];
              console.log(resd);
              this.strSerie=resd[0].strGuiaRem_Serie;
              this.strPlaca=resd[0].strPlaca;
              this.strConductor=resd[0].strRec_Driver;
              this.strGuiaRemitente=resd[0].strGuiaRem_NO;
              this.strGuiaTransportista=resd[0].strGuiaTrans_NO;
              this.strDocument_NO_Ref=resd[0].strGuiaRem_Type;
              this.strDocument_NO_Ref_desc=resd[0].strDocument_NO_Ref_desc;

              var itemd:OrdenCompraDetalleModel=resd[0];
              this.dtmFechaGuiaTransportista=itemd.dtmGuiaTrans_Date;
              this.dtmFechaRecepcion=itemd.dtmGuiaRem_Date;
              //this.requiDetalle1=resd;
              for(var i=0;i<resd.length;i++){
                var item:any;
                item=resd[i];
                item.blnSelection=true;
                item.blnCheck=false;
                this.requiDetalle1.push(item);
              }
            })
            .catch(error=>{
            })     
          }
        })
        .catch(error=>{
        })
      }
    async aprobar(){
        this.valuem=0;
        this.OrdenCompra.strAuthsd_By='ADMINISTRADOR';
        this.OrdenCompra.intIdPurReqH_ID=this.intIdPurReqH_ID;
        this.OrdenCompra.intIdVendor_ID=this.intIdVendor_ID;
        this.OrdenCompra.intIdTypeReq_ID=this.intIdTypeReq_ID;
        this.OrdenCompra.intIdPurReqH_ID=this.intIdPurReqH_ID;
        this.OrdenCompra.intIdWHS_ID=this.intIdWHS_ID;
        await setTimeout(() => {
            for(var i=0;i<100;i++){
            this.valuem++; 
            }
        }, 200)
        await ordenCompraService.aprobarPO(this.OrdenCompra)
        .then(res=>{
            setTimeout(() => {
                this.vifprogress=false;
                this.issave=true;
                this.textosave='Se aprobo correctamente. '+res.strPO_NO;
                this.openMessage('Se aprobo correctamente '+res.strPO_NO);
            }, 600)
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
    backPage(){
        window.history.back();
      }
      reloadpage(){
        window.location.reload();
      }
    //#endregion
    loadSeleccion(){
        this.dialogTipoDocumentoIdentidad=true;
    }
    tipoSeleccionado(val){
        this.strDocument_NO_Ref=val.strDocType_Cod;
        this.strDocument_NO_Ref_desc=val.strDocType_Desc;
        this.dialogTipoDocumentoIdentidad=false;
    }
    closeTipoDocumentoIdentidad(){
        this.dialogTipoDocumentoIdentidad=false;
    }
    activar_tipo_documento(){
        this.btnactivartipodoc=true;
    }
    desactivar_tipo_documento(){
        if(this.dialogTipoDocumentoIdentidad){
            this.btnactivartipodoc=false;
        }
    }
    data() {
        return {
            nameComponent: 'crear-po',
            codigoInput: '',
            tableData: [],
            requisicionDetalle: [],
            requisicionData: [],
            provData: [],
            provData1: [],
            valueProvee: '',
            requiDetalle: [],
            requiDetalle1: [],
            multipleSelection: [],
            ordencompraDetalle: [],
            totalItems: 0,
            totalPrice: 0
        }
    }
    // computed:{

    // }
}