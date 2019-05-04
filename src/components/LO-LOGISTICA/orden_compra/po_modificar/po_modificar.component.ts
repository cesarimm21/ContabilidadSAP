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
        'quickaccessmenu': QuickAccessMenuComponent,
    }
})
export default class ModificarPOComponent extends Vue {
    nameComponent: string = 'modificar-po';
    sizeScreen: string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth: string = (window.innerWidth - 288).toString();//'0';
    textTitle:string;
    codigoCompania:any;
    descripcionCompania:any;
    //**[ORDEN COMPRA] */
    public OrdenCompra: Array<OrdenCompraModel>;
    public ocSelect: OrdenCompraModel=new OrdenCompraModel();
    constructor() {
        super();
        Global.nameComponent = 'modificar-po';   
        this.textTitle='Modificar Orden de Compra'
        setTimeout(() => {
            this.loadPO();
        }, 200)
    }
   loadPO(){
    this.codigoCompania=localStorage.getItem('compania_cod');
    this.descripcionCompania=localStorage.getItem('compania_name');
    ordencompraService.GetOrdenCompraCompany(this.codigoCompania)
    .then(resp=>{
        this.OrdenCompra=[];
        this.OrdenCompra=resp;
    })
   }
   handleCurrentChange(val:OrdenCompraModel){
    this.ocSelect=val;
   }
    backPage(){
        window.history.back();
      }
      reloadpage(){
        window.location.reload();
      }
    data() {
        return {
            nameComponent: 'crear-po',
            textTitle:'',
            OrdenCompra:[]
        }
    }
}