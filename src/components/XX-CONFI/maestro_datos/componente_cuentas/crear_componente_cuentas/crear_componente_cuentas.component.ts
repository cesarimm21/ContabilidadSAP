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
  name: 'crear-componente-cuentas',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class CrearComponenteCuentasComponent extends Vue {
    nameComponent:string;
    fecha_actual:string;
    fecha_ejecucion:string;
    companyName:any;
    companyCod:any;
    issave:boolean=false;
    iserror:boolean=false;
    textosave:string='';
    nameuser:any='';
    public componente:ComponenteCuentaContableModel=new ComponenteCuentaContableModel();    
    inputAtributo:any;

    constructor(){    
        super();
        Global.nameComponent='crear-componente-cuentas';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
        this.nameuser=localStorage.getItem('User_Usuario');
    }
    guardarTodo(){       
        this.componente.strCompany_Cod=this.companyCod;
        this.componente.strCompany_Desc=this.companyName;
        if(this.componente.strComp_Cod==''){ this.$message('Complete los campos obligatorios'); return false;}
        if(this.componente.strComp_Desc==''){ this.$message('Complete los campos obligatorios'); return false;}
        else{

            let loadingInstance = Loading.service({
                fullscreen: true,
                text: 'Guardando...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
                }
            );   
            this.componente.chrStatus='A';
            this.componente.strCreation_User=this.nameuser;
            componenteService.CrearComponete(this.componente)
            .then(resp=>{
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: 'Se guardo Correctamente '+resp.strComp_Cod
                  });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se guardo correctamente. '+resp.strComp_Cod;
                this.componente=new ComponenteCuentaContableModel();
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
