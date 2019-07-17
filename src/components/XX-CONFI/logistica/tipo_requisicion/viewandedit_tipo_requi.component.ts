import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import { Loading } from 'element-ui';
import {TipoRequisicionModel} from '@/modelo/maestro/tipoRequisicion';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import tiporeqService from '@/components/service/tipoRequisicion.service';
@Component({
  name: 'crear-tiporequisicion',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class ViewAndEditTipoRequisicionComponent extends Vue {
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  companyName:any;
  companyCod:any;
  texttittle:string;
  public tipoRequi:TipoRequisicionModel=new TipoRequisicionModel();
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  enabledtf:boolean=false;
  constructor(){    
        super();
        Global.nameComponent='crear-tiporequisicion';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod'); 
        this.tipoRequi= JSON.parse(this.$route.query.data); 
        var vista=this.$route.query.vista;
        if(vista=='modificar'){
            this.enabledtf=false;
            this.texttittle='Modificar Tipo Requisicion';
        }
        if(vista=='visualizar'){
            this.enabledtf=true;
            this.texttittle='Visualizar Tipo Requisicion';
        }
    } 
    guardarTipoRequisicion(){
      var user:any=localStorage.getItem('User_Usuario');
      var vista=this.$route.query.vista; 
      this.tipoRequi.strModified_User=user;
      if(vista=='modificar'){
        let loadingInstance = Loading.service({
          fullscreen: true,
          text: 'Actualizando...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.8)'
          }
        );     
        if(this.tipoRequi.strTypeReq_Cod!=''&&this.tipoRequi.strTipReq_Desc!=''){
          tiporeqService.UpdateTipoRequisicion(this.tipoRequi)
          .then(resp=>{
            loadingInstance.close();
            this.$message({
                showClose: true,
                  type: 'success',
                  message: 'Se actualizo Correctamente '+resp
                });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se actualizo correctamente. '+resp;
            }).catch(errorss=>{
              loadingInstance.close();
              this.$message({
                showClose: true,
                  type:'error',
                  message: 'No se actualizo Correctamente '
                });
                this.issave = false;
                this.iserror = true;
                this.textosave = 'No se actualizo Correctamente ';
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
      else{
        this.$message({
          showClose: true,
          type: 'warning',
          message: 'Accion no permitida'
        });
      }
        
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
            companyCod:'',
            texttittle:''
          }
    }
  
}
