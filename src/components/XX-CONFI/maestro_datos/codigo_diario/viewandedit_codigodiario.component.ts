import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import { Loading } from 'element-ui';
import {CuentaContableModel} from '@/modelo/maestro/cuentacontable';
import {DiarioModel} from '@/modelo/maestro/diario';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import diarioService from '@/components/service/diario.service';
@Component({
  name: 'viewandedit-diario',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class ViewAndEditCodigoDiarioComponent extends Vue {
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  companyName:any;
  companyCod:any;
  textTitle:string='';
  enabledtf:boolean=false;
  public documento:DiarioModel=new DiarioModel();
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  btnactivarsucursal:boolean=false;
  btnactivarplanta:boolean=false;
  plantaVisible:boolean=false;
  sucursalVisible:boolean=false;
  flag:string='';
  btndocumentotransaccionA:boolean=false;
  btndocumentotransaccionB:boolean=false;
  dialogDocumentoTransaccion:boolean=false;
  public cuentaA:CuentaContableModel=new CuentaContableModel();
  public cuentaB:CuentaContableModel=new CuentaContableModel();
  constructor(){    
        super();
        Global.nameComponent='viewandedit-diario';
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
            this.textTitle='Modificar Diario';
        }
        if(vista=='visualizar'){
            this.enabledtf=true;
            this.textTitle='Visualizar Diario';
        }

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
        this.documento.strDaily_AccLocal=this.cuentaA.strAcc_Local_NO;
      }
      if(this.flag=='B'){
        this.cuentaB=val;
        this.documento.strDaily_AccForen=this.cuentaA.strAcc_Corp_NO;
      }
      this.dialogDocumentoTransaccion=false;  
    }
    guardarTipoDocIdent(){
      var vista=this.$route.query.vista; 
      if(vista=='modificar'){
        var user:any=localStorage.getItem('User_Usuario');
        var id:any=localStorage.getItem('compania_ID');

        this.documento.strCreation_User=user;
        
        let loadingInstance = Loading.service({
          fullscreen: true,
          text: 'Guardando...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.8)'
          }
          );     
        if(this.documento.strDaily_Cod!=''&&this.documento.strDaily_Desc!=''){
          diarioService.UpdateDiarios(this.documento)
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
