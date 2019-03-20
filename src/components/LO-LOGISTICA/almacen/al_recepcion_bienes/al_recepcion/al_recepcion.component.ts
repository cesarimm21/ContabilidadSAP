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
import { CompaniaModel } from '@/modelo/maestro/compania';
import companiaService from '@/components/service/compania.service';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { ImpuestoModel } from '@/modelo/maestro/impuesto';
import { Loading } from 'element-ui';
import Global from '@/Global';
@Component({
    name: 'al-recepcion',
    components: {
        'buttons-accions': ButtonsAccionsComponent,
        'bmoneda': BMonedaComponent,
        'quickaccessmenu': QuickAccessMenuComponent,
        'bimpuesto': BImpuestoComponent
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
    constructor() {
        super();
        Global.nameComponent = 'crear-po';
        this.OrdenCompra.chrPO_Status = '00';
        this.fecha_ejecucion = Global.getParseDate(new Date().toDateString());
        setTimeout(() => {
            this.loadPO();
        }, 200)
    }
    getParseDate(date){
        console.log('date:',date);
        if(date!='' && date!=null && date!=undefined){
            return Global.getParseDate(date);
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
        debugger;
        requisicionService.getRequisicionByCod(codigo)
            .then(response => {
                console.log(response);
                this.requisicionData = response;
            })
    }
    getReqDetalle(v) {
        requisicionService.getRequiDetallById(v)
            .then(response => {
                this.requiDetalle = response;
                this.requiDetalle1 = response;
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
        for(var i=0;i<val.length;i++){
            if(val[0].blnSelection){
                dataselect.push(val[0])
            }
        }
        this.multipleSelection = dataselect;
        console.log('item select',this.multipleSelection);
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
                this.OrdenCompra.listaDetalle.push(this.multipleSelection[i]);
            }
            this.OrdenCompra.strAuthsd_By = 'egaona';
            this.OrdenCompra.intChange_Count = 0;
            this.OrdenCompra.dtmProcess_Date = new Date();
            this.OrdenCompra.intIdPurReqH_ID = this.requiSelect.intIdPurReqH_ID;
            this.OrdenCompra.strPO_Item_Type = 'C';
            this.OrdenCompra.strAuthsd_Status = '00';
            this.OrdenCompra.fltCURR_QTY_I = 0;
            this.OrdenCompra.fltTotal_Val = 0;
            this.OrdenCompra.strCreation_User = 'egaona';
            this.OrdenCompra.fltTot_Rec_QYT=this.fltTot_Rec_QYT;
            this.OrdenCompra.fltTot_Rec_Pend_QTY=this.fltTot_Rec_Pend_QTY;
            let loadingInstance = Loading.service({
                fullscreen: true,
                text: 'Guargando...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
            }
            );
           
            // loadingInstance.close();
            console.log(this.OrdenCompra)
            ordenCompraService.recepcionar(this.OrdenCompra)
            .then(response => {
                loadingInstance.close();
                this.issave = true;
                this.iserror = false;
                this.vifprogress=false;
                this.textosave = 'Se guardo correctamente. '+ this.strCode;
                this.loadPO();
            }).catch(error => {
                loadingInstance.close();
                this.issave = false;
                this.iserror = true;
                this.textosave = 'Error al guardar.';
            })
            // if (val == 'crear-po') {
            //     ordenCompraService.CreateOrdenCompra(this.OrdenCompra)
            //         .then(response => {
            //             loadingInstance.close();
            //             this.issave = true;
            //             this.iserror = false;
            //             this.OrdenCompra = new OrdenCompraModel();
            //             this.requiSelect = new RequisicionModel();
            //             this.Impuesto = new ImpuestoModel();
            //             this.requiDetalle1 = [];
            //             this.textosave = 'Se guardo correctamente.';

            //         }).catch(error => {
            //             loadingInstance.close();
            //             this.issave = false;
            //             this.iserror = true;
            //             this.textosave = 'Error al guardar.';
            //         })
            // }
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
    changeRecibida(){
        var total=0;
        var valueTotal=0;
        this.blnchangerec=false;
        setTimeout(() => {
            for(var i=0;i<this.requiDetalle1.length;i++){
                debugger;
                if(this.requiDetalle1[i].blnCheck){
                    this.multipleSelection.push(this.requiDetalle1[i])
                    if(this.requiDetalle1[i].fltRec_QYT >0){
                        total+=this.requiDetalle1[i].fltRec_QYT;
                        valueTotal+=this.requiDetalle1[i].fltRec_QYT*this.requiDetalle1[i].fltPO_Net_PR_I;
                    }
                }
            } 
            this.fltTot_Rec_QYT=total;
            this.fltTot_Rec_Pend_QTY=this.fltCURR_QTY_I-this.fltTot_Rec_QYT; 
            this.fltTot_Rec_Value=valueTotal;
            console.log('change*******',this.requiDetalle1,total);  
        }, 120)
    }
    getNumber(num){
        return parseFloat(num);
    }
    selectRow(row){
        debugger;
        this.multipleSelection=[];
        console.log('entro-check',row);
        var total=0;
        var valueTotal=0;
        for(var i=0;i<this.requiDetalle1.length;i++){
            if(this.requiDetalle1[i].blnCheck){
                this.multipleSelection.push(this.requiDetalle1[i])
                if(this.requiDetalle1[i].fltRec_QYT >0){
                    total+=this.requiDetalle1[i].fltRec_QYT;
                    valueTotal+=this.requiDetalle1[i].fltRec_QYT*this.requiDetalle1[i].fltPO_Net_PR_I;
                }
            }
        }
        this.fltTot_Rec_QYT=total;
        this.fltTot_Rec_Value=valueTotal;
        this.fltTot_Rec_Pend_QTY=this.fltCURR_QTY_I-this.fltTot_Rec_QYT; 
        console.log('entro-check-2',this.multipleSelection)
    }
    getDisabled(num1,num2,row){
        if(this.blnchangerec){
            if(num1==num2){
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
        debugger;
        var object = JSON.parse(this.$route.query.data);
        console.log('data extra',object);
        var modulo = this.$route.query.vista;
        if(modulo.toLowerCase()!='aprobar'){
          this.txtmodulo='Recepción Material';
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
            console.log(object.intIdPOH_ID);
        }
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
      }
      cargar(code){
        ordenCompraService.getPOId(code)
        .then(res=>{
          if(res!=undefined){
            console.log('cargarData1',res)
            ordenCompraService.getPODetalleId(res[0].intIdPOH_ID)
            .then(resd=>{
              this.OrdenCompra=res[0];
              //this.requiDetalle1=resd;
              for(var i=0;i<resd.length;i++){
                var item:any;
                item=resd[i];
                item.blnSelection=true;
                item.blnCheck=false;
                this.requiDetalle1.push(item);
              }
              console.log('cargarData2',resd,this.requiDetalle1)
            })
            .catch(error=>{
              console.log('error',error)
            })     
          }
        })
        .catch(error=>{
          console.log('error',error)
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
        
        console.log('aprobar',this.OrdenCompra);
        await setTimeout(() => {
            for(var i=0;i<100;i++){
            this.valuem++; 
            }
        }, 200)
        await ordenCompraService.aprobarPO(this.OrdenCompra)
        .then(res=>{
            debugger;
            console.log(this.valuem);
            setTimeout(() => {
                this.vifprogress=false;
                this.issave=true;
                this.textosave='Se aprobó correctamente. '+res.strPO_NO;
                this.openMessage('Se aprobó correctamente '+res.strPO_NO);
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
    //#endregion
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
}