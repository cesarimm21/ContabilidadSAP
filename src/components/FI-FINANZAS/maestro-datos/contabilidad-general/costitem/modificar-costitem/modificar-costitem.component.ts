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
export default class ModificarCostItemComponent extends Vue {
  
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
  txtmodulo:string='';
  visualizar:boolean=false;
  txtviewmodulo:any;
  constructor(){    
    super();
    Global.nameComponent='modificar-cositem';
    var desc:any=localStorage.getItem('compania_name');
    var cod:any=localStorage.getItem('compania_cod');
    var id:any=localStorage.getItem('compania_ID');
    this.cositemModel.strCompany_Desc=desc; 
    this.cositemModel.strCompany_Cod=cod;
    setTimeout(() => {
      this.load();
    }, 100)
  }
  load(){
    var object = JSON.parse(this.$route.query.data);
    var modulo = this.$route.query.vista;
    this.txtviewmodulo=this.$route.query.vista;
    if(modulo.toLowerCase()!='visualizar'){
      this.txtmodulo='Modificar CostItem';
      this.visualizar=false;
    }
    else{
      this.txtmodulo='Visualizar  CostItem';
      this.visualizar=true;
    }
    this.cositemModel=object;
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
  // limpiar(){
  //   this.cositemModel.strCost_Item_Cod='';
  //   this.cositemModel.strCost_Item_Pos1='';
  //   this.cositemModel.strCost_Item_Desc1='';
  //   this.cositemModel.strCost_Item_Pos2='';
  //   this.cositemModel.strCost_Item_Desc2='';
  //   this.cositemModel.strCost_Item_Pos3='';
  //   this.cositemModel.strCost_Item_Desc3='';
  // }
  guardarTodo(){

  if(this.txtviewmodulo=='modificar'){
    if(this.cositemModel.strCost_Item_Cod==''){ this.$message('Complete los campos obligatorios')}
    if(this.cositemModel.strCost_Item_Pos1==''){ this.$message('Complete los campos obligatorios')}
    if(this.cositemModel.strCost_Item_Desc1==''){ this.$message('Complete los campos obligatorios')}
    if(this.cositemModel.strCost_Item_Pos2==''){ this.$message('Complete los campos obligatorios')}
    if(this.cositemModel.strCost_Item_Desc2==''){ this.$message('Complete los campos obligatorios')}
    if(this.cositemModel.strCost_Item_Pos3==''){ this.$message('Complete los campos obligatorios')}
    if(this.cositemModel.strCost_Item_Desc3==''){ this.$message('Complete los campos obligatorios')}
    else{
        let loadingInstance = Loading.service({
          fullscreen: true,
          text: 'Guardando...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.8)'
          }
      );   
      var user:any=localStorage.getItem('User_Usuario');
      this.cositemModel.strCreation_User=user;
      costitemService.UpdateCostItemID(this.cositemModel)
      .then(resp=>{
        loadingInstance.close();
        this.$message({
            showClose: true,
            type: 'success',
            message: 'Se guardo Correctamente '+resp.strCost_Item_Cod
          });
        this.issave = true;
        this.iserror = false;
        this.textosave = 'Se guardo correctamente. '+resp.strCost_Item_Cod;
    }).catch(error=>{
        loadingInstance.close();
        this.$message({
            showClose: true,
            type: 'error',
            message: 'No se pudo guardar'
          });
        this.issave = false;
        this.iserror = true;
        this.textosave = 'Error al guardar.';
    })
    }
    }
    else{
        this.$message({
            showClose: true,
            type: 'warning',
            message: 'Accion no permitida'
          });
    }
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
