import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
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
    }
    guardarUM(){
      var user:any=localStorage.getItem('User_Usuario');
      this.unidad.strModified_User=user;
      if(this.unidad.strUM_Cod!=''&&this.unidad.strUM_Desc!=''){
        umService.UpdateUM(this.unidad)
        .then(resp=>{
          this.$message({
              showClose: true,
                type: 'success',
                message: 'Se guardo Correctamente '+resp
              });
              this.issave = true;
              this.iserror = false;
              this.textosave = 'Se guardo correctamente. '+resp;
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
