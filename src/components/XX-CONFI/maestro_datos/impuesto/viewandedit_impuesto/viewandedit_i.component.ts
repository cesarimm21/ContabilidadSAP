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
  name: 'viewandedit-impuesto',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class ViewAndEditImpuestoComponent extends Vue {
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
    companyName:any;
    companyCod:any;
    issave:boolean=false;
    iserror:boolean=false;
    textosave:string='';
    public Impuesto:ImpuestoModel=new ImpuestoModel();
    namepage:string;
    impDisabled:boolean=false;
  constructor(){    
        super();
        Global.nameComponent='viewandedit-impuesto';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.Impuesto= JSON.parse(this.$route.query.data);
        var vista=this.$route.query.vista;
        console.log(this.Impuesto);
        console.log(vista);
        
        if(vista=='Modificar Impuesto'){
        this.namepage='Modificar Impuesto';
        this.impDisabled=false;
        }
        if(vista=='Visualizar Impuesto'){
        this.namepage='Visualizar Impuesto';
        this.impDisabled=true;
        }
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');

    }
    updateTodo(){
        if(this.Impuesto.strWH_Cod==''){ this.$message('Complete los campos obligatorios')}
        if(this.Impuesto.strWH_Desc==''){ this.$message('Complete los campos obligatorios')}
        else{
            this.Impuesto.chrStatus='A';
            impuestoService.UpdateImpuesto(this.Impuesto)
            .then(resp=>{
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: 'Se actualizo Correctamente '+resp
                  });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se actualizo correctamente. '+resp;
                this.Impuesto=new ImpuestoModel();
            }).catch(error=>{
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: 'No se pudo actualizar'
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
    data(){
        return{     
            companyName:'',
            companyCod:'',
            namepage:''
        }
    }
  
}
