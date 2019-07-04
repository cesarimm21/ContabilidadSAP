import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
//***Modelos */
import {TipoCambioModel} from '@/modelo/maestro/tipocambio';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import TipoCambioService from '@/components/service/tipocambio.service';
import BMonedaComponent from '@/components/buscadores/b_moneda/b_moneda.vue';
import {MonedaModel} from '@/modelo/maestro/moneda';
@Component({
  name: 'tipo-cambio',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'bmoneda':BMonedaComponent,
  }
})
export default class CrearTipoCambioComponent extends Vue {
  nameComponent:string;
  fecha_actual:string;
  fecha_año:string;
  dialogMoneda:boolean=false;
  btnactivarmoneda1:boolean=false;
  btnactivarmoneda2:boolean=false;
  flag:string='';
    companyName:any;
    companyCod:any;
    issave:boolean=false;
    iserror:boolean=false;
    textosave:string='';
    public TipoCambio:TipoCambioModel=new TipoCambioModel();
    public moneda1:MonedaModel=new MonedaModel();
    public moneda2:MonedaModel=new MonedaModel();
  constructor(){    
        super();
        Global.nameComponent='tipo-cambio';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.fecha_actual=(new Date()).toString();
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
        var date=new Date();
        var yyyy = date.getFullYear();
        this.fecha_año= (this.TipoCambio.intExchRate_Year+1).toString();
        console.log(this.fecha_año);
    }
    changeyear(val){
        this.TipoCambio.intExchRate_Year=val;
    }
    backPage(){
      window.history.back();
    }
    reloadpage(){
      window.location.reload();
    }
    guardarTodo(){
        if(this.TipoCambio.fltExchRate_Buy<=0){ this.$message('Valor de compra debe ser mayor a 0')}
        if(this.TipoCambio.fltExchRate_Sale<=0){ this.$message('Valor de venta debe ser mayor a 0')}
        else{        
          let loadingInstance = Loading.service({
            fullscreen: true,
            text: 'Guardando...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.8)'
            }
            );        
            var user:any=localStorage.getItem('User_Usuario');
            this.TipoCambio.dtmExchRate_Date=new Date(this.fecha_actual);
            this.TipoCambio.strCreation_User=user;
            this.TipoCambio.chrStatus='A';   
            TipoCambioService.CreateTipoCambio(this.TipoCambio)
            .then(resp=>{
              loadingInstance.close();
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: ' '+resp
                  });
                this.issave = true;
                this.iserror = false;
                this.textosave = ' '+resp;
                this.TipoCambio=new TipoCambioModel();
                this.fecha_año= (this.TipoCambio.intExchRate_Year+1).toString();
                this.btnactivarmoneda1=false;
                this.btnactivarmoneda2=false;
            }).catch(error=>{
              loadingInstance.close();
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
    //#region [MONEDA]
    loadmoneda(val){
        this.flag=val;
        this.dialogMoneda=true;
    }
    closeMoneda(){
        this.dialogMoneda=false;
    }
    SeleccionadoMoneda(val:MonedaModel){
        if(this.flag==='A') {
            this.moneda1=val;
            this.TipoCambio.strExchRate_OF=this.moneda1.strCurrency_Cod;
            this.TipoCambio.strExchRate_OF_desc=this.moneda1.strCurrency_Desc;
        }
        if(this.flag==='B'){
            this.moneda2=val;
            this.TipoCambio.strExchRate_TO=this.moneda2.strCurrency_Cod;
            this.TipoCambio.strExchRate_TO_desc=this.moneda2.strCurrency_Desc;
        }
        this.dialogMoneda=false;
    }
    desactivar_moneda1(){
        if(this.dialogMoneda){
          this.btnactivarmoneda1=false;
        }
      }  
      activar_moneda1(){
        setTimeout(() => {
          this.btnactivarmoneda1=true;
          this.btnactivarmoneda2=false;
        }, 120)
      }
    desactivar_moneda2(){
        if(this.dialogMoneda){
          this.btnactivarmoneda2=false;
        }
      }  
      activar_moneda2(){
        setTimeout(() => {
          this.btnactivarmoneda1=false;
          this.btnactivarmoneda2=true;
        }, 120)
      }
    //#endregion
    handleChange(value) {
      }
    data(){
        return{     
            companyName:'',
            companyCod:'',
            fecha_actual:'',
            flag:'',
            fecha_año:''
        }
    }
  
}
