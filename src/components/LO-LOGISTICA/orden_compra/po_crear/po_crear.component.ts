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
import ordenCompraService from '@/components/service/ordencompra.service';
import requisicionService from '@/components/service/requisicion.service';
import proveedorService from '@/components/service/proveedor.service';
import BMonedaComponent from '@/components/buscadores/b_moneda/b_moneda.vue';
import {CompaniaModel} from '@/modelo/maestro/compania';
import companiaService from '@/components/service/compania.service';
import Global from '@/Global';
@Component({
    name: 'crear-po',
    components:{
        'buttons-accions':ButtonsAccionsComponent,
        'bmoneda':BMonedaComponent,
    }
})
export default class CrearPOComponent extends Vue {
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
    btnactivarrequisicion:boolean=false;
    dialogRequisicion:boolean=false;
    fecha_ejecucion:string;
    codigoInput:any;
    tableData:any[];
    //**[MONEDA] */
    dialogMoneda:boolean=false;
    btnactivarMoneda:boolean=false;
    dataMoneda:any[];
    public moneda:MonedaModel=new MonedaModel();
    //**[REQUISICION] */
    requisicionData:Array<RequisicionModel>[];
    requisicionDetalle:any[];
    public requiSelect:RequisicionModel=new RequisicionModel();
    public requiDetalle:RequisicionDetalleModel[];
    multipleSelection:RequisicionDetalleModel[];

    //**[PROVEEDORES] */
    dialogProveedor:boolean=false;
    btnactivarpro:boolean=false;
    valueProvee:Array<ProveedorModel>[];
    public selectProo:ProveedorModel=new ProveedorModel();

    //**[ORDEN COMPRA] */
    public OrdenCompra:OrdenCompraModel=new OrdenCompraModel();

    //* [COMPANIA]
    public compania:CompaniaModel=new CompaniaModel();


    provData:any[];
    constructor(){
        super();
        Global.nameComponent='crear-po';
        this.OrdenCompra.chrPO_Status='00';
        this.fecha_ejecucion=Global.getParseDate(new Date().toDateString()); 
    }
    //#region [COMPANIA]
    loadCompania(v){
        companiaService.GetOnlyOneCompania(v)
        .then(response=>{
            this.compania=response;            
        })
    }

    //#endregion

    //#region [REQUISICION]
    loadRequisicion(){
        this.dialogRequisicion=true;
        this.requisicionData=[];
        this.codigoInput='';
    }
    searchRequisicion(){
        this.getRequisicion(this.codigoInput);
    }
    getRequisicion(codigo){
        debugger;
        requisicionService.getRequisicionByCod(codigo)
        .then(response=>{
            this.requisicionData=response;                                 
        })
    }
    getReqDetalle(v){
        debugger;
        requisicionService.getRequiDetallById(v)
        .then(response=>{
            this.requiDetalle=response;
            console.log(this.requiDetalle[0].strMaterial_Cod+' A');            
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
    checkSelectdbRequisicion(val:RequisicionModel){
        this.requiSelect=val;
        this.getReqDetalle(this.requiSelect.intIdPurReqH_ID); 
        this.loadCompania(this.requiSelect.strCompany_Cod); 
        this.OrdenCompra.intIdCompany_ID=this.requiSelect.intIdCompany_ID;
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
            this.btnactivarpro=false; 
            this.btnactivarrequisicion=true;
            this.btnactivarMoneda=false;
          }, 120)
    }
    handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection);
        
      }
    //#endregion

    //#region [PROVEEDORES]
    desactivar_pro(){
        if(this.dialogProveedor){
            this.btnactivarpro=false;      
        }   
    }
    activar_pro(){
        setTimeout(() => {
            this.btnactivarpro=true; 
            this.btnactivarrequisicion=false;
            this.btnactivarMoneda=false;
          }, 120)
    }
    loadPro(){
        this.dialogProveedor=true;
    }
    searchProo(){
        proveedorService.GetOnlyOneProveedor(this.valueProvee)
        .then(response=>{
            this.provData=response;            
        })
    }
    checkSelectProo(){
        this.dialogProveedor=false;
        this.OrdenCompra.strVendor_NO=this.selectProo.strVendor_NO;
        this.OrdenCompra.intIdVendor_ID=this.selectProo.intIdVendor_ID;
    }
    checkDoblePro(){
        this.dialogProveedor=false;
        this.OrdenCompra.strVendor_NO=this.selectProo.strVendor_NO;
        this.OrdenCompra.intIdVendor_ID=this.selectProo.intIdVendor_ID;
    }
    closeDialogPro(){
        this.dialogProveedor=false;
    }
    closeDialogProX(){
        this.dialogProveedor=false;
        this.selectProo=new ProveedorModel();
    }
    checkSelectdbProveedor(val:ProveedorModel){
        this.selectProo=val;        
    }
    //#endregion

    //#region [ORDEN COMPRA]
        saveOrdenCompra(){
            this.OrdenCompra.strAuthsd_By='egaona';
            this.OrdenCompra.intChange_Count=0;
            this.OrdenCompra.dtmProcess_Date=new Date();
            this.OrdenCompra.intIdPurReqH_ID=this.requiSelect.intIdPurReqH_ID;
            this.OrdenCompra.intIdTypeReq_ID=this.requiSelect.intIdTypeReq_ID;
            this.OrdenCompra.strCreation_User='egaona';
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
      activar_Moneda(){
        setTimeout(() => {
            this.btnactivarpro=false; 
            this.btnactivarrequisicion=false;
            this.btnactivarMoneda=true;
        }, 120)
      }
    //#endregion
    data(){
        return{
            codigoInput:'',
            tableData:[],
            requisicionDetalle:[],
            requisicionData:[],
            provData:[],
            valueProvee:'',
            requiDetalle:[],
            multipleSelection:[]
        }
      }
  }