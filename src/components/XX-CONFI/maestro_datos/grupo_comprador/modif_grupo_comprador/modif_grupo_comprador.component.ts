import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
//***Modelos */
import {GrupoCompradorModel} from '@/modelo/maestro/grupocomprador';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import grupoCompradorService from '@/components/service/grupocomprador.service';
@Component({
  name: 'modificar-grupocomprador',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class ModificarGrupoCompradorComponent extends Vue {
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

    public grupocomprador:GrupoCompradorModel=new GrupoCompradorModel();
    constructor(){    
        super();
        Global.nameComponent='modificar-grupocomprador';        
        setTimeout(() => {
            this.load();
        }, 100)
    }

    load(){
        this.grupocomprador= JSON.parse(this.$route.query.data);
        var modulo = this.$route.query.vista;
        this.txtviewmodulo=modulo;
        if(modulo.toLowerCase()!='visualizar'){
            this.txtmodulo='Modificar Grupo Comprador';
            this.visualizar=false;
        }
        else{
            this.txtmodulo='Visualizar Grupo Comprador';
            this.visualizar=true;
        }
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
    }

    // cargar(code){

    //     grupoCompradorService.GetOnlyOneGrupoComprador(code)
    //     .then(resp=>{   
    //         this.grupocomprador=resp;
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
        if(this.grupocomprador.strGrpPurch_Desc==''){ this.$message('Complete los campos obligatorios')}
        else{
            var user:any=localStorage.getItem('User_Usuario');
            this.grupocomprador.strModified_User=user;
            let loadingInstance = Loading.service({
                fullscreen: true,
                text: 'Guardando...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
                }
            ); 
            grupoCompradorService.UpdateGrupoComprador(this.grupocomprador)
            .then(resp=>{
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: 'Se guardo Correctamente '+resp
                  });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se guardo correctamente. '+resp;
                loadingInstance.close();
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
