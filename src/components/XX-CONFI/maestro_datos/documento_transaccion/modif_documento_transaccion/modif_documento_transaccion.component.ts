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
  name: 'modificar-documento-transaccion',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class ModificarDocumentoTransaccionComponent extends Vue {
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

    public documentotransaccion:DocumentoTransacionModel=new DocumentoTransacionModel();
    constructor(){    
        super();
        Global.nameComponent='modificar-documento-transaccion';
        
        setTimeout(() => {
            this.load();
        }, 100)
    }

    load(){
        debugger;
        var object = JSON.parse(this.$route.query.data);
        var modulo = this.$route.query.vista;
        this.txtviewmodulo=modulo;
        if(this.txtviewmodulo=='modificar'){
            this.txtmodulo='Modificar Documento Transaccion';
            this.visualizar=false;
        }
        else{
            this.txtmodulo='Visualizar Documento Transaccion';
            this.visualizar=true;
        }
        this.cargar(object.strDoc_Trans_Cod);
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
    }

    cargar(code){

        documentotransaccionService.GetOnlyOneDocumentoTransaccion(code)
        .then(resp=>{   
            this.documentotransaccion=resp;
        })
        .catch(error=>{
            this.$message({
                showClose: true,
                type: 'error',
                message: 'No se pudo cargar'
              });
            this.issave = false;
            this.iserror = true;
            this.textosave = 'Error al cargar.';
        })
    }
    guardarTodo(){
    if(this.txtviewmodulo=='modificar'){
        if(this.documentotransaccion.strDoc_Trans_Num==''){ this.$message('Complete los campos obligatorios')}
        if(this.documentotransaccion.strDoc_Trans_Desc==''){ this.$message('Complete los campos obligatorios')}
        else{
            var user:any=localStorage.getItem('User_Usuario');
                var id:any=localStorage.getItem('compania_ID');

                this.documentotransaccion.strModified_User=user;                
                let loadingInstance = Loading.service({
                fullscreen: true,
                text: 'Actualizando...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
                }
                );     

            documentotransaccionService.UpdateDocumentoTransaccion(this.documentotransaccion)
            .then(resp=>{
                loadingInstance.close();
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: 'Se guardo Correctamente '+resp.strDoc_Trans_Cod
                  });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se guardo correctamente. '+resp.strDoc_Trans_Cod;
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
    data(){
        return{     
            companyName:'',
            companyCod:''
        }
    }
  
}
