import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
//***Modelos */
import {DepartamentoModel} from '@/modelo/maestro/departamento';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import regionService from '@/components/service/departamento.service';
import {PaisModel} from '@/modelo/maestro/pais';
import BPaisComponent from '@/components/buscadores/b_pais/b_pais.vue';

@Component({
  name: 'modificar-region',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'bpais':BPaisComponent
  }
})
export default class ModificarRegionComponent extends Vue {
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
    public region:DepartamentoModel=new DepartamentoModel();
    public gridSelectPais:PaisModel=new PaisModel();
    paisVisible:boolean=false;
    btnactivarpais:boolean=false;
    constructor(){    
        super();
        Global.nameComponent='modificar-region';
        
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
            this.txtmodulo='Modificar Correlativo';
            this.visualizar=false;
        }
        else{
            this.txtmodulo='Visualizar Correlativo';
            this.visualizar=true;
        }
        this.cargar(object.strRegion_Cod);
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
    }

    cargar(code){

        regionService.GetOnlyOneDepartamento(code)
        .then(resp=>{   
            this.region=resp;
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
        if(this.region.strRegion_Desc==''){ this.$message('Complete los campos obligatorios')}
        if(this.region.strCountry_Cod==''){ this.$message('Complete los campos obligatorios')}
        else{
            this.region.chrStatus='A';
            console.log('update',this.region);
            regionService.UpdateDepartamento(this.region)
            .then(resp=>{
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: 'Se guardo Correctamente '+resp.strRegion_Cod
                  });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se guardo correctamente. '+resp.strRegion_Cod;
                this.region=new DepartamentoModel();
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
        paisSelect(val:PaisModel){
        this.gridSelectPais=val;
        this.region.intIdCountry_ID=this.gridSelectPais.intIdCountry_ID;
        this.region.strCountry_Cod=this.gridSelectPais.strCountry_Cod;
        this.region.strCountry_Name=this.gridSelectPais.strCountry_Name;
        this.paisVisible=false;
        }
        paisDialog(){
            this.paisVisible=true;
        }
        activar_Pais(){
            setTimeout(() => {
                this.btnactivarpais=true;
            }, 120)
        }
        desactivar_Pais(){
            if(this.paisVisible){
                this.btnactivarpais=false;
            }
        }
    data(){
        return{     
            companyName:'',
            companyCod:''
        }
    }
  
}
