import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
//***Modelos */
import {ImpuestoModel} from '@/modelo/maestro/impuesto';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import impuestoService from '@/components/service/impuesto.service';
@Component({
  name: 'crear-ingreso-comprobante',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class CrearImpuestoComponent extends Vue {
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
    companyName:any;
    companyCod:any;
    issave:boolean=false;
    iserror:boolean=false;
    textosave:string='';
    public Impuesto:ImpuestoModel=new ImpuestoModel();
  constructor(){    
        super();
        Global.nameComponent='crear-impusto';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');

    }
    guardarTodo(){
        if(this.Impuesto.strWH_Cod==''){ this.$message('Complete los campos obligatorios')}
        if(this.Impuesto.strWH_Desc==''){ this.$message('Complete los campos obligatorios')}
        else{
            this.Impuesto.chrStatus='A';
            impuestoService.CreateImpuesto(this.Impuesto)
            .then(resp=>{
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: 'Se guardo Correctamente '+resp
                  });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se guardo correctamente. '+resp;
                this.Impuesto=new ImpuestoModel();
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
