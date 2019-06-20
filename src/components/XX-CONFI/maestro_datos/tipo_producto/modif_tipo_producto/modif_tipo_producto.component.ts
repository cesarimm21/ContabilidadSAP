import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
//***Modelos */
import {TipoProductoModel} from '@/modelo/maestro/tipoproducto';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import tipoproductoService from '@/components/service/tipoproducto.service';
import {PaisModel} from '@/modelo/maestro/pais';
import BPaisComponent from '@/components/buscadores/b_pais/b_pais.vue';

@Component({
  name: 'modificar-tipo-producto',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'bpais':BPaisComponent
  }
})
export default class ModificarTipoProductoComponent extends Vue {
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
    public tipoproducto:TipoProductoModel=new TipoProductoModel();
    public gridSelectPais:PaisModel=new PaisModel();
    paisVisible:boolean=false;
    btnactivarpais:boolean=false;
    constructor(){    
        super();
        Global.nameComponent='modificar-tipo-producto';
        
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
            this.txtmodulo='Modificar Tipo Producto';
            this.visualizar=false;
        }
        else{
            this.txtmodulo='Visualizar Tipo Producto';
            this.visualizar=true;
        }
        this.cargar(object.strTypeProd_Cod);
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
    }

    cargar(code){

        tipoproductoService.GetOnlyOnetipoproducto(code)
        .then(resp=>{   
            console.log('resultado',resp);
            this.tipoproducto=resp;
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
        if(this.tipoproducto.strTypeProd_Desc==''){ this.$message('Complete los campos obligatorios');return false;}
        else{
            this.tipoproducto.chrStatus='A';
            console.log('update',this.tipoproducto);
            tipoproductoService.Updatetipoproducto(this.tipoproducto)
            .then(resp=>{
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: 'Se guardo Correctamente '+resp.strTypeProd_Cod
                  });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se guardo correctamente. '+resp.strTypeProd_Cod;
                this.tipoproducto=new TipoProductoModel();
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
