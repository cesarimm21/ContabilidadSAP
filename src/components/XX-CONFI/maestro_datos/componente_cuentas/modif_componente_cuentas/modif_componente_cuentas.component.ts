import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import componenteService from '@/components/service/componentecuentacontable.service';
import BMonedaComponent from '@/components/buscadores/b_moneda/b_moneda.vue';
import BPaisComponent from '@/components/buscadores/b_pais/b_pais.vue';
//***Modelos */
import {ComponenteCuentaContableModel} from '@/modelo/maestro/componentecuentacontable';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import companiaService from '@/components/service/compania.service';
import {PaisModel} from '@/modelo/maestro/pais';
import {DepartamentoModel} from '@/modelo/maestro/departamento';
import {MonedaModel} from '@/modelo/maestro/moneda';
import {ImpuestoModel} from '@/modelo/maestro/impuesto';
@Component({
  name: 'crear-compania',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'bpais':BPaisComponent,
  'bmoneda':BMonedaComponent,
  }
})
export default class ModificarComponenteCuentasComponent extends Vue {
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

    public componente:ComponenteCuentaContableModel=new ComponenteCuentaContableModel();
    //**Pais */
    public gridSelectPais:PaisModel=new PaisModel();
    paisVisible:boolean=false;
    btnactivarpais:boolean=false;
    public DepartamentoGrid:Array<DepartamentoModel>[];
    btnactivardepartamento:boolean=false;
    departVisible:Boolean=false;
    departEnabled:boolean=true;
    public selectDepartamento:DepartamentoModel=new DepartamentoModel();
    public searchDepartamento:DepartamentoModel=new DepartamentoModel();
    clickColumn:string='';
    Column:string='';
    inputAtributo:any;
    blnilterstrRegion_Cod:boolean=true;
    blnilterstrRegion_Desc:boolean=false;

    public Moneda:MonedaModel=new MonedaModel();
    monedaVisible:boolean=false;
    btnactivarmonedaA:boolean=false;
    btnactivarmonedaB:boolean=false;
    btnactivarmonedaC:boolean=false;
    btnactivarmonedaD:boolean=false;
    public selectMonedaA:MonedaModel=new MonedaModel();
    public selectMonedaB:MonedaModel=new MonedaModel();
    public selectMonedaC:MonedaModel=new MonedaModel();
    public selectMonedaD:MonedaModel=new MonedaModel();
    FLAGMONEDA:String;
    //**Moneda */
    dialogMonedaL:boolean=false;
    btnactivarMonedaL:boolean=false;
    dialogMonedaC:boolean=false;
    btnactivarMonedaC:boolean=false;
    dialogMonedaG:boolean=false;
    btnactivarMonedaG:boolean=false;
    nameuser:any='';
    strCurr_Loc:string='';
    strCurr_Funct:string='';
    strCurr_Grp:string='';

    dataMoneda:any[];
    public moneda:MonedaModel=new MonedaModel();
    
    constructor(){    
        super();
        Global.nameComponent='modificar-correlativo';
        
        setTimeout(() => {
            this.load();
        }, 100)
    }

    load(){
        debugger;
        
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
        this.nameuser=localStorage.getItem('User_Usuario');
        var object = JSON.parse(this.$route.query.data);
        var modulo = this.$route.query.vista;
        this.txtviewmodulo=modulo;
        if(modulo.toLowerCase()!='visualizar'){
            this.txtmodulo='Modificar Compania';
            this.visualizar=false;
        }
        else{
            this.txtmodulo='Visualizar Compania';
            this.visualizar=true;
        }
        //this.cargar(object.strCompany_Cod);
        this.componente=object;
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
    }

    
    guardarTodo(){
        
      
      if(this.componente.strComp_Cod==''){ this.$message('Complete los campos obligatorios 3'); return false;}
      if(this.componente.strComp_Desc==''){ this.$message('Complete los campos obligatorios 4'); return false;}
      else{

          let loadingInstance = Loading.service({
              fullscreen: true,
              text: 'Guardando...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.8)'
              }
          );   
          this.componente.chrStatus='A';
          this.componente.strCreation_User=this.nameuser;
          componenteService.CrearComponete(this.componente)
          .then(resp=>{
              this.$message({
                  showClose: true,
                  type: 'success',
                  message: 'Se guardo Correctamente '+resp.strComp_Cod
                });
              this.issave = true;
              this.iserror = false;
              this.textosave = 'Se guardo correctamente. '+resp.strComp_Cod;
              this.componente=new ComponenteCuentaContableModel();
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
    
      paisDialog(){
        this.paisVisible=true;
      }
      activar_Pais(){
        setTimeout(() => {
          this.btnactivarpais=true;
          this.btnactivardepartamento=false;
        }, 120)
        
      }
      desactivar_Pais(){
        if(this.paisVisible){
          this.btnactivarpais=false;
        }
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
