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
  name: 'modificar-rubro-cuenta',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class ModificarRubroCuentaComponent extends Vue {
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

    public rubrocuenta:RubroModel=new RubroModel();
    constructor(){    
        super();
        
        setTimeout(() => {
            this.load();
        }, 100)
    }

    load(){
        debugger;
        var object = JSON.parse(this.$route.query.data);
        var modulo = this.$route.query.vista;
        this.txtviewmodulo=modulo;
        if(modulo.toLowerCase()!='visualizar'){
            this.txtmodulo='Modificar Rubro Cuenta';
            this.visualizar=false;
        }
        else{
            this.txtmodulo='Visualizar Rubro Cuenta';
            this.visualizar=true;
        }
        this.rubrocuenta=object
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
    }

    guardarTodo(){
        if(this.rubrocuenta.strAcctItem_Desc==''){ this.$message('Complete los campos obligatorios')}
        if(this.rubrocuenta.strAcctItem_Pos==''){ this.$message('Complete los campos obligatorios')}
        else{
            this.rubrocuenta.chrStatus='A';
            rubroService.updateRubro(this.rubrocuenta)
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
            }).catch(error=>{
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
