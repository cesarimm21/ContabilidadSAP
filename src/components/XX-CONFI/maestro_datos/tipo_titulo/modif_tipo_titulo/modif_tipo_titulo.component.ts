import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
//***Modelos */
import {TipoTituloModel} from '@/modelo/maestro/tipoTitulo';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import tipotituloService from '@/components/service/tipotitulo.service';
import {PaisModel} from '@/modelo/maestro/pais';
import BPaisComponent from '@/components/buscadores/b_pais/b_pais.vue';

@Component({
  name: 'modificar-tipotitulo',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'bpais':BPaisComponent
  }
})
export default class ModificarTipoTituloComponent extends Vue {
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
    public tipotitulo:TipoTituloModel=new TipoTituloModel();
    public gridSelectPais:PaisModel=new PaisModel();
    paisVisible:boolean=false;
    btnactivarpais:boolean=false;
    constructor(){    
        super();
        Global.nameComponent='modificar-tipotitulo';
        
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
            this.txtmodulo='Modificar Tipo Titulo';
            this.visualizar=false;
        }
        else{
            this.txtmodulo='Visualizar Tipo Titulo';
            this.visualizar=true;
        }
        this.cargar(object.strTitVal_Cod);
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
    }

    cargar(code){

        tipotituloService.GetOnlyOnetipotitulo(code)
        .then(resp=>{   
            console.log('resultado',resp);
            this.tipotitulo=resp;
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
        if(this.tipotitulo.strTitVal_Desc==''){ this.$message('Complete los campos obligatorios');return false;}
        else{
            this.tipotitulo.chrStatus='A';
            console.log('update',this.tipotitulo);
            tipotituloService.Updatetipotitulo(this.tipotitulo)
            .then(resp=>{
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: 'Se guardo Correctamente '+resp.strTitVal_Cod
                  });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se guardo correctamente. '+resp.strTitVal_Cod;
                this.tipotitulo=new TipoTituloModel();
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
      handleClosePais(){
        this.paisVisible=false;
        }
    data(){
        return{     
            companyName:'',
            companyCod:''
        }
    }
  
}
