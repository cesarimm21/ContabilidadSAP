import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import { Loading } from 'element-ui';
import {PlanConLocalModel} from '@/modelo/maestro/plancontlocal';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import planService from '@/components/service/planCuentaContable.service';
@Component({
  name: 'crear-planconlocal',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class CrearPlanLocalComponent extends Vue {
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  companyName:any;
  companyCod:any;
  public planconlocal:PlanConLocalModel=new PlanConLocalModel();
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  btnactivarsucursal:boolean=false;
  btnactivarplanta:boolean=false;
  plantaVisible:boolean=false;
  sucursalVisible:boolean=false;
  constructor(){    
        super();
        Global.nameComponent='crear-planconlocal';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');  
    }  
    
    guardarComprobante(){
      var user:any=localStorage.getItem('User_Usuario');
      this.planconlocal.strCreation_User=user;
      this.planconlocal.strCompany_Cod=this.companyCod;
      this.planconlocal.strCompany_Desc=this.companyName;
      let loadingInstance = Loading.service({
          fullscreen: true,
          text: 'Guardando...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.8)'
          }
        );     
      if(this.planconlocal.strChartAcct_L_Cod!=''&&this.planconlocal.strChartAcct_L_Desc!=''){
        planService.createtblPlanConLocal(this.planconlocal)
        .then(resp=>{
          loadingInstance.close();
          this.$message({
              showClose: true,
                type: 'success',
                message: 'Se guardo Correctamente '+resp
              });
              this.planconlocal=new PlanConLocalModel();
              this.issave = true;
              this.iserror = false;
              this.textosave = 'Se guardo correctamente. '+resp;
          }).catch(errorss=>{
            loadingInstance.close();
            this.$message({
              showClose: true,
                type:'error',
                message: 'No se guardo Correctamente '
              });
              this.issave = false;
              this.iserror = true;
              this.textosave = 'No se guardo Correctamente ';
          })
      }
      else{
        this.$message({
            showClose: true,
            type: 'error',
            message: 'Complete datos'
          });
        this.issave = false;
        this.iserror = true;
        this.textosave = 'Complete datos.';
      }     
        
    } 
    fnOcultar(){

    }
    handleChange(value) {
        console.log(value);
      }
      backPage(){
        window.history.back();
      }
      reloadpage(){
        window.location.reload();
      }
    data(){
        return{     
            companyName:'',
            companyCod:''
          }
    }
  
}
