import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
//***Modelos */
import {CorrelativoModel} from '@/modelo/maestro/correlativo';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import correlativoService from '@/components/service/correlativo.service';
@Component({
  name: 'crear-correlativo',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class CrearCorrelativoComponent extends Vue {
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
    companyName:any;
    companyCod:any;
    issave:boolean=false;
    iserror:boolean=false;
    textosave:string='';
    nameuser:any='';
    public correlativo:CorrelativoModel=new CorrelativoModel();
  constructor(){    
        super();
        Global.nameComponent='crear-correlativo';
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
        if(this.correlativo.strModule==''){ this.$message('Complete los campos obligatorios')}
        if(this.correlativo.strCorrel_Cod==''){ this.$message('Complete los campos obligatorios')}
        if(this.correlativo.strProccess_Name==''){ this.$message('Complete los campos obligatorios')}
        if(this.correlativo.strTransaction_Name==''){ this.$message('Complete los campos obligatorios')}
        if(this.correlativo.fltOrigenDocum_NO==0){ this.$message('Complete los campos obligatorios')}
        else{
            let loadingInstance = Loading.service({
                fullscreen: true,
                text: 'Guardando...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
                }
            );   
            this.correlativo.chrStatus='A';
            this.correlativo.strCreation_User=this.nameuser;
            this.correlativo.strCompany_Cod=this.companyCod;
            this.correlativo.strCompany_Desc=this.companyName;
            correlativoService.CrearCorrelativo(this.correlativo)
            .then(resp=>{
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: 'Se guardo Correctamente '+resp.strCorrel_Cod
                  });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se guardo correctamente. '+resp.strCorrel_Cod;
                this.correlativo=new CorrelativoModel();
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
