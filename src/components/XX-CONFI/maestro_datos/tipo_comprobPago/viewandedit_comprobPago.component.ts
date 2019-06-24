import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import { Loading } from 'element-ui';
import {TipoComprobantePagoModel} from '@/modelo/maestro/tipocomprobantepago';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import tipodocService from '@/components/service/tipocomprobantepago.service';
@Component({
  name: 'viewandedit-comprobpago',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class ViewAndEditComprobPagoComponent extends Vue {
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  companyName:any;
  companyCod:any;
  textTitle:string='';
  enabledtf:boolean=false;
  public documento:TipoComprobantePagoModel=new TipoComprobantePagoModel();
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  btnactivarsucursal:boolean=false;
  btnactivarplanta:boolean=false;
  plantaVisible:boolean=false;
  sucursalVisible:boolean=false;
  constructor(){    
        super();
        Global.nameComponent='viewandedit-comprobpago';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod'); 
        this.documento= JSON.parse(this.$route.query.data); 
        var vista=this.$route.query.vista;
        if(vista=='modificar'){
            this.enabledtf=false;
            this.textTitle='Modificar Tipo de Comprobante Pago';
        }
        if(vista=='visualizar'){
            this.enabledtf=true;
            this.textTitle='Visualizar Tipo de Comprobante Pago';
        }

    }  
    guardarTipoDocIdent(){
      var vista=this.$route.query.vista; 
      if(vista=='modificar'){
        var user:any=localStorage.getItem('User_Usuario');
        var id:any=localStorage.getItem('compania_ID');

        this.documento.strModified_User=user;
        
        let loadingInstance = Loading.service({
          fullscreen: true,
          text: 'Guardando...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.8)'
          }
          );     
        if(this.documento.strDocType_Cod!=''&&this.documento.strDocType_Desc!=''){
          tipodocService.UpdateTipoComprobante(this.documento)
          .then(resp=>{
            loadingInstance.close();
            this.$message({
                showClose: true,
                  type: 'success',
                  message: 'Se actualizo Correctamente '+resp
                });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se actualizo correctamente. '+resp;
            }).catch(errorss=>{
              loadingInstance.close();
              this.$message({
                showClose: true,
                  type:'error',
                  message: 'No se actualizo Correctamente '
                });
                this.issave = false;
                this.iserror = true;
                this.textosave = 'No se actualizo Correctamente ';
            })
        }
        else{
          this.$message({
              showClose: true,
              type: 'error',
              message: 'Complete datos'
            });
          this.issave = false;
          this.iserror = true;
          this.textosave = 'Complete datos.';
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
            companyCod:'',
            textTitle:''
          }
    }
  
}
