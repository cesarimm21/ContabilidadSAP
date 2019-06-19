import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
//***Modelos */
import {TipoMovimientoModel} from '@/modelo/maestro/tipoMovimiento';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import tipomovimientoService from '@/components/service/tipomovimiento.service';
@Component({
  name: 'modificar-tipo-movimiento',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class ModificarTipoMovimientoComponent extends Vue {
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

    public tipomovimiento:TipoMovimientoModel=new TipoMovimientoModel();
    constructor(){    
        super();
        Global.nameComponent='modificar-criticidad';
        
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
            this.txtmodulo='Modificar Tipo Movimiento';
            this.visualizar=false;
        }
        else{
            this.txtmodulo='Visualizar Tipo Movimiento';
            this.visualizar=true;
        }
        this.cargar(object.strTypeMov_Cod);
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
    }

    cargar(code){

        tipomovimientoService.GetOnlyOneTipoMovimiento(code)
        .then(resp=>{   
            this.tipomovimiento=resp;
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
        if(this.tipomovimiento.strDoc_Trans_Num==''){ this.$message('Complete los campos obligatorios')}
        if(this.tipomovimiento.strTypeMov_Desc==''){ this.$message('Complete los campos obligatorios')}
        else{
            this.tipomovimiento.chrStatus='A';
            tipomovimientoService.UpdateTipoMovimiento(this.tipomovimiento)
            .then(resp=>{
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: 'Se guardo Correctamente '+resp.strTypeMov_Cod
                  });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se guardo correctamente. '+resp.strTypeMov_Cod;
                this.tipomovimiento=new TipoMovimientoModel();
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
