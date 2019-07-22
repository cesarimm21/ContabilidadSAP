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
import categoriaService from '@/components/service/categoriacentrocosto.service';
import categoriacentrocostoService from '@/components/service/categoriacentrocosto.service';
@Component({
  name: 'crear-categoria-centro-costos',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class CrearCategoriaCentroCostoComponent extends Vue {
    nameComponent:string;
    fecha_actual:string;
    fecha_ejecucion:string;
    companyName:any;
    companyCod:any;
    issave:boolean=false;
    iserror:boolean=false;
    textosave:string='';
    nameuser:any='';
    public categoria:CategoriaCentroCostoModel=new CategoriaCentroCostoModel();
    constructor(){    
        super();
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
        this.nameuser=localStorage.getItem('User_Usuario');
    }
    guardarTodo(){
        if(this.categoria.strCCCategory_Cod==''){ this.$message('Complete los campos obligatorios')}
        if(this.categoria.strCCCategory_Desc==''){ this.$message('Complete los campos obligatorios')}
        else{
            let loadingInstance = Loading.service({
                fullscreen: true,
                text: 'Guardando...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
                }
            );   
            this.categoria.chrStatus='A';
            this.categoria.strCreation_User=this.nameuser;
            this.categoria.strCompany_Cod=this.companyCod;
            this.categoria.strCompany_Desc=this.companyName;

            categoriacentrocostoService.CrearCategoriaCentroCosto(this.categoria)
            .then(resp=>{
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: 'Se guardo Correctamente '+resp.strCCCategory_Cod
                  });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se guardo correctamente. '+resp.strCCCategory_Cod;
                this.categoria=new CategoriaCentroCostoModel();
                loadingInstance.close();
            }).catch(error=>{
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: 'No se pudo guardar'
                  });
                this.issave = false;
                this.iserror = true;
                this.textosave = 'Error al guardar.';
                loadingInstance.close();
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
