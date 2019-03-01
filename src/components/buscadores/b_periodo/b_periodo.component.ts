import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {PeriodoModel} from '@/modelo/maestro/periodo';
import periodoService from '@/components/service/periodo.service';
import { Notification } from 'element-ui';
import router from '@/router';
@Component({
  name: 'bperiodo'
})

export default class  BPeriodoComponent extends Vue {

   public periodoModel:PeriodoModel=new PeriodoModel();
   public selectPeriodoData:PeriodoModel=new PeriodoModel();
  constructor() {
    super();
    this.loadPeriodo();
  }
  loadPeriodo(){
    periodoService.GetAllPeriodo()
    .then(response=>{
        this.periodoModel=response;
    }).catch(error=>{
        this.$message({
            showClose: true,
            type: 'error',
            message: 'No se pudo cargar prioridad'
          });
    })
  }
  selectData(val:PeriodoModel){

  }
  handleCurrentChange(val:PeriodoModel){
    this.selectPeriodoData=val;
  }
  data() {
    return {
        value:''
    };
  }
}
