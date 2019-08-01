import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
//***Modelos */
import {CategoriaCentroCostoModel} from '@/modelo/maestro/categoriacentrocosto';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import rubroService from '@/components/service/rubro.service';
import categoriacentrocostoService from '@/components/service/categoriacentrocosto.service';
@Component({
  name: 'modificar-categoria-centro-costo',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class ModificarCategoriaCentroCostoComponent extends Vue {
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
    nameuser:any='';

    public categoria:CategoriaCentroCostoModel=new CategoriaCentroCostoModel();
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
        this.nameuser=localStorage.getItem('User_Usuario');

        if(modulo.toLowerCase()!='visualizar'){
            this.txtmodulo='Modificar Categoria Centro Costo';
            this.visualizar=false;
        }
        else{
            this.txtmodulo='Visualizar Categoria Centro Costo';
            this.visualizar=true;
        }
        this.categoria=object
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
    }

    guardarTodo(){
    
    if(this.txtviewmodulo=='modificar'){
        if(this.categoria.strCCCategory_Cod==''){ this.$message('Complete los campos obligatorios')}
        if(this.categoria.strCCCategory_Desc==''){ this.$message('Complete los campos obligatorios')}
        else{
            this.categoria.chrStatus='A';
            this.categoria.strModified_User=this.nameuser;
            let loadingInstance = Loading.service({
                fullscreen: true,
                text: 'Actualizando...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
                }
                );   
            categoriacentrocostoService.ModificarCategoriaCentroCosto(this.categoria)
            .then(resp=>{
                loadingInstance.close();
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: 'Se guardo Correctamente '+resp.strCCCategory_Cod
                  });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se guardo correctamente. '+resp.strCCCategory_Cod;
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
    }
    else{
        this.$message({
            showClose: true,
            type: 'warning',
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
    data(){
        return{     
            companyName:'',
            companyCod:''
        }
    }
  
}
