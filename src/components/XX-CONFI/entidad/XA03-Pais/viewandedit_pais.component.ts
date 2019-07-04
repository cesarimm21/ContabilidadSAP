import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import { Loading } from 'element-ui';
import {PaisModel} from '@/modelo/maestro/pais';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import umService from '@/components/service/unidadmedida.service';
import {MonedaModel} from '@/modelo/maestro/moneda';
import paisService from '@/components/service/pais.service';
import BMonedaComponent from '@/components/buscadores/b_moneda/b_moneda.vue';
@Component({
  name: 'viewandedit-um',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'bmoneda':BMonedaComponent,
  }
})
export default class ViewAndEditPaisComponent extends Vue {
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  companyName:any;
  companyCod:any;
  public pais:PaisModel=new PaisModel();
  public selectMoneda:MonedaModel=new MonedaModel();
  enabledtf:boolean=false;
  textTitle:string='';
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  monedaVisible:boolean=false;
  btnactivarmonedaA:boolean=false;
  constructor(){    
        super();
        Global.nameComponent='viewandedit-um';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod'); 
        this.pais= JSON.parse(this.$route.query.data); 
        var vista=this.$route.query.vista;
        if(vista=='modificar'){
            this.enabledtf=false;
            this.textTitle='Modificar Pais';
        }
        if(vista=='visualizar'){
            this.enabledtf=true;
            this.textTitle='Visualizar Pais';
        }
    }
    guardarPais(){
      var vista=this.$route.query.vista; 
      if(vista=='modificar'){
        let loadingInstance = Loading.service({
          fullscreen: true,
          text: 'Actualizando...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.8)'
          }
          ); 
        var user:any=localStorage.getItem('User_Usuario');
        this.pais.strModified_User=user;
        if(this.pais.strCountry_Cod!=''&&this.pais.strCountry_Name!=''){
          paisService.updatetblPais(this.pais)
          .then(resp=>{
            loadingInstance.close();
            this.$message({
                showClose: true,
                  type: 'success',
                  message: 'Se actualizo Correctamente '+resp
                });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se actualizo correctamente. '+resp;
            })
        }
        else{
          loadingInstance.close();
          this.$message({
              showClose: true,
              type: 'error',
              message: 'Complete datos'
            });
          this.issave = false;
          this.iserror = true;
          this.textosave = 'Complete datos.';
        }     
       
      }else{
        this.$message({
            showClose: true,
            type: 'info',
            message: 'Accion no permitida'
          });
      }
        
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
            companyCod:'',
            textTitle:''
          }
    }
  
}
