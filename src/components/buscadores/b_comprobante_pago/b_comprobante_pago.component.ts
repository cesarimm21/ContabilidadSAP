import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import { Notification } from 'element-ui';
import router from '@/router';
import {TipoComprobantePagoModel} from '@/modelo/maestro/tipocomprobantepago';
import comprobantepagoService from '@/components/service/tipocomprobantepago.service';

@Component({
  name: 'bcomprobantepago'
})

export default class  BComprobantepagoComponent extends Vue {

  public ComprobantePagoModel:Array<TipoComprobantePagoModel>[];
  public ComprobantePagoSelectModel:TipoComprobantePagoModel=new TipoComprobantePagoModel();
  constructor() {
    super();
    this.loadComprobante();
    
  }
  loadComprobante(){
    comprobantepagoService.GetAllComprobante()
    .then(response=>{
      this.ComprobantePagoModel=response;        
      console.log(this.ComprobantePagoModel);
      
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar Comprobante Pago'
      });
    })
  }

  handleCurrentChange(val:TipoComprobantePagoModel){
    this.ComprobantePagoSelectModel=val;
  }

  checkComprobantePago(){
    this.$emit('ComprobantePagoSeleccionado',this.ComprobantePagoSelectModel);
  }
  closeComprobantePago(){
    this.$emit('ComprobantePagoClose');
  }

  data() {
    return {
        ComprobantePagoModel:[]
    };

  }
}
