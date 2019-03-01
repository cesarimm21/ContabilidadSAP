import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';
import Global from '@/Global';
import { Notification } from 'element-ui';
import router from '@/router';
import {TipoDocIdentidadModel} from '@/modelo/maestro/tipodocidentidad';
import tipodocidentidadService from '@/components/service/tipodocidentidad.service';
@Component({
  name: 'bdocumento'
})

export default class  BDocumentoComponent extends Vue {

    public TipoDoc:Array<TipoDocIdentidadModel>[];
    public TipoSelect:TipoDocIdentidadModel=new TipoDocIdentidadModel();
  constructor() {
    super();
    this.GetAllTipoDocumento()
  }
  GetAllTipoDocumento(){      
    tipodocidentidadService.GetAllTipoDocumento()
    .then(response=>{
        console.log(response);
        
      this.TipoDoc=response;
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
  seleccionar(val:TipoDocIdentidadModel){
    this.TipoSelect=val;
    this.$emit('tipoSeleccionado',this.TipoSelect);
  }
  handleCurrentChange(val:TipoDocIdentidadModel){
    this.TipoSelect=val;
  }
  data() {
    return {
        TipoDoc:[]
    };
  }
}
