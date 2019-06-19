import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
//***Modelos */
import {DepartamentoModel} from '@/modelo/maestro/departamento';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import departamentoService from '@/components/service/departamento.service';
import {PaisModel} from '@/modelo/maestro/pais';
import BPaisComponent from '@/components/buscadores/b_pais/b_pais.vue';

@Component({
  name: 'crear-region',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'bpais':BPaisComponent
  }
})
export default class CrearRegionComponent extends Vue {
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
    companyName:any;
    companyCod:any;
    issave:boolean=false;
    iserror:boolean=false;
    textosave:string='';
    nameuser:any='';
    public region:DepartamentoModel=new DepartamentoModel();
    public gridSelectPais:PaisModel=new PaisModel();
    paisVisible:boolean=false;
    btnactivarpais:boolean=false;
  constructor(){    
        super();
        Global.nameComponent='crear-region';
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
        if(this.region.strRegion_Cod==''){ this.$message('Complete los campos obligatorios')}
        if(this.region.strRegion_Desc==''){ this.$message('Complete los campos obligatorios')}
        if(this.region.strCountry_Cod==''){ this.$message('Complete los campos obligatorios')}

        else{
            let loadingInstance = Loading.service({
                fullscreen: true,
                text: 'Guardando...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
                }
            );   
            this.region.chrStatus='A';
            this.region.strCreation_User=this.nameuser;
            departamentoService.CreateDepartamento(this.region)
            .then(resp=>{
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: 'Se guardo Correctamente '+resp.strRegion_Cod
                  });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se guardo correctamente. '+resp.strRegion_Cod;
                this.region=new DepartamentoModel();
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
    handleClosePais(){
    this.paisVisible=false;
    }
    paisSelect(val:PaisModel){
    this.gridSelectPais=val;
    this.region.intIdCountry_ID=this.gridSelectPais.intIdCountry_ID;
    this.region.strCountry_Cod=this.gridSelectPais.strCountry_Cod;
    this.region.strCountry_Name=this.gridSelectPais.strCountry_Name;
    this.paisVisible=false;
    }
    paisDialog(){
        this.paisVisible=true;
    }
    activar_Pais(){
        setTimeout(() => {
            this.btnactivarpais=true;
        }, 120)
    }
    desactivar_Pais(){
        if(this.paisVisible){
            this.btnactivarpais=false;
        }
    }
    data(){
        return{     
            companyName:'',
            companyCod:''
        }
    }
  
}
