import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import {AlmacenModel} from '@/modelo/maestro/almacen';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import almacenService from '@/components/service/almacen.service';
@Component({
  name: 'crear-almacen',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent
  }
})
export default class CrearAlmacenComponent extends Vue {
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  companyName:any;
  companyCod:any;
  public almacen:AlmacenModel=new AlmacenModel();
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  monedaVisible:boolean=false;
  btnactivarmonedaA:boolean=false;
  constructor(){    
        super();
        Global.nameComponent='crear-almacen';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');  
    }  
    
    guardarAlmacen(){
      var user:any=localStorage.getItem('User_Usuario');
      var id:any=localStorage.getItem('compania_ID');
      this.almacen.strCreation_User=user;
      this.almacen.intIdCompany_ID=id;
      this.almacen.strCompany_Cod=this.companyCod;
      if(this.almacen.strWHS_Cod!=''&&this.almacen.strWHS_Desc!=''){
        almacenService.crearAlmacen(this.almacen)
        .then(resp=>{
          this.$message({
              showClose: true,
                type: 'success',
                message: 'Se guardo Correctamente '
              });
              this.almacen=new AlmacenModel();
              this.issave = true;
              this.iserror = false;
              this.textosave = 'Se guardo correctamente. '+resp.strWHS_Cod;
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
