import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
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
import { CompaniaModel } from '@/modelo/maestro/compania';
import companiaService from '@/components/service/compania.service';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { ImpuestoModel } from '@/modelo/maestro/impuesto';
import { Loading } from 'element-ui';
import Global from '@/Global';
@Component({
    name: 'visualizar-po',
    components:{
        'quickaccessmenu': QuickAccessMenuComponent,
        'buttons-accions': ButtonsAccionsComponent,
    }
})
export default class VisualizarPOComponent extends Vue {
    sizeScreen: string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth: string = (window.innerWidth - 288).toString();//'0';
    fecha_ejecucion: string;
    vifprogress: boolean = true;
    issave: boolean = false;
    iserror: boolean = false;
    codigoInput: any;
    textosave = '';
    valuem: number = 0;
    totalItems: number;
    totalPrice: number;
    dialogPrioridad:boolean=false;
    btnactivarprioridad:boolean=false;
    /*bolean_tabla_dinamica*/
      editing:any= {
        row:'',
        column:''
    };
    rowSelect:number;
    //**[IMPUESTO] */
    public Impuesto: ImpuestoModel = new ImpuestoModel();
    //**[ALMACEN] */
    public almacen: AlmacenModel = new AlmacenModel();
    //**[MONEDA] */
    dataMoneda: any[];
    public moneda: MonedaModel = new MonedaModel();

    //**[PROVEEDORES] */
    public selectProo: ProveedorModel = new ProveedorModel();

    //**[ORDEN COMPRA] */
    public OrdenCompraByCod: OrdenCompraModel = new OrdenCompraModel();
    public OrdenCompra: OrdenCompraModel = new OrdenCompraModel();
    ordenCompraData: any[];
    ordencompraDetalle: any[];
    dialogOrdenCompra:boolean=false;
    btnactivarordencompra:boolean=false;
    //* [COMPANIA]
    public compania: CompaniaModel = new CompaniaModel();

    txtmodulo:string='';
    vifaprobarrechasar:boolean=false;
    visualizar:boolean=false;

    provData1: ProveedorModel[];
    constructor(){
        super();
        Global.nameComponent='visualizar-po';  
        this.txtmodulo='Vizualizar Orden de Compra';
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
    
    //#region [ORDEN COMPRA]
    loadOrdenCompra(){
        let loadingInstance = Loading.service({
            fullscreen: true,
            text: 'Guargando...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.8)'
        }
        );
        ordenCompraService.GetAllOrdenCompra()
        .then(response=>{
            this.ordenCompraData=response;
            this.dialogOrdenCompra=true;
            loadingInstance.close();
        })
        .catch(error=>{
            loadingInstance.close();
            this.$message({
                showClose: true,
                type: 'warning',
                message: 'No hay Ordenes de Compra'
            });
        })
    }
    closeOrdenC(){
        this.dialogOrdenCompra=false;
    }
    checkSelectOC(){
        this.dialogOrdenCompra=false;
        this.fecha_ejecucion = Global.getParseDate(this.OrdenCompra.dtmProcess_Date);
        this.loadImpuestoData(this.OrdenCompra.strWH_Cod);
        ordenCompraService.GetAllOrdenDetalle(this.OrdenCompra.intIdPOH_ID)
        .then(response=>{
            this.ordencompraDetalle=response;       
        })
    }
    loadImpuestoData(v){
        impuestoService.GetOnlyOneImpuesto(v)
        .then(response=>{
            this.Impuesto=response;
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
        if(this.codigoInput==''){
            this.$message({
                showClose: true,                
                type: 'info',
                message: 'Ingrese codigo Orden de Compra'
                });
        }
        else{
            ordenCompraService.getPOCodAll(this.codigoInput)
            .then(response=>{
                this.ordenCompraData=response;
            })
        }
        
    }

    desactivar_ordencompra(){
        if (this.dialogOrdenCompra) {
            this.btnactivarordencompra = false;
        }
    }
    activar_ordencompra(){
        setTimeout(() => {
            this.btnactivarordencompra=true;
        }, 120)
    }
   
    handleCurrentChange(val){
        debugger;
        // this.rowSelect=val.intIdPurReqD_ID;         
    }
    handleSelectionChange(val) {
        // this.multipleSelection = val;
    }
    //#endregion
    //#region [LOAD GET]
    // toggleSelection(rows) {
    //     rows.forEach(row => {
    //         this.$refs.missionTable.toggleRowSelection(row);
    //       }); 
    //   }
    openMessage(newMsg : string) {
        this.$message({
        showClose: true,
        message: newMsg,
        type: 'success'
        });
    }
    //#endregion
    data(){
        return{
            ameComponent: 'crear-po',
            codigoInput: '',
            tableData: [],
            requisicionDetalle: [],
            provData1: [],
            requiDetalle: [],
            requiDetalle1: [],
            multipleSelection: [],
            ordencompraDetalle: [],
            totalItems: 0,
            totalPrice: 0,
            fecha_ejecucion:'',
            ordenCompraData:[]
        }
      }
  }