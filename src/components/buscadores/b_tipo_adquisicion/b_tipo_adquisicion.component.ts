import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';
import Global from '@/Global';
import { Notification } from 'element-ui';
import router from '@/router';
import {TipoAdquisicionModel} from '@/modelo/maestro/tipoadquisicion';
import tipoadquisicionService from '@/components/service/tipoaquisicion.service';
@Component({
  name: 'btipoadquisicion'
})

export default class  BTipoAdquisicionComponent extends Vue {

    public TipoAdquisicion:Array<TipoAdquisicionModel>[];
    public TipoSelect:TipoAdquisicionModel=new TipoAdquisicionModel();
  constructor() {
    super();
    this.GetAllTipoDocumento()
  }
  GetAllTipoDocumento(){      
    tipoadquisicionService.busquedaTipoAquisicion()
    .then(response=>{
      console.log(response);
      this.TipoAdquisicion=response;
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
  seleccionar(val){
    this.TipoSelect=val;
    this.$emit('tipoadquisicionSeleccionado',this.TipoSelect);
  }
  handleCurrentChange(val){
    this.TipoSelect=val;
  }
  data() {
    return {
      TipoAdquisicion:[]
    };
  }
}
