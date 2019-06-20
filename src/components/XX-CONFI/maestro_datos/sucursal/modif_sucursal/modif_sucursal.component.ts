import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
//***Modelos */
import {SucursalModel} from '@/modelo/maestro/sucursal';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import sucursalService from '@/components/service/sucursal.service';
import {PaisModel} from '@/modelo/maestro/pais';
import BPaisComponent from '@/components/buscadores/b_pais/b_pais.vue';

@Component({
  name: 'modificar-sucursal',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'bpais':BPaisComponent
  }
})
export default class ModificarSucursalComponent extends Vue {
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
    public sucursal:SucursalModel=new SucursalModel();
    public gridSelectPais:PaisModel=new PaisModel();
    paisVisible:boolean=false;
    btnactivarpais:boolean=false;
    
    nameuser:any='';
    constructor(){    
        super();
        Global.nameComponent='modificar-sucursal';
        
        setTimeout(() => {
            this.load();
        }, 100)
    }

    load(){
        debugger;
        
        this.nameuser=localStorage.getItem('User_Usuario');
        var object = JSON.parse(this.$route.query.data);
        var modulo = this.$route.query.vista;
        this.txtviewmodulo=modulo;
        if(modulo.toLowerCase()!='visualizar'){
            this.txtmodulo='Modificar Sucursal';
            this.visualizar=false;
        }
        else{
            this.txtmodulo='Visualizar Sucursal';
            this.visualizar=true;
        }
        this.cargar(object.strSubsidiary_Cod);
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
    }

    cargar(code){

        sucursalService.GetOnlyOnesucursal(code)
        .then(resp=>{   
            console.log('resultado',resp);
            this.sucursal=resp;
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
        if(this.sucursal.strSubsidiary_Desc==''){ this.$message('Complete los campos obligatorios');return false;}
        if(this.sucursal.strSubsidiary_Address==''){ this.$message('Complete los campos obligatorios');return false;}
        else{
           this.sucursal.strModified_User=this.nameuser;
           
            console.log('update',this.sucursal);
            sucursalService.Updatesucursal(this.sucursal)
            .then(resp=>{
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: 'Se guardo Correctamente '+resp.strSubsidiary_Cod
                  });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se guardo correctamente. '+resp.strSubsidiary_Cod;
                this.sucursal=new SucursalModel();
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
