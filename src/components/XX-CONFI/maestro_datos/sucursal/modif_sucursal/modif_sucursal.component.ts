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
        this.nameuser=localStorage.getItem('User_Usuario');
        this.sucursal= JSON.parse(this.$route.query.data);
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
    }
    guardarTodo(){
        var modulo = this.$route.query.vista;
        if(modulo=='modificar'){
            if(this.sucursal.strSubsidiary_Desc==''){ this.$message('Complete los campos obligatorios');return false;}
            if(this.sucursal.strSubsidiary_Address==''){ this.$message('Complete los campos obligatorios');return false;}
            else{
               this.sucursal.strModified_User=this.nameuser;
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
                    // this.sucursal=new SucursalModel();
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
