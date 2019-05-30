import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';
import Global from '@/Global';
import { Notification } from 'element-ui';
import router from '@/router';
import {TipoCuentaContableModel} from '@/modelo/maestro/tipocuentacontable';
import tipocuentacontableService from '@/components/service/tipocuentacontable.service';
@Component({
  name: 'btipocuentacontable'
})

export default class  BTipoCuentaContableComponent extends Vue {

    public TipoCuentaContable:Array<TipoCuentaContableModel>[];
    public TipoSelect:TipoCuentaContableModel=new TipoCuentaContableModel();
  constructor() {
    super();
    this.GetAllTipoDocumento()
  }
  GetAllTipoDocumento(){      
    tipocuentacontableService.GetAllTipoCuentaContable()
    .then(response=>{
        console.log(response);
        
      this.TipoCuentaContable=response;
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se puede cargar lista de tipo de documento'
      });
    })
  } 
  checkTipo(){
    this.$emit('tipoSeleccionado',this.TipoSelect);
  }
  closeTipo(){
    this.$emit('closeTipo');
  }
  seleccionar(val:TipoCuentaContableModel){
    this.TipoSelect=val;
    this.$emit('tipocuentacontableSeleccionado',this.TipoSelect);
  }
  handleCurrentChange(val:TipoCuentaContableModel){
    this.TipoSelect=val;
  }
  data() {
    return {
      TipoCuentaContable:[]
    };
  }
}
