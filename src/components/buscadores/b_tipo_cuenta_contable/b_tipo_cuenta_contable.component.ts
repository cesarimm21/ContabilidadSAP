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
    public TipoCuentaContable1:Array<TipoCuentaContableModel>[];
    public TipoSelect:TipoCuentaContableModel=new TipoCuentaContableModel();
    blnfilterstrAcc_Type_Name:boolean=true;
    blnfilterstrAcc_Type_Cod:boolean=false;
    
    clickColumn:string='';
    Column:string='';
  
    public search:TipoCuentaContableModel=new TipoCuentaContableModel();
    inputAtributo:any;
  constructor() {
    super();
    this.GetAllTipoDocumento()
  }
  GetAllTipoDocumento(){      
    tipocuentacontableService.GetAllTipoCuentaContable()
    .then(response=>{
      this.TipoCuentaContable=response;
      this.TipoCuentaContable1=response;
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
    this.$emit('close');
  }
  seleccionar(val:TipoCuentaContableModel){
    this.TipoSelect=val;
    this.$emit('tipocuentacontableSeleccionado',this.TipoSelect);
  }
  handleCurrentChange(val:TipoCuentaContableModel){
    this.TipoSelect=val;
  }
  
  
  filterstrAcc_Type_Name(h,{column,$index}){
    debugger;
    var column1 = column.label; 
    if(this.blnfilterstrAcc_Type_Name){
      this.Column=column1;
      this.clickColumn=column.property;
      this.search=new TipoCuentaContableModel();
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [  h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),
        h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label),
       ])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterstrAcc_Type_Cod(h,{column,$index}){
    debugger;
    var column1 = column.label; 
    if(this.blnfilterstrAcc_Type_Cod){
      this.Column=column1;
      this.clickColumn=column.property;
      this.search=new TipoCuentaContableModel();
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [  h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),
        h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label),
       ])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strAcc_Type_Cod"){
      this.clickColumn=val.property;  
      this.search=new TipoCuentaContableModel();  
      this.inputAtributo='';  
      this.blnfilterstrAcc_Type_Cod=true;
      this.blnfilterstrAcc_Type_Name=false;
    }
    if(val.property=="strAcc_Type_Name"){
      this.clickColumn=val.property;
      this.search=new TipoCuentaContableModel();
      this.inputAtributo='';
      this.blnfilterstrAcc_Type_Cod=false;
      this.blnfilterstrAcc_Type_Name=true;
    }
  }
  buscarfilter(){
    var data=Global.like(this.TipoCuentaContable1,this.clickColumn,this.inputAtributo)
    this.TipoCuentaContable=[];
    this.TipoCuentaContable=data;
  }

  data() {
    return {
      TipoCuentaContable:[],
      TipoCuentaContable1:[],
      inputAtributo:''
    };
  }
}
