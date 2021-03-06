import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
//***Modelos */
import {DocumentoTransacionModel} from '@/modelo/maestro/documentotransaccion';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import documentotransaccionService from '@/components/service/documentotransaccion.service';
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
    public documentotransaccion:DocumentoTransacionModel=new DocumentoTransacionModel();
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
        if(this.documentotransaccion.strDoc_Trans_Num==''){ this.$message('Complete los campos obligatorios')}
        if(this.documentotransaccion.strDoc_Trans_Cod==''){ this.$message('Complete los campos obligatorios')}
        if(this.documentotransaccion.strDoc_Trans_Desc==''){ this.$message('Complete los campos obligatorios')}
        else{
            let loadingInstance = Loading.service({
                fullscreen: true,
                text: 'Guardando...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
                }
            );   
            this.documentotransaccion.chrStatus='A';
            this.documentotransaccion.strCreation_User=this.nameuser;
            documentotransaccionService.CrearDocumentoTransaccion(this.documentotransaccion)
            .then(resp=>{
              this.documentotransaccion=new DocumentoTransacionModel();
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: 'Se guardo Correctamente '+resp.strDoc_Trans_Cod
                  });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se guardo correctamente. '+resp.strDoc_Trans_Cod;                
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
