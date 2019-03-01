import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';


import Login from '@/components/login/login.vue';
import Roles from '@/components/roles/roles.vue';
import UsuarioService from '@/components/service/usuario.service';
import LoginService from '@/components/service/login.service';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import {FacturaModel} from '@/modelo/maestro/factura';
import facturaService from '@/components/service/factura.service';
import Global from '@/Global';
import { Notification } from 'element-ui';
@Component({
  name: 'ver-ingreso-comprobante'
})
export default class VerIngresoComprobanteComponent extends Vue {
  VerAll:boolean=false;
  codigoInput:any;
  btnactivaringreso:boolean=false;
  dialogingreso:boolean=false;
  ingresoData:Array<FacturaModel>[];
  public factura:FacturaModel=new FacturaModel();
  public ingresoSelect:FacturaModel=new FacturaModel();
  constructor(){
    super();
    Global.nameComponent='ver-ingreso-comprobante';
    this.ingresoSelect.strVoucher_NO='';
  }
  desactivar_ingreso(){
    if(this.dialogingreso){
      this.btnactivaringreso=false;      
    }
  }
  activar_ingreso(){
    setTimeout(() => {
      this.btnactivaringreso=true;
    }, 120)
  }
  loadIngreso(){
    this.dialogingreso=true;
  }
  selectOrdenCompra(val:FacturaModel){
    this.ingresoSelect=val;
  }
  checkIngreso(){
    this.dialogingreso=false;
  }
  closeIngreso(){
    this.dialogingreso=false;
    this.codigoInput='';
    this.ingresoSelect=new FacturaModel();
    this.ingresoData=[];
  }
  loadIngresoByCod(){
    debugger;
    if(this.codigoInput===''||this.codigoInput.length!=8){
      this.$message({
        showClose: true,
        type: 'warning',
        message: 'Ingrese codigo/ tamaño 8 cifras'
      });
    }
    else{
      facturaService.GetFacturaId(this.codigoInput)
      .then(response=>{
        this.ingresoData=response;
        debugger;
      }).catch(error=>{

      })
    }
    
  }
  data(){
    return{
      dialogTableVisible: false,
      VerAll:false,
      codigoInput:'',
      ingresoData:[]
    }
  }
  
}
