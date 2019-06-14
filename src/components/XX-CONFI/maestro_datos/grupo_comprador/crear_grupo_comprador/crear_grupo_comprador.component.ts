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
import grupocompradorService from '@/components/service/grupocomprador.service';
@Component({
  name: 'crear-grupo-comprador',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class CrearGrupoCompradorComponent extends Vue {
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
    companyName:any;
    companyCod:any;
    issave:boolean=false;
    iserror:boolean=false;
    textosave:string='';
    public grupocomprador:GrupoCompradorModel=new GrupoCompradorModel();
  constructor(){    
        super();
        Global.nameComponent='crear-grupo-comprador';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');

    }
    guardarTodo(){
        if(this.grupocomprador.strGrpPurch_Cod==''){ this.$message('Complete los campos obligatorios')}
        if(this.grupocomprador.strGrpPurch_Desc==''){ this.$message('Complete los campos obligatorios')}
        else{
            let loadingInstance = Loading.service({
                fullscreen: true,
                text: 'Guardando...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
                }
            );   
            this.grupocomprador.chrStatus='A';
            grupocompradorService.CrearGrupoComprador(this.grupocomprador)
            .then(resp=>{
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: 'Se guardo Correctamente '+resp.strGrpPurch_Cod
                  });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se guardo correctamente. '+resp.strGrpPurch_Cod;
                this.grupocomprador=new GrupoCompradorModel();
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
