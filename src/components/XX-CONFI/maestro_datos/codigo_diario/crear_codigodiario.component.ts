import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import { Loading } from 'element-ui';
import {DiarioModel} from '@/modelo/maestro/diario';
import {CuentaContableModel} from '@/modelo/maestro/cuentacontable';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import BCuentaContableComponent from '@/components/buscadores/b_cuenta_contable/b_cuenta_contable.vue';
import diarioService from '@/components/service/diario.service';
@Component({
  name: 'crear-codigodiario',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'bcuentacontable':BCuentaContableComponent,
  }
})
export default class CrearCodigoDiarioComponent extends Vue {
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  companyName:any;
  companyCod:any;
  flag:string='';
  public diario:DiarioModel=new DiarioModel();
  public cuentaA:CuentaContableModel=new CuentaContableModel();
  public cuentaB:CuentaContableModel=new CuentaContableModel();
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  plantaVisible:boolean=false;
  sucursalVisible:boolean=false;
  btndocumentotransaccionA:boolean=false;
  btndocumentotransaccionB:boolean=false;
  dialogDocumentoTransaccion:boolean=false;
  constructor(){    
        super();
        Global.nameComponent='crear-codigodiario';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');  
    }  
    desactivar_documentoTransacionalA(){
      if(this.dialogDocumentoTransaccion){
        this.btndocumentotransaccionA=false;      
        this.btndocumentotransaccionB=true;      
      }
    }
    activar_documentoTransacionalA(){
      setTimeout(() => {
        this.btndocumentotransaccionA=true;
        this.btndocumentotransaccionB=false;
      }, 120)
    }
    desactivar_documentoTransacionalB(){
      if(this.dialogDocumentoTransaccion){
        this.btndocumentotransaccionA=true;      
        this.btndocumentotransaccionB=false;      
      }
    }
    activar_documentoTransacionalB(){
      setTimeout(() => {
        this.btndocumentotransaccionA=false;
        this.btndocumentotransaccionB=true;
      }, 120)
    }
    loadDocumentoTransaccion(val){
      this.flag=val;
      this.dialogDocumentoTransaccion=true;
    }
    closeDialogCuentaContableHaber(){
      this.dialogDocumentoTransaccion=false;
    }
    cuentacontableselecionadohaber(val:CuentaContableModel){
      if(this.flag=='A'){
        this.cuentaA=val;
        this.diario.strDaily_AccLocal=this.cuentaA.strAcc_Local_NO;
      }
      if(this.flag=='B'){
        this.cuentaB=val;
        this.diario.strDaily_AccForen=this.cuentaA.strAcc_Local_NO;
      }
      this.dialogDocumentoTransaccion=false;  
    }
    guardarComprobante(){
      var user:any=localStorage.getItem('User_Usuario');
      var id:any=localStorage.getItem('compania_ID');
      this.diario.strCreation_User=user;
      let loadingInstance = Loading.service({
        fullscreen: true,
        text: 'Guardando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
        );     
      if(this.diario.strDaily_Cod!=''&&this.diario.strDaily_Desc!=''){
        diarioService.CreateDiarios(this.diario)
        .then(resp=>{
          loadingInstance.close();
          this.$message({
              showClose: true,
                type: 'success',
                message: 'Se guardo Correctamente '+resp
              });
              this.diario=new DiarioModel();
              this.cuentaA=new CuentaContableModel()
              this.cuentaB=new CuentaContableModel()
              this.issave = true;
              this.iserror = false;
              this.textosave = 'Se guardo correctamente. '+resp;
          }).catch(errorss=>{
            loadingInstance.close();
            this.$message({
              showClose: true,
                type:'error',
                message: 'No se guardo Correctamente '
              });
              this.issave = false;
              this.iserror = true;
              this.textosave = 'No se guardo Correctamente ';
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
