import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
//***Modelos */
import {GrupoProcesoModel} from '@/modelo/maestro/grupoproceso';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import grupoprocesoService from '@/components/service/grupoproceso.service';
@Component({
  name: 'crear-grupo-proceso',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class CrearGrupoProcesoComponent extends Vue {
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
    companyName:any;
    companyCod:any;
    issave:boolean=false;
    iserror:boolean=false;
    textosave:string='';
    nameuser:any='';
    public grupoproceso:GrupoProcesoModel=new GrupoProcesoModel();
  constructor(){    
        super();
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
        if(this.grupoproceso.strCCGrpProc_Cod==''){ this.$message('Complete los campos obligatorios')}
        if(this.grupoproceso.strCCGrpProc_Desc==''){ this.$message('Complete los campos obligatorios')}
        if(this.grupoproceso.strCCGrpProc_Name==''){ this.$message('Complete los campos obligatorios')}
        else{
            let loadingInstance = Loading.service({
                fullscreen: true,
                text: 'Guardando...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
                }
            );   
            this.grupoproceso.chrStatus='A';
            this.grupoproceso.strCreation_User=this.nameuser;
            this.grupoproceso.strCompany_Cod=this.companyCod;
            this.grupoproceso.strCompany_Desc=this.companyName;
            grupoprocesoService.CrearGrupoProceso(this.grupoproceso)
            .then(resp=>{
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: 'Se guardo Correctamente '+resp.strCCGrpProc_Cod
                  });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se guardo correctamente. '+resp.strCCGrpProc_Cod;
                this.grupoproceso=new GrupoProcesoModel();
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
