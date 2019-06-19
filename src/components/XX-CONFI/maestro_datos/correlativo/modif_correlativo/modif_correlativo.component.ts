import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
//***Modelos */
import {CorrelativoModel} from '@/modelo/maestro/correlativo';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import correlativoService from '@/components/service/correlativo.service';
@Component({
  name: 'modificar-correlativo',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class ModificarCorrelativoComponent extends Vue {
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

    public correlativo:CorrelativoModel=new CorrelativoModel();
    constructor(){    
        super();
        Global.nameComponent='modificar-correlativo';
        
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
            this.txtmodulo='Modificar Correlativo';
            this.visualizar=false;
        }
        else{
            this.txtmodulo='Visualizar Correlativo';
            this.visualizar=true;
        }
        this.cargar(object.strCorrel_Cod);
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
    }

    cargar(code){

        correlativoService.GetCorrelativoId(code)
        .then(resp=>{   
            this.correlativo=resp;
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
        if(this.correlativo.strModule==''){ this.$message('Complete los campos obligatorios')}
        if(this.correlativo.strCorrel_Cod==''){ this.$message('Complete los campos obligatorios')}
        if(this.correlativo.strProccess_Name==''){ this.$message('Complete los campos obligatorios')}
        if(this.correlativo.strTransaction_Name==''){ this.$message('Complete los campos obligatorios')}
        if(this.correlativo.fltOrigenDocum_NO==0){ this.$message('Complete los campos obligatorios')}
         else{
            this.correlativo.chrStatus='A';
            correlativoService.UpdateCorrelativo(this.correlativo)
            .then(resp=>{
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: 'Se guardo Correctamente '+resp.strCorrel_Cod
                  });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se guardo correctamente. '+resp.strCorrel_Cod;
                this.correlativo=new CorrelativoModel();
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
