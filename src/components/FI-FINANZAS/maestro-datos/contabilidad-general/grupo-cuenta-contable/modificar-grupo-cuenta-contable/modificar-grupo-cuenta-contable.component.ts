import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import grupocuentacontableService from '@/components/service/grupocuentacontable.service';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import {CompaniaModel} from '@/modelo/maestro/compania';
import {GrupoCuentaContableModel} from '@/modelo/maestro/grupocuentacontable';
import { Notification } from 'element-ui';
import BCompaniaProveedor from '@/components/buscadores/b_compania/b_compania.vue';
@Component({
  name: 'crear-grupo-cuenta-contable',
  components:{
    'bcompania':BCompaniaProveedor,
    'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class ModificarGrupoCuentaContableComponent extends Vue {
  
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  ctaPadre:boolean=true;
  dialogCompania:boolean=true;
  
  btnactivarcompania:boolean=false;
  dataCompania:any[];
  public companiaModel:CompaniaModel=new CompaniaModel();
  public grupoCuentaContableModel:GrupoCuentaContableModel=new GrupoCuentaContableModel();
  btnactivarCuentaContablePadre:boolean=false;
  dialogTipoCuentaContable:boolean=false;
  txtmodulo:string='';
  visualizar:boolean=false;
  constructor(){    
    super();
    Global.nameComponent='crear-ingreso-comprobante';
    var desc:any=localStorage.getItem('compania_name');
    var cod:any=localStorage.getItem('compania_cod');
    var id:any=localStorage.getItem('compania_ID');
    this.grupoCuentaContableModel.strCompany_Desc=desc; 
    this.grupoCuentaContableModel.strCompany_Cod=cod;
    setTimeout(() => {
      this.load();
    }, 100)
  }
  load(){
    var object = JSON.parse(this.$route.query.data);
    var modulo = this.$route.query.vista;
    if(modulo.toLowerCase()!='visualizar'){
      this.txtmodulo='Modificar Salida';
      this.visualizar=false;
    }
    else{
      this.txtmodulo='Visualizar Salida';
      this.visualizar=true;
    }
    this.grupoCuentaContableModel=object;
  }

  //#region [COMPANIA]
  loadCompania(){
    this.dialogCompania=true;
  }
  companiaSeleccionado(val:CompaniaModel,dialog:boolean){
    this.companiaModel=val;
    this.grupoCuentaContableModel.strCompany_Cod=this.companiaModel.strCompany_Cod;
    this.grupoCuentaContableModel.strCompany_Desc=this.companiaModel.strCompany_Desc;
    this.dialogCompania=false;    
  }
  companiaClose(){
    this.companiaModel=new CompaniaModel();
    this.dialogCompania=false;
  }
  
  activar_compania(){
    setTimeout(() => {
      this.btnactivarcompania=true;
    }, 120)
  }
  desactivar_compania(){
    debugger;
    if(this.dialogCompania){
      this.btnactivarcompania=false;      
    }
  }
  closeCompania(){
    this.btnactivarcompania=false;
    this.dialogCompania=false;
    return false;
  }
  //#endregion
  
  guardarTodo(){
    grupocuentacontableService.CrearGrupoCuenta(this.grupoCuentaContableModel)
    .then(response=>{
      this.issave=true;
      this.textosave='Se guardo correctamente.'
      this.grupoCuentaContableModel.strGrpAcctCont_Cod='';
      this.grupoCuentaContableModel.strGrpAcctCont_Desc='';
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo guardar producto'
      });
    })
  }


  data(){
    return{
      nameComponent:'crear-ingreso-comprobante',
      fechavencida:'',
      dialogTableVisible: false,
      periodoData:'',
      selectData:'',
      selectType:'',
      dataProveedor:[],
      ordencompraDetalle:[],
      codigoCompania:'001',
      totalDinero:0,
      totalUnidad:0,
      salidaUnidad:'',
      salidaDinero:'',
      totalDolars:'',
      TotalPagarS:'',
      TotalPagarD:'',
      voucher:'',
      habilitar:false,
      habilitarPane:true,
     
      tabletipo:[{
        strType_Cod:"10",
        strType_Desc:"Cuenta Balance"
      },
      {
        strType_Cod:"20",
        strType_Desc:"Elemento Gasto"
      }],
      tabletipo1:[{
        strType_Cod:"T",
        strType_Desc:"Titulo"
      },
      {
        strType_Cod:"D",
        strType_Desc:"Detalle"
      }],
    }
  }
  
}
