import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import { Loading } from 'element-ui';
import {ExoneracionOperacionesModel} from '@/modelo/maestro/exoneracionOperaciones';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import exoService from '@/components/service/exooperaciones.service';
import BCompaniaProveedor from '@/components/buscadores/b_compania/b_compania.vue';

@Component({
  name: 'viewandedit-exooperaciones',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'bcompania':BCompaniaProveedor,
  }
})
export default class ViewAndEditExoOperacionComponent extends Vue {
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  companyName:any;
  companyCod:any;
  textTitle:string='';
  enabledtf:boolean=false;
  public documento:ExoneracionOperacionesModel=new ExoneracionOperacionesModel();
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  btnactivarsucursal:boolean=false;
  btnactivarplanta:boolean=false;
  plantaVisible:boolean=false;
  sucursalVisible:boolean=false;
  btnactivarcompania:boolean=false;
  dialogCompania:boolean=false;

  constructor(){    
        super();
        Global.nameComponent='viewandedit-exooperaciones';
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
            this.textTitle='Modificar Exoneraciones de Operaciones';
        }
        if(vista=='visualizar'){
            this.enabledtf=true;
            this.textTitle='Visualizar Exoneraciones de Operaciones';
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
        if(this.documento.strNDExonIR_Cod!=''&&this.documento.strNDExonIR_Desc!=''){
          exoService.UpdateExoOperaciones(this.documento)
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
    
    loadCompania(){
      this.dialogCompania=true;
    }
    
    companiaSeleccionado(val){
      this.documento.strCompany_Cod=val.strCompany_Cod;
      this.documento.strCompany_Desc=val.strCompany_Desc;
      this.dialogCompania=false;
    }
    
    closeCompania(){
      this.btnactivarcompania=false;
      return false;
    }
    desactivar_compania(){
      if(this.dialogCompania){
        this.btnactivarcompania=false;
      }
    }
    activar_compania(){
      setTimeout(() => {
        this.btnactivarcompania=true;
      }, 120)
    }
    data(){
        return{     
            companyName:'',
            companyCod:'',
            textTitle:''
          }
    }
  
}
