import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
//***Modelos */
import {RubroModel} from '@/modelo/maestro/rubro';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import rubroService from '@/components/service/rubro.service';
@Component({
  name: 'crear-rubro_cuenta',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class CrearRubroCuentaComponent extends Vue {
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
    companyName:any;
    companyCod:any;
    issave:boolean=false;
    iserror:boolean=false;
    textosave:string='';
    nameuser:any='';
    public rubrocuenta:RubroModel=new RubroModel();
  constructor(){    
        super();
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
        if(this.rubrocuenta.strAcctItem_Cod==''){ this.$message('Complete los campos obligatorios')}
        if(this.rubrocuenta.strAcctItem_Desc==''){ this.$message('Complete los campos obligatorios')}
        if(this.rubrocuenta.strAcctItem_Pos==''){ this.$message('Complete los campos obligatorios')}
        else{
            let loadingInstance = Loading.service({
                fullscreen: true,
                text: 'Guardando...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
                }
            );   
            this.rubrocuenta.chrStatus='A';
            this.rubrocuenta.strCreation_User=this.nameuser;
            this.rubrocuenta.strCompany_Cod=this.companyCod;
            this.rubrocuenta.strCompany_Desc=this.companyName;

            rubroService.createRubro(this.rubrocuenta)
            .then(resp=>{
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: 'Se guardo Correctamente '+resp.strAcctItem_Cod
                  });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se guardo correctamente. '+resp.strAcctItem_Cod;
                this.rubrocuenta=new RubroModel();
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
