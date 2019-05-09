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
  name: 'viewandedit-cambio',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'bmoneda':BMonedaComponent,
  }
})
export default class ViewAndEditTipoCambioComponent extends Vue {
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
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
    namepage:string;
    impDisabled:boolean=false;
    fecha_año:string;
  constructor(){    
        super();
        Global.nameComponent='tipo-cambio';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.TipoCambio= JSON.parse(this.$route.query.data);
        console.log(this.TipoCambio);
        
        var vista=this.$route.query.vista;
        if(vista=='Modificar'){
          this.namepage='Modificar Tipo cambio';
          this.impDisabled=false;
          }
          if(vista=='Visualizar'){
          this.namepage='Visualizar Tipo cambio';
          this.impDisabled=true;
          }
        this.fecha_año= (Number(this.TipoCambio.intExchRate_Year)+1).toString();
        this.fecha_actual=this.getDateVencidaForView(this.TipoCambio.dtmExchRate_Date);
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
    }
    getDateVencidaForView(fecha){
      var Datef=new Date(fecha);
      var dia = Datef.getDate()+1;
      var mes = (Datef.getMonth()<12) ? Datef.getMonth()+1 : mes = Datef.getMonth();
      var yyyy = Datef.getFullYear();
      var dd = (dia<10) ? '0'+dia : dd=dia;
      var mm = (mes<10) ? '0'+mes : mm=mes;
      // return yyyy+'/'+mm+'/'+dd+;
      return yyyy+'-'+mm+'-'+dd;
    }
    changeyear(val){
      this.TipoCambio.intExchRate_Year=val;
  }
    guardarTodo(){
        if(this.TipoCambio.fltExchRate_Buy<=0){ this.$message('Valor de compra debe ser mayor a 0')}
        if(this.TipoCambio.fltExchRate_Sale<=0){ this.$message('Valor de venta debe ser mayor a 0')}
        else{           
            var user:any=localStorage.getItem('User_Usuario');
            this.TipoCambio.dtmExchRate_Date=new Date(this.fecha_actual);
            this.TipoCambio.strCreation_User=user;
            this.TipoCambio.chrStatus='A';
            console.log(this.TipoCambio);
            
            TipoCambioService.UpdateTipoCambio(this.TipoCambio)
            .then(resp=>{
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: 'Se actualizo Correctamente '
                  });
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se actualizo correctamente. ';
                // this.TipoCambio=new TipoCambioModel();
                this.btnactivarmoneda1=false;
                this.btnactivarmoneda2=false;
            }).catch(error=>{
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: 'No se pudo actualizar'
                  });
                this.issave = false;
                this.iserror = true;
                this.textosave = 'Error al actualizar.';
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
        console.log(value);
      }
    data(){
        return{     
            companyName:'',
            companyCod:'',
            fecha_actual:'',
            flag:'',
            fecha_año:'',
            namepage:''
        }
    }
  
}
