import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
//***Modelos */
import {CategoriaLineaModel} from '@/modelo/maestro/categorialinea';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import categoriaLineaService from '@/components/service/categorialinea.service';
@Component({
  name: 'modificar-criticidad',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class ModificarCategoriaLineaComponent extends Vue {
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

    public categorialinea:CategoriaLineaModel=new CategoriaLineaModel();
    constructor(){    
        super();
        Global.nameComponent='modificar-categoria-linea';
        
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
            this.txtmodulo='Modificar Categoria Linea';
            this.visualizar=false;
        }
        else{
            this.txtmodulo='Visualizar  Categoria Linea';
            this.visualizar=true;
        }
        this.cargar(object.strCategItem_Cod);
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
    }

    cargar(code){

        categoriaLineaService.GetOneCategoriaLinea(code)
        .then(resp=>{   
            this.categorialinea=resp;
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
        if(this.categorialinea.strCategItem_Desc==''){ this.$message('Complete los campos obligatorios')}
        else{
            this.categorialinea.chrStatus='A';
            categoriaLineaService.UpdateCategoriaLinea(this.categorialinea)
            .then(resp=>{
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: 'Se guardo Correctamente '+resp.strCategItem_Cod
                  });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se guardo correctamente. '+resp.strCategItem_Cod;
                this.categorialinea=new CategoriaLineaModel();
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
