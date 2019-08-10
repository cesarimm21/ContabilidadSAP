import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import componenteService from '@/components/service/componentecuentacontable.service';
//***Modelos */
import {ComponenteCuentaContableModel} from '@/modelo/maestro/componentecuentacontable';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
@Component({
  name: 'modificar-componentes-cuentas',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class ModificarComponenteCuentasComponent extends Vue {
    nameComponent:string;
    fecha_actual:string;
    fecha_ejecucion:string;
    companyName:any;
    companyCod:any;
    issave:boolean=false;
    iserror:boolean=false;
    textosave:string='';
    txtviewmodulo:string='';
    txtmodulo:string='';
    visualizar:boolean=false;
    public componente:ComponenteCuentaContableModel=new ComponenteCuentaContableModel();
    nameuser:any;
    
    constructor(){    
        super();
        Global.nameComponent='modificar-componentes-cuentas';
        
        setTimeout(() => {
            this.load();
        }, 100)
    }

    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
        this.nameuser=localStorage.getItem('User_Usuario');
        var object = JSON.parse(this.$route.query.data);
        var modulo = this.$route.query.vista;
        this.txtviewmodulo=modulo;
        if(modulo.toLowerCase()!='visualizar'){
            this.txtmodulo='Modificar Componente Cuenta';
            this.visualizar=false;
        }
        else{
            this.txtmodulo='Visualizar Componente Cuenta';
            this.visualizar=true;
        }
        //this.cargar(object.strCompany_Cod);
        this.componente=object;
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
    }

    
    guardarTodo(){       
      var vista=this.$route.query.vista; 
      if(vista=='modificar'){

      if(this.componente.strComp_Cod==''){ this.$message('Complete los campos obligatorios 3'); return false;}
      if(this.componente.strComp_Desc==''){ this.$message('Complete los campos obligatorios 4'); return false;}
      else{

          let loadingInstance = Loading.service({
              fullscreen: true,
              text: 'Actualizando...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.8)'
              }
          );   
          this.componente.chrStatus='A';
          this.componente.strModified_User=this.nameuser;
          componenteService.UpdateComponenteCuenta(this.componente)
          .then(resp=>{
              this.$message({
                  showClose: true,
                  type: 'success',
                  message: 'Se actualizo Correctamente '+resp.strComp_Cod
                });
              this.issave = true;
              this.iserror = false;
              this.textosave = 'Se actualizo correctamente. '+resp.strComp_Cod;
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
    }else{
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
            companyCod:''
        }
    }
  
}
