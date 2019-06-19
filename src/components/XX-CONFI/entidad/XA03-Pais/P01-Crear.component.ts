import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import {PaisModel} from '@/modelo/maestro/pais';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import paisService from '@/components/service/pais.service';
import {MonedaModel} from '@/modelo/maestro/moneda';
import BMonedaComponent from '@/components/buscadores/b_moneda/b_moneda.vue';
@Component({
  name: 'crear-um',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'bmoneda':BMonedaComponent,
  }
})
export default class CrearPaisComponent extends Vue {
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  companyName:any;
  companyCod:any;
  public pais:PaisModel=new PaisModel();
  public selectMoneda:MonedaModel=new MonedaModel();
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  monedaVisible:boolean=false;
  btnactivarmonedaA:boolean=false;
  constructor(){    
        super();
        Global.nameComponent='crear-um';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');  
    }
    upperCaseF(a){
      setTimeout(function(){
          a.value = a.value.toUpperCase();
      }, 1);
    }
    desactivar_monedaA(){
        if(this.monedaVisible){
          this.btnactivarmonedaA=false;
        }
    } 
    activar_monedaA(){
        setTimeout(() => {
          this.btnactivarmonedaA=true;
        }, 120)
      } 
    monedaDialog(){
        this.monedaVisible=true;  
    }
    handleCloseMoneda(){
        this.monedaVisible=false;
      }
    monedaSelect(val:MonedaModel){
        this.selectMoneda=val;  
        this.pais.strCountry_Curr=this.selectMoneda.strCurrency_Cod;     
        this.monedaVisible=false;
      }
      
    guardarUM(){
      var user:any=localStorage.getItem('User_Usuario');
      this.pais.strCreation_User=user;
      if(this.pais.strCountry_Cod!=''&&this.pais.strCountry_Name!=''){
        paisService.createtblPais(this.pais)
        .then(resp=>{
          this.$message({
              showClose: true,
                type: 'success',
                message: 'Se guardo Correctamente '
              });
              this.pais=new PaisModel();
              this.issave = true;
              this.iserror = false;
              this.textosave = 'Se guardo correctamente. '+resp.strCountry_Cod;
          })
      }
      else{
        this.$message({
            showClose: true,
            type: 'error',
            message: 'Complete datos'
          });
        this.issave = false;
        this.iserror = true;
        this.textosave = 'Complete datos.';
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
