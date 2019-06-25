import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import { Loading } from 'element-ui';
import {ExoneracionOperacionesModel} from '@/modelo/maestro/exoneracionOperaciones';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import exoService from '@/components/service/exooperaciones.service';
@Component({
  name: 'crear-exooperacion',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class CrearExoOperacionComponent extends Vue {
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  companyName:any;
  companyCod:any;
  public operaciones:ExoneracionOperacionesModel=new ExoneracionOperacionesModel();
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  btnactivarsucursal:boolean=false;
  btnactivarplanta:boolean=false;
  plantaVisible:boolean=false;
  sucursalVisible:boolean=false;
  constructor(){    
        super();
        Global.nameComponent='crear-exooperacion';
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
      var id:any=localStorage.getItem('compania_ID');
      this.operaciones.strCreation_User=user;
      let loadingInstance = Loading.service({
        fullscreen: true,
        text: 'Guardando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
        );     
      if(this.operaciones.strNDExonIR_Cod!=''&&this.operaciones.strNDExonIR_Desc!=''){
        exoService.CreateExoOperaciones(this.operaciones)
        .then(resp=>{
          loadingInstance.close();
          this.$message({
              showClose: true,
                type: 'success',
                message: 'Se guardo Correctamente '+resp
              });
              this.operaciones=new ExoneracionOperacionesModel();
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
