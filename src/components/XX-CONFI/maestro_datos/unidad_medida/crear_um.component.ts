import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import {UnidadMedidaModel} from '@/modelo/maestro/unidadmedida';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import umService from '@/components/service/unidadmedida.service';
@Component({
  name: 'crear-um',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class CrearUMComponent extends Vue {
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  companyName:any;
  companyCod:any;
  public unidad:UnidadMedidaModel=new UnidadMedidaModel();
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  constructor(){    
        super();
        Global.nameComponent='crear-um';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');  
    }
    upperCaseF(a){
      setTimeout(function(){
          a.value = a.value.toUpperCase();
      }, 1);
    }
    guardarUM(){
      var user:any=localStorage.getItem('User_Usuario');
      this.unidad.strCreation_User=user;
      if(this.unidad.strUM_Cod!=''&&this.unidad.strUM_Desc!=''){
        umService.CreateUM(this.unidad)
        .then(resp=>{
          this.$message({
              showClose: true,
                type: 'success',
                message: 'Se guardo Correctamente '
              });
              this.unidad=new UnidadMedidaModel();
              this.issave = true;
              this.iserror = false;
              this.textosave = 'Se guardo correctamente. '+resp.strUM_Cod;
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
