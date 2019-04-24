import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';
import { Notification } from 'element-ui';
import router from '@/router';
import {BancoModel} from '@/modelo/maestro/banco';
import bancoService from '@/components/service/banco.service';
import Global from '@/Global';
@Component({
  name: 'bbanco'
})

export default class  BBancoComponent extends Vue {
    gridBanco:BancoModel[];
    public banco:BancoModel=new BancoModel();
  constructor() {
    super();
    this.loadBanco();
  }
  loadBanco(){
    bancoService.GetAllBanco()
    .then(resp=>{
        this.gridBanco=[];
        this.gridBanco=resp.data;
    })
  }
  handleCurrentChange(val){
    this.banco=val;
  }
  seleccionar(val:BancoModel){
    this.banco=val;
    if(Global.nameComponent=='pagos-individual'){
      this.$emit('bancoselecionado',this.banco);
    }
  }
  checkBanco(){
    if(Global.nameComponent=='pagos-individual'){
        this.$emit('bancoselecionado',this.banco);
      }
  }

  closeBanco(){
    this.$emit('closeBanco');
  }
  data() {
    return {
        gridBanco:[]
    };
  }
  
}
