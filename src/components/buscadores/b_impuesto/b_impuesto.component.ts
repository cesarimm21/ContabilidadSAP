import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import { Notification } from 'element-ui';
import router from '@/router';
import {ImpuestoModel} from '@/modelo/maestro/impuesto';
import impuestoService from '@/components/service/impuesto.service';

@Component({
  name: 'bimpuesto'
})

export default class  BImpuestoComponent extends Vue {
  
  public impuestoData:Array<ImpuestoModel>[];
  public impuestoSelect:ImpuestoModel=new ImpuestoModel();
  constructor() {
    super();
    this.getAllImpuesto();
  }
  getAllImpuesto(){
    impuestoService.GetAllImpuesto()
    .then(response=>{      
      this.impuestoData=response;
      
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se puede cargar lista impuesto'
      });
    })
  }
  seleccionar(val:ImpuestoModel){
    this.impuestoSelect=val;
    this.$emit('ImpuestoSeleccionado',this.impuestoSelect);
  }
  handleCurrentChange(val:ImpuestoModel){
    this.impuestoSelect=val;
  }
  checkImpuesto(){
    this.$emit('ImpuestoSeleccionado',this.impuestoSelect)
  }
  closeImpuesto(){
    this.$emit('closeImpuesto');
  }
  data() {
    return {
        impuestoData:[]
    };
  }
}
