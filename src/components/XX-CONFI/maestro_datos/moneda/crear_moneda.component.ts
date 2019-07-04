import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import { Loading } from 'element-ui';
import {MonedaModel} from '@/modelo/maestro/moneda';
import {PaisModel} from '@/modelo/maestro/pais';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import monedaService from '@/components/service/moneda.service';
import BPaisComponent from '@/components/buscadores/b_pais/b_pais.vue';
import BSucursalComponent from '@/components/buscadores/b_sucursal/b_sucursal.vue';
@Component({
  name: 'crear-moneda',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'bpais':BPaisComponent,
  'bsucursal':BSucursalComponent,
  }
})
export default class CrearMonedaComponent extends Vue {
  //Focus Input
  inputCod:boolean=true;
  inputDes:boolean=false;
  inputCountry:boolean=false;
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  companyName:any;
  companyCod:any;
  public moneda:MonedaModel=new MonedaModel();
  public pais:PaisModel=new PaisModel();
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  btnactivarpais:boolean=false;
  paisVisible:boolean=false;
  constructor(){    
        super();
        Global.nameComponent='crear-moneda';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');  
    }  
    //#region [PAIS]
  desactivar_pais(){
      if(this.paisVisible){
        this.btnactivarpais=false;
      }
  } 
  activar_pais(){
      setTimeout(() => {
        this.btnactivarpais=true;
      }, 120)
    } 
    paisDialog(){
      this.paisVisible=true;  
  }
  handleClosePais(){
      this.paisVisible=false;
    }
    paisSelect(val:PaisModel){
      this.pais=val;  
      this.moneda.strCountry=this.pais.strCountry_Name;
      this.paisVisible=false;
    }
    //#endregion   

    nextFocus(val) {       
    }
    guardarMoneda(){
      var user:any=localStorage.getItem('User_Usuario');
      var id:any=localStorage.getItem('compania_ID');
      this.moneda.strCreation_User=user;
      let loadingInstance = Loading.service({
        fullscreen: true,
        text: 'Guardando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
        );     
      if(this.moneda.strCurrency_Cod!=''&&this.moneda.strCurrency_Desc!=''){
        monedaService.createtblMoneda(this.moneda)
        .then(resp=>{
          loadingInstance.close();
          this.$message({
              showClose: true,
                type: 'success',
                message: 'Se Creo Correctamente '+resp
              });
              this.moneda=new MonedaModel();
              this.pais=new PaisModel();
              this.issave = true;
              this.iserror = false;
              this.textosave = 'Se Creao Correctamente '+resp;
          }).catch(errorss=>{         
            loadingInstance.close();
            this.$message({
              showClose: true,
                type:'error',
                message: 'La moneda ingresada ya existe en la base de datos'
              });
              this.issave = false;
              this.iserror = true;
              this.textosave = 'La moneda ingresada ya existe en la base de datos';
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
