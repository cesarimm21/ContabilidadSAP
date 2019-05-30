import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import costitemService from '@/components/service/costitem.service';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import {CompaniaModel} from '@/modelo/maestro/compania';
import {CostItemModel} from '@/modelo/maestro/costitem';
import { Notification } from 'element-ui';
import BCompaniaProveedor from '@/components/buscadores/b_compania/b_compania.vue';
@Component({
  name: 'crear-costitem',
  components:{
    'bcompania':BCompaniaProveedor,
    'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class CrearCostItemComponent extends Vue {
  
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  ctaPadre:boolean=true;
  dialogCompania:boolean=true;
  
  btnactivarcompania:boolean=false;
  dataCompania:any[];
  public companiaModel:CompaniaModel=new CompaniaModel();
  public cositemModel:CostItemModel=new CostItemModel();
  btnactivarCuentaContablePadre:boolean=false;
  dialogTipoCuentaContable:boolean=false;

  constructor(){    
    super();
    Global.nameComponent='crear-ingreso-comprobante';
    var desc:any=localStorage.getItem('compania_name');
    var cod:any=localStorage.getItem('compania_cod');
    var id:any=localStorage.getItem('compania_ID');
    this.cositemModel.strCompany_Desc=desc; 
    this.cositemModel.strCompany_Cod=cod;
  
  }

  //#region [COMPANIA]
  loadCompania(){
    this.dialogCompania=true;
  }
  companiaSeleccionado(val:CompaniaModel,dialog:boolean){
    this.companiaModel=val;
    this.cositemModel.strCompany_Cod=this.companiaModel.strCompany_Cod;
    this.cositemModel.strCompany_Desc=this.companiaModel.strCompany_Desc;
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
  limpiar(){
    this.cositemModel.strCost_Item_Cod='';
    this.cositemModel.strCost_Item_Pos1='';
    this.cositemModel.strCost_Item_Desc1='';
    this.cositemModel.strCost_Item_Pos2='';
    this.cositemModel.strCost_Item_Desc2='';
    this.cositemModel.strCost_Item_Pos3='';
    this.cositemModel.strCost_Item_Desc3='';
  }
  guardarTodo(){
    console.log(this.cositemModel);
    costitemService.CreateCostItem(this.cositemModel)
    .then(response=>{
      this.issave=true;
      this.textosave='Se guardo correctamente.'
      this.limpiar();
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
