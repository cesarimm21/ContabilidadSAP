import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
//***Modelos */
import {TipoMovimientoModel} from '@/modelo/maestro/tipoMovimiento';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import tipomovimientoService from '@/components/service/tipomovimiento.service';
@Component({
  name: 'crear-tipo-movimiento',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class CrearTipoMovimientoComponent extends Vue {
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
    companyName:any;
    companyCod:any;
    issave:boolean=false;
    iserror:boolean=false;
    textosave:string='';
    nameuser:any='';
    public tipomovimiento:TipoMovimientoModel=new TipoMovimientoModel();
  constructor(){    
        super();
        Global.nameComponent='crear-tipo-movimiento';
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
        if(this.tipomovimiento.strDoc_Trans_Num==''){ this.$message('Complete los campos obligatorios')}
        if(this.tipomovimiento.strTypeMov_Cod==''){ this.$message('Complete los campos obligatorios')}
        if(this.tipomovimiento.strTypeMov_Desc==''){ this.$message('Complete los campos obligatorios')}
        else{
            let loadingInstance = Loading.service({
                fullscreen: true,
                text: 'Guardando...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
                }
            );   
            this.tipomovimiento.chrStatus='A';
            this.tipomovimiento.strCreation_User=this.nameuser;
            tipomovimientoService.CrearTipoMovimiento(this.tipomovimiento)
            .then(resp=>{
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: 'Se guardo Correctamente '+resp.strTypeMov_Cod
                  });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se guardo correctamente. '+resp.strTypeMov_Cod;
                this.tipomovimiento=new TipoMovimientoModel();
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
