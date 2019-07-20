import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import { Loading } from 'element-ui';
import {PaisModel} from '@/modelo/maestro/pais';
import {IdiomaModel} from '@/modelo/maestro/idioma';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import paisService from '@/components/service/pais.service';
import {MonedaModel} from '@/modelo/maestro/moneda';
import BIdiomaComponent from '@/components/buscadores/b_idioma/b_idioma.vue';
import BMonedaComponent from '@/components/buscadores/b_moneda/b_moneda.vue';
@Component({
  name: 'crear-pais',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'bmoneda':BMonedaComponent,
  'bidioma':BIdiomaComponent,
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
  public selectIdioma:IdiomaModel=new IdiomaModel();
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  monedaVisible:boolean=false;
  idiomaVisible:boolean=false;
  btnactivarmonedaA:boolean=false;
  btnactivaridioma:boolean=false;
  constructor(){    
        super();
        Global.nameComponent='crear-pais';
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
          this.btnactivaridioma=false;
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
    //#region [IDIOMA]
    desactivar_idioma(){
      if(this.idiomaVisible){
        this.btnactivaridioma=false;
      }
  } 
  activar_idioma(){
      setTimeout(() => {
        this.btnactivaridioma=true;
        this.btnactivarmonedaA=false;
      }, 120)
    } 
  idiomaDialog(){
      this.idiomaVisible=true;  
  }
  handleCloseIdioma(){
      this.idiomaVisible=false;
    }
  idiomaSelect(val:IdiomaModel){
      this.selectIdioma=val;  
      this.pais.strLanguage=this.selectIdioma.strLenguaje_Desc;     
      this.idiomaVisible=false;
    }
    //#endregion
    guardarUM(){
      var user:any=localStorage.getItem('User_Usuario');
      this.pais.strCreation_User=user;
      if(this.pais.strCountry_Cod!=''&&this.pais.strCountry_Name!=''&&this.pais.strLanguage!=''){
        let loadingInstance = Loading.service({
          fullscreen: true,
          text: 'Guardando...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.8)'
          }
          ); 
        paisService.createtblPais(this.pais)
        .then(resp=>{
          loadingInstance.close();
          this.$message({
              showClose: true,
                type: 'success',
                message: 'Se guardo Correctamente '
              });
              this.pais=new PaisModel();
              this.issave = true;
              this.iserror = false;
              this.textosave = 'Se guardo correctamente. '+resp.strCountry_Cod;
          }).catch(erroz=>{
            loadingInstance.close();
            this.$message({
            showClose: true,
            type: 'error',
            message: 'No se pudo guardar'
          });})
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
