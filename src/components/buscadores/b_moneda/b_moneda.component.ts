import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import { Notification } from 'element-ui';
import router from '@/router';
import {MonedaModel} from '@/modelo/maestro/moneda';
import monedaService from '@/components/service/moneda.service';

@Component({
  name: 'bmoneda'
})

export default class  BMonedaComponent extends Vue {
  
  public monedaData:Array<MonedaModel>[];
  public monedaSelect:MonedaModel=new MonedaModel();
  constructor() {
    super();
    this.getAllMoneda();
  }
  getAllMoneda(){
    monedaService.GetAllMoneda()
    .then(response=>{      
      this.monedaData=response;
      
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se puede cargar lista Moneda'
      });
    })
  }
  seleccionar(val:MonedaModel){
    this.monedaSelect=val;
    this.$emit('MonedaSeleccionado',this.monedaSelect);
  }
  handleCurrentChange(val:MonedaModel){
    this.monedaSelect=val;
  }
  checkMoneda(){
    this.$emit('MonedaSeleccionado',this.monedaSelect)
  }
  closeMoneda(){
    this.$emit('closeMoneda');
  }
  data() {
    return {
    };
  }
}
