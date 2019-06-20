import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
//***Modelos */
import {PlantaModel} from '@/modelo/maestro/planta';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import plantaService from '@/components/service/planta.service';
import {PaisModel} from '@/modelo/maestro/pais';
import BPaisComponent from '@/components/buscadores/b_pais/b_pais.vue';

@Component({
  name: 'crear-planta',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'bpais':BPaisComponent
  }
})
export default class CrearPlantaComponent extends Vue {
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
    companyName:any;
    companyCod:any;
    issave:boolean=false;
    iserror:boolean=false;
    textosave:string='';
    nameuser:any='';
    public planta:PlantaModel=new PlantaModel();
    public gridSelectPais:PaisModel=new PaisModel();
    paisVisible:boolean=false;
    btnactivarpais:boolean=false;
  constructor(){    
        super();
        Global.nameComponent='crear-planta';
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
        if(this.planta.strPlant_Cod==''){ this.$message('Complete los campos obligatorios');return false;}
        if(this.planta.strPlan_Desc==''){ this.$message('Complete los campos obligatorios');return false;}
        
        else{
            let loadingInstance = Loading.service({
                fullscreen: true,
                text: 'Guardando...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
                }
            );   
            this.planta.chrStatus='A';
            this.planta.strCompany_Cod=this.companyCod;
            this.planta.strCompany_Desc=this.companyName;
            this.planta.strCreation_User=this.nameuser;
            plantaService.Crearplanta(this.planta)
            .then(resp=>{
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: 'Se guardo Correctamente '+resp.strPlant_Cod
                  });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se guardo correctamente. '+resp.strPlant_Cod;
                this.planta=new PlantaModel();
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
