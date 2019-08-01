import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
//***Modelos */
import {TipoRentaModel} from '@/modelo/maestro/tipoRenta';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import tiporentaService from '@/components/service/tiporenta.service';
import {PaisModel} from '@/modelo/maestro/pais';
import BPaisComponent from '@/components/buscadores/b_pais/b_pais.vue';

@Component({
  name: 'modificar-tipo-renta',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'bpais':BPaisComponent
  }
})
export default class ModificarTipoRentaComponent extends Vue {
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
    public tiporenta:TipoRentaModel=new TipoRentaModel();
    public gridSelectPais:PaisModel=new PaisModel();
    paisVisible:boolean=false;
    btnactivarpais:boolean=false;
    constructor(){    
        super();
        Global.nameComponent='modificar-tipo-renta';
        
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
            this.txtmodulo='Modificar Tipo Renta';
            this.visualizar=false;
        }
        else{
            this.txtmodulo='Visualizar Tipo Renta';
            this.visualizar=true;
        }
        this.cargar(object.strReveType_Cod);
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
    }

    cargar(code){

        tiporentaService.GetOnlyOnetiporenta(code)
        .then(resp=>{   
            console.log('resultado',resp);
            this.tiporenta=resp;
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
        var vista=this.$route.query.vista; 
      if(vista=='modificar'){
        if(this.tiporenta.strReveType_Desc==''){ this.$message('Complete los campos obligatorios');return false;}
        else{
            var user:any=localStorage.getItem('User_Usuario');
        var id:any=localStorage.getItem('compania_ID');

        this.tiporenta.strModified_User=user;
        
            let loadingInstance = Loading.service({
            fullscreen: true,
            text: 'Guardando...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.8)'
            }
            );     
            tiporentaService.Updatetiporenta(this.tiporenta)
            .then(resp=>{
                loadingInstance.close();
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: 'Se guardo Correctamente '+resp.strReveType_Cod
                  });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se guardo correctamente. '+resp.strReveType_Cod;
                this.tiporenta=new TipoRentaModel();
            }).catch(error=>{
                loadingInstance.close();
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
