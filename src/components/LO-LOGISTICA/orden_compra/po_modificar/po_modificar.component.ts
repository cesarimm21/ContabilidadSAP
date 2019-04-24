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
import { AlmacenModel } from '@/modelo/maestro/almacen';
import { OrdenCompraModel } from '@/modelo/maestro/ordencompra';
import { OrdenCompraDetalleModel } from '@/modelo/maestro/ordencompradetalle';
import ordenCompraService from '@/components/service/ordencompra.service';
import requisicionService from '@/components/service/requisicion.service';
import proveedorService from '@/components/service/proveedor.service';
import almacenService from '@/components/service/almacen.service';
import impuestoService from '@/components/service/impuesto.service';
import BMonedaComponent from '@/components/buscadores/b_moneda/b_moneda.vue';
import BImpuestoComponent from '@/components/buscadores/b_impuesto/b_impuesto.vue';
import BPrioridadComponent from '@/components/buscadores/b_prioridad/b_prioridad.vue';
import { CompaniaModel } from '@/modelo/maestro/compania';
import companiaService from '@/components/service/compania.service';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { ImpuestoModel } from '@/modelo/maestro/impuesto';
import { Loading } from 'element-ui';
import Global from '@/Global';
import ordencompraService from '@/components/service/ordencompra.service';
@Component({
    name: 'modificar-po',
    components: {
        'buttons-accions': ButtonsAccionsComponent,
        'bmoneda': BMonedaComponent,
        'quickaccessmenu': QuickAccessMenuComponent,
        'bimpuesto': BImpuestoComponent,
        'bprioridad':BPrioridadComponent,
    }
})
export default class ModificarPOComponent extends Vue {
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
    dialogPrioridad:boolean=false;
    btnactivarprioridad:boolean=false;
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
    //**[IMPUESTO] */
    public Impuesto: ImpuestoModel = new ImpuestoModel();
    dialogImpuesto: boolean = false;
    btnactivarImpuesto: boolean = false;
    intIdPurReqH_ID:number=0;
    intIdVendor_ID:number=0;
    intIdTypeReq_ID:number=0;
    intIdCompany_ID:number=0;
    intIdWHS_ID:number=0;
    public selectrow:OrdenCompraDetalleModel=new OrdenCompraDetalleModel();
    //**[ALMACEN] */
    public almacen: AlmacenModel = new AlmacenModel();
    //**[MONEDA] */
    dialogMoneda: boolean = false;
    btnactivarMoneda: boolean = false;
    dataMoneda: any[];
    public moneda: MonedaModel = new MonedaModel();
    //**[REQUISICION] */
    // requisicionData: Array<RequisicionModel>[];
    // requisicionDetalle: any[];
    // public requiSelect: RequisicionModel = new RequisicionModel();
    public poDetalle: OrdenCompraDetalleModel[];
    public poDetalle1: OrdenCompraDetalleModel[];
    multipleSelection: OrdenCompraDetalleModel[];

    //**[PROVEEDORES] */
    dialogProveedor: boolean = false;
    btnactivarpro: boolean = false;
    valueProvee: Array<ProveedorModel>[];
    public selectProo: ProveedorModel = new ProveedorModel();

    //**[ORDEN COMPRA] */
    public OrdenCompraByCod: OrdenCompraModel = new OrdenCompraModel();
    public OrdenCompra: OrdenCompraModel = new OrdenCompraModel();
    ordenCompraData: any[];
    ordencompraDetalle: any[];
    ordencompraDetalleTemp: any[];
    dialogOrdenCompra:boolean=false;
    btnactivarordencompra:boolean=false;
    //* [COMPANIA]
    public compania: CompaniaModel = new CompaniaModel();

    txtmodulo:string='';
    vifaprobarrechasar:boolean=false;
    visualizar:boolean=false;

    provData: ProveedorModel[];
    provData1: ProveedorModel[];
    constructor() {
        super();
        Global.nameComponent = 'modificar-po';   
        setTimeout(() => {
            this.loadPO();
        }, 200)
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
    handleSelectionChange(val) {
        this.multipleSelection = val;
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
    handleBlurImporte(event) {
        debugger;
        this.OrdenCompra.fltCURR_QTY_I=0;
        this.OrdenCompra.fltTotal_Val=0;
        for(var i=0;i< this.multipleSelection.length;i++){
            if(this.multipleSelection[i].blnCheck==true){
                
                this.OrdenCompra.fltTotal_Val+=Number((this.multipleSelection[i].fltPO_Net_PR_I)*(this.multipleSelection[i].fltPO_QTY_I)*(this.multipleSelection[i].intConv_Factor));
                this.OrdenCompra.fltCURR_QTY_I+=Number(this.multipleSelection[i].fltPO_QTY_I);
            }               
        }     
      }
      handleChangeCantidad(val){
        for (let i = 0; i < this.ordencompraDetalle.length; i++) {
          if(this.ordencompraDetalle[i].intIdPOD_ID == this.rowSelect){
              this.ordencompraDetalle[i].fltCurr_Net_PR_P=val*this.ordencompraDetalle[i].fltPO_Net_PR_I*this.ordencompraDetalle[i].intConv_Factor;
              this.ordencompraDetalleTemp=this.ordencompraDetalle; 
              this.ordencompraDetalle=[];              
              this.ordencompraDetalle=this.ordencompraDetalleTemp;  
              this.ordencompraDetalleTemp=[];
          }
        }          
    }
    handleChangeValUni(val){
      for (let i = 0; i < this.ordencompraDetalle.length; i++) {
          if(this.ordencompraDetalle[i].intIdPOD_ID == this.rowSelect){
              this.ordencompraDetalle[i].fltCurr_Net_PR_P=val*this.ordencompraDetalle[i].fltPO_QTY_I*this.ordencompraDetalle[i].intConv_Factor;
              this.ordencompraDetalleTemp=this.ordencompraDetalle; 
              this.ordencompraDetalle=[];              
              this.ordencompraDetalle=this.ordencompraDetalleTemp;  
              this.ordencompraDetalleTemp=[];
          }
        }  
    }
      handleChangeFactor(val){
        for (let i = 0; i < this.ordencompraDetalle.length; i++) {
            if(this.ordencompraDetalle[i].intIdPOD_ID == this.rowSelect){
                this.ordencompraDetalle[i].fltCurr_Net_PR_P=val*this.ordencompraDetalle[i].fltPO_QTY_I*this.ordencompraDetalle[i].fltPO_Net_PR_I;
                this.ordencompraDetalleTemp=this.ordencompraDetalle; 
                this.ordencompraDetalle=[];              
                this.ordencompraDetalle=this.ordencompraDetalleTemp;  
                this.ordencompraDetalleTemp=[];
            }
          }  
      }

    clickCheck(event,edit,column){
        debugger;
      event.edit=!edit;
      this.editing.row=event;
      this.editing.column=column;
      this.OrdenCompra.fltCURR_QTY_I=0;
      this.OrdenCompra.fltTotal_Val=0;
      for(var i=0;i< this.multipleSelection.length;i++){
          if(this.multipleSelection[i].blnCheck==true){
              
              this.OrdenCompra.fltTotal_Val+=Number((this.multipleSelection[i].fltPO_Net_PR_I)*(this.multipleSelection[i].fltPO_QTY_I)*(this.multipleSelection[i].intConv_Factor));
              this.OrdenCompra.fltCURR_QTY_I+=Number(this.multipleSelection[i].fltPO_QTY_I);
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
    checkSelectdbProveedor(val: ProveedorModel) {
        this.dialogProveedor = false;
        this.selectProo = val;
        this.OrdenCompra.strVendor_NO = this.selectProo.strVendor_NO;
        this.OrdenCompra.intIdVendor_ID = this.selectProo.intIdVendor_ID;
        var code = val.strVendor_NO;
        var temp = this.poDetalle;
        this.poDetalle1 = [];
        this.poDetalle1 = temp.filter(function (hero) {
            return hero.strVendor_NO == code;
        });
        for (var i = 0; i < this.poDetalle1.length; i++) {
            this.OrdenCompra.fltCURR_QTY_I += Number(this.poDetalle1[i].fltPO_QTY_I);
            this.OrdenCompra.fltTotal_Val = this.OrdenCompra.fltTotal_Val * this.poDetalle1[i].fltCurr_Net_PR_P;
        }
        if (this.Impuesto.fltPorcent != undefined) {
            this.OrdenCompra.fltTotal_Val = this.Impuesto.fltPorcent;
        }
    }
    //#endregion
    //#region [IMPUESTO]
    loadImpuesto() {
        this.dialogImpuesto = true;
    }
    loadImpuestoData(v){
        impuestoService.GetOnlyOneImpuesto(v)
        .then(response=>{
            this.Impuesto=response;
        })
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
        this.OrdenCompra.strWH_Cod=this.Impuesto.strWH_Cod;
        this.OrdenCompra.strWH_Desc=this.Impuesto.strWH_Desc;
        this.dialogImpuesto=false;
    }
    closeImpuesto() {
        this.Impuesto = new ImpuestoModel();
        this.dialogImpuesto = false;
    }
    impuestoClose() {
        this.dialogImpuesto = false;
        this.Impuesto = new ImpuestoModel();
        
    }
    //#endregion
    //#region [ORDEN COMPRA]
    loadOrdenCompra(){
        ordencompraService.GetAllOrdenCompra()
        .then(response=>{
            this.ordenCompraData=response;
            this.dialogOrdenCompra=true;
        })
        .catch(error=>{

        })
    }
    closeOrdenC(){
        this.dialogOrdenCompra=false;
    }
    checkSelectOC(){
        this.dialogOrdenCompra=false;
        this.fecha_ejecucion = Global.getParseDate(this.OrdenCompra.dtmProcess_Date);
        this.loadImpuestoData(this.OrdenCompra.strWH_Cod);
        ordencompraService.GetAllOrdenDetalle(this.OrdenCompra.intIdPOH_ID)
        .then(response=>{
            this.ordencompraDetalle=response;          
        })
    }
    checkSelectOrdenCompra(val){
        almacenService.GetOneAlmacen(val.intIdWHS_ID.intIdWHS_ID)
        .then(response=>{
            this.almacen=response;
        })
        this.OrdenCompra=val;
        this.OrdenCompra.intIdWHS_ID=val.intIdWHS_ID.intIdWHS_ID;
    }
    searchOrdenCompra(){

    }
    desactivar_ordencompra(){
        if (this.dialogOrdenCompra) {
            this.btnactivarordencompra = false;
        }
    }
    activar_ordencompra(){
        setTimeout(() => {
            this.btnactivarpro = false;
            this.btnactivarrequisicion = false;
            this.btnactivarMoneda = false;
            this.btnactivarImpuesto = false;
            this.btnactivarordencompra=true;
        }, 120)
    }
    guardarEditPO(val) {
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
            this.OrdenCompra.intChange_Count = Number(this.OrdenCompra.intChange_Count)+1;
            this.OrdenCompra.strModified_User = 'egaona';
            this.OrdenCompra.dtmModified_Date=new Date();
            
            let loadingInstance = Loading.service({
                fullscreen: true,
                text: 'Guargando...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
            }
            );
            if (val == 'modificar-po') {
                console.log(this.OrdenCompra);
                
                ordenCompraService.UpdateOrdenCompra(this.OrdenCompra)
                    .then(response => {
                        loadingInstance.close();
                        this.issave = true;
                        this.iserror = false;
                        this.OrdenCompra = new OrdenCompraModel();
                        this.Impuesto = new ImpuestoModel();
                        this.almacen=new AlmacenModel();
                        this.fecha_ejecucion='';
                        this.multipleSelection=[];
                        this.ordencompraDetalle=[];
                        this.poDetalle1 = [];
                        this.textosave = 'Se guardo correctamente.';

                    }).catch(error => {
                        loadingInstance.close();
                        this.issave = false;
                        this.iserror = true;
                        this.textosave = 'Error al guardar.';
                    })
            }
        }

    }
    handleCurrentChange(val){
        debugger;
        this.rowSelect=val.intIdPOD_ID;         
    }
    // toggleSelection(rows) {
    //     if (rows) {
    //       rows.forEach(row => {
    //         this.$refs.missionTable.toggleRowSelection(row);
    //       });
    //     } else {
    //       this.$refs.missionTable.clearSelection();
    //     }
    //   }
    //#endregion
    //#region [MONEDA]
    loadMoneda() {
        this.dialogMoneda = true;
    }
    MonedaSeleccionado(val: MonedaModel) {
        this.moneda=val
        this.dialogMoneda=false;
        this.OrdenCompra.strPO_Curr=this.moneda.strCurrency_Cod;
        this.OrdenCompra.strCurrency_Cod=this.moneda.strCurrency_Cod;
        this.OrdenCompra.strCurrency_Desc=this.moneda.strCurrency_Desc;
        this.OrdenCompra.intIdAcctCont_ID=this.moneda.intIdAcctCont_ID;
        this.OrdenCompra.strAcc_Local_NO=this.moneda.strAcc_Local_NO;
        this.OrdenCompra.strAcc_Corp_NO=this.moneda.strAcc_Corp_NO;
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
    loadPO(){
        debugger;
        var modulo = this.$route.query.vista;

        if(modulo==undefined){
            debugger;
          this.txtmodulo='Modificar Orden Compra';
          this.vifaprobarrechasar=false;
          this.visualizar=false;
        //   if(modulo.toLowerCase()!='visualizar'){
            
        //   }
        //   else{
        //     this.visualizar=false;
        //   }
        }
        else{
            debugger;
            var object = JSON.parse(this.$route.query.data); 
            this.visualizar=false;
            this.vifaprobarrechasar=true;
            this.txtmodulo='Aprobar Orden Compra';
            this.intIdVendor_ID=object.intIdVendor_ID;
            this.intIdTypeReq_ID=object.intIdTypeReq_ID;
            this.intIdPurReqH_ID=object.intIdPurReqH_ID;
            this.intIdWHS_ID=object.intIdWHS_ID;
            this.cargar(object.intIdPOH_ID);
        }
      }
      cargar(code){
        ordenCompraService.getPOId(code)
        .then(res=>{
          if(res!=undefined){
            ordenCompraService.getPODetalleId(res[0].intIdPOH_ID)
            .then(resd=>{
              this.OrdenCompra=res[0];
              this.poDetalle1=resd;
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
        this.OrdenCompra.intIdWHS_ID=this.intIdWHS_ID;        
        await setTimeout(() => {
            for(var i=0;i<100;i++){
            this.valuem++; 
            }
        }, 200)
        await ordenCompraService.aprobarPO(this.OrdenCompra)
        .then(res=>{
            this.OrdenCompra.listaDetalle=this.poDetalle1;
            ordenCompraService.inventarioPO(this.OrdenCompra)
            .then(res=>{
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
    backPage(){
        window.history.back();
      }
      reloadpage(){
        window.location.reload();
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
            fecha_ejecucion:'',
            ordenCompraData:[]
        }
    }
}