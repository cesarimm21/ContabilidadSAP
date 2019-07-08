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
export default class ViewAndEditMonedaComponent extends Vue {
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  companyName:any;
  companyCod:any;
  textTitle:string='';
  enabledtf:boolean=false;
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
        this.moneda= JSON.parse(this.$route.query.data); 
        var vista=this.$route.query.vista;
        if(vista=='modificar'){
            this.enabledtf=false;
            this.textTitle='Modificar Almacen';
        }
        if(vista=='visualizar'){
            this.enabledtf=true;
            this.textTitle='Visualizar Almacen';
        } 
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
    
    guardarMoneda(){
      var vista=this.$route.query.vista; 
      if(vista=='modificar'){
        var user:any=localStorage.getItem('User_Usuario');
        var id:any=localStorage.getItem('compania_ID');
        this.moneda.strModified_User=user;
        let loadingInstance = Loading.service({
          fullscreen: true,
          text: 'Guardando...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.8)'
          }
          );     
        if(this.moneda.strCurrency_Cod!=''&&this.moneda.strCurrency_Desc!=''){
          monedaService.updatetblMoneda(this.moneda)
          .then(resp=>{
            loadingInstance.close();
            this.$message({
                showClose: true,
                  type: 'success',
                  message: 'Se Actualizo Correctamente '+resp
                });
                this.issave = true;
                this.iserror = false;
                this.textosave = ' Se Actualizo Correctamente '+resp;
            }).catch(errorss=>{
              loadingInstance.close();
              this.$message({
                showClose: true,
                  type:'error',
                  message: 'No se actualizo Correctamente '
                });
                this.issave = false;
                this.iserror = true;
                this.textosave = 'No se actualizo Correctamente ';
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
      }else{
        this.$message({
            showClose: true,
            type: 'info',
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
    data(){
        return{     
            companyName:'',
            companyCod:'',
            textTitle:''
          }
    }
  
}
