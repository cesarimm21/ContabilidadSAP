import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
//***Modelos */
import {GrupoCompradorModel} from '@/modelo/maestro/grupocomprador';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import grupoCompradorService from '@/components/service/grupocomprador.service';
@Component({
  name: 'modificar-criticidad',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class ModificarGrupoCompradorComponent extends Vue {
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

    public grupocomprador:GrupoCompradorModel=new GrupoCompradorModel();
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
            this.txtmodulo='Modificar Grupo Comprador';
            this.visualizar=false;
        }
        else{
            this.txtmodulo='Visualizar Grupo Comprador';
            this.visualizar=true;
        }
        this.cargar(object.strGrpPurch_Cod);
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
    }

    cargar(code){

        grupoCompradorService.GetOnlyOneGrupoComprador(code)
        .then(resp=>{   
            this.grupocomprador=resp;
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
        if(this.grupocomprador.strGrpPurch_Desc==''){ this.$message('Complete los campos obligatorios')}
        else{
            this.grupocomprador.chrStatus='A';
            grupoCompradorService.UpdateGrupoComprador(this.grupocomprador)
            .then(resp=>{
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: 'Se guardo Correctamente '+resp.strGrpPurch_Cod
                  });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se guardo correctamente. '+resp.strGrpPurch_Cod;
                this.grupocomprador=new GrupoCompradorModel();
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
