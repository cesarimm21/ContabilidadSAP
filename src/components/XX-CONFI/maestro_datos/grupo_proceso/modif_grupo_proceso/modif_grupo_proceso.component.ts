import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
//***Modelos */
import {GrupoCentroCostoModel} from '@/modelo/maestro/grupocentrocosto';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import rubroService from '@/components/service/rubro.service';
import grupoareaService from '@/components/service/grupoarea.service';
import grupoprocesoService from '@/components/service/grupoproceso.service';
@Component({
  name: 'modificar-grupo-proceso',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class ModificarGrupoProcesoComponent extends Vue {
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

    public grupoproceso:GrupoCentroCostoModel=new GrupoCentroCostoModel();
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
            this.txtmodulo='Modificar Rubro Cuenta';
            this.visualizar=false;
        }
        else{
            this.txtmodulo='Visualizar Rubro Cuenta';
            this.visualizar=true;
        }
        this.grupoproceso=object
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
    }

    guardarTodo(){
        if(this.grupoproceso.strCCGrpProc_Cod==''){ this.$message('Complete los campos obligatorios')}
        if(this.grupoproceso.strCCGrpProc_Name==''){ this.$message('Complete los campos obligatorios')}
        if(this.grupoproceso.strCCGrpProc_Desc==''){ this.$message('Complete los campos obligatorios')}
        else{
            this.grupoproceso.chrStatus='A';
            this.grupoproceso.strCreation_User=this.nameuser;
            grupoprocesoService.ModificarGrupoProceso(this.grupoproceso)
            .then(resp=>{
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: 'Se guardo Correctamente '+resp.strCCGrpProc_Cod
                  });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se guardo correctamente. '+resp.strCCGrpProc_Cod;
                this.grupoproceso=new GrupoCentroCostoModel();
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
