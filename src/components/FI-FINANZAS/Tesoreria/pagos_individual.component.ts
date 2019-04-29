import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';

import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import BMonedaComponent from '@/components/buscadores/b_moneda/b_moneda.vue';
import BProveedorComponent from '@/components/buscadores/b_proveedor/b_proveedor.vue';
import BBancoComponent from '@/components/buscadores/b_banco/b_banco.vue';
import {PagosModel} from '@/modelo/maestro/Pagos';
import {PagosDetelleModel} from '@/modelo/maestro/pagosDetalle';
import {MonedaModel} from '@/modelo/maestro/moneda'
import {BancoModel} from '@/modelo/maestro/banco';
import {CompaniaModel} from '@/modelo/maestro/compania';
import {ProveedorModel} from '@/modelo/maestro/proveedor';
import {FacturaModel} from '@/modelo/maestro/factura';
import MonedaService from '@/components/service/moneda.service'
import RunPagosService from '@/components/service/runpagos.service'
import FacturaService from '@/components/service/factura.service'
import bancoService from '@/components/service/banco.service';
import Global from '@/Global';
@Component({
    name: 'pagos-individual',
    components: { 
    'quickaccessmenu':QuickAccessMenuComponent,
    'bmoneda':BMonedaComponent,
    'bbanco':BBancoComponent,
    'bproveedor':BProveedorComponent,
    'buttons-accions':ButtonsAccionsComponent,
}
})
export default class PagosIndividualesComponent extends Vue {
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
    public compania:CompaniaModel=new CompaniaModel();
    public pago:PagosModel=new PagosModel();
    public pagodetalle:PagosDetelleModel=new PagosDetelleModel();
    fecha_ejecucion:string='';
    CodigoGen:string;
    DateContabilizacion:any;
    DocIngresados:any;
    DocDeudores:any;
    dialogVisible:boolean=false;
    VisibleBanco:boolean=false;
    VisibleProveedor:boolean=false;
    btnactivarmoneda:boolean=false;
    btnactivarbanco:boolean=false;
    gridPago:any[];

    gridFactura:FacturaModel[];
    //**Moneda */
    public moneySelect:MonedaModel=new MonedaModel();
    public bancoSelect:BancoModel=new BancoModel();

    public proselect:ProveedorModel=new ProveedorModel();
    constructor(){                
        super();
        Global.nameComponent = 'pagos-individual';        
        this.fecha_ejecucion=Global.getParseDate(new Date());
        setTimeout(() => {
            this.DateSelected();
          }, 200)
        
    }
    DateSelected(){ 
        var com:any=localStorage.getItem('compania_cod');
        var comdes:any=localStorage.getItem('compania_name');
        this.compania.strCompany_Cod=com;
        this.compania.strCompany_Name=comdes;
        var selectedValue=this.fecha_ejecucion.split('-');
        var anioSelected=selectedValue[0];
        this.CodigoGen=selectedValue[2]+''+selectedValue[1]+''+anioSelected[2]+''+anioSelected[3];
        if(this.pago.strPayRun_Curr!=''){
            this.runPagosGet(this.CodigoGen)
        }
    }
    DateContabilizacionClick(){ 
        this.DocIngresados=Global.getParseDate(this.DateContabilizacion);
        this.DocDeudores=Global.getParseDate(this.DateContabilizacion);
        this.pago.dtmPayRun_Date=this.DocIngresados;
        this.gridFactura=[];
        FacturaService.GetFacturaDate(this.pago.dtmPayRun_Date)
        .then(res=>{            
            this.gridFactura=res;
        })
    }
    viewMoneda(){
        this.dialogVisible=true; 
    }
    closeMoneda(){
        this.dialogVisible=false;
    }
    SeleccionadoMoneda(val){
        this.moneySelect=val;
        this.pago.strPayRun_Curr=this.moneySelect.strCurrency_Cod;
        this.runPagosGet(this.CodigoGen)
        this.dialogVisible=false;
    }
    SeleccionadoBanco(val){
        this.bancoSelect=val;
        this.VisibleBanco=false;
    }
    desactivar_moneda(){
        if(this.dialogVisible){
          this.btnactivarmoneda=false;
        }
      }  
      activar_moneda(){
        setTimeout(() => {
            this.btnactivarmoneda=true;
            this.btnactivarbanco=false;
        }, 120)
      }
    desactivar_banco(){
        if(this.VisibleBanco){
          this.btnactivarmoneda=false;
        }
      }  
      activar_banco(){
        setTimeout(() => {
            this.btnactivarmoneda=false;
            this.btnactivarbanco=true;
        }, 120)
      }
    viewBanco(){
        this.VisibleBanco=true;
    }
    closeBanco(){
        this.VisibleBanco=false;
    }
    bancoChosseCheck(){
        this.VisibleBanco=false;
    }
    //#region [PROVEEDOR]
    SeleccionadoProveedor(val){
        this.proselect=val;
        this.VisibleProveedor=false;
    }
    closeProveedor(){
        this.VisibleProveedor=false;
    }
    viewProveedor(){
        this.VisibleProveedor=true;
    }
    //#endregion

    //#region [ACCION TABLE]
    handleSelectionChange(){

    }
    handleCurrentChange(){

    }
    //#endregion
    //#region [RUNPAGOS]
    runPagosGet(val){
        RunPagosService.getPagoDataCod(val)
        .then(res=>{
            if(res.strPayRun_NO==undefined){
                this.pago.strPayRun_NO=this.CodigoGen+'-'+1+'-'+this.pago.strPayRun_Curr;
            }
            else{
                var datos=res.strPayRun_NO.split('-');
                if(datos[2]===this.pago.strPayRun_Curr){
                    var contador=Number(datos[1])+1;
                    this.pago.strPayRun_NO=datos[0]+'-'+contador+'-'+this.pago.strPayRun_Curr;
                }
                else{
                    this.pago.strPayRun_NO=this.CodigoGen+'-'+datos[1]+'-'+this.pago.strPayRun_Curr;
                }
            }                    
        }).catch(error=>{
        })
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
            gridMoney:[],
            tableData:[],
            gridPago:[],
            CodigoGen:'',
            val:'',
            DateContabilizacion:'',
            DocIngresados:'',
            DocDeudores:'',
            gridFactura:[]
        }
    }
}