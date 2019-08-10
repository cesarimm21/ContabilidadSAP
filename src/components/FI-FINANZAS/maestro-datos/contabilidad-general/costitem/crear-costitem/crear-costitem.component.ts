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
  public cositemModel:CostItemModel=new CostItemModel();
  btnactivarCuentaContablePadre:boolean=false;
  dialogTipoCuentaContable:boolean=false;
  nameuser:any;
  constructor(){    
    super();
    Global.nameComponent='crear-costitem';
    setTimeout(() => {
      this.load();
    }, 200) 
  }
  load(){
    var desc:any=localStorage.getItem('compania_name');
    var cod:any=localStorage.getItem('compania_cod');
    var id:any=localStorage.getItem('compania_ID');
    this.cositemModel.strCompany_Desc=desc; 
    this.cositemModel.strCompany_Cod=cod;
  }  
  guardarTodo(){
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
      this.nameuser=localStorage.getItem('User_Usuario');
      this.cositemModel.strCreation_User=this.nameuser;
      costitemService.CreateCostItem(this.cositemModel)
      .then(resp=>{
        this.cositemModel=new CostItemModel();
        this.load();
          this.$message({
              showClose: true,
              type: 'success',
              message: 'Se guardo Correctamente '+resp.strCost_Item_Cod
            });
          this.issave = true;
          this.iserror = false;
          this.textosave = 'Se guardo correctamente. '+resp.strCost_Item_Cod;                
          loadingInstance.close();
          }).catch(error=>{
              this.$message({
                  showClose: true,
                  type: 'error',
                  message: 'No se pudo guardar'
                });
              this.issave = false;
              this.iserror = true;
              this.textosave = 'Error al guardar.';
              loadingInstance.close();
          })
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
