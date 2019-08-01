import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
//***Modelos */
import {PrioridadModel} from '@/modelo/maestro/prioridad';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import prioridadService from '@/components/service/prioridad.service';
import {PaisModel} from '@/modelo/maestro/pais';
import BPaisComponent from '@/components/buscadores/b_pais/b_pais.vue';

@Component({
  name: 'modificar-prioridad',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'bpais':BPaisComponent
  }
})
export default class ModificarPrioridadComponent extends Vue {
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
    public prioridad:PrioridadModel=new PrioridadModel();
    public gridSelectPais:PaisModel=new PaisModel();
    paisVisible:boolean=false;
    btnactivarpais:boolean=false;
    nameuser:any;
    constructor(){    
        super();
        Global.nameComponent='modificar-prioridad';
        
        this.nameuser=localStorage.getItem('User_Usuario');
        setTimeout(() => {
            this.load();
        }, 100)
    }

    load(){
        this.prioridad= JSON.parse(this.$route.query.data);
        var modulo = this.$route.query.vista;
        this.txtviewmodulo=modulo;
        if(modulo.toLowerCase()!='visualizar'){
            this.txtmodulo='Modificar Prioridad';
            this.visualizar=false;
        }
        else{
            this.txtmodulo='Visualizar Prioridad';
            this.visualizar=true;
        }
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
    }

    // cargar(code){

    //     prioridadService.GetOnlyOnePrioridad(code)
    //     .then(resp=>{   
    //         this.prioridad=resp;
    //     })
    //     .catch(error=>{
    //         this.$message({
    //             showClose: true,
    //             type: 'error',
    //             message: 'No se pudo cargar'
    //           });
    //         this.issave = false;
    //         this.iserror = true;
    //         this.textosave = 'Error al cargar.';
    //     })
    // }
    guardarTodo(){
    if(this.txtviewmodulo=='modificar'){
        if(this.prioridad.strPriority_Desc==''){ this.$message('Complete los campos obligatorios');return false;}
        else{
            this.prioridad.chrStatus='A';
            this.prioridad.strModified_User=this.nameuser;
            let loadingInstance = Loading.service({
                fullscreen: true,
                text: 'Actualizando...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
                }
                );     
            prioridadService.Updateprioridad(this.prioridad)
            .then(resp=>{
                loadingInstance.close();
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: 'Se guardo Correctamente '+resp.strPriority_Cod
                  });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se guardo correctamente. '+resp.strPriority_Cod;
            }).catch(error=>{
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
    }
    else{
        this.$message({
            showClose: true,
            type: 'warning',
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
      handleClosePais(){
        this.paisVisible=false;
        }
    data(){
        return{     
            companyName:'',
            companyCod:''
        }
    }
  
}
