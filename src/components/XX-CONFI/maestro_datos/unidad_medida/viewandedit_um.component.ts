import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import { Loading } from 'element-ui';
import {UnidadMedidaModel} from '@/modelo/maestro/unidadmedida';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import umService from '@/components/service/unidadmedida.service';
@Component({
  name: 'viewandedit-um',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class ViewAndEditUMComponent extends Vue {
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  companyName:any;
  companyCod:any;
  public unidad:UnidadMedidaModel=new UnidadMedidaModel();
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  textTitle:string='';
  enabledtf:boolean=false;
  constructor(){    
        super();
        Global.nameComponent='viewandedit-um';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod'); 
        this.unidad= JSON.parse(this.$route.query.data); 
        var vista=this.$route.query.vista;
        if(vista=='modificar'){
          this.enabledtf=false;
          this.textTitle='Modificar Unidad Medida';
      }
      if(vista=='visualizar'){
          this.enabledtf=true;
          this.textTitle='Visualizar Unidad Medida';
      }
    }
    guardarUM(){
      var vista=this.$route.query.vista; 
      if(vista=='modificar'){
        var user:any=localStorage.getItem('User_Usuario');
        this.unidad.strModified_User=user;
        if(this.unidad.strUM_Cod!=''&&this.unidad.strUM_Desc!=''){              
                let loadingInstance = Loading.service({
                fullscreen: true,
                text: 'Actualizando...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
                }
                );     

          umService.UpdateUM(this.unidad)
          .then(resp=>{
            loadingInstance.close();
            this.$message({
                showClose: true,
                  type: 'success',
                  message: 'Se guardo Correctamente '+resp
                });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se guardo correctamente. '+resp;
            }).catch(ee=>{
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
          type: 'info',
          message: 'Accion no permitida'
        });
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
            companyCod:'',
            textTitle:''
          }
    }
  
}
